import React, { useEffect, useState } from 'react'
import Following from './Following'

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
                                <Following user={user} key={index} />
                            )
                        })
                    )}
                </div>
            </div>
        )
    }
}

export default Index