import cardStyles from "@/app/_data/cardStyles.json";
import styles from "@/app/_data/cardStyles.ts";

const initCardStyles = () => {

    // First check to see if the css is already generated
    if (document.getElementById("cardStyles")) {
        return;
    }

    let css;

    // Next check whether the styles have been parsed
    if(styles.length > 10){

        css = styles;

    }
    else {

        console.warn("Please Update Parsed Card Styles")
        css = parseCardStyles(cardStyles);
        console.log(css);

    }

    const style = document.createElement("style");
    style.id = "cardStyles";
    style.innerHTML = css;
    document.head.appendChild(style);

}


const parseCardStyles = (cardStyles: any) => {

    // Generate CSS dynamically
    let css = "";

    let alterationStyles = cardStyles[0];

    console.log(alterationStyles)

    let typeStyles = cardStyles[1];

    for (const alterationType in alterationStyles) {

        // @ts-ignore
        let item  = alterationStyles[alterationType];

        var gradient = item.gradient.join(", ");

        // compare too colours to see which one is nearer white
        const [lighter, darker] = compareColours(item.gradient[0], item.gradient[2]);

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
        `;

        
    }

    for (const cardType in typeStyles) {

        // @ts-ignore
        var colour = typeStyles[cardType];

        css += `
            .card.${cardType}:hover {
                box-shadow: 0 2px 0 0 ${colour};
            }

        `;

    }

    return css;
}

// Create a function to compare to colours to see which one is nearer white
const compareColours = (colour1: string, colour2: string) => {


    var rgb1 = colour1.replace(/[^\d,]/g, '').split(',');
    var rgb2 = colour2.replace(/[^\d,]/g, '').split(',');

    var r1 = parseInt(rgb1[0]);
    var g1 = parseInt(rgb1[1]);
    var b1 = parseInt(rgb1[2]);

    var r2 = parseInt(rgb2[0]);
    var g2 = parseInt(rgb2[1]);
    var b2 = parseInt(rgb2[2]);

    var brightness1 = (r1 * 299) + (g1 * 587) + (b1 * 114);
    var brightness2 = (r2 * 299) + (g2 * 587) + (b2 * 114);

    if (brightness1 > brightness2) {
        return [colour1, colour2];
    } else {
        return [colour2, colour1];
    }

}

export default initCardStyles;


