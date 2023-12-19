'use client'

import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import CardCreator from "../_components/cardCreator/cardCreator";
import './collection.scss'

const page = () => {

  const [userData, setUserData] = useState({username: ''} as any);
  const [collection, setCollection] = useState([]) as any[];

  const [creatingCard, setCreatingCard] = useState(false);
  const [cardData, setCardData] = useState({} as any);

  const {data:session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    }
  });

  useEffect(() => {
    if (session){
      setUserData(session.user);
    }
  }, [session])

  const handleCreateCard = async () => {
      const response = await fetch("/api/cards/create");
      const data = await response.json();
      setCreatingCard(true);
      setCardData(data.data);
      console.log(data);
  }

  const handleGetCollection = async () => {
    const response = await fetch("/api/cards/getCollection/" + userData.username);
    const data = await response.json();
    setCollection(data);
    console.log(data);
  }

  return (
    <div className = 'collection__page'>

      {
        creatingCard ? (
          <CardCreator data = {cardData} setState = {setCreatingCard} />
        ) : (
        <>
            <button onClick = {handleGetCollection}>Get Collection</button>
            <button onClick = {handleCreateCard}>Create Card</button>
      
            {
              collection.map((card: any) => {
                return (
                  <div>
                    {card.name}
                  </div>
                )
              })
            }
        
        </>
        )
      }

    </div>
  )
}

export default page