import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function Dashboard() {
    var session = useSession()
    var router = useRouter()
    var [userData, setUserData] = React.useState(null)

    useEffect(() => {
        if (session.status === 'authenticated') {

        }
        if (session.status === 'unasuthenticated') {
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
        if (data.website) {
            count = count + 1
        }
        if (data.profession) {
            count = count + 1
        }

        var percent = (count / 6) * 100
        setInfoStatus(percent)
    }
    return (
        <div className='dashboard'>
            <h1>Hello {session?.data?.user.name} </h1>

            <div className="dashboard__info">
                <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": infoStatus }}>{infoStatus}%</div>
                <div className="dashboard__info__text">
                    {infoStatus === 100 ? <h2 className='text p-2 text-green-200'>Profile Completed and you are eligible to create a portfolio</h2> : <h2>Complete your profile to create a portfolio</h2>}
                    <button className='btn btn-primary' onClick={() => router.push("/profile/edit")}>Edit Profile</button>
                </div>
            </div>


        </div>
    )
}

export default Dashboard