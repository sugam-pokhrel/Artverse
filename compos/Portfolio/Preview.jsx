import Head from 'next/head'
import React, { useEffect } from 'react'
import Postcard from '../Me/PostCard'
import Socials from '../socialCard/Socials'
import Basic from './Themes/Basic'

function Preview({ data, user }) {
    // console.log(data)
    // console.log(user)
    var [posts, setPosts] = React.useState([])
    var [render, setRender] = React.useState(false)
    var [loading, setLoading] = React.useState(true)
    function fetchProjects() {
        fetch("/api/post/getpostbyEmail?email=" + user.email)
            .then(res => res.json())
            .then(data => {
                var pros = data?.post
                var revpros = [...pros].reverse()
                setPosts(revpros)
            }
            )
    }
    useEffect(() => {
        if (user) {
            fetchProjects()
            getSocialmedia(user?.social)
        }
    }, [user])
    var [socials, setSocials] = React.useState([])


    function getSocialmedia(a) {
        // social = 
        // parse a
        console.log(a)

                    
if (a !== "" || a !== null || a !== undefined){
 var social = JSON.parse(a)
        console.log(social)
        setSocials(social)

        }
        console.log(social)
        setRender(true)
    }
    return (
        <>
            {
                (render) &&
                <Basic data={data} user={user} posts={posts} socials={socials} />
            }
        </>
    )
}

export default Preview