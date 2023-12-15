'use client';

import React from 'react';
import {useSession} from 'next-auth/react';
import { redirect } from 'next/navigation';

const page = () => {

  const {data:session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    }
  });

  return (
    <div>You are a client member! Hooray

      {session?.user?.role}
    </div>
   
  )
}

export default page