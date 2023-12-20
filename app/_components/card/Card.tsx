'use client'

import LazyImage from '../LazyImage'
import './card.scss'
import React, {useRef, useState} from 'react'

type cardProps = {
    imageSrc : string,
    name : string,
    special : string,
    type: string,
    contribution: number,
    cost: number,
    style: any,
    effect: string,
}   

const Card = ({imageSrc, effect, cost, name, contribution, type,special, ...props}: cardProps) => {

    const card = useRef<HTMLDivElement>(null);

    let bounds: DOMRect | undefined;

    const [imagesLoaded, setImagesLoaded] = useState({image: false, overlay: false});
    
    function rotateToMouse(e: any) {

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;

        const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
    
        card.current.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
            ${center.y / 100},
            ${-center.x / 100},
            0,
            ${Math.log(distance) * 2}deg
        )
        `;
    
        card.current.querySelector(".glow").style.backgroundImage = `
        radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #ffffff20,
            #0000000f
        )
        `;
    }

    const mouseEnter = () => {
        bounds = card.current?.getBoundingClientRect();
        document.addEventListener("mousemove", rotateToMouse);
     
        console.log('mouse enter')
    }

    const mouseLeave = () => {  
        document.removeEventListener("mousemove", rotateToMouse);
        card.current.style.transform = "";
        card.current.style.background = "";
        card.current.querySelector(".glow").style.backgroundImage = "";

        console.log('mouse leave')
    }

    const focusCard = () => {
        card.current?.classList.add('focus')
    }
    
    const handleImageLoaded = () => {
        console.log('handle image loaded')
        setImagesLoaded({...imagesLoaded, image: true})
    }

    const handleOverlayLoaded = () => {
        console.log('hanle overlay loaded')
        setImagesLoaded({...imagesLoaded, overlay: true})
    }

    const handleImageError = (error) => {
        console.log('handle image error', error)
        setImagesLoaded({...imagesLoaded, image: true})
    }

    return(
       
        <div className={`card ${special} ${type} ${imagesLoaded.image && imagesLoaded.overlay ? '': 'loading'}`} ref={card} 
        onMouseEnter={() => mouseEnter()} 
        onMouseLeave={() => mouseLeave()}
        onClick={() => focusCard()}
        {...props}
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
                    <div className="defence">5</div>
                    <div className="class">
                        <img src={`/types/icons/${type}.png`} alt={type} />
                        <div>{type.toUpperCase()}</div>
                        
                    </div>
                    <div className="attack">3</div>
                </div>
            </div>
        </div>
      
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

export default Card