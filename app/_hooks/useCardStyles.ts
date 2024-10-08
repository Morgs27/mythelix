import { useEffect, useMemo } from "react";
import cardStyles from "@/app/_data/cardStyles.json";

type UseCardStylesProps = {
  regenerate?: boolean;
};

const useCardStyles = ({ regenerate = false }: UseCardStylesProps = {}) => {
  const css = useMemo(() => parseCardStyles(cardStyles), []);

  const generateStyles = () => {
    if (document.getElementById("cardStyles") && !regenerate) {
        return;
      }
  
      const style = document.createElement("style");
      style.id = "cardStyles";
      style.innerHTML = css;
      document.head.appendChild(style);
  
      return () => {
        if (regenerate) {
          document.head.removeChild(style);
        }
      };
  }

  return generateStyles;
};

export default useCardStyles;

const parseCardStyles = (cardStyles: any) => {
  let css = "";

  let alterationStyles = cardStyles[0];

  let typeStyles = cardStyles[1];

  for (const cardType in typeStyles) {
    // @ts-ignore
    var colour = typeStyles[cardType];

    css += `
              .card.${cardType}:hover {
                  box-shadow: 0 2px 0 0 ${colour};
              }
              .cardModal.${cardType}{
                  --type-colour: ${colour};
                  box-shadow: 0px 0px 0px 1px ${colour}, 0px 0px 30px 50px rgba(0,0,0,0.5);
              }
              .cardModal.${cardType} button{
                  border: 1px solid ${colour};
              }
  
              
  
          `;
  }

  for (const alterationType in alterationStyles) {
    // @ts-ignore
    let item = alterationStyles[alterationType];

    var gradient = item.gradient.join(", ");

    // compare too colours to see which one is nearer white
    const [lighter, darker] = compareColours(
      item.gradient[0],
      item.gradient[2]
    );

    css += `
              .card.${alterationType}::before {
              background-image: linear-gradient(var(--rotate), ${gradient});
              }
              .card.${alterationType}::after {
                  background-image: linear-gradient(var(--rotate), ${gradient});
              }
              .card .icon.${alterationType} {
                  background-image: linear-gradient(var(--rotate), white 0%,  ${lighter} 30%, ${darker}  80%);
              }
              .card .alteration.${alterationType} {
                  color: ${item.solid[0]};
                  position: relative;
              }
              .card .alteration.${alterationType}::after{
                  content: '';
                  width: 30%;
                  position: absolute;
                  left: 35%;
                  height: 1px;
                  bottom: -3px;
                  background: ${item.solid[0]};
                  opacity: 0.6;
              }
              .cardModal.${alterationType}::before {
                  background-image: linear-gradient(var(--rotate), ${gradient});
              }
              .cardModal.${alterationType}{
                  --main-colour: ${lighter};
                  --secondary-colour: ${darker};
              }
              .cardModal.${alterationType} button{
                  border: 1px solid ${lighter};
              }
              .cardModal.${alterationType} .cardAlteration{
                  color: ${lighter};
              }
              .cardModal.null .cardAlteration{
                  color: rgba(255,255,255,0.6);
              }
              .collection-break.${alterationType}::before, .collection-break.${alterationType}::after{
                  background-image: linear-gradient(var(--rotate), ${gradient});
              }
          `;
  }

  return css;
};

const compareColours = (colour1: string, colour2: string) => {
  var rgb1 = colour1.replace(/[^\d,]/g, "").split(",");
  var rgb2 = colour2.replace(/[^\d,]/g, "").split(",");

  var r1 = parseInt(rgb1[0]);
  var g1 = parseInt(rgb1[1]);
  var b1 = parseInt(rgb1[2]);

  var r2 = parseInt(rgb2[0]);
  var g2 = parseInt(rgb2[1]);
  var b2 = parseInt(rgb2[2]);

  var brightness1 = r1 * 299 + g1 * 587 + b1 * 114;
  var brightness2 = r2 * 299 + g2 * 587 + b2 * 114;

  if (brightness1 > brightness2) {
    return [colour1, colour2];
  } else {
    return [colour2, colour1];
  }
};
