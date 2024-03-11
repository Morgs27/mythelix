'use client'

import React, { useState, useEffect, useRef } from 'react'
import './cardModal.scss'

const CardCreator = ({card, setCard} : {card: any, setCard: any}) => {

    const cardModalRef = useRef('cardModalRef');

    useEffect(() => {
        if (card != null){

            cardModalRef.current.innerHTML = "";

            let clone = card.cloneNode(true);

            clone.classList.add('ignore');
            // clone.parentElement = cardModalRef.current;

            cardModalRef.current.appendChild(clone);
        }
    }, [card])

    return (

        <div ref={cardModalRef} className={`cardModal ${card == null ? 'hide' : ''}`}>
            
        </div>
    )
}

export default CardCreator