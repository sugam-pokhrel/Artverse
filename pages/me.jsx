import React from 'react'
import Home from '../compos/Me/Home'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

function me() {
    var session = useSession()
    var router = useRouter()
    var [loading, setLoading] = React.useState(true)
    var [auth, setAuth] = React.useState(false)
    React.useEffect(() => {
        if (session.status === 'loading') {
            return
        }
        if (session.status === 'authenticated') {
            setAuth(true)
            setLoading(false)
        } else {
            setAuth(false)
            setLoading(false)
        }
    }, [session.status])

    return (
        <div>
            <Head>
                <title>Me | ArtVerse</title>
                <meta name="description" content="Me | ArtVerse" />
            </Head>
            {(auth && !loading) ? <Home /> : <div className='h-screen w-full flex flex-col justify-center items-center'>
                <h2 >Login to view this Page</h2>
                <button className='btn btn-primary' onClick={() => router.push("/login")}>Login</button>
            </div>}
        </div>
    )
}

export default me