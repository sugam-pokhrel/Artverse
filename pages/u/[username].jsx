import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Home from '../../compos/U/Home'
import UserHome from '../../compos/Me/Home'
import Head from 'next/head'

export async function getServerSideProps(context) {
    var username = null
    var newData = null
    try {
        username = await context.query.username
        // get username from email
        username = username.split('@')[0]
        await fetch(`https://artverses.vercel.app/api/users/getbyusername?username=${username}`)
            .then(res => res.json())
            .then(data => {
                newData = data
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
    return {
        props: {
            newData,
        }
    }
}


function Profile({ newData }) {
    var router = useRouter()
    var [username, setUsername] = React.useState(null)
    var [userFound, setUserFound] = React.useState(null)
    var [userData, setUserData] = React.useState(null)
    var [itsME, setItsME] = React.useState(false)
    var [loggedIn, setLoggedIn] = React.useState(false)
    var [newUdata, setNewUdata] = React.useState(newData.user[0])
    console.log(newData)
    useEffect(() => {
        if (router.query.username) {
            setUsername(router.query.username)
            fetchUser(router.query.username)
        }
    }, [router.query.username])
    var session = useSession()
    useEffect(() => {
        if (session.status === 'unauthenticated') {
            setLoggedIn(false)
        }
        if (session.status === 'authenticated') {
            setLoggedIn(true)
            if (router.query.username) {
                var getEmail = session.data.user.email
                var getUsername = getEmail.split('@')[0]
                if (getUsername === router.query.username) {
                    setItsME(true)
                }
            }
        }
    }, [session.status])


    function fetchUser(a) {

        fetch("/api/users/getbyusername?username=" + a)
            .then(res => res.json())
            .then(data => {
                var user = data.user
                if (user.length > 0) {
                    setUserFound(true)
                    setUserData(user[0])
                } else {
                    setUserFound(false)
                }
            }
            )
    }



    return (
        <div>
            <Head>
                <title>{newUdata.name}</title>
                <meta name="description" content={`Visit ${newUdata.name} on Artverse. `} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="title" content={`${newUdata.name} | Artverse`} />
                <meta name="description" content={`Visit ${newUdata.name} on Artverse`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={"http://artverses.vercel.app/portfolio/" + newUdata.name} />
                <meta property="og:title" content={`${newUdata.name} | Artverse `} />
                <meta property="og:description" content={`Visit ${newUdata.name} on Artverse`} />
                <meta property="og:image" content={(newUdata.image)} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={"http://artverses.vercel.app/portfolio/" + newUdata.name} />
                <meta property="twitter:title" content="Artverse - The Ultimate Platform for Creatives" />
                <meta property="twitter:description" content={`Visit ${newUdata.name} on Artverse`} />
                <meta property="twitter:image" content={(newUdata.image)}></meta>

            </Head>
            {(userFound === false) && <div className="explore-load">
                <h1>404 - Not Found</h1>
                <h2>No user with username <span className='text text-info'>{router.query?.username}</span> is found, please check and try again</h2>
            </div>}
            {(userFound === true) &&
                <div className="user">
                    {(itsME) ? <UserHome user={userData} /> :
                        <Home user={userData} />
                    }
                </div>
            }
        </div>
    )
}

export default Profile