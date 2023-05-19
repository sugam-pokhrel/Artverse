import React, { useEffect } from 'react'
import Login from '../compos/Login/Login'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

function login() {
    var router = useRouter()
    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push('/')
            }
        })
    }, [])
    return (
        <Login />
    )
}

export default login