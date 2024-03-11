'use client'

import React, { useState, useEffect, useRef } from 'react'
import './cardModal.scss'

const CardCreator = ({card, setCard, session} : {card: any, setCard: any, session: any}) => {

    const cardModalRef = useRef<any>(null);

    const deleteCard = async () => {

        console.log(card);

        const response = await fetch("/api/cards/delete/", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            // @ts-ignore
            body: JSON.stringify({username: session.user.username, id: card.id})
        })
        .then((res) => res.json())
        .then((result) => console.log(result)); // meassage: "sucess"
      
    }

    useEffect(() => {
        if (card != null && cardModalRef != null){

            // @ts-ignore
            // cardModalRef.current.innerHTML = "";

            let clone = card.cloneNode(true);

            clone.classList.add('ignore');
        
            // @ts-ignore
            cardModalRef.current.appendChild(clone);
        }
    }, [card])

    return (

        <div ref={cardModalRef} className={`cardModal ${card == null ? 'hide' : ''}`}>
            <div className='cardOptions'>
                <button className='deleteCard' onClick={() => deleteCard()}>Delete Card</button>
            </div>
        </div>
    )
}

export default CardCreator