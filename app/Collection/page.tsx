"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CardCreator from "../_components/cardCreator/cardCreator";
import "./collection.scss";
import Card from "@/app/_components/card/Card";
import initCardStyles from "../_components/cardStylesInit";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { FaFilter } from "react-icons/fa";
import cardStyles from "@/app/_data/cardStyles.json";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import SpinLoader from "../_components/SpinLoader";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import CardModal from "../_components/cardModal/cardModal";
import Status from "../_components/status/status";
import ConfirmModal from "../_components/confirmModal/confirmModal";
import { useRouter } from "next/navigation";
import { VscNewFile } from "react-icons/vsc";
import { TourProvider, useTour } from "@reactour/tour";
import Welcome from "../_components/welcome/Welcome";
import { useFilters } from "./hooks/useFilters";
import { useCardCreation } from "./hooks/useCardCreation";
import { useCollection } from "./hooks/useCollection";
import useCardGaps from "./hooks/useCardGaps";
import { steps, useTutorial } from "./hooks/useTutorial";
import TypeFilter from "../_components/typeFilter/TypeFilter";
import AlterationFilter from "../_components/alterationFilter/AlterationFilter";
import SearchFilter from "../_components/searchFilter/SearchFilter";

const abortController = new AbortController();
const signal = abortController.signal;

type sessionType = {
  username: string;
};

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [welcome, setWelcome] = useState<boolean>(false);
  const { setIsOpen } = useTour();
  const cardsContainer = useRef<any>();
  const [cardModal, setCardModal] = useState<any>(null);
  const [status, setStatus] = useState({
    message: "",
    type: "",
    active: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    message: "",
    onConfirm: () => {},
  });

  const showCardAnimations = false;
  const router = useRouter();

  var prevType: null | any = null;
  var prevAlteration: null | any = null;

  // @ts-ignore
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  }) as sessionType;

  const {
    updateCrystals,
    handleGetCollection,
    collection,
    setCollection,
    crystals,
  } = useCollection({ setLoading, session });

  const {
    handleClear,
    updateAvailableFilters,
    sortCollection,
    sort,
    typeFilter,
    alterationFilter,
    sortOrder,
    handleSearch,
    searchInput,
    setTypeFilter,
    availableTypes,
    setAlterationFilter,
    availableAlterations,
    setSort,
    setSortOrder,
    search,
    sorts,
  } = useFilters({ collection, setCollection, setLoading });

  const {
    createCard,
    handleCreateCard,
    createCardData,
    creatingCard,
    templateData,
    setCreatingCard,
    setCreateCardData,
  } = useCardCreation({
    handleClear,
    setLoading,
    handleGetCollection,
    setStatus,
    session,
    signal,
  });

  const updateGaps = useCardGaps({ cardsContainer });

  const { showTutorial } = useTutorial({ session });

  const checkCardsExist = () => {
    if (cardsContainer.current) {
      if (cardsContainer.current.innerHTML == "") {
        setStatus({
          message: `No cards matching "${search}"`,
          type: "error",
          active: true,
        });
      }
    }
  };

  const fadeElements = () => {
    var fade_elements = document.querySelectorAll(".fade-in-normal");
    fade_elements.forEach((element) => {
      element.classList.add("fade-in-normal-active");
    });
  };

  useEffect(() => {
    checkCardsExist();
  }, [search, typeFilter, alterationFilter, sort, sortOrder, collection]);

  const handleCardsClick = (e: any) => {
    let list = e.target.classList;

    if (list.contains("cards_container")) {
      setCardModal(null);
    }

    if (list.contains("glow")) {
      let card = e.target.parentElement.parentElement;
      setCardModal(card);
    }
  };

  useEffect(() => {
    setLoading(true);

    sortCollection();
  }, [sort, sortOrder]);

  useEffect(() => {
    initCardStyles();

    handleGetCollection(true);
  }, [session]);

  useEffect(() => {
    handleGetCollection(true);
  }, [cardModal]);

  useEffect(() => {
    if (createCardData.imageSrc) {
      createCard();
    }

    fadeElements();
  }, [createCardData]);

  useEffect(() => {
    updateCrystals();

    updateAvailableFilters(collection);

    if (sort != "") {
      sortCollection();
    }

    updateGaps();

    fadeElements();
  }, [collection]);

  useEffect(() => {
    if (showTutorial()) {
      setWelcome(true);
    }
  }, []);

  return (
    <TourProvider steps={steps}>
      <div className="collection__page">
        {welcome && (
          <Welcome
            username={session?.user?.username}
            setIsOpen={setIsOpen}
            setWelcome={setWelcome}
          />
        )}

        {/* Status Message */}
        <Status
          setState={setStatus}
          message={status.message}
          active={status.active}
          type={status.type}
        />

        {/* Card Modal */}
        <CardModal
          setStatus={setStatus}
          session={session}
          card={cardModal}
          setCard={setCardModal}
        ></CardModal>

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          onConfirm={modalInfo.onConfirm}
          message={modalInfo.message}
        />

        {creatingCard ? (
          <CardCreator
            data={templateData}
            setState={setCreatingCard}
            setData={setCreateCardData}
          />
        ) : (
          <>
            <div className="cardOptions">
              <SearchFilter
                setLoading={setLoading}
                searchInput={searchInput}
                handleSearch={handleSearch}
              />

              <TypeFilter
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                availableTypes={availableTypes}
              />

              <AlterationFilter
                setAlterationFilter={setAlterationFilter}
                alterationFilter={alterationFilter}
                availableAlterations={availableAlterations}
              />

              {/* Order By  */}
              <Select
                className={"fade-in-normal  react-aria-Select"}
                selectedKey={sort}
                onSelectionChange={(selected) => {
                  setLoading(true);
                  setSort(String(selected));
                }}
              >
                <Button aria-label="Sort">
                  <SelectValue>
                    {sort == "" ? (
                      <>
                        Sort By
                        {sortOrder == "desc" ? (
                          <FaSortAmountDown />
                        ) : sortOrder == "asc" ? (
                          <FaSortAmountUp />
                        ) : (
                          <></>
                        )}
                        {/* <FaSortAmountDownAlt /> */}
                      </>
                    ) : (
                      <>
                        {sort}
                        {sortOrder == "desc" ? (
                          <FaSortAmountDown />
                        ) : sortOrder == "asc" ? (
                          <FaSortAmountDownAlt />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </SelectValue>
                </Button>
                <Popover>
                  <div
                    className={`order-selector ${
                      sort == "" ? "not-active" : ""
                    }`}
                  >
                    <div
                      className="order"
                      onClick={(e) => setSortOrder("desc")}
                    >
                      <FaSortAmountDown />
                    </div>
                    <div className="seperator"></div>
                    <div className="order" onClick={(e) => setSortOrder("asc")}>
                      <FaSortAmountDownAlt />
                    </div>
                  </div>

                  <ListBox>
                    {sorts.map((sort) => (
                      <ListBoxItem id={sort} key={sort}>
                        {sort}
                        {/* <img src={`./types/icons/${type}.png`}/> */}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              <button
                aria-label="clear-filter"
                onClick={() => {
                  setLoading(true);
                  handleClear();
                }}
                className={`filterClear ${
                  search != "" ||
                  typeFilter != "" ||
                  alterationFilter != "" ||
                  sort != "" ||
                  sortOrder != "desc"
                    ? "show"
                    : ""
                }`}
              >
                <MdClear />
              </button>

              <div className="flex-seperator"></div>

              <button
                aria-label="refresh"
                className="crystal fade-in-normal"
                onClick={() => router.push("/Store?crystals")}
              >
                {crystals} <img src="/crystal.png" alt="crystal" />
              </button>

              <button
                aria-label="create-card"
                className={"fade-in-normal"}
                onClick={() => {
                  const modalInfo = {
                    message: (
                      <>
                        <p style={{ fontSize: "20px" }}>
                          Are you sure you want to create a new card?{" "}
                        </p>
                        <p style={{ fontSize: "14px", opacity: 0.9 }}>
                          Creating a new card will cost you
                        </p>
                        <div className="crystal-cost">
                          100{" "}
                          <img className="crystal" src="./crystal.png"></img>
                        </div>
                      </>
                    ),
                    onConfirm: () => {
                      setLoading(true);
                      handleCreateCard();
                      setModalOpen(false);
                    },
                  };
                  // @ts-ignore
                  setModalInfo(modalInfo);
                  setModalOpen(true);
                }}
              >
                Create Card
                <VscNewFile />
              </button>

              {/* <button className={'fade-in-normal'} onClick = {handleGetCollection}>Refresh</button> */}
            </div>

            <div
              onClick={(e) => {
                handleCardsClick(e);
              }}
              ref={cardsContainer}
              className={`cards_container customScroll ${
                cardModal == null ? "" : "modal-active"
              } ${modalOpen ? "modal-active" : ""} ${
                welcome ? "modal-active" : ""
              }`}
            >
              {collection.length == 0 || loading ? (
                <SpinLoader />
              ) : collection[0] == null ? (
                <>Could Not fine any cards. Create a new card here</>
              ) : (
                collection.map((card: any, index: number) => {
                  if (
                    (typeFilter == "All Types" ||
                      card.type
                        .toLowerCase()
                        .includes(typeFilter.toLowerCase())) &&
                    (alterationFilter == "All Alterations" ||
                      (card.alteration
                        .toLowerCase()
                        .includes(alterationFilter.toLowerCase()) &&
                        (search == "" ||
                          card.alteration
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          card.type
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          card.effect
                            .toLowerCase()
                            .includes(search.toLowerCase()))))
                  ) {
                    if (sort == "Type") {
                      if (prevType != card.type) {
                        prevType = card.type;

                        return (
                          <>
                            <div className={`collection-break ${card.type}`}>
                              <div className="center">
                                <img
                                  src={`/types/icons/${card.type}.png`}
                                  alt={card.type}
                                />
                              </div>
                            </div>

                            <div
                              id={card._id}
                              key={card._id}
                              className="card-locality-collection"
                            >
                              <Card
                                animate={showCardAnimations}
                                attack={card.attack}
                                defence={card.defence}
                                index={index}
                                effect={card.effect}
                                name="Noctus"
                                cost={card.cost}
                                contribution={card.contribution}
                                imageSrc={card.imageSrc}
                                type={card.type}
                                special={card.alteration}
                              />
                            </div>
                          </>
                        );
                      }
                      prevType = card.type;
                    } else if (sort == "Alteration") {
                      if (prevAlteration != card.alteration) {
                        prevAlteration = card.alteration;

                        return (
                          <>
                            <div
                              className={`collection-break ${card.alteration}`}
                            >
                              <div className="center">
                                {card.alteration == "null"
                                  ? "None"
                                  : card.alteration}
                              </div>
                            </div>

                            <div
                              id={card._id}
                              key={card._id}
                              className="card-locality-collection"
                            >
                              <Card
                                animate={showCardAnimations}
                                attack={card.attack}
                                defence={card.defence}
                                index={index}
                                effect={card.effect}
                                name="Noctus"
                                cost={card.cost}
                                contribution={card.contribution}
                                imageSrc={card.imageSrc}
                                type={card.type}
                                special={card.alteration}
                              />
                            </div>
                          </>
                        );
                      }
                      prevAlteration = card.alteration;
                    }

                    return (
                      <div
                        id={card._id}
                        key={card._id}
                        className="card-locality-collection"
                      >
                        <Card
                          animate={showCardAnimations}
                          attack={card.attack}
                          defence={card.defence}
                          index={index}
                          effect={card.effect}
                          name="Noctus"
                          cost={card.cost}
                          contribution={card.contribution}
                          imageSrc={card.imageSrc}
                          type={card.type}
                          special={card.alteration}
                        />
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })
              )}
            </div>
          </>
        )}
      </div>
    </TourProvider>
  );
};

export default Page;
