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
import { FaChevronDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import cardStyles from "@/app/_data/cardStyles.json"
import { FaSortAmountDownAlt } from "react-icons/fa";

{/* <Card index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} /> */}

const abortController = new AbortController();
const signal = abortController.signal;

const sortAttack = () => {
  // Sort Attack
  setCollection((collection) => {
    return collection.sort((a, b) => {
      return b.attack - a.attack
    })
  })
}

const sortDefence = () => {
  // Sort Defence
} 

const sortCost = () => {
  // Sort Cost
}

const sortContribution = () => {
  // Sort Contribution
}

const sortType = () => {
  // Sort Type
}

const sortAlteration = () => {
  // Sort Alteration
}

const types = ['All Types', 'Dragon', 'Demon', 'Faerie', 'Giant', 'Goblin', 'Owl', 'Phoenix', 'Unicorn', 'Vampire', 'Warewolf', 'Wizard', 'Zombie']; // Replace with your actual types
const alterations = ['All Alterations', 'Monochromatic', 'Fauvism', 'Pop Art', 'Ukiyo-e', 'Frost', 'Fire', 'Warrior', 'Evil', 'Voodoo', 'Golden', 'Necromancer', 'Fanged', 'Bugbear', 'Burglar', 'Druid', 'Oni', 'Magic', 'Yeti', 'Hecatoncheires', 'Ogre', 'Shapeshifter']
const sorts = [
  { name: 'Attack', method: sortAttack},
  { name: 'Defence', method: sortDefence},
  { name: 'Cost', method: sortCost},
  { name: 'Contribution', method: sortContribution},
  { name: 'Type', method: sortType},
  { name: 'Alteration', method: sortAlteration}
]
const Page = () => {

  const [collection, setCollection] = useState([]) as any[];

  const [creatingCard, setCreatingCard] = useState(false);
  const [templateData, setTemplateData] = useState({} as any);
  const [createCardData, setCreateCardData] = useState({} as any);

  const [typeFilter, setTypeFilter] = useState('');
  const [alterationFilter, setAlterationFilter] = useState('');
  const [sort, setSort] = useState('');

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
    // Get the sort from sorts with the name of sort

  }, [sort])


  useEffect(() => {

    initCardStyles();

    handleGetCollection(true)

  }, [session])


  useEffect(() => {
    if (createCardData.imageSrc){
      createCard()
    }
  }, [createCardData])


  return (
    <div className = 'collection__page'>

      {
        creatingCard ? (
          <CardCreator data = {templateData} setState = {setCreatingCard} setData = {setCreateCardData} />
        ) : (
        <>
            <div className="cardOptions">
              <button className={'fade-in fade-time-10 fade-delay-0'} onClick = {handleCreateCard}>Create Card</button>
              <button className={'fade-in fade-time-10 fade-delay-0'} onClick = {handleGetCollection}>Refresh</button>

              {/* // Type Filter */}
              <Select className={'fade-in fade-time-10 fade-delay-0 react-aria-Select'} selectedKey = {typeFilter} onSelectionChange={selected => setTypeFilter(selected)}>
                <Button className='react-aria-Button'>
                  <SelectValue >
                    {
                      typeFilter == '' ? (
                         <>
                         Type 
                         <FaFilter />
                         </>
                      ) : (
                        <>
                        {typeFilter}
                        <img src={`./types/icons/${typeFilter}.png`} width={'20px'} height={'20px'}/>
                        </>
                        )
                    }
                  </SelectValue>
                </Button>
                <Popover>
                  <ListBox>
                    {types.map(type => (
                      <ListBoxItem id={type} key={type} >
                        {type}
                        <img src={`./types/icons/${type}.png`}/>
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              {/* Alteration Filter */}
              <Select className={'fade-in fade-time-10 fade-delay-0 react-aria-Select'} selectedKey = {alterationFilter} onSelectionChange={selected => setAlterationFilter(selected)}>
                <Button>
                  <SelectValue >
                    {
                      alterationFilter == '' ? (
                         <>
                         Alteration 
                         <FaFilter />
                         </>
                      ) : (
                        <>
                        {alterationFilter}
                        {
                          (alterationFilter == 'All Alterations') ? (
                            <div style = {{background: 'white'
                             , width: '15px', height: '15px', borderRadius: '2px' }}></div>
                          ) : (
                            alterationFilter == 'Pop Art' ? (
                              <div style = {{background: `
                                linear-gradient(45deg, ${cardStyles[0]['Pop.Art']['gradient'][0]}, ${cardStyles[0]['Pop.Art']['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            ) :
                            (
                              <div style = {{background: `
                                linear-gradient(45deg, ${cardStyles[0][alterationFilter]['gradient'][0]}, ${cardStyles[0][alterationFilter]['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            )
                          )
                        }
                        </>
                        )
                    }
                  </SelectValue>
                </Button>
                <Popover>
                  <ListBox>
                    {alterations.map(alteration => (
                      <ListBoxItem id={alteration} key={alteration} >
                        {alteration}
                        {
                          (alteration == 'All Alterations') ? (
                            <div style = {{background: 'black'
                             , width: '15px', height: '15px', borderRadius: '2px' }}></div>
                          ) : (
                            alteration == 'Pop Art' ? (
                              <div style = {{background: `
                                linear-gradient(45deg, ${cardStyles[0]['Pop.Art']['gradient'][0]}, ${cardStyles[0]['Pop.Art']['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            ) :
                            (
                              <div style = {{background: `
                                linear-gradient(45deg, ${cardStyles[0][alteration]['gradient'][0]}, ${cardStyles[0][alteration]['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            )
                          )
                        }
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              <Select className={'fade-in fade-time-10 fade-delay-0  react-aria-Select'} selectedKey = {sort} onSelectionChange={selected => setSort(selected)}>
                <Button>
                  <SelectValue >
                    {
                      sort == '' ? (
                         <>
                         Sort By 
                         <FaSortAmountDownAlt />
                         </>
                      ) : (
                        <>
                        {sort}
                        {/* <img src={`./types/icons/${typeFilter}.png`}/> */}
                        </>
                        )
                    }
                  </SelectValue>
                </Button>
                <Popover>
                  <ListBox>
                    {sorts.map(sort => (
                      <ListBoxItem id={sort.name} key={sort.name} >
                        {sort.name}
                        {/* <img src={`./types/icons/${type}.png`}/> */}
                      </ListBoxItem>
                    ))}
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
                    if ((typeFilter == 'All Types' || card.type.toLowerCase().includes(typeFilter.toLowerCase())) 
                    && (alterationFilter == 'All Alterations' || card.alteration.toLowerCase().includes(alterationFilter.toLowerCase()))){
                      return (
                      <div key = {card._id}  className = "card-locality-collection">
                        
                        <Card attack={card.attack} defence={card.defence} index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} />
  
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