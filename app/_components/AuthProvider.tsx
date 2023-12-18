"use client"

import { SessionProvider } from "next-auth/react"

// CLient side auth
const AuthProvider = ({ children }: {children: any}) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthProvider