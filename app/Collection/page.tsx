'use client'

import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import CardCreator from "../_components/cardCreator/cardCreator";
import './collection.scss'
import Card from '@/app/_components/card/Card'
import initCardStyles from "../_components/cardStylesInit";
import Loading from "../loading";
import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';


const abortController = new AbortController();
const signal = abortController.signal;

const Page = () => {

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
    if (signal){
      const response = await fetch("/api/cards/create/template");
      const data = await response.json();
      setCreatingCard(true);
      setTemplateData(data.data);
    }
  }

  const createCard = async () => {

    const response = await fetch("/api/cards/create/", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // @ts-ignore
      body: JSON.stringify({...createCardData, username: session?.user?.username})
    });

    const data = await response.json();

    handleGetCollection(false);

  }

  
  const handleGetCollection = async (refresh: any) => {

    // @ts-ignore
    if (!session || !session.user || !session.user.username) return;
    
    // @ts-ignore
    const response = await fetch("/api/cards/getCollection/" + session.user.username);

    const data = await response.json();

    setCollection(data.data);

  }


  useEffect(() => {

    initCardStyles();

    handleGetCollection(true)

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

              <Select>
                <Label>Favorite Animal</Label>
                <Button>
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox>
                    <ListBoxItem>Cat</ListBoxItem>
                    <ListBoxItem>Dog</ListBoxItem>
                    <ListBoxItem>Kangaroo</ListBoxItem>
                  </ListBox>
                </Popover>
              </Select>
            </div>

            <div className = 'cards_container customScroll'>
            {
              collection.length == 0 ? (
                <Loading></Loading>
              ) : (
                collection[0] == null ? (

                <>Could Not fine any cards. Create a new card here</>

                ) : (

                  collection.map((card: any, index: number) => {
                    if (card.type.toLowerCase().includes(typeFilter.toLowerCase())){
                      return (
                      <div key = {card._id}  className = "card-locality-collection">
                        
                        <Card index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} />
  
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

export default Page