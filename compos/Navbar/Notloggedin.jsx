import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { BsSearch, BsUpload } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { useRouter } from 'next/router'

function Notloggedin() {
    var [showClose, setShowClose] = React.useState(false)
    var router = useRouter()

    useEffect(() => {
        setMenuShown(false)
    }, [router])

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
        <div className="navbar bg-base-100" >
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Artverse</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 menAtt">
                    <li><Link href={"/talents"}>Talents</Link></li>
                    <li><Link href={"/explore"}>Explore</Link></li>
                </ul>
                <button className='btn btn-primary menAtt' onClick={signIn}>Login</button>
            </div>

            {(!menuShown) && <label tabIndex={0} className="btn btn-ghost btn-circle avatar mobMenu" onClick={() => setMenuShown(!menuShown)}>
                <div className="w-10 rounded-full">
                    <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/06_menu_stack-512.png" referrerPolicy='no-referrer' />
                </div>
            </label>}
            {menuShown ? <div className="btn btn-ghost bg-red-800 btn-circle avatar mobMenu" onClick={() => setMenuShown(!menuShown)}>
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
                    <li className='text py-2 text-2xl'><Link href={"/explore"}><MdOutlineTravelExplore />Explore</Link></li>
                    <li className='text py-2 text-2xl'><Link href={"/login"}><FiLogIn />Login</Link></li>

                </ul>
            </div>
        </div>
    )
}

export default Notloggedin