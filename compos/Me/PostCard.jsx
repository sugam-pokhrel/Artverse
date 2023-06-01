import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/router'

function Postcard({ post }) {
    var [user, setUser] = useState({})
    var [verifiedUser, setVerifiedUser] = useState(true)
    var [time, setTime] = useState('')
    var [loading, setLoading] = useState(true)
    var router = useRouter()
    function getUser() {
        fetch("/api/users/getbyemail?email=" + post.createdBy)
            .then(res => res.json())
            .then(data => {
                setUser(data?.user[0])
                if (data?.user[0] == undefined) {
                    setVerifiedUser(false)
                }
                setLoading(false)

            })
    }
    function checkTime() {
        dayjs.extend(relativeTime)
        var time = dayjs(post.$createdAt).fromNow()
        setTime(time)
    }
    useEffect(() => {
        getUser()
        checkTime()
    }, [])
    function navtoPost() {
        router.push(`/p/${post.$id}`)
    }

    return (

        <div className="card bg-base-100 exploreCard" onClick={navtoPost}>
            {loading ? <div className="ec-load-img"></div> :
                <img className='ec-img' src={post.image} alt="" />
            }
            {loading ? <div className="ec-load-title">
                <div className="ec-load-title-1"></div>
                <div className="ec-load-title-2"></div>
            </div> :
                <div className="ec-info">
                    <div className="ec-user">
                        <img src={user.image} alt="" referrerPolicy='no-referrer' />
                        <p>{user.name}</p>
                    </div>
                    <div className="ec-posted">
                        <p>{time}</p>
                    </div>
                </div>
            }
        </div>

    )
}

export default Postcard