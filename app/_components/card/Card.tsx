'use client'

import './card.scss'
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image'

type cardProps = {
    imageSrc : string,
    name : string,
    special : string,
    type: string,
    contribution: number,
    cost: number,
    effect: string,
    attack: number,
    defence: number,
    index: number
}   

const Card = ({imageSrc, effect, cost, attack, defence, name, contribution, type,special, index}: cardProps) => {

    const card = useRef<HTMLDivElement>(null);

    let bounds: DOMRect | undefined;

    const [imagesLoaded, setImagesLoaded] = useState({image: false, overlay: false});

    const [initialLoad, setInitialLoad] = useState(true);
    
    function rotateToMouse(e: any) {

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const leftX = bounds ? mouseX - bounds.x : 0;
        const topY = bounds ? mouseY - bounds.y : 0;

        const center = {
        x: bounds ? leftX - bounds.width / 2 : 0,
        y: bounds ? topY - bounds.height / 2 : 0
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
        
        if (card.current){
            card.current.style.transform = `
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
            `;
            
            const glowElement = card.current?.querySelector(".glow") as HTMLDivElement;
            if (glowElement) {
                if (glowElement) {
                    glowElement.style.backgroundImage = `
                radial-gradient(
                    circle at
                    ${center.x * 2 + (bounds ? bounds.width / 2 : 0)}px
                    ${center.y * 2 + (bounds ? bounds.height / 2 : 0)}px,
                    #ffffff20,
                    #0000000f
                )
                `;
                }
            }
        }
    
    }

    const mouseEnter = () => {
        bounds = card.current?.getBoundingClientRect();
        document.addEventListener("mousemove", rotateToMouse);

    }

    const mouseLeave = () => {  
        document.removeEventListener("mousemove", rotateToMouse);
        if (card.current){
            card.current.style.transform = "";
            card.current.style.background = "";
            const glowElement = card.current?.querySelector(".glow") as HTMLDivElement;
            if (glowElement) {
                glowElement.style.backgroundImage = "";
            }
        }

    }

    const focusCard = () => {
        card.current?.classList.add('focus')
    }

    useEffect(() => {
        if (!initialLoad) {
          handleImageLoaded();
        }
    }, [imageSrc, initialLoad]); //
    
    const handleImageLoaded = () => {
        setImagesLoaded({...imagesLoaded, image: true})
        setInitialLoad(false);
    }

    const handleOverlayLoaded = () => {
        setImagesLoaded({...imagesLoaded, overlay: true})
    }

    const handleImageError = (error: any) => {
        setImagesLoaded({...imagesLoaded, image: true})
    }

    return(
        <>
        <div className="placeholder">
            <div className = "activity"></div>
        </div>
        <div className={`card ${special} ${type} ${imagesLoaded.image && imagesLoaded.overlay ? '': 'loading'}`} ref={card} 
        onMouseEnter={() => mouseEnter()} 
        onMouseLeave={() => mouseLeave()}
        onClick={() => focusCard()}
        >

           
            <div className="border"></div>
            <img onLoad={handleImageLoaded} onError={handleImageError} alt = 'Image Failed Loading' className = "image" src = {imageSrc} />
            <img onLoad={handleOverlayLoaded} alt = "" className= 'imageOverlay' src = {'/card-design.png'}/>

            <div className="glow"></div>
            <div className="overlay">
                <div className="top">
                    <div className="cost"><div className="text">{cost}</div></div>
                    <div className="contribution">
                       {renderContribution(contribution)}
                    </div>
                </div>
                <div className="name">
                    {
                        special != 'null' ? 
                        <div className={"alteration " + special}>{special.toUpperCase()}</div>
                        : <></>
                    }
                    {/* {name.toLocaleUpperCase()} */}
                </div>
                
                <div className="description">{effect}</div>
                <div className="bottom">
                    <div className="defence">{defence}</div>
                    <div className="class">
                        <img src={`/types/icons/${type}.png`} alt={type} />
                        <div>{type.toUpperCase()}</div>
                        
                    </div>
                    <div className="attack">{attack}</div>
                </div>
            </div>
        </div>
        </>
      
    )
}


const renderContribution = (contribution: any) => {
    if (contribution == 1 ){
        return (
            <>
            <div className="center  "></div>
            <div className="side left">
                <div className = "hide"></div>
                <div className = "hide"></div>
            </div>
            <div className="side right">
                <div className = "hide"></div>
                <div className = "hide"></div>
            </div>
            </>
        )
    }
    else if (contribution == 2){
        return (
            <>
            <div className="center hide "></div>
            <div className="side left">
                <div className = "hide"></div>
                <div className = ""></div>
            </div>
            <div className="side right">
                <div className = "hide"></div>
                <div className = ""></div>
            </div>
            </>
        )
    }
    else if (contribution == 3){
        return (
            <>
            <div className="center "></div>
            <div className="side left">
                <div className = "hide"></div>
                <div className = ""></div>
            </div>
            <div className="side right">
                <div className = "hide"></div>
                <div className = ""></div>
            </div>
            </>
        )
    }
    else if (contribution == 4){
        return (
            <>
            <div className="center hide "></div>
            <div className="side left">
                <div className = ""></div>
                <div className = ""></div>
            </div>
            <div className="side right">
                <div className = ""></div>
                <div className = ""></div>
            </div>
            </>
        )
    }
    else {
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
        )
    }
  
}

export default Card;