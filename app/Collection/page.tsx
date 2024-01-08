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
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import SpinLoader from "../_components/SpinLoader";
import { FaSortAmountUp } from "react-icons/fa";

{/* <Card index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} /> */}

const abortController = new AbortController();
const signal = abortController.signal;

const types = ['All Types', 'Dragon', 'Demon', 'Faerie', 'Giant', 'Goblin', 'Owl', 'Phoenix', 'Unicorn', 'Vampire', 'Warewolf', 'Wizard', 'Zombie']; // Replace with your actual types
const alterations = ['All Alterations', 'Monochromatic', 'Fauvism', 'Pop Art', 'Ukiyo-e', 'Frost', 'Fire', 'Warrior', 'Evil', 'Voodoo', 'Golden', 'Necromancer', 'Fanged', 'Bugbear', 'Burglar', 'Druid', 'Oni', 'Magic', 'Yeti', 'Hecatoncheires', 'Ogre', 'Shapeshifter']

const Page = () => {

  const [collection, setCollection] = useState([]) as any[];

  const [creatingCard, setCreatingCard] = useState(false);
  const [templateData, setTemplateData] = useState({} as any);
  const [createCardData, setCreateCardData] = useState({} as any);

  const [typeFilter, setTypeFilter] = useState('');
  const [alterationFilter, setAlterationFilter] = useState('');

  const [sort, setSort] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  var prevType = null
  var prevAlteration = null;

  const sorts = ['Attack', 'Defence', 'Cost', 'Contribution', 'Type', 'Alteration']

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

    if (sort != ''){
      sortCollection()
    }

  }

  const sortCollection = () => {
    setCollection((collection) => {
      return collection.slice().sort((a:any, b:any) => {
        const aValue = a[sort.toLowerCase()]
        const bValue = b[sort.toLowerCase()]

        if (sort == 'Type' || sort == 'Alteration') {
          if (aValue == 'null' && bValue == 'null') {
            return 0;
          } else if (aValue == 'null') {
            return 1; // Place null values at the end
          } else if (bValue == 'null') {
            return -1; // Place null values at the end
          } else {
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
        } else {
          if (sortOrder === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }

      })
    })
  }

  useEffect(() => {

    sortCollection()
      
  }, [sort, sortOrder])

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
              <Select className={'fade-in fade-time-10 fade-delay-0 react-aria-Select'} selectedKey = {typeFilter} onSelectionChange={selected => {
                  return setTypeFilter(String(selected));
                }}>
                <Button className='react-aria-Button'>
                  <SelectValue >
                    {
                      typeFilter == '' ? (
                         <>
                         Type 
                         <img src={`./types/icons/All Types.png`} width={'20px'} height={'20px'}/>
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
                        {/* {type} */}
                        <img src={`./types/icons/${type}.png`}/>
                        {type}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              {/* Alteration Filter */}
              <Select className={'fade-in fade-time-10 fade-delay-0 react-aria-Select'} selectedKey = {alterationFilter} onSelectionChange={selected => setAlterationFilter(String(selected))}>
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
                            // @ts-ignore
                            <div style = {{background: `linear-gradient(45deg, ${cardStyles[0]['Pop.Art']['gradient'][0]}, ${cardStyles[0]['Pop.Art']['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            ) :
                            (
                              // @ts-ignore
                              <div style = {{background: `linear-gradient(45deg, ${cardStyles[0][alterationFilter]['gradient'][0]}, ${cardStyles[0][alterationFilter]['gradient'][1]} )
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
                        
                        {
                          (alteration == 'All Alterations') ? (
                            <div style = {{background: 'white'
                             , width: '15px', height: '15px', borderRadius: '2px' }}></div>
                          ) : (
                            alteration == 'Pop Art' ? (
                               // @ts-ignore
                              <div style = {{background: `linear-gradient(45deg, ${cardStyles[0]['Pop.Art']['gradient'][0]}, ${cardStyles[0]['Pop.Art']['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            ) :
                            (
                              // @ts-ignore
                              <div style = {{background: `linear-gradient(45deg, ${cardStyles[0][alteration]['gradient'][0]}, ${cardStyles[0][alteration]['gradient'][1]} )
                              `, width: '15px', height: '15px', borderRadius: '2px' }}></div>
                            )
                          )
                        }
                        {alteration}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </Select>

              <Select className={'fade-in fade-time-10 fade-delay-0  react-aria-Select'} selectedKey = {sort} onSelectionChange={selected => setSort(String(selected))}>
                <Button>
                  <SelectValue >
                    {
                      sort == '' ? (
                         <>
                         Sort By 
                         
                         {sortOrder == 'desc' ? (
                          <FaSortAmountDown  />
                         ) : (
                          sortOrder == 'asc' ? (
                             <FaSortAmountUp/>
                          ) : (<></>)
                         )}
                         {/* <FaSortAmountDownAlt /> */}
                         </>
                      ) : (
                        <>
                        {sort}
                        {sortOrder == 'desc' ? (
                          <FaSortAmountDown  />
                         ) : (
                          sortOrder == 'asc' ? (
                             <FaSortAmountDownAlt/>
                          ) : (<></>)
                         )}
                        </>
                        )
                    }
                  </SelectValue>
                </Button>
                <Popover>

                  <div className = {`order-selector ${sort == '' ? 'not-active' : ''}`}>

                    <div className = 'order' onClick = {(e) => setSortOrder('desc')}>
                      <FaSortAmountDown  />
                    </div>
                    <div className = 'seperator'></div>
                    <div className = 'order' onClick = {(e) => setSortOrder('asc')}>
                      <FaSortAmountDownAlt/>
                    </div>
                  </div>
                  
                  <ListBox>
                    {sorts.map(sort => (
                      <ListBoxItem id={sort} key={sort} >
                        {sort}
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
                <SpinLoader/>
              ) : (
                collection[0] == null ? (

                <>Could Not fine any cards. Create a new card here</>

                ) : (

                  collection.map((card: any, index: number) => {
                    if ((typeFilter == 'All Types' || card.type.toLowerCase().includes(typeFilter.toLowerCase())) 
                    && (alterationFilter == 'All Alterations' || card.alteration.toLowerCase().includes(alterationFilter.toLowerCase()))){
                      
                      if (sort == 'Type'){

                        if ( prevType != card.type){

                          prevType = card.type

                          return (
                            <>
                            <div className = 'collection-break'>{card.type}</div>

                            <div key = {card._id}  className = "card-locality-collection">
                        
                            <Card attack={card.attack} defence={card.defence} index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} />
      
                            </div>
                            </>
                          )
                        }
                        prevType = card.type
                      }
                      else if (sort == 'Alteration'){
                        if ( prevAlteration != card.alteration){

                          prevAlteration = card.alteration

                          return (
                            <>
                            <div className = 'collection-break'>{card.alteration == 'null' ? 'None' : card.alteration}</div>

                            <div key = {card._id}  className = "card-locality-collection">
                        
                            <Card attack={card.attack} defence={card.defence} index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} />
      
                            </div>
                            </>
                          )
                        }
                        prevAlteration = card.alteration
                      }

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