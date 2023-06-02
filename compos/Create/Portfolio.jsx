import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Portfolio() {
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
    var [pfExists, setPfExists] = React.useState(false)
    function fetchPF(email) {
        fetch("/api/portfolio/" + email)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getifPFecist()
            }
            )
    }
    function getifPFecist() {
        fetch("/api/portfolio/check")
            .then(res => res.json())
            .then(data => {
                setPfExists(data)
                setLoading(false)
            }
            )
    }
    function getUserData() {
        fetch("/api/users/getloggedin")
            .then(res => res.json())
            .then(data => {
                setUserData(data.user[0])
                fetchPF(data.user[0].email)
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
    return (
        <div className='create-portfolio'>
            {(loading) && <div className="explore-load">
                <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
            </div>}
            {(!loading) && <div className="create-portfolio__container">
                {(!pfExists) && <div className="cc-items">
                    <h2>You need a portfolio !!!</h2>
                    <p>Show your skills, projects and capabilities on your own portfolio website, start now by chosing the theme</p>
                </div>}
                {(pfExists) && <div className="cc-items">
                    <h2>Wanna Edit your  Portfolio?</h2>
                    <p>You have already made a portfolio, but you can edit it any time. Do you want to edit?</p>
                </div>}
                {(pfExists) && <div className="cc-items cc-the">
                    asd


                </div>}
                <div className="cc-items cc-the">
                    <h2>Choose a theme</h2>
                    <div className="cc-themes">
                        <div className="cc-theme" onClick={() => router.push("basic")}>
                            <img src="https://i.ibb.co/d0m64FJ/image.png" alt="theme" />
                            <h3>Basic</h3>
                        </div>
                        {/* https://i.ibb.co/wQXYMnS/image.png */}
                        <div className="cc-theme" onClick={() => router.push("programmer")}>
                            <img src="https://i.ibb.co/wQXYMnS/image.png" alt="theme" />
                            <h3>Programmer</h3>
                        </div>

                    </div>
                </div>

            </div>
            }
        </div>
    )
}

export default Portfolio