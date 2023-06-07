import React, { useEffect, useState } from 'react'
import TalentCard from '../../compos/talents/TalentCard'
import Head from 'next/head'

function index() {
    var [data, setData] = useState([])
    var [loading, setLoading] = useState(true)
    function getAlluser(a) {
        setLoading(true)
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                // set data according to profession and filter
                if (a === "all") {
                    setData(data.users)
                }
                else {
                    var temp = []
                    data.users.map((item) => {
                        var prof = item.profession
                        // lowercase
                        prof = prof?.toLowerCase()
                        if (prof === a) {
                            temp.push(item)
                        }
                    })
                    setData(temp)
                }
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }

    useEffect(() => {
        getAlluser("all")
    }, [])
    var [filter, setFilter] = useState("all")

    useEffect(() => {
        getAlluser(filter)
    }, [filter])

    return (
        <div className='hero sm:px-10 px-5 h-screen place-items-start w-full flex flex-col gap-5'>
            <Head>
                <title>Talents - Artverse</title>
                <meta name="description" content="Explore the top talents" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:title" content="Talents - Artverse" />
                <meta property="og:description" content="Explore the top talents" />
                <meta property="og:image" content="https://i.ibb.co/cXNK8Js/image.png" />
                <meta property="og:url" content="https://artverse.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Artverse" />

                <meta name="twitter:title" content="Talents - Artverse" />
                <meta name="twitter:description" content="Explore the top talents" />
                <meta name="twitter:image" content="https://i.ibb.co/cXNK8Js/image.png" />
                <meta name="twitter:card" content="summary_large_image" />

                <meta name="theme-color" content="#000000" />
            </Head>
            <div className='hero-text w-full flex gap-5 sm:flex-row flex-col sm:items-center items-start'>
                <p className='text-2xl'>Explore the top talents</p>
                <select className='select select-bordered select-primary w-64' onChange={(e) => setFilter(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='artist'>Artist</option>
                    <option value='musician'>Musician</option>
                    <option value='photographer'>Photographer</option>
                    <option value='writer'>Writer</option>
                    <option value='designer'>Designer</option>
                    <option value='developer'>Developer</option>
                    <option value='student'>Student</option>
                </select>
            </div>
            <div className="hero-text">
                {(!loading) && <p>Total {data.length} Talents Found in this platform with filter "{filter}"</p>}
            </div>
            <div className="talent-cards">
                {(!loading && !!data && data.length > 0) && data.map((item, index) => {
                    return <TalentCard key={index} data={item} />
                }
                )}
                {(!loading && !!data && data.length === 0) && <p>No Talent Found</p>}

                {(loading) && <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>}

            </div>

        </div>
    )
}

export default index