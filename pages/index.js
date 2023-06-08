import Head from 'next/head'
import Landing from '../compos/Homepage/NotLoggedIn/Landing'
import Platform from '../compos/Homepage/NotLoggedIn/Platform'
import Stats from '../compos/Homepage/NotLoggedIn/Stats'
import Footer from '../compos/Homepage/NotLoggedIn/Footer'
import Features from '../compos/Homepage/NotLoggedIn/Features'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import Dashboard from '../compos/Homepage/LoggedIn/Dashboard'
import ExpHome from '../compos/Explore/Home'
import Index from '../compos/Explore/loggedIn/Index'
import Explorepage from '../compos/Explore/Explorepage'


export default function Home() {
  var session = useSession()
  var [authenticated, setAuthenticated] = useState(false)
  var [loading, setLoading] = useState(true)
  useEffect(() => {
    if (session.status === 'authenticated') {
      setAuthenticated(true)
      setLoading(false)

    } else if (session.status === 'unauthenticated') {
      setAuthenticated(false)
      setLoading(false)
    }
  }, [session.status])

  return (
    <>
      <Head>
        <title>Artverse | Home</title>
        <meta name="description" content="ARTVESE is an all-in-one platform for creatives to share projects, build portfolios, and connect with like-minded individuals. It also offers a unique parent link that consolidates users' social media accounts, making it easier to showcase their skills and engage with their online presence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Artverse - The Ultimate Platform for Creatives" />
        <meta name="description" content="ARTVESE is an all-in-one platform for creatives to share projects, build portfolios, and connect with like-minded individuals. It also offers a unique parent link that consolidates users' social media accounts, making it easier to showcase their skills and engage with their online presence." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://artverses.vercel.app/" />
        <meta property="og:title" content="Artverse - The Ultimate Platform for Creatives" />
        <meta property="og:description" content="ARTVESE is an all-in-one platform for creatives to share projects, build portfolios, and connect with like-minded individuals. It also offers a unique parent link that consolidates users' social media accounts, making it easier to showcase their skills and engage with their online presence." />
        <meta property="og:image" content="https://i.ibb.co/M8DJntr/image.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://artverses.vercel.app/" />
        <meta property="twitter:title" content="Artverse - The Ultimate Platform for Creatives" />
        <meta property="twitter:description" content="ARTVESE is an all-in-one platform for creatives to share projects, build portfolios, and connect with like-minded individuals. It also offers a unique parent link that consolidates users' social media accounts, making it easier to showcase their skills and engage with their online presence." />
        <meta property="twitter:image" content="https://i.ibb.co/M8DJntr/image.png"></meta>
      </Head>
      {(!authenticated && !loading) && <div>
        <Landing />
        <Platform />
        <Stats />
        <Features />
        <Footer />
      </div>}
      {(authenticated && !loading) && <div>
        {/* <ExpHome /> */}
        {authenticated && <Index />}
        <Explorepage />
      </div>}
      {loading && <div className='explore-load'>
        <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />

      </div>}



    </>
  )
}
