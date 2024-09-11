import CardInterface from "@/app/_interfaces/Card";
import Card from "../card/Card";
import SpinLoader from "../SpinLoader";
import { MutableRefObject, Dispatch, useEffect, SetStateAction } from "react";

type CardListProps = {
  collection: CardInterface[];
  cardModal: any;
  welcome: boolean;
  modalOpen: boolean;
  cardsContainer: MutableRefObject<any>;
  typeFilter: string;
  alterationFilter: string;
  search: string;
  sort: string;
  setCardModal: Dispatch<any>;
  loading: boolean;
  setStatus: Dispatch<
    SetStateAction<{
      message: string;
      type: string;
      active: boolean;
    }>
  >;
  sortOrder: string;
};

const CardList = ({
  collection,
  cardModal,
  welcome,
  modalOpen,
  cardsContainer,
  typeFilter,
  alterationFilter,
  search,
  sort,
  setCardModal,
  loading,
  setStatus,
  sortOrder,
}: CardListProps) => {
  var prevType: null | any = null;
  var prevAlteration: null | any = null;

  const showCardAnimations = false;

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

  useEffect(() => {
    checkCardsExist();
  }, [search, typeFilter, alterationFilter, sort, sortOrder, collection]);

  return (
    <div
      onClick={(e) => {
        handleCardsClick(e);
      }}
      ref={cardsContainer}
      className={`cards_container customScroll ${
        cardModal == null ? "" : "modal-active"
      } ${modalOpen ? "modal-active" : ""} ${welcome ? "modal-active" : ""}`}
    >
      {collection.length == 0 || loading ? (
        <SpinLoader />
      ) : collection[0] == null ? (
        <>Could Not fine any cards. Create a new card here</>
      ) : (
        collection.map((card: any, index: number) => {
          if (
            (typeFilter == "All Types" ||
              card.type.toLowerCase().includes(typeFilter.toLowerCase())) &&
            (alterationFilter == "All Alterations" ||
              (card.alteration
                .toLowerCase()
                .includes(alterationFilter.toLowerCase()) &&
                (search == "" ||
                  card.alteration
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  card.type.toLowerCase().includes(search.toLowerCase()) ||
                  card.effect.toLowerCase().includes(search.toLowerCase()))))
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
                    <div className={`collection-break ${card.alteration}`}>
                      <div className="center">
                        {card.alteration == "null" ? "None" : card.alteration}
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
  );
};

export default CardList;
