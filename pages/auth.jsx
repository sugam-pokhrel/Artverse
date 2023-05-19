import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '../compos/Login/Login'

function auth() {
    const { data: session, status } = useSession()
    if (status === "loading") return <p>Loading...</p>
    if (status === "error") return <p>{error.message}</p>
    if (!session) {
        return (
            <Login />
        )
    }
    else {
        return (
            <div>Logged In</div>
        )
    }
}

export default auth