import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Basic from '../../compos/Portfolio/Themes/Basic'
import ProgrammerBasic from '../../compos/Portfolio/Themes/Programmer/basic/Basic'

function Username() {
    var router = useRouter()
    useEffect(() => {
        if (router.query.username) {
            fetchUser(router.query.username)
        }
    }, [router.query.username])
    var [loading, setLoading] = React.useState(true)
    var [userFound, setUserFound] = React.useState(false)
    var [theme, setTheme] = React.useState("")
    var [render, setRender] = React.useState(false)


    function fetchUser(a) {
        fetch("/api/users/getbyusername?username=" + a)
            .then(res => res.json())
            .then(data => {
                if (data.user.length === 0) {
                    setUserFound(false)
                } else {
                    setUserFound(true)
                    setUser(data.user[0])
                    fetchPortfolio(data.user[0].email)
                    fetchPost(data.user[0].email)
                    getSocialmedia(data.user[0].social)
                }
            })
    }
    var [datax, setData] = React.useState({
        websiteDetail: {
            title: '',
        },
        landing: {
            bgImg: '',
            heading: '',
            subHeading: '',
        },
        about: {
            heading: '',
            aboutImage: '',
            aboutDesc: '',
        },
        project: '',
        contact: '',
    })
    var [user, setUser] = React.useState()
    var [posts, setPosts] = React.useState([])
    var [socials, setSocials] = React.useState([])



    function getSocialmedia(a) {
        // social = 
        // parse a

        if (a !== "" && a !== "''") {
            var social = JSON.parse(a)
            setSocials(social)
        } else {
            console.log('empty')
        }


    }

    function fetchPost(e) {
        fetch("/api/post/getpostbyEmail?email=" + e)
            .then(res => res.json())
            .then(data => {
                var pros = data?.post
                var revpros = [...pros].reverse()
                setPosts(revpros)
            }
            )
    }

    function fetchPortfolio(email) {
        fetch("/api/portfolio/" + email)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTheme(data.theme)
                var updatedWebsiteDets = {
                    websiteDetail: {
                        title: data.websiteDetailtitle || '',
                    },
                    landing: {
                        bgImg: data.landingbgImg || '',
                        heading: data.landingheading || '',
                        subHeading: data.landingsubHeading || '',
                    },
                    about: {
                        heading: data.aboutheading || '',
                        aboutImage: data.aboutaboutImage || '',
                        aboutDesc: data.aboutaboutDesc || '',
                    },
                    project: data.projectheading || '',
                    contact: data.contactheading || '',
                };

                setData(updatedWebsiteDets);
            })
        setLoading(false)
        setRender(true)
    }


    return (
        <div>{
            (loading) ? (
                <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>
            ) : (
                (userFound && render) ? (
                    <div>
                        {(theme == "basic") && <Basic user={user} data={datax} posts={posts} socials={socials} />}
                        {(theme == "programmer") && <ProgrammerBasic user={user} data={datax} posts={posts} socials={socials} />}

                    </div>
                ) : (
                    <div>
                        <h1>user not found</h1>
                    </div>
                )
            )
        }
        </div>
    )
}

export default Username