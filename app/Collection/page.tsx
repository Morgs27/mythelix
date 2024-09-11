"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CardCreator from "../_components/cardCreator/cardCreator";
import "./collection.scss";
import { MdClear } from "react-icons/md";
import CardModal from "../_components/cardModal/cardModal";
import Status from "../_components/status/status";
import ConfirmModal from "../_components/confirmModal/confirmModal";
import { useRouter } from "next/navigation";
import { VscNewFile } from "react-icons/vsc";
import { TourProvider, useTour } from "@reactour/tour";
import WelcomeModal from "../_components/welcomeModal/WelcomeModal";
import { useFilters } from "../_hooks/useFilters";
import { useCardCreation } from "../_hooks/useCardCreation";
import { useCollection } from "../_hooks/useCollection";
import useCardGaps from "../_hooks/useCardGaps";
import { steps, useTutorial } from "../_hooks/useTutorial";
import TypeFilter from "../_components/typeFilter/TypeFilter";
import AlterationFilter from "../_components/alterationFilter/AlterationFilter";
import SearchFilter from "../_components/searchFilter/SearchFilter";
import OrderSelector from "../_components/orderSelector/OrderSelector";
import CardList from "../_components/cardList/CardList";
import useFadeElements from "../_hooks/useFadeElements";
import useCardStyles from "../_hooks/useCardStyles";

const abortController = new AbortController();
const signal = abortController.signal;

type sessionType = {
  username: string;
};

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [welcome, setWelcome] = useState<boolean>(false);
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

  const router = useRouter();

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

  const fadeElements = useFadeElements();

  const generateStyles = useCardStyles();

  const { isOpen, setIsOpen } = useTour();

  useEffect(() => {
    setLoading(true);

    sortCollection();
  }, [sort, sortOrder]);

  useEffect(() => {
    generateStyles();

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
    // if (showTutorial()) {
    //   setWelcome(true);
    // }
    // const tutorialStarted = localStorage.getItem("tutorialStarted");
    // if (tutorialStarted === "true") {

    //   setIsOpen(true);
    //   localStorage.removeItem("tutorialStarted");
    // }
    console.warn('Initially Is Open: ', isOpen)
    setIsOpen(true);
  }, []);

  // const closeTour = () => {
  //   setIsOpen(false);
  //   localStorage.setItem("tutorialCompleted", "true");
  // };

  useEffect(() => {
    console.warn('Is Open: ', isOpen)
  }, [isOpen])

  return (
    <TourProvider steps={steps}>
      <div className="collection__page">
        {welcome && (
          <WelcomeModal
            username={session?.user?.username}
            setIsOpen={setIsOpen}
            setWelcome={setWelcome}
          />
        )}

        <Status
          setState={setStatus}
          message={status.message}
          active={status.active}
          type={status.type}
        />

        <CardModal
          setStatus={setStatus}
          session={session}
          card={cardModal}
          setCard={setCardModal}
        ></CardModal>

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

              <OrderSelector
                setLoading={setLoading}
                setSort={setSort}
                sort={sort}
                sortOrder={sortOrder}
                sorts={sorts}
                setSortOrder={setSortOrder}
              />

              {/* Clear Filters */}
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

              {/* Crystals */}
              <button
                aria-label="refresh"
                className="crystal fade-in-normal"
                onClick={() => router.push("/Store?crystals")}
              >
                {crystals} <img src="/crystal.png" alt="crystal" />
              </button>

              {/* Create Card */}
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
                  setModalInfo(modalInfo as any);
                  setModalOpen(true);
                }}
              >
                Create Card
                <VscNewFile />
              </button>
            </div>

            <CardList
              collection={collection}
              cardModal={cardModal}
              welcome={welcome}
              modalOpen={modalOpen}
              cardsContainer={cardsContainer}
              typeFilter={typeFilter}
              alterationFilter={alterationFilter}
              search={search}
              sort={sort}
              setCardModal={setCardModal}
              loading={loading}
              setStatus={setStatus}
              sortOrder={sortOrder}
            />
          </>
        )}
      </div>
    </TourProvider>
  );
};

export default Page;
