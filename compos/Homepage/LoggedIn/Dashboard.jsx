import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'


function Dashboard() {
    var session = useSession()
    const [prot, setport] = useState(false)
    var router = useRouter()
    var [userData, setUserData] = React.useState(null)
    let sessiontest = prot ? 'Edit your' : 'Create a';


    useEffect(() => {
        if (session.status === 'authenticated') {

        }
        if (session.status === 'unasuthenticated') {
            router.push('/login')
        }
    }, [session.status])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/portfolio/check');
                const data = await response.json();
                console.log(data)
                setport(data);
            } catch (error) {
                // Handle errors
            }
        }

        fetchData();
    }, []);
    function getUserData() {
        fetch("/api/users/getloggedin")
            .then(res => res.json())
            .then(data => {
                console.log(data.user[0])
                setUserData(data.user[0])
                getPost(data.user[0].email)
                checkInfostatus(data.user[0])
            })

    }
    useEffect(() => {
        getUserData()
    }, [])
    var [infoStatus, setInfoStatus] = React.useState(0)

    function checkInfostatus(data) {
        // return how much percent user has filled his her data
        var count = 0
        if (data.name) {
            count = count + 1
        }
        if (data.email) {
            count = count + 1
        }
        if (data.bio) {
            count = count + 1
        }
        if (data.location) {
            count = count + 1
        }
        if (data.profession) {
            count = count + 1
        }

        var percent = (count / 5) * 100
        // round off
        percent = Math.round(percent)
        setInfoStatus(percent)
    }
    var [postLikes, setPostLikes] = React.useState(0)
    var [totalPosts, setTotalPosts] = React.useState(0)

    function getPost(e) {
        fetch("/api/post/getpostbyEmail?email=" + e)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var post = data?.post
                var postLikes = 0
                setTotalPosts(post.length)
                console.log(post[0].createdBy)
                // get all post likes
                for (var i = 0; i < post.length; i++) {
                    var postsL = post[i].likes
                    var plength = postsL.length
                    postLikes += plength
                    setPostLikes(postLikes)
                }
            })
    }
    return (
        <div className='dashboard'>
            <h1>Hello {session?.data?.user.name} </h1>
            <div className="dashboard__info">
                <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": infoStatus }}>{infoStatus}%</div>
                <div className="dashboard__info__text">
                    {infoStatus === 100 ? <h2 className='text p-2 text-green-200'>Profile Completed and you are eligible to create a portfolio</h2> : <h2>Complete your profile to create a portfolio and also other exclusive features</h2>}
                    <div className="dash-btns">
                        {(infoStatus === 100) && <button className='btn btn-secondary' onClick={() => router.push("/create/portfolio")}>{sessiontest} Portfolio</button>}
                        {(infoStatus === 100) && <button className='btn btn-primary' onClick={() => router.push("/profile/edit")}>Edit Profile</button>}
                        {(infoStatus !== 100) && <button className='btn bg-green-400 text-white' onClick={() => router.push("/profile/edit")}>Complete Profile</button>}

                    </div>
                </div>
            </div>
            <h1>Create</h1>
            <div className="dash-create">
                {(infoStatus === 100) && <div className="dc-item" onClick={() => router.push("/create/portfolio")}>
                    <h2 className='text text-secondary font-bold text-3xl '>Portfolio</h2>
                    {(!prot) ? <h1>+</h1> : <div className='dc-svg'><FiEdit /></div>}

                    {(!prot) ? <p>Create a stunnishing portfolio in a minute with zero code experience</p>
                        :
                        <p>You have already created a portfolio. Update your portfolio</p>}
                </div>}
                <div className="dc-item" onClick={() => router.push("/upload")}>
                    <h2 className='text text-secondary font-bold text-3xl' >Post</h2>
                    <h1>+</h1>
                    <p>Show your projects to the world, post one now</p>
                </div>
                <div className="dc-item" onClick={() => router.push("/create/linkify")}>
                    <h2 className='text text-secondary font-bold text-3xl ' >Linkify</h2>
                    <h1>+</h1>
                    <p>Got many social medias? Share all social media links under one link with Linkify</p>
                </div>
            </div>
            <h1>Account Stats</h1>
            <div className="dash-stats">
                <div className="ds-item">
                    <p>Total Followers</p>
                    {userData && <h1>{userData.followers.length}</h1>}
                </div>
                <div className="ds-item">
                    <p>Total Posts</p>
                    <h1>{totalPosts}</h1>
                </div>
                <div className="ds-item">
                    <p>Total post Likes</p>
                    <h1>{postLikes}</h1>
                </div>
                <div className="ds-item">
                    <p>Post Views</p>
                    <h1>0</h1>
                </div>

            </div>



        </div>
    )
}

export default Dashboard