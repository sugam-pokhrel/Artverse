import React, { useEffect, useState } from 'react'
import Explorepage from '../compos/Explore/Explorepage'
import ExploreNav from '../compos/Explore/ExploreNav'
import Head from 'next/head'

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
            <Head>
                <title>Explore | ArtVerse</title>
                <meta name="description" content="Explore ArtVerse, see the letest projects that has been uploaded to artverse Recently" />
            </Head>
            <ExploreNav />
            <Explorepage />
        </div>
    )
}

export default explore