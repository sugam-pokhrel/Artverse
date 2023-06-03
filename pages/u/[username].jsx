import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Home from '../../compos/U/Home'
import UserHome from '../../compos/Me/Home'


function Profile() {
    var router = useRouter()
    var [username, setUsername] = React.useState(null)
    var [userFound, setUserFound] = React.useState(null)
    var [userData, setUserData] = React.useState(null)
    var [itsME, setItsME] = React.useState(false)
    var [loggedIn, setLoggedIn] = React.useState(false)
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