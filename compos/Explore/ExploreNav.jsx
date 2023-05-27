import React from 'react'


function Search() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
    )
}

function ExploreNav() {
    return (
        <div className='exploreNav'>
            <div className="exploreSearch">
                <input type="text" placeholder={` 🔍 Search the creativity`} />
                <button className='btn btn-secondary rounded-full'>Search</button>
            </div>
        </div>
    )
}

export default ExploreNav