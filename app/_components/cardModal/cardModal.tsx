"use client";

import React, { useState, useEffect, useRef } from "react";
import "./cardModal.scss";
import ConfirmModal from "../confirmModal/confirmModal";
import { BsShop } from "react-icons/bs";
import cardDescriptions from "@/app/_data/descriptions.json";

const CardCreator = ({
  card,
  setCard,
  session,
  setStatus,
}: {
  card: any;
  setCard: any;
  session: any;
  setStatus: any;
}) => {
  const cardModalRef = useRef<any>(null);
  const cardContainerRef = useRef<any>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    message: "",
    onConfirm: () => {},
  });

  let cardType = "";
  let cardAlteration = "";

  if (card != null) {
    const innerCard = card.querySelector(".card");
    let classList = innerCard.classList.value.split(" ");

    classList = classList.filter((item: any) => {
      return item != "";
    });

    if (classList[1] == "Pop") {
      cardAlteration = "PopArt";
      cardType = classList[3];
    } else {
      cardType = classList[2];
      cardAlteration = classList[1];
    }
  }

  const deleteCard = async () => {
    const response = await fetch("/api/cards/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // @ts-ignore
      body: JSON.stringify({ username: session.user.username, id: card.id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        res.json();
      })
      .then((result) => {
        setStatus({ message: "Card Deleted", type: "sucess", active: true });

        card.style.display = "none";

        setCard(null);
      })
      .catch((error) => {
        setStatus({
          message: "Error Deleting Card",
          type: "error",
          active: true,
        });
      });
  };

  useEffect(() => {
    if (card != null && cardModalRef != null) {
      let clone = card.cloneNode(true);

      cardContainerRef.current.innerHTML = "";

      clone.classList.add("ignore");

      clone.querySelector(".card").classList.add("animateBorder");

      // @ts-ignore
      cardContainerRef.current.appendChild(clone);
    }
  }, [card]);

  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onConfirm={modalInfo.onConfirm}
        message={modalInfo.message}
      />

      <div
        ref={cardModalRef}
        className={`cardModal ${cardType} ${cardAlteration} ${
          modalOpen == true ? "fade" : ""
        } ${card == null ? "hide" : ""}`}
      >
        <div className="modalOverlay"></div>
        <div className="background"></div>
        <div ref={cardContainerRef} className="cardContainer"></div>
        <div className="cardDetails">
          <div className="top">
            <div className="text">
              <div className="cardType">{cardType}</div>
              <div className="cardAlteration">
                {cardAlteration == "null" ? "No Alteration" : cardAlteration}
              </div>
            </div>
            <img src={`/types/icons/${cardType}.png`} alt={cardType} />
          </div>
          <div className="desctiption">
            {/* @ts-ignore */}
            {cardDescriptions[cardAlteration]
              ? // @ts-ignore
                cardDescriptions[cardAlteration]
              : // @ts-ignore
                cardDescriptions[cardType]}
          </div>
          <div className="bottom">
            <button
              className="deleteCard"
              onClick={() => {
                const modalInfo = {
                  message: (
                    <>
                      <p style={{ fontSize: "20px" }}>
                        Are you sure you want to disenchant this card?
                      </p>
                      <p style={{ fontSize: "14px", opacity: 0.9 }}>
                        Disenchanting this card will give you
                      </p>
                      <div className="crystal-cost">
                        {cardAlteration == "null" ? "20" : "50"}
                        <img className="crystal" src="./crystal.png"></img>
                      </div>
                    </>
                  ),
                  onConfirm: () => {
                    deleteCard();
                    setModalOpen(false);
                  },
                };
                // @ts-ignore
                setModalInfo(modalInfo);
                setModalOpen(true);
              }}
            >
              Disenchant <img src="./crystal.png"></img>
            </button>
            <button className="deleteCard" onClick={() => deleteCard()}>
              Sell <BsShop />{" "}
            </button>
            <div className="flex-seperator" style={{ flexGrow: 1 }}></div>
            <button className="closeCard" onClick={() => setCard(null)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCreator;
