'use client'

import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import CardCreator from "../_components/cardCreator/cardCreator";
import './collection.scss'
import Card from '@/app/_components/card/Card'
import initCardStyles from "../_components/cardStylesInit";

const page = () => {

  const [userData, setUserData] = useState({username: ''} as any);
  const [collection, setCollection] = useState([]) as any[];

  const [creatingCard, setCreatingCard] = useState(false);
  const [templateData, setTemplateData] = useState({} as any);
  const [createCardData, setCreateCardData] = useState({} as any);

  const [typeFilter, setTypeFilter] = useState('');

  const {data:session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    }
  });

  const handleCreateCard = async () => {
      const response = await fetch("/api/cards/create/template");
      const data = await response.json();
      setCreatingCard(true);
      setTemplateData(data.data);
      console.log(data);
  }

  const createCard = async () => {

    const response = await fetch("/api/cards/create/", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...createCardData, username: session?.user?.username})
    });

    const data = await response.json();

    handleGetCollection();

    console.log(data);
  }

  
  const handleGetCollection = async () => {

    if (!session || !session.user || !session.user.username) return;
    
    const response = await fetch("/api/cards/getCollection/" + session.user.username);
    const data = await response.json();
    console.log(data.data);
    setCollection(data.data);
  }

  useEffect(() => {

    if (!session || !session.user || !session.user.username) console.log('no user');

    initCardStyles();

    handleGetCollection()

  }, [session])


  useEffect(() => {
    if (createCardData.imageSrc){
      createCard()
    }
  }, [createCardData])

  const types = ['Dragon', 'Demon', 'Faerie', 'Giant', 'Goblin', 'Owl', 'Phoenix', 'Unicorn', 'Vampire', 'Warewolf', 'Wizard', 'Zombie']; // Replace with your actual types


  return (
    <div className = 'collection__page'>

      {
        creatingCard ? (
          <CardCreator data = {templateData} setState = {setCreatingCard} setData = {setCreateCardData} />
        ) : (
        <>
            <div className="cardOptions">
              <button onClick = {handleCreateCard}>Create Card</button>
              <button onClick = {handleGetCollection}>Refresh</button>
               {/* Add the select dropdown here */}
              <select className = 'dropdown-select' value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className = 'cards_container customScroll'>
            {
              collection.length == 0 ? (
              // <>No Cards Loaded</> 
              <></>
              ) : (
                collection[0] == null ? (

                <>No Cards</>

                ) : (

                  collection.map((card: any, index: number) => {
                    if (card.type.toLowerCase().includes(typeFilter.toLowerCase())){
                      return (
                      <div key = {card._id}  className = "card-locality-collection">
  
                        <Card effect={card.effect} name="Noctus" style={{ '--i': index }} cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} />
  
                      </div>
                      )
                    }
                    else {
                      return (<></>)
                    }
                  })

                )
                
              )
            }
            </div>
        </>
        )
      }

    </div>
  )
}

export default page