import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function TalentCard({ data }) {
    var [auth, setAuth] = useState(false)
    var session = useSession()
    var router = useRouter()
    useEffect(() => {
        if (session.status === 'authenticated') {
            setAuth(true)
        }
    }, [session])

    var [length, setLength] = useState(0)
    function getPosts() {
        fetch('/api/post/getpostbyEmail?email=' + data.email)
            .then(res => res.json())
            .then(data => {
                setLength(data.post.length)
            })
    }
    useEffect(() => {
        getPosts()
    }, [])

    function navtouser() {
        // slice email and make username
        var email = data.email
        var username = email.slice(0, email.indexOf('@'))
        router.push('/u/' + username)
    }

    return (
        <div className='talent-card'>
            <div className="tc-data">
                <div className="tc-img">
                    <img src={data.image} onClick={navtouser} alt={data.name} referrerPolicy='no-referrer' />
                </div>
                <div className="tc-name">
                    <p className='text-2xl font-bold' onClick={navtouser}>{data.name}</p>
                    <p className='text-xl'>{data?.profession || "Student"} . {data?.followers.length} Followers</p>
                    <p className='text-xl'>{length} Projects . 0 Blogs</p>
                </div>
            </div>
            <div className="tc-fc">
                {(auth) && <div className="fc-btn btn btn-primary">Follow</div>}
                <div className="fc-btn btn btn-warning" onClick={navtouser}>Visit Profile</div>
            </div>
        </div>
    )
}

export default TalentCard