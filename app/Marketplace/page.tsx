
'use client';

import React, {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import { redirect } from 'next/navigation';

const page = () => {

  const {data:session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    }
  });

  useEffect(() => {
    if (session){
        console.log(session.user.username)
    }
    else {
      console.log('no session')
    }
  }, [session])

  return (
    <div>You are a client member! Hooray

      {session?.user?.username}
    </div>
   
  )
}

export default page;