'use client'

import './card.scss'
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';

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

    const [overlayLoaded, setOverlayLoaded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const [imagesLoaded, setImagesLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
        console.log('image loaded: ' , imageSrc)
    }

    const handleOverlayLoaded = () => {
        setOverlayLoaded(true);
        console.log('overlay loaded')
    }

    useEffect(() => {
        if (imageLoaded && overlayLoaded){
            setImagesLoaded(true);
            console.log('both loaded')
        }
        else{
            setImagesLoaded(false);
        }
    }, [overlayLoaded, imageLoaded, imageSrc])

    return(
        <>
        <div className="placeholder">
            <div className = "activity"></div>
        </div>
        <div className={`card ${special} ${type} ${imagesLoaded ? '': 'loading'}`} ref={card}>

           
            <div className="border"></div>
            <img onLoad={handleImageLoaded}  alt = 'Image Failed Loading' className = "image" src = {imageSrc} />
            <img onLoad={handleOverlayLoaded}  alt = "" className= 'imageOverlay' src = {'/card-design.png'}/>

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