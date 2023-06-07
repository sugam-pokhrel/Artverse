import React, { useEffect, useState } from 'react'
import Explorecard from './Explorecard'

function Explorepage() {
    var [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    function getPosts() {
        fetch("/api/post")
            .then(res => res.json())
            .then(data => {
                console.log(data.documents)
                // reverse the array to get the latest post first
                var revData = data.documents.reverse()
                setData(revData)
                setLoading(false)
            })
    }


    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className='flex flex-col gap-5 p-10'>
            <h2 className='text font-bold sm:text-3xl text-xl'>Recently Posted Creativities</h2>
            {loading ? (
                <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>
            ) : (
                <div className='explorePosts'>
                    {
                        data.map((post, index) => {
                            return (
                                <Explorecard post={post} key={index} />
                            )
                        }
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default Explorepage