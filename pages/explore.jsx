import React, { useEffect, useState } from 'react'
import Explorepage from '../compos/Explore/Explorepage'
import ExploreNav from '../compos/Explore/ExploreNav'

function explore() {
    const [data, setData] = useState([])
    function getPosts() {
        fetch("/api/post")
            .then(res => res.json())
            .then(data => {
                console.log(data.documents)
                setData(data.documents)
            })
    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className='Explore'>
            <ExploreNav />
            <Explorepage />
        </div>
    )
}

export default explore