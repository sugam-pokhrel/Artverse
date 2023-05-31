import Head from 'next/head'
import React, { useEffect } from 'react'
import Postcard from '../Me/PostCard'
import Socials from '../socialCard/Socials'
import Basic from './Themes/Basic'

function Preview({ data, user }) {
    // console.log(data)
    // console.log(user)
    var [posts, setPosts] = React.useState([])
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

        var social = JSON.parse(a)
        console.log(social)
        setSocials(social)


    }
    return (
        <>
            <Basic data={data} user={user} posts={posts} socials={socials} />
        </>
    )
}

export default Preview