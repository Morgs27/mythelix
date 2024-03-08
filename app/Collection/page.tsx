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
import {SearchField , Input} from 'react-aria-components';
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdClear } from "react-icons/md";

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

  const [search,setSearch] = useState('');

  var prevType : null | any = null
  var prevAlteration : null | any = null;

  const sorts = ['Attack', 'Defence', 'Cost', 'Contribution', 'Type', 'Alteration']

  const {data:session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    }
  });

  const handleCreateCard = async () => {
    if (signal){
      const {signal} = new AbortController();
      const response = await fetch("/api/cards/create/template", {cache: 'no-store', signal});
      const data = await response.json();
      if (data == undefined || data == null || data == ''){
        console.log('Error Geting Template');
      }
      else {
        setCreatingCard(true);
        setTemplateData(data.data);
      }
    }
  }

  const createCard = async () => {

    const response = await fetch("/api/cards/create/", {
      method: 'POST', 
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
    const response = await fetch("/api/cards/getCollection/" + session.user.username, {cache: 'no-store'});

    const data = await response.json();

    console.log(data)

    setCollection(data.data);

    if (sort != ''){
      sortCollection()
    }

  }

  const sortCollection = () => {
    setCollection((collection: any) => {
      return collection.slice().sort((a:any, b:any) => {

        if (sort == ''){
          console.log('sorting nothing', a.createdAt, b.createdAt);

          const aDate  : any = new Date(a.createdAt)
          const bDate : any = new Date(b.createdAt)

          if (sortOrder === 'asc'){
            return aDate - bDate;
          }
          else {
            return bDate - aDate;
          }
        }

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

  const handleClear = () =>{
    setSearch('')
    setAlterationFilter('');
    setTypeFilter('');
    setSort('');
    setSortOrder('desc');
  }

  const fadeElements = () => {
    var fade_elements = document.querySelectorAll('.fade-in-normal');
    fade_elements.forEach((element) => {
      element.classList.add('fade-in-normal-active')
    })
  }

  let searchTimeout : any;

  const handleSearch = (e: any) => {

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {

      setSearch(e.target.value);
      console.log('Here')

    }, 1000)
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

    fadeElements();
    
  }, [createCardData])

  useEffect(() => {

    fadeElements();
    
  }, [])


  return (
    <div className = 'collection__page'>

      {
        creatingCard ? (
          <CardCreator data = {templateData} setState = {setCreatingCard} setData = {setCreateCardData} />
        ) : (
        <>
            <div className="cardOptions">
    
          

              {/* Search Filter */}
              <div className = 'searchFilter fade-in-normal'> 
                <input placeholder = "Search" onChange = {(e) => handleSearch(e)} />
                <div className='searchIcon'>
                  <FaSearch />
                </div>
              </div>

              {/* // Type Filter */}
              <Select className={'fade-in-normal react-aria-Select'} selectedKey = {typeFilter} onSelectionChange={selected => {
                  return setTypeFilter(String(selected));
                }}>
                <Button aria-label="Filter" className='react-aria-Button'>
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
              <Select className={'fade-in-normal react-aria-Select'} selectedKey = {alterationFilter} onSelectionChange={selected => setAlterationFilter(String(selected))}>
                <Button aria-label="Filter">
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

              {/* Order By  */}
              <Select className={'fade-in-normal  react-aria-Select'} selectedKey = {sort} onSelectionChange={selected => setSort(String(selected))}>
                <Button aria-label="Sort">
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


              <button aria-label="clear-filter" onClick={() => {handleClear()}} className = {`filterClear ${(search != '' || typeFilter != '' || alterationFilter != '' || sort != '' || sortOrder != 'desc') ? 'show' : ''}`}>
                <MdClear />
              </button>
              
              <div className = 'flex-seperator'></div>



              <button aria-label='create-card' className={'fade-in-normal'} onClick = {handleCreateCard}>Create Card</button>
              {/* <button className={'fade-in-normal'} onClick = {handleGetCollection}>Refresh</button> */}

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
                    if ((typeFilter == 'All Types' 
                    || card.type.toLowerCase().includes(typeFilter.toLowerCase())) 
                    && (alterationFilter == 'All Alterations' 
                    || card.alteration.toLowerCase().includes(alterationFilter.toLowerCase())
                    && (search == '' || 
                    (card.alteration.toLowerCase().includes(search.toLowerCase()) 
                    || card.type.toLowerCase().includes(search.toLowerCase())
                    || card.effect.toLowerCase().includes(search.toLowerCase())
                    ))
                    )){
                      
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