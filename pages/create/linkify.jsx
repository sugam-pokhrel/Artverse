import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Linkcard from '../../compos/linkify/Linkcard'

function linkify() {
    var session = useSession()
    var router = useRouter()
    var [loading, setLoading] = React.useState(true)
    var [userSocials, setUserSocials] = React.useState(null)
    var [user, setUser] = React.useState(null)
    var [valid, setValid] = React.useState(false)

    useEffect(() => {

        if (session.status === 'authenticated') {
            setLoading(false)
        }
        if (session.status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session.status])

    function fetchUser() {
        fetch("/api/users/getloggedin")
            .then(res => res.json())
            .then(data => {

                if (!!data.user[0].social) {

                    var parsed = JSON.parse(data.user[0].social)
                    setUserSocials(parsed)

                }

                setUser(data.user[0])
            })
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div>
            {(loading) && <div className="explore-load">
                <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
            </div>}
            <Linkcard links={userSocials} user={user} />
        </div>
    )
}

export default linkify