import React, { useEffect } from 'react'
import Login from '../compos/Login/Login'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import {useSession} from "next-auth/react"


function login() {

    var router = useRouter()
    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                console.log(session.data)






                
            }
        })

    }, [])
    return (
        <Login />
    )
}

export default login