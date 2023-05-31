import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Linkcard from '../../compos/linkify/Linkcard'

function Linkify() {
    var router = useRouter()
    var [link, setLink] = React.useState(null)
    var [user, setUser] = React.useState(null)
    var [valid, setValid] = React.useState(null)
    useEffect(() => {
        if (router.query.username) {
            fetchUser(router.query.username)
        }
    }, [router.query.username])



    function fetchUser(a) {
        var email = a + "@gmail.com"
        fetch("/api/users/getbyemail?email=" + email)
            .then(res => res.json())
            .then(data => {
                console.log(data.user[0])
                if (!!data.user[0]) {
                    // parse social
                    var parsed = JSON.parse(data.user[0].social)
                    setLink(parsed)
                    setUser(data.user[0])
                    setValid(true)
                } else {
                    setValid(false)
                }
            })
    }
    return (
        <div>
            {(valid === false) && <div className="explore-load">
                <h1>404 - Not Found</h1>
                <h2>No user with username <span className='text text-info'>{router.query?.username}</span> is found, please check and try again</h2>
            </div>}

            {(valid === true) && <Linkcard links={link} user={user} />}
        </div>
    )
}

export default Linkify