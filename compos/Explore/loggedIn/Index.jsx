import React, { useEffect, useState } from 'react'
import Following from './Following'
import Explorecard from '../Explorecard'
import TalentCard from '../TalentCard'
import { useRouter } from 'next/router'

function Index() {
    var [data, setData] = useState([])
    var [loading, setLoading] = useState(true)
    var router = useRouter()
    function getFollowers() {
        fetch('/api/users/getfollowing')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 200) {
                    setData(data.followings)

                }
                setLoading(false)
            })
    }
    var [userPost, setUserPost] = useState([])
    var [uName, setUname] = useState('')
    var [postLoad, setPostLoad] = useState(false)
    var [postClick, setPostClick] = useState(false)

    function getpostbyuser(e, name) {
        setPostClick(true)
        setPostLoad(true)
        setUname(name)
        fetch("/api/post/getpostbyEmail?email=" + e)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserPost(data.post)
                setPostLoad(false)
            })
    }
    useEffect(() => {
        getFollowers()
        getTalents()
    }, [])
    var [followUser, setFollowUser] = useState([])

    function getTalents() {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                // sort by highest followers to lowest
                var users = data.users
                users.sort(function (a, b) {
                    var nameA = a.followers.length; // ignore upper and lowercase
                    var nameB = b.followers.length; // ignore upper and lowercase
                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }

                    // names must be equal
                    return 0;
                }
                )
                setFollowUser(users)
            })
    }
    if (!loading && !!data && data.length == 0) {
        return (
            <div className='exp-follow'>
                <h2 className='text sm:text-3xl text-xl font-bold'>
                    Follow these amazing Artists
                </h2>
                <div className="exp-followings">
                    {(!!followUser && followUser.length > 0) && (
                        followUser.slice(0, 5).map((user, index) => {
                            return (
                                <TalentCard user={user} key={index} />
                            )
                        })
                    )}
                    <div className='t-card more-card flex flex-col gap-5' >
                        <h2 className='text text-xl font-bold'>See More</h2>
                        <div className="btn btn-primary" onClick={() => router.push("/talents")}>Visit</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='exp-follow'>
                <h2 className='text sm:text-3xl text-xl font-bold'>
                    People you follow
                </h2>
                <div className="exp-followings">
                    {(!!data && data.length > 0) && (
                        data.map((user, index) => {
                            return (
                                <div className='f-card' onClick={() => getpostbyuser(user.email, user.name)} key={index} >
                                    {(!!user.image) && <img src={user.image} referrerPolicy='no-referrer' alt='User Image' />}
                                </div>
                            )
                        })
                    )}
                </div>
                {(postClick) && <>
                    {((userPost || userPost.length !== 0) && !postLoad) && <div className="getPErsonPost py-10 flex  flex-col gap-5">
                        <h2 className='text text-2xl sm:text-3xl font-bold'>Posts By {uName}</h2>
                        {(!!userPost && userPost.length > 0) &&
                            (
                                <div className='pcards'>
                                    {userPost.map((post, index) => {
                                        return (

                                            <Explorecard post={post} key={index} />

                                        )
                                    })}
                                </div>
                            )}
                        {((!userPost || userPost.length == 0) && !postLoad) && <h2 className='text text-2xl sm:text-2xl '>{uName} has not posted Anything yet.</h2>
                        }
                    </div>}
                </>}
            </div>
        )
    }
}

export default Index