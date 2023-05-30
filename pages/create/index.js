import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function index() {
    var session = useSession()
    var router = useRouter()
    var [userData, setUserData] = React.useState(null)
    var [loading, setLoading] = React.useState(true)

    useEffect(() => {
        if (session.status === 'authenticated') {

        }
        if (session.status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session.status])
    function getUserData() {
        fetch("/api/users/getloggedin")
            .then(res => res.json())
            .then(data => {
                console.log(data.user[0])
                setUserData(data.user[0])
                checkInfostatus(data.user[0])
                setLoading(false)
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
    return (
        <div className='dashboard'>
            <h1>Create</h1>
            {(!loading) && <div className="dash-create">
                {(infoStatus === 100) && <div className="dc-item" onClick={() => router.push("/create/portfolio")}>
                    <h2 className='text text-secondary font-bold text-3xl '>Portfolio</h2>
                    <h1>+</h1>
                    <p>Create a stunnishing portfolio in a minute with zero code experience</p>
                </div>}
                <div className="dc-item" onClick={() => router.push("/upload")}>
                    <h2 className='text text-secondary font-bold text-3xl' >Post</h2>
                    <h1>+</h1>
                    <p>Show your projects to the world, post one now</p>
                </div>
                <div className="dc-item">
                    <h2 className='text text-secondary font-bold text-3xl '>Linkify</h2>
                    <h1>+</h1>
                    <p>Got many social medias? Share all social media links under one link with Linkify</p>
                </div>
            </div>}
            {(loading) && <div className="explore-load">
                <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />

            </div>}

        </div>
    )
}

export default index