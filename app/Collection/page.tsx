'use client'

import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState, useRef } from "react";
import CardCreator from "../_components/cardCreator/cardCreator";
import './collection.scss'
import Card from '@/app/_components/card/Card'
import initCardStyles from "../_components/cardStylesInit";
import {Button, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import { FaFilter } from "react-icons/fa";
import cardStyles from "@/app/_data/cardStyles.json"
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import SpinLoader from "../_components/SpinLoader";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import CardModal from "../_components/cardModal/cardModal";
import CardInterface from "@/app/_interfaces/Card";
import UserInterface from "@/app/_interfaces/User";
import CardTemplateInterface from "@/app/_interfaces/CardTemplate"
import Status from "../_components/status/status"

const abortController = new AbortController();
const signal = abortController.signal;

const types: string[] = ['All Types', 'Dragon', 'Demon', 'Faerie', 'Giant', 'Goblin', 'Owl', 'Phoenix', 'Unicorn', 'Vampire', 'Warewolf', 'Wizard', 'Zombie']; // Replace with your actual types
const alterations: string[] = ['All Alterations', 'Monochromatic', 'Fauvism', 'Pop Art', 'Ukiyo-e', 'Frost', 'Fire', 'Warrior', 'Evil', 'Voodoo', 'Golden', 'Necromancer', 'Fanged', 'Bugbear', 'Burglar', 'Druid', 'Oni', 'Magic', 'Yeti', 'Hecatoncheires', 'Ogre', 'Shapeshifter']

const Page = () => {

  const [collection, setCollection] = useState<CardInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [creatingCard, setCreatingCard] = useState<boolean>(false);
  const [templateData, setTemplateData] = useState<CardTemplateInterface | {}>({});
  const [createCardData, setCreateCardData] = useState<any>({});

  const [typeFilter, setTypeFilter] = useState<string>('');
  const [alterationFilter, setAlterationFilter] = useState<string>('');

  const [sort, setSort] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // 'asc' or 'desc'

  const [search,setSearch] = useState('');
  const searchInput = useRef();

  const cardsContainer = useRef();

  const [cardModal, setCardModal] = useState<any>(null);

  const [status, setStatus] = useState({message: '', type: '', active: false})

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
      const response = await fetch("/api/cards/template", {cache: 'no-store', signal});
      const data = await response.json();
      if (data == undefined || data == null || data == ''){
        console.log('Error Geting Template');
      }
      else {

        setCreatingCard(true);
        setTemplateData(data.data);
        handleClear();
        setLoading(true);
      }
    }
  }

  const createCard = async () => {

    setLoading(true);

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

    setTimeout(() => {
      
      setLoading(false);
  
      setStatus({message: 'Card Created', type: 'sucess', active: true})

    }, 500);


  }

  
  const handleGetCollection = async (refresh: any) => {

    // setStatus({message: 'Collection Fetched', type: 'sucess', active: true})

    // @ts-ignore
    if (!session || !session.user || !session.user.username) return;
    
    // @ts-ignore
    const response = await fetch("/api/cards/getCollection/" + session.user.username, {cache: 'no-store'});

    const data = await response.json();

    console.log(data.data)

    setCollection(data.data);

    if (sort != ''){
      sortCollection()
    }

  }

  const checkCardsExist = () => {
    if (cardsContainer.current){
      if (cardsContainer.current.innerHTML == ''){
        setStatus(({message: `No cards matching "${search}"`, type: 'error', active: true}))
      }
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

    setTimeout(() => {
      setLoading(false);
    }, 200)
  }

  const handleClear = () =>{
    setSearch('')
    if (searchInput.current){
          searchInput.current.value = '';
    }
    setAlterationFilter('');
    setTypeFilter('');
    setSort('');
    setSortOrder('desc');

    setTimeout(() => {
      setLoading(false);
    },200)
  }

  const fadeElements = () => {
    var fade_elements = document.querySelectorAll('.fade-in-normal');
    fade_elements.forEach((element) => {
      element.classList.add('fade-in-normal-active')
    })
  }

  useEffect(() => {
    checkCardsExist();
  }, [search, typeFilter, alterationFilter, sort, sortOrder, collection])

  let searchTimeout : any;

  const handleSearch = (e: any) => {

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {

      setSearch(e.target.value);
      setLoading(false);

    }, 2000)
  }

  const handleCardsClick = (e: any) => {

    let list = e.target.classList;

    if (list.contains('cards_container')){
      
      setCardModal(null);
      
    }

    if (list.contains('glow')){
      let card = e.target.parentElement.parentElement;
      setCardModal(card)
    }
    
  }

  useEffect(() => {

    setLoading(true);

    sortCollection()
      
  }, [sort, sortOrder])

  useEffect(() => {

    initCardStyles();

    handleGetCollection(true)

  }, [session])

  useEffect(() => {

    handleGetCollection(true);

  }, [cardModal])


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

      {/* Status Message */}
      <Status setState={setStatus} message={status.message} active={status.active} type={status.type}/>

      {/* Card Modal */}
      <CardModal setStatus={setStatus} session={session} card = {cardModal} setCard = {setCardModal}></CardModal>

      {
        creatingCard ? (
          <CardCreator data = {templateData} setState = {setCreatingCard} setData = {setCreateCardData} />
        ) : (
        <>
            <div className="cardOptions">
    
          

              {/* Search Filter */}
              <div className = 'searchFilter fade-in-normal'> 
                <input placeholder = "Search" ref={searchInput} onChange = {(e) => {
                  setLoading(true);
                  handleSearch(e)
                }
                } />
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
              <Select aria-label="select" className={'fade-in-normal react-aria-Select'} selectedKey = {alterationFilter} onSelectionChange={selected => setAlterationFilter(String(selected))}>
                <Button aria-label="Filter">
                  <SelectValue aria-label="value" >
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
              <Select className={'fade-in-normal  react-aria-Select'} selectedKey = {sort} onSelectionChange={selected => {
                setLoading(true);
                setSort(String(selected))
              }
              }>
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


              <button aria-label="clear-filter" onClick={() => {setLoading(true);handleClear()}} className = {`filterClear ${(search != '' || typeFilter != '' || alterationFilter != '' || sort != '' || sortOrder != 'desc') ? 'show' : ''}`}>
                <MdClear />
              </button>
              
              <div className = 'flex-seperator'></div>



              <button aria-label='create-card' className={'fade-in-normal'} onClick = {() => {setLoading(true);handleCreateCard()}}>Create Card</button>
              {/* <button className={'fade-in-normal'} onClick = {handleGetCollection}>Refresh</button> */}

            </div>

            <div onClick={(e) => {handleCardsClick(e)}} ref={cardsContainer} className = {`cards_container customScroll ${cardModal == null ? '' : 'modal-active'}`}>


            {
              (collection.length == 0 | loading) ? (
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
                            <div className = {`collection-break ${card.type}`}>
                              <img src={`/types/icons/${card.type}.png`} alt={card.type} />
                            </div>

                            <div id={card._id}  key = {card._id}  className = "card-locality-collection">
                        
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
                            <div className = {`collection-break ${card.alteration}`}>{card.alteration == 'null' ? 'None' : card.alteration}</div>

                            <div id={card._id}  key = {card._id}  className = "card-locality-collection">
                        
                            <Card attack={card.attack} defence={card.defence} index={index} effect={card.effect} name="Noctus" cost={card.cost} contribution={card.contribution} imageSrc={card.imageSrc} type={card.type} special={card.alteration} />
      
                            </div>
                            </>
                          )
                        }
                        prevAlteration = card.alteration
                      }

                      return (

                      <div id={card._id} key = {card._id}  className = "card-locality-collection">
                        
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
