import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { BsSearch, BsUpload } from 'react-icons/bs'


function Loggedin() {
    const { data: session, status } = useSession()
    var router = useRouter()

    useEffect(() => {
        setMenuShown(false)
    }, [router])

    function navigateUpload() {
        router.push("/upload")
    }
    var [showClose, setShowClose] = React.useState(false)

    window.addEventListener('scroll', function () {
        var x = document.getElementById("mobmen");
        if (window.scrollY > 60) {
            x.style.top = "0px";
            setShowClose(true)

        } else {
            x.style.top = "60px";
            setShowClose(false)
        }
    });
    var [menuShown, setMenuShown] = React.useState(false)

    useEffect(() => {
        var x = document.getElementById("mobmen");
        if (menuShown) {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }, [menuShown])


    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Artverse</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-0 menAtt">
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

                {(!menuShown) && <label tabIndex={0} className="btn btn-ghost btn-circle avatar mobbar" onClick={() => setMenuShown(!menuShown)}>
                    <div className="w-10 rounded-full">
                        <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/06_menu_stack-512.png" referrerPolicy='no-referrer' />
                    </div>
                </label>}
                {menuShown ? <div className="btn btn-ghost bg-red-800 btn-circle avatar flex items-center justify-center mobbar" onClick={() => setMenuShown(!menuShown)}>
                    <div className="w-8 rounded-full bg:white">
                        <img src="https://th.bing.com/th/id/R.79c96a45cf274d54cfa372d072859584?rik=Ppi9azY6ypNomw&pid=ImgRaw&r=0" referrerPolicy='no-referrer' />
                    </div>
                </div> : null}
                <div className="mobMenu" id='mobmen'>
                    <div className="mm-close">
                        {showClose ? <div className="btn btn-ghost bg-red-800 btn-circle avatar" onClick={() => setMenuShown(!menuShown)}>
                            <div className="w-8 rounded-full bg:white">
                                <img src="https://th.bing.com/th/id/R.79c96a45cf274d54cfa372d072859584?rik=Ppi9azY6ypNomw&pid=ImgRaw&r=0" referrerPolicy='no-referrer' />
                            </div>
                        </div> : null}
                    </div>
                    <ul className="menu menu-vertical mm ">
                        <li className='text  py-2 text-2xl'><Link href={"/talents"}><HiOutlineUserGroup /> Talents</Link></li>
                        <li className='text py-2 text-2xl'><Link href={"/search?q=all"}><BsSearch />Search</Link></li>
                        <li className='text py-2 text-2xl'><Link href={"/upload"}><BsUpload />Upload</Link></li>

                    </ul>
                </div>

                <div className="btn mx-5 bg-green-800 border-none btn-primary upload-btn" onClick={navigateUpload}>Upload</div>
            </div>
        </div>
    )
}

export default Loggedin