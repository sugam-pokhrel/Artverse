import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiOutlineEye } from 'react-icons/ai'
import { FiThumbsUp } from 'react-icons/fi'
import { useRouter } from 'next/router'

function PostCard({ data }) {
    var [user, setUser] = useState({})
    var router = useRouter()
    // short the description
    if (data.desc.length > 100) {
        data.desc = data.desc.slice(0, 100) + '...'
    }

    function getUser() {
        fetch('/api/users/getbyemail?email=' + data.createdBy)
            .then(res => res.json())
            .then(data => {
                console.log(data.user[0])
                setUser(data.user[0])
            })
    }
    var [posted, setPosted] = useState('')

    function getTime() {
        dayjs.extend(relativeTime)
        setPosted(dayjs(data.$createdAt).fromNow())
    }
    useEffect(() => {
        getUser()
        getTime()
    }, [])

    function gotouser() {
        var email = data.createdBy
        // split to make username
        var username = email.split('@')[0]
        router.push('/u/' + username)
    }
    function navtopost() {
        router.push('/p/' + data.$id)
    }
    return (
        <div className='post-card'>

            <div className='post-card-info'>
                <div className='post-card-title'>
                    <h1 onClick={navtopost} className='text md:text-2xl text-xl  font-bold'>{data.title}</h1>
                </div>
                <div className='post-card-desc'>
                    <p>{data.desc}</p>
                </div>

                <div className="pi-top">
                    <img src={user.image} alt={user.name} referrerPolicy='no-referrer' />
                    <p><span onClick={gotouser}>{user.name}</span> . {posted}</p>
                </div>
                <div className="pi-top">
                    <p><AiOutlineEye /> . {data.views}</p>
                    <p><FiThumbsUp /> . {data?.likes?.length}</p>
                </div>
            </div>
            <div className='post-card-img' onClick={navtopost}>
                <img src={data.image} alt={data.title} />
            </div>
        </div>
    )
}

export default PostCard