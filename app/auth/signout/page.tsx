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
        <div>
            <h1>Logout</h1>
            <p>Welcome, {session?.user?.name}!</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

