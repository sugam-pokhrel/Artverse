import React, { useEffect, useState } from 'react'
import Following from './Following'
import Explorecard from '../Explorecard'

function Index() {
    var [data, setData] = useState([])
    var [loading, setLoading] = useState(true)
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
    }, [])
    if (!loading && !!data && data.length == 0) {
        return null
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
                                <div className='f-card' onClick={() => getpostbyuser(user.email, user.name)} >
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
                        {((!userPost || userPost.length == 0) && !postLoad) && <h2 className='text text-2xl sm:text-3xl font-bold'>{uName} has not posted Anything yet.</h2>
                        }
                    </div>}
                </>}
            </div>
        )
    }
}

export default Index