import Head from 'next/head'
import React, { useEffect } from 'react'
import Postcard from '../Me/PostCard'
import Socials from '../socialCard/Socials'
import Basic from './Themes/Basic'
import Programmerbasic from './Themes/Programmer/basic/Basic'
import { Router, useRouter } from 'next/router'

function Preview({ data, user }) {
    var router = useRouter()
    // console.log(data)
    // console.log(user)
    var [posts, setPosts] = React.useState([])
    var [render, setRender] = React.useState(false)
    var [theme, setTheme] = React.useState("basic")
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

    useEffect(() => {
        if (router.query.theme) {
            setTheme(router.query.theme[0])
        }
    }, [router.query.theme])
    var [socials, setSocials] = React.useState([])


    function getSocialmedia(a) {
        // social = 
        // parse a

    
                    
                 if (a !== ""&& a !== "''"){

                    console.log('empty not')
            var social = JSON.parse(a)
            console.log(social)
            setSocials(social)
      

                 }else{
                    console.log('empty')
                 }       


        setRender(true)
    }
    return (
        <>
            {
                (render) &&
                    (theme === "basic") ? (
                    <Basic data={data} user={user} posts={posts} socials={socials} />
                )
                    : (theme === "programmer") ? (
                        <Programmerbasic data={data} user={user} posts={posts} socials={socials} />
                    )
                        :
                        (null)
            }
        </>
    )
}

export default Preview