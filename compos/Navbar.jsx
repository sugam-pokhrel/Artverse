import React from 'react'

function Navbar() {
    return (
        <div className="navbar bg-base-100" >
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Artverse</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li><a>Explore</a></li>
                </ul>
                <button className='btn btn-primary'>Login</button>
            </div>
        </div>
    )
}

export default Navbar