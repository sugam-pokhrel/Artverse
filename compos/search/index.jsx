import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TalentCard from '../talents/TalentCard'
import PostCard from './PostCard'

function SearchIndex({ data }) {
    var [loading, setLoading] = useState(true)
    var [filter, setFilter] = useState('all')
    var [userData, setUserData] = useState([])
    var [postData, setPostData] = useState([])
    var router = useRouter()
    var [search, setSearch] = useState('')



    function searchText(e) {
        if (e.key === 'Enter') {
            // check length
            var qval = e.target.value
            if (qval.length >= 3) {
                router.push('/search?q=' + qval)
            } else {
                alert('Search query should be more than 3 characters')
            }
        }
    }
    function searchQuery(e) {
        setLoading(true)
        fetch("/api/search/" + e)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserData(data.user)
                setPostData(data.post)
                setTimeout(() => {
                    setLoading(false)
                }, 200);
            }
            )
    }
    useEffect(() => {
        if (router.query.q) {
            setSearch(router.query.q)
            searchQuery(router.query.q)
        }
    }, [router])

    return (
        <div className='searchIndex'>
            <div className='hero-text w-full flex gap-5 sm:flex-row flex-col sm:items-center items-start'>
                <p className='text-2xl'>Filter the search</p>
                <select className='select select-bordered select-primary w-64' onChange={(e) => setFilter(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='posts'>Posts</option>
                    <option value='users'>Users</option>
                </select>
            </div>
            <div className="hero-text w-full flex gap-5 sm:flex-row flex-col sm:items-center items-start">
                <p className='text-2xl'>Search Artverse</p>
                <input type="text" className="input input-bordered" placeholder="Search" onKeyDown={(e) => searchText(e)} />
            </div>
            <div className="search-cards">
                {(!loading && !!userData && userData.length > 0 && (filter == "all" || filter == "users")) && <div className="sc-user">
                    <h2 className='text sm:text-2xl text-xl'>Users of Artverse</h2>
                    {(userData.length > 0) && userData.map((item, index) => {
                        return <TalentCard key={index} data={item} />
                    }
                    )}
                </div>}

                {(!loading && !!postData && postData.length > 0 && (filter == "all" || filter == "posts")) && <div className="sc-user">
                    <h2 className='text sm:text-2xl text-xl'>Posts in Artverse</h2>
                    {(postData.length > 0) && postData.map((item, index) => {
                        return <PostCard data={item} key={index} />
                    }
                    )}
                </div>}

                {(!loading && userData.length == 0 && postData.length == 0) && <div className="sc-user">
                    <h2 className='text sm:text-2xl text-xl'>No Results Found</h2>
                </div>

                }

                {(filter == "users" && !loading && userData.length == 0) && <div className="sc-user">
                    <h2 className='text sm:text-2xl text-xl'>No Users Found</h2>
                </div>
                }

                {(filter == "posts" && !loading && postData.length == 0) && <div className="sc-user">
                    <h2 className='text sm:text-2xl text-xl'>No Posts Found</h2>
                </div>
                }

                {(loading) && <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>

                }
            </div>
        </div>
    )
}

export default SearchIndex