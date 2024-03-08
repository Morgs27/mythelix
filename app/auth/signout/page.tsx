'use client'

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignOutPage() {

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
          redirect("/api/auth/signin?callbackUrl=/ClientMember")
        }
    });

    const handleSignOut = async () => {
        await signOut({ callbackUrl: 'http://localhost:3000/'});
    };

    console.log(session)

    if (session == null) {
        return <div>You are already signed out.</div>;
    }

    return (
        <div className='logout'>
            <h1>Sign Out</h1>
            <p>Are you sure you would like to log out of {session.user.username}?</p>
            <button onClick={handleSignOut}>Log Out</button>
        </div>
    );
}

