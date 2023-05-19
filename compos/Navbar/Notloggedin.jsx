import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

function Notloggedin() {
    return (
        <div className="navbar bg-base-100" >
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Artverse</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/explore"}>Explore</Link></li>
                </ul>
                <button className='btn btn-primary' onClick={signIn}>Login</button>
            </div>
        </div>
    )
}

export default Notloggedin