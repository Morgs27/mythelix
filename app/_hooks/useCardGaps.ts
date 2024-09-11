import { MutableRefObject } from "react";

type UseCardGaps = {
  cardsContainer: MutableRefObject<any>;
};

const useCardGaps = ({ cardsContainer }: UseCardGaps) => {
  const updateGaps = () => {
    if (!cardsContainer) return;

    let containerWidth = cardsContainer.current.offsetWidth;
    let cardWidth = 230;
    let verticalGap = 25;
    if (document.body.offsetWidth < 600) {
      cardWidth = 200;
      verticalGap = 15;
    }
    if (document.body.offsetWidth < 450) {
      cardWidth = 180;
      verticalGap = 0;
    }
    if (document.body.offsetWidth < 407) {
      cardWidth = 170;
    }
    if (document.body.offsetWidth < 385) {
      cardWidth = 160;
    }
    let gap = (containerWidth % cardWidth) / (containerWidth / cardWidth);
    cardsContainer.current.style.gap = `${gap}px`;
    if (gap > 25 || cardWidth < 600) {
      cardsContainer.current.style.rowGap = `${verticalGap}px`;
    }
  };

  return updateGaps;
};

export default useCardGaps;
