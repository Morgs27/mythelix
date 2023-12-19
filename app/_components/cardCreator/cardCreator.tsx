'use client'
import React, { useState, useEffect, useRef } from 'react'
import './cardCreator.scss'
import Image from 'next/image'
import initCardStyles from '../cardStylesInit'

const CardCreator = ({data, setState} : {data: any, setState: any}) => {

    const [stage, setStage] = useState(-1);
    const stageNames = ['type', 'image', 'stats', 'effect', 'name']

    const [cardData, setCardData] = useState({} as any);
    
    const [types, setTypes] = useState(data.randomTypes);
    const [statlines, setStatlines] = useState(data.randomStatlines);

    useEffect(() => {
        
        if (document.getElementsByClassName('cards__container_' + stage)[0]){
            document.getElementsByClassName('cards__container_' + stage)[0].classList.remove('hide');
        }

    }, [stage])
    

    useEffect(() => {

        fetch('https://storage.cloud.google.com/card-game-version-1/1692921602529.jpg')
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });

        // Pre Load all images
        // types.forEach((type: any) => {
        //     type.imageOptions.forEach((imageOption: any) => {
        //         const image = new Image();
        //         image.src = imageOption.photo;
        //     })
        // })

        initCardStyles();
        setStage(0);
        
    }, [])

    const handleClick = (e: any, data: any) => {

        if (stage == 0){

            const { type, alteration, index } = data;

            setCardData({...cardData, type, alteration, typeIndex: index});

            document.getElementsByClassName('cards__container_0')[0].classList.add('hide');
            document.getElementsByClassName('cards__container_0')[0].classList.add('away');

            setTimeout(() => {
                setStage(1);
            }, 1000);

        }
        
    }
    

    return (
        <div className = "card__creator">
            <div className = "title">Create Card</div>
            <div className="timeline"></div>
            <div className = "cards__container_0 hide">
            {
                (stage === 0) ? (
                    
                    types.map((item: any, index: number) => {
                        return ( 
                        <div onClick = {(e) => handleClick(e, {type: item.prompt, alteration: item.alterations, index})} className={`card ${item.alterations}`}>
                            <div className="top">
                                <div className='title'>{item.prompt}</div>
                                <div className = {'description'}>Contributes to {item.prompt} class</div>
                            </div>
                            <div className = {`icon ${item.alterations}`} style={{maskImage : `url(types/icons/${item.prompt}.png)`, WebkitMaskImage: `url(types/icons/${item.prompt}.png)` }}> </div>
                            { item.alterations !== 'null' ? (
                            <div className="bottom">
                                <div className = {'description'}>Unique Alteration</div>
                                <div className = {`alteration ${item.alterations}`}>{item.alterations == 'null' ? 'None': item.alterations}</div>
                            </div>
                            ): ''}
                        </div>
                        )
                    })
                    
                ) : null
            }
            </div>
            <div className = "cards__container_1 hide">
            {
                (stage === 1) ? (
                    
                    types[cardData.typeIndex].imageOptions.map((item: any, index: number) => {
                        return ( 
                            <div onClick = {(e) => handleClick(e, {index})} className={`card ${cardData.alteration}`}>
                                <Image className = 'background_image' width = {100} height= {100} src={item.photo} alt={'photo'}/>
                                {/* <img className = 'background_image' src = {item.photo}></img> */}
                            </div>
                        )
                    })

                ) : null
            }
            </div>
              
        </div>
    )
}

export default CardCreator