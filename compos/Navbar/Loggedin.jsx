import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

function Loggedin() {
    const { data: session, status } = useSession()
    var router = useRouter()

    function navigateUpload() {
        router.push("/upload")
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Artverse</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={"/talents"}>Talents</Link></li>
                    <li><Link href={"/search?q=all"}>Search</Link></li>
                </ul>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={session.user?.image} referrerPolicy='no-referrer' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between"
                                onClick={() => router.push(`/me`)}
                            >
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a className="justify-between"
                                onClick={() => router.push(`/profile/edit`)}
                            >
                                Edit Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><Link href={"/dashboard"}>Dashboard</Link></li>
                        <li><a onClick={signOut}>Logout</a></li>
                    </ul>
                </div>
                <div className="btn mx-5 bg-green-800 border-none btn-primary upload-btn" onClick={navigateUpload}>Upload</div>
            </div>
        </div>
    )
}

export default Loggedin