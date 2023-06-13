import React, { useEffect, useState } from 'react'
import Explorecard from './Explorecard'
import Link from 'next/link'

function Postedbyfollowings() {
    var [postData, setPostData] = useState([])
    var [loading, setLoading] = useState(true)
    function getFollowers() {
        var posted = []
        var merged = []
        fetch('/api/users/getfollowing')
            .then(res => res.json())
            .then(data => {
                if (data.status == 200) {
                    if (data.followings.length == 0) {
                        setLoading(false)
                    }
                    var following = data.followings
                    following.map((user, index) => {
                        fetch("/api/post/getpostbyEmail?email=" + user.email)
                            .then(res => res.json())
                            .then(data => {
                                var posts = data.post
                                if (posts.length > 0) {
                                    posted.push(data.post)
                                }
                                // merge arrays
                                merged = posted.flat();
                                //    sort merged according to $createdBy
                                merged.sort(function (a, b) {
                                    var nameA = a.$createdAt; // ignore upper and lowercase
                                    var nameB = b.$createdAt; // ignore upper and lowercase
                                    if (nameA < nameB) {
                                        return -1;
                                    }
                                    if (nameA > nameB) {
                                        return 1;
                                    }

                                    // names must be equal
                                    return 0;
                                }
                                )
                                // reverse merge
                                merged = merged.reverse()

                                if (following.length == (index + 1)) {
                                    setLoading(false)
                                    setPostData(merged)
                                }
                            })
                    })
                } else {
                    console.log('error')
                }
            })
    }


    useEffect(() => {
        getFollowers()
    }, [])
    if (!loading && postData.length == 0) {
        return null
    }


    return (
        <div className='flex flex-col gap-5 sm:p-10 p-3'>
            <h2 className='text font-bold sm:text-3xl text-xl'>Followed by You</h2>
            {loading && (
                <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>
            )}
            {(!loading && (postData.length != 0)) && <div className='explorePosts'>
                {
                    postData.map((post, index) => {
                        return (
                            <Explorecard post={post} key={index} />
                        )
                    }
                    )
                }
            </div>}
            {(!loading && (postData.length == 0)) && <div className='explorePosts'>

                <h2 className='text sm:text-2xl text-xl'>No Creativity Posted by your Followings. Try Following more talents from <Link href="/talents">Here</Link></h2>
            </div>}

        </div>
    )
}

export default Postedbyfollowings