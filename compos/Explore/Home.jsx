import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function Home() {
    var [searchText, setSearchText] = useState('')


    var router = useRouter()
    function search() {
        router.push('/search?q=' + searchText)
    }
    return (
        <div className='exp-home'>

            <h2 className='text sm:text-5xl text-xl font-bold'>
                Explore the the Art submitted in Artverse.
            </h2>
            <p className='text sm:text-2xl text-xl'>
                Search across the projects, user and Blogs that are available in Artverse.
            </p>
            <input type="text" onChange={(e) => setSearchText(e.target.value)} className='input rounded-full bg-white sm:w-2/5 w-4/5 text-black' placeholder='🔍 Search Across Artverse' />
            {(!!searchText) && <button className='btn btn-primary rounded-full' onClick={search}>Search</button>}

        </div>
    )
}

export default Home