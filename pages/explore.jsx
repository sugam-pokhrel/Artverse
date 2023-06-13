import React, { useEffect, useState } from 'react'
import Explorepage from '../compos/Explore/Explorepage'
import Head from 'next/head'
import Home from '../compos/Explore/Home'
import { useSession } from 'next-auth/react'
import Index from '../compos/Explore/loggedIn/Index'

function explore() {
    const [data, setData] = useState([])
    var [auth, setAuth] = useState(false)
    var session = useSession()
    useEffect(() => {
        if (session.status === 'authenticated') {
            setAuth(true)
        }
    }, [session])
    function getPosts() {
        fetch("/api/post")
            .then(res => res.json())
            .then(data => {
                console.log(data.documents)
                setData(data.documents)
            })
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className='Explore'>
            <Head>
                <title>Explore | ArtVerse</title>
                <meta name="description" content="Explore ArtVerse, see the letest projects that has been uploaded to artverse Recently" />
            </Head>
            <Home />
            {auth && <Index />}
            <Explorepage />
        </div>
    )
}

export default explore