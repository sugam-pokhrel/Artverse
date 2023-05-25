import React from 'react'
import Upload from '../compos/Upload/Upload'
import { useSession } from "next-auth/react"
import Login from '../compos/Login/Login'

function upload() {
    const { data: session, status } = useSession()
    
   
    if (status === "loading") return <p>Loading...</p>
    if (status === "error") return <p>{error.message}</p>
    if (!session) {
        return (
            <Login />
        )
    }
    

    
    return (
        <div>
            <Upload title={session.user}  />
        </div>
    )
}

export default upload

