"use client";
import React, { useState, useEffect, useRef } from "react";
import "./cardCreator.scss";
import LazyImage from "../LazyImage";
import { FaChevronRight } from "react-icons/fa";
import useCardStyles from "@/app/_hooks/useCardStyles";

const CardCreator = ({
  data,
  setData,
  setState,
}: {
  data: any;
  setState: any;
  setData: any;
}) => {
  const [stage, setStage] = useState(-1);
  const stageNames = ["type", "image", "stats", "effect", "name"];

  const [cardData, setCardData] = useState({ name: "" } as any);

  const [types, setTypes] = useState(data.randomTypes);
  const [statlines, setStatlines] = useState(data.randomStatlines);

  const seperator = useRef<HTMLDivElement | null>(null);

  const [currentCard, setCurrentCard] = useState(1);

  const generateStyles = useCardStyles();

  const isMobile = screen.width < 735;

  useEffect(() => {
    if (stage == 4) {
      handleConfirmCard();
    } else {
      setTimeout(() => {
        if (document.getElementsByClassName("cards__container_" + stage)[0]) {
          document
            .getElementsByClassName("cards__container_" + stage)[0]
            .classList.remove("hide");
        }
      }, 300);
    }
  }, [stage]);

  useEffect(() => {
    generateStyles();

    setStage(0);
  }, []);

  const handleClick = (e: any, data: any) => {
    let selectedIndex = data.index;
    if (selectedIndex != currentCard && isMobile) {
      setCurrentCard(selectedIndex);
      return;
    }

    if (stage == 0) {
      const { type, alteration, index } = data;

      setCardData({ ...cardData, type, alteration, typeIndex: index });

      document
        .getElementsByClassName("cards__container_0")[0]
        .classList.add("hide");
      document
        .getElementsByClassName("cards__container_0")[0]
        .classList.add("away");

      setTimeout(() => {
        setStage(1);
      }, 1000);
    } else if (stage == 1) {
      const { index, imageSrc } = data;

      setCardData({ ...cardData, imageIndex: index, imageSrc });

      document
        .getElementsByClassName("cards__container_1")[0]
        .classList.add("hide");
      document
        .getElementsByClassName("cards__container_1")[0]
        .classList.add("away");

      setTimeout(() => {
        setStage(2);
      }, 1000);
    } else if (stage == 2) {
      const { index, attack, contribution, defence, cost } = data;

      setCardData({
        ...cardData,
        contribution,
        statsIndex: index,
        attack,
        defence,
        cost,
      });

      document
        .getElementsByClassName("cards__container_2")[0]
        .classList.add("hide");
      document
        .getElementsByClassName("cards__container_2")[0]
        .classList.add("away");

      setTimeout(() => {
        setStage(3);
      }, 1000);
    } else if (stage == 3) {
      const { index, effect } = data;

      setCardData({ ...cardData, effectIndex: index, effect });

      document
        .getElementsByClassName("cards__container_3")[0]
        .classList.add("hide");
      document
        .getElementsByClassName("cards__container_3")[0]
        .classList.add("away");

      setTimeout(() => {
        if (seperator.current) {
          seperator.current.style.transition = "opacity 0.5s";
          seperator.current.style.opacity = "0";
        }

        setStage(4);
      }, 1000);
    }
  };

  const handleNameChange = (e: any) => {
    setCardData({ ...cardData, name: e.target.value });
  };

  const handleConfirmCard = () => {
    setData(cardData);
    setState(false);
  };

  return (
    <div className="card__creator">
      <div className="creation-title fade-in-normal-active">Create Card</div>
      <div className="timeline fade-in-normal-active">
        <div className={`timeline-item ${stage == 0 ? "active" : ""}`}>
          Type
        </div>
        <div className="timeline-seperator">
          <FaChevronRight />
        </div>
        <div className={`timeline-item ${stage == 1 ? "active" : ""}`}>
          Image
        </div>
        <div className="timeline-seperator">
          <FaChevronRight />
        </div>
        <div className={`timeline-item ${stage == 2 ? "active" : ""}`}>
          Statline
        </div>
        <div className="timeline-seperator">
          <FaChevronRight />
        </div>
        <div className={`timeline-item ${stage == 3 ? "active" : ""}`}>
          Effect
        </div>
      </div>

      <div className="cards__container_0 hide">
        {stage === 0
          ? types.map((item: any, index: number) => {
              return (
                <div
                  key={`${index}${item.type}`}
                  onClick={(e) =>
                    handleClick(e, {
                      type: item.prompt,
                      alteration: item.alterations,
                      index,
                    })
                  }
                  className={`card ${item.alterations} ${
                    currentCard == index ? "selected" : ""
                  }`}
                >
                  <div className="top">
                    <div className="title">{item.prompt}</div>
                    <div className={"description"}>
                      Contributes to {item.prompt} class
                    </div>
                  </div>
                  <div
                    className={`icon ${item.alterations}`}
                    style={{
                      maskImage: `url(types/icons/${item.prompt}.png)`,
                      WebkitMaskImage: `url(types/icons/${item.prompt}.png)`,
                    }}
                  >
                    {" "}
                  </div>
                  {item.alterations !== "null" ? (
                    <div className="bottom">
                      <div className={"description"}>Unique Alteration</div>
                      <div className={`alteration ${item.alterations}`}>
                        {item.alterations == "null" ? "None" : item.alterations}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          : null}
      </div>
      <div className="cards__container_1 hide">
        {stage === 1
          ? types[cardData.typeIndex].imageOptions.map(
              (item: any, index: number) => {
                return (
                  <div
                    key={`${index}${item.photo}`}
                    onClick={(e) =>
                      handleClick(e, { index, imageSrc: item.photo })
                    }
                    className={`card ${cardData.alteration} ${
                      currentCard == index ? "selected" : ""
                    }`}
                  >
                    <LazyImage src={item.photo} alt={item.photo}></LazyImage>
                  </div>
                );
              }
            )
          : null}
      </div>

      <div className="cards__container_2 hide">
        {stage === 2
          ? statlines.map((item: any, index: number) => {
              return (
                <div
                  key={`${index}${item.stats.cost}`}
                  onClick={(e) =>
                    handleClick(e, {
                      index,
                      contribution: item.stats.contribution,
                      cost: item.stats.cost,
                      attack: item.stats.attack,
                      defence: item.stats.defence,
                    })
                  }
                  className={`card ${cardData.alteration} ${
                    currentCard == index ? "selected" : ""
                  }`}
                >
                  <LazyImage
                    src={cardData.imageSrc}
                    alt={cardData.imageSrc}
                  ></LazyImage>
                  <LazyImage
                    src={"/card-design.png"}
                    alt={cardData.imageSrc}
                  ></LazyImage>

                  <div className="overlay">
                    <div className="upper">
                      <div className="cost">
                        <div className="text">{item.stats.cost}</div>
                      </div>
                      <div className="contribution">
                        {renderContribution(item.stats.contribution)}
                      </div>
                    </div>
                    <div className="name">
                      {cardData.alteration != "null" ? (
                        <div className={"alteration " + cardData.alteration}>
                          {cardData.alteration.toUpperCase()}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="description"></div>
                    <div className="lower">
                      <div className="defence">{item.stats.defence}</div>
                      <div className="class">
                        <img
                          src={`/types/icons/${cardData.type}.png`}
                          alt={cardData.type}
                        />
                        <div>{cardData.type.toUpperCase()}</div>
                      </div>
                      <div className="attack">{item.stats.attack}</div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="cards__container_3 hide">
        {stage === 3
          ? types[cardData.typeIndex].cardEffects.map(
              (item: any, index: number) => {
                return (
                  <div
                    key={`${index}${item}`}
                    onClick={(e) => handleClick(e, { index, effect: item })}
                    className={`card ${cardData.alteration} ${
                      currentCard == index ? "selected" : ""
                    }`}
                  >
                    <LazyImage
                      src={cardData.imageSrc}
                      alt={cardData.imageSrc}
                    ></LazyImage>
                    <LazyImage
                      src={"/card-design.png"}
                      alt={cardData.imageSrc}
                    ></LazyImage>

                    <div className="overlay">
                      <div className="upper">
                        <div className="cost">
                          <div className="text">{cardData.cost}</div>
                        </div>
                        <div className="contribution">
                          {renderContribution(cardData.contribution)}
                        </div>
                      </div>
                      <div className="name">
                        {cardData.alteration != "null" ? (
                          <div className={"alteration " + cardData.alteration}>
                            {cardData.alteration.toUpperCase()}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="description">{item}</div>
                      <div className="lower">
                        <div className="defence">{cardData.defence}</div>
                        <div className="class">
                          <img
                            src={`/types/icons/${cardData.type}.png`}
                            alt={cardData.type}
                          />
                          <div>{cardData.type.toUpperCase()}</div>
                        </div>
                        <div className="attack">{cardData.attack}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </div>
      <div className="cards__container_4 hide">
        {stage === 4 ? (
          <>
            <div className={`card ${cardData.alteration} `}>
              <LazyImage
                src={cardData.imageSrc}
                alt={cardData.imageSrc}
              ></LazyImage>
              <LazyImage
                src={"/card-design.png"}
                alt={cardData.imageSrc}
              ></LazyImage>

              <div className="overlay">
                <div className="upper">
                  <div className="cost">
                    <div className="text">{cardData.cost}</div>
                  </div>
                  <div className="contribution">
                    {renderContribution(cardData.contribution)}
                  </div>
                </div>
                <div className="name">
                  {cardData.alteration != "null" ? (
                    <div className={"alteration " + cardData.alteration}>
                      {cardData.alteration.toUpperCase()}
                    </div>
                  ) : (
                    <></>
                  )}
                  {cardData.name}
                </div>

                <div className="description">{cardData.effect}</div>
                <div className="lower">
                  <div className="defence">{cardData.defence}</div>
                  <div className="class">
                    <img
                      src={`/types/icons/${cardData.type}.png`}
                      alt={cardData.type}
                    />
                    <div>{cardData.type.toUpperCase()}</div>
                  </div>
                  <div className="attack">{cardData.attack}</div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div ref={seperator} className="seperator">
        <div className="line fade-in-normal-active"></div>
        <div className="line fade-in-normal-active"></div>
        <div className="line fade-in-normal-active"></div>

        <div className="selection-indicator">
          <div
            onClick={() => setCurrentCard(0)}
            className={`circle ${currentCard == 0 ? "active" : ""}`}
          ></div>
          <div
            onClick={() => setCurrentCard(1)}
            className={`circle ${currentCard == 1 ? "active" : ""}`}
          ></div>
          <div
            onClick={() => setCurrentCard(2)}
            className={`circle ${currentCard == 2 ? "active" : ""}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

const renderContribution = (contribution: any) => {
  switch (contribution) {
    case 1:
      return (
        <>
          <div className="center  "></div>
          <div className="side left">
            <div className="hide"></div>
            <div className="hide"></div>
          </div>
          <div className="side right">
            <div className="hide"></div>
            <div className="hide"></div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className="center hide "></div>
          <div className="side left">
            <div className="hide"></div>
            <div className=""></div>
          </div>
          <div className="side right">
            <div className="hide"></div>
            <div className=""></div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <div className="center "></div>
          <div className="side left">
            <div className="hide"></div>
            <div className=""></div>
          </div>
          <div className="side right">
            <div className="hide"></div>
            <div className=""></div>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <div className="center hide "></div>
          <div className="side left">
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className="side right">
            <div className=""></div>
            <div className=""></div>
          </div>
        </>
      );
    case 5:
      return (
        <>
          <div className="center"></div>
          <div className="side left">
            <div></div>
            <div></div>
          </div>
          <div className="side right">
            <div></div>
            <div></div>
          </div>
        </>
      );
  }
};

export default CardCreator;
