'use client'

import { useEffect, useState } from "react";
import useAddObservers from "./_hooks/useAddObservers";
import Card from "./_components/card/Card";
import { Link } from "react-aria-components";
import SubscribeModal from "./_components/subscribeModal/SubscribeModal";


export default function Home() {

  const addObservers = useAddObservers();

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    addObservers();
    checkImagesLoaded()
    // if (!imagesLoaded){

    //   setTimeout(() => checkImagesLoaded, 1000)
    // }
  }, []);


  const checkImagesLoaded = () => {
    const loading_cards = document.getElementsByClassName('loading')
    Array.from(loading_cards).forEach((card: Element) => card.classList.remove('loading'))
  }


  return (
    <div className="home">
      <div className="row">
        <div className="cardContainer card-locality-collection">

          <Card imageSrc="https://storage.googleapis.com/card-game-version-1/1692921920215.jpg" name="Card 1" special="Druid" type="Wizard" contribution={3} cost={6} effect="Summon a creature with 1 attack and 1 defense." attack={7} defence={1} index={0} animate={true} />
        </div>
        <div className="column right">
          <h1> A Digital Bestiary </h1>
          <p> Dive into a world of Ai-crafted artistry and stragegy! </p>
          <p> Unleash your inner tactician in a card game like no other. </p>
          <p> Every card is a unique masterpiece, each hand a digital work of art.  </p>
          <Link href='/Collection'>Your Collection {'>>'}</Link>
        </div>
      </div>

      <div className="row reverse">
        <div className="cardContainer reverse-rotate card-locality-collection">

          <Card imageSrc="https://storage.googleapis.com/card-game-version-1/1692920955991.jpg" name="Card 1" special="Magic" type="Owl" contribution={3} cost={6} effect="Increase your spell card effects by 1 for 1 turn." attack={7} defence={1} index={0} animate={true} />
        </div>
        <div className="column">
          <h1> More Awaits... </h1> 
          <p> This is just the beginning! </p> 
          <p> Soon, your cards will power an immersive game experience. </p> 
          <p> Prepare for epic battles and unlock new realms in the next evolution of this digital universe! </p>    
          <a onClick={() => setShowModal(true)}>Subscribe for updates {'>>'}</a>
        </div>
      </div>
      
      {showModal && <SubscribeModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
