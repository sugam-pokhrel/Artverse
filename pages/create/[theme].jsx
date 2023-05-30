import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Thems() {
    var session = useSession()
    var router = useRouter()
    var [userData, setUserData] = React.useState(null)
    var [loading, setLoading] = React.useState(true)
    var [websiteDets, setWebsiteDets] = React.useState(
        {
            websiteDetail: {
                title: '',
            },
            landing: {
                bgImg: '',
                heading: '',
                subHeading: ''
            },
            about: {
                heading: '',
                aboutImage: '',
                aboutDesc: ''
            },
            project: "",
            contact: ""
        }
    )


    function fetchInfos(e) {
        setWebsiteDets({
            ...websiteDets,
            websiteDetail: {
                ...websiteDets.websiteDetail,
                title: e.name + "'s Portfolio"
            },
            landing: {
                ...websiteDets.landing,
                bgImg: e.bgImg,
                heading: "Hello I am " + e.name,
                subHeading: e.bio
            },
            about: {
                ...websiteDets.about,
                heading: "About Me",
                aboutImage: e.image,
                aboutDesc: e.bio
            },
            project: {
                ...websiteDets.project,
                heading: "My Projects",
                projects: e.projects
            },
            contact: {
                ...websiteDets.contact,
                heading: "Contact Me",
                email: e.email,
                location: e.location
            }
        })
        console.log(websiteDets)
    }


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
                fetchInfos(data.user[0])
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
        if (!percent === 100) {
            router.push('/')
        }
    }

    function setWebsiteDetail(e) {
        setWebsiteDets({
            ...websiteDets,
            websiteDetail: {
                ...websiteDets.websiteDetail,
                title: e.target.value
            }
        })

    }
    return (
        <div className='pf-home'>
            <div className="pf-left">
                <div className="pl-header">
                    <h2>Add your Data</h2>
                </div>
                <div className="pf-data">
                    <div className="pd-wrap">
                        <h3>Website Detail</h3>
                        <div className="pd-input">
                            <p>Website's Title</p>
                            <input type="text" placeholder="Enter your website's title" defaultValue={websiteDets.websiteDetail.title} onChange={(e) => setWebsiteDetail(e)} />
                        </div>
                    </div>
                    <div className="pd-wrap">
                        <h3>Landing page</h3>
                        <div className="pd-input">
                            <p>Background Image Url</p>
                            <input type="text" placeholder="Enter your background's url" />
                        </div>
                        <div className="pd-input">
                            <p>Landing Heading Text</p>
                            <input type="text" placeholder="Enter Landing Heading Text" defaultValue={websiteDets.landing.heading} />
                        </div>
                        <div className="pd-input">
                            <p>Landing Sub Heading Text</p>
                            <input type="text" placeholder="Enter Landing Sub Heading Text"
                                defaultValue={websiteDets.landing.subHeading}
                            />
                        </div>
                    </div>
                    <div className="pd-wrap">
                        <h3>About</h3>
                        <div className="pd-input">
                            <p>About Heading Text</p>
                            <input type="text" placeholder="Enter About Heading Text"
                                defaultValue={websiteDets.about.heading}
                            />
                        </div>
                        <div className="pd-input">
                            <p>About Image Url</p>
                            <input type="text" placeholder="Enter About Image Url"
                                defaultValue={websiteDets.about.aboutImage}
                            />
                        </div>
                        <div className="pd-input">
                            <p>About Description</p>
                            <textarea name="" id="" cols="30" rows="10"
                                defaultValue={websiteDets.about.aboutDesc}
                                placeholder="Enter About Description"></textarea>
                        </div>
                    </div>
                    <div className="pd-wrap">
                        <h3>Projects</h3>
                        <p>Projects will automatically be fetched from your profile. To add more project here, upload it from Homepage</p>
                        <button className='btn btn-primary' onClick={() => router.push("/upload")}>Upload Project</button>
                    </div>

                    <div className="pd-wrap">
                        <h3>Contact Details</h3>
                        <p>Contact details will automatically be fetched from your profile. Review it or edit it from profile page</p>
                        <button className='btn btn-primary' onClick={() => router.push("/profile/edit")}>Edit Profile</button>
                    </div>

                    <div className="pd-wrap">
                        <button className='btn btn-warning'>Save</button>
                    </div>
                </div>
            </div>
            <div className="pf-preview">
                <div className="pp-head">
                    <h2>Preview</h2>
                    <div className="pp-prev">
                        <h2>Preview Aile chaldaina, paila yo DB ma janey banau</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thems