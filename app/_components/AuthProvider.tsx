"use client"

import { SessionProvider } from "next-auth/react"

const AuthProvider = ({ children }) => {
    return (
        // @ts-ignore
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthProvider