import cardStyles from "@/app/_data/cardStyles.json";


const initCardStyles = () => {

    // Generate CSS dynamically
    let css = "";

    let alterationStyles = cardStyles[0];

    console.log(alterationStyles)

    let typeStyles = cardStyles[1];

    for (const alterationType in alterationStyles) {
        var gradient = alterationStyles[alterationType].gradient.join(", ");

        console.log(alterationStyles[alterationType].solid[0]);

        const [lighter, darker] = compareColours(alterationStyles[alterationType].gradient[0], alterationStyles[alterationType].gradient[2]);

        // compare too colours to see which one is nearer white
        

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
                color: ${alterationStyles[alterationType].solid[0]}
            }
        `;

        
    }

    for (const cardType in typeStyles) {

        var colour = typeStyles[cardType];

        css += `
            .card.${cardType}:hover {
                box-shadow: 0 2px 0 0 ${colour};
            }

        `;

    }

    console.log("CSS: ", css);

    // Create style element
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

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


