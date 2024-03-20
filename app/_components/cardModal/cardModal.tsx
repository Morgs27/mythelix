'use client'

import React, { useState, useEffect, useRef } from 'react'
import './cardModal.scss'

const CardCreator = ({card, setCard, session, setStatus} : {card: any, setCard: any, session: any, setStatus : any}) => {

    const cardModalRef = useRef<any>(null);
    const cardContainerRef = useRef<any>(null);

    console.log(card);

    let cardType = '';
    let cardAlteration = '';

    if (card != null){
        const innerCard = card.querySelector('.card');
        let classList = innerCard.classList.value.split(' ');

        classList = classList.filter((item) => {
            return item != ''
        })

        if( classList[1] == "Pop"){
            cardAlteration = "Pop Art";
            cardType = classList[3];
        }
        else{
            cardType = classList[2];
            cardAlteration = classList[1];
        }

    }

    const deleteCard = async () => {

        const response = await fetch("/api/cards/delete/", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            // @ts-ignore
            body: JSON.stringify({username: session.user.username, id: card.id})
        })
        .then((res) => res.json())
        .then((result) => {

            setStatus({message: "Card Deleted", type: "sucess", active: true});
            
            card.style.display = 'none';

            setCard(null);

        }); // meassage: "sucess"
      
    }

    useEffect(() => {
        if (card != null && cardModalRef != null){

            let clone = card.cloneNode(true);

            cardContainerRef.current.innerHTML = "";

            clone.classList.add('ignore');
        
            // @ts-ignore
            cardContainerRef.current.appendChild(clone);
        }
    }, [card])

    return (

        <div ref={cardModalRef} className={`cardModal ${cardType} ${cardAlteration} ${card == null ? 'hide' : ''}`}>
            <div className='modalOverlay'></div>
            <div className='background'></div>
            <div ref={cardContainerRef} className = 'cardContainer'>
               
            </div>
            <div className='cardDetails'>
                <div className = 'top'>
                    <div className='text'>
                        <div className = 'cardType'>{cardType}</div>
                        <div className = 'cardAlteration'>{cardAlteration == 'null' ? 'No Alteration' : cardAlteration}</div>
                    </div>
                    <img src={`/types/icons/${cardType}.png`} alt={cardType} />
                </div>
                <div className = 'desctiption'>
                    Lorem   ipsum   dolor   sit   amet,   consectetur   adipiscing   elit.   Sed   do   eiusmod   tempor   incididunt   ut   labore   et   dolore   magna   aliqua.   Ut   enim   ad   minim   veniam,   quis   nostrud   exercitation   ullamco   laboris   nisi   ut   aliquip   ex   ea   commodo   consequat.   Duis   aute   irure   dolor   in   reprehenderit   in   voluptate   velit   esse   cillum   dolore   eu   fugiat   nulla   pariatur.   Excepteur   sint   occaecat   cupidatat   non   proident,   sunt   in   culpa   qui   officia   deserunt   mollit   anim   id   est   laborum.
                </div>
                <div className = 'bottom'>
                    <button className='deleteCard' onClick={() => deleteCard()}>Sell Card</button>
                    <button className='deleteCard' onClick={() => deleteCard()}>Delete Card</button>
                </div>
            </div>
        </div>
    )
}

export default CardCreator
