import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Login from '../Login/Login';

function TalentCard({ data }) {


    const [isFollowed, setIsFollowed] = useState(false);
    var [auth, setAuth] = useState(false)

   
    var session = useSession()
    if(!session){
        return <Login />
    }
    var router = useRouter()
    useEffect(() => {
        if (session.status === 'authenticated') {
            setAuth(true)
        }
    }, [session])
      useEffect(() => {

    var url = "/api/follow/" + data?.email;
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch(url);
      const json = await data.json();
      console.log(json)
      const emailExists = json.follow.includes(session.data.user.email);

      if (emailExists) {
        console.log("The email exists in the object.");
        setIsFollowed(true)
      } else {
        console.log("The email does not exist in the object.");
      }

    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])
console.log(session.data.user.email)

  function followuser() {
    setIsFollowed(!isFollowed); var url = "/api/follow/" + data.email;
    if (auth) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likedby: session.data.user.email }), // Pass session email in the request body
      })
        .then((res) => {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {

            return res.json();
          } else {
            return 0;
          }
        })
        .then((data) => {
          console.log(data);
          setIsFollowed(!isFollowed);
        }
        )
    }
  }


    var [length, setLength] = useState(0)
    function getPosts() {
        fetch('/api/post/getpostbyEmail?email=' + data.email)
            .then(res => res.json())
            .then(data => {
                setLength(data.post.length)
            })
    }
    useEffect(() => {
        getPosts()
    }, [])

    function navtouser() {
        // slice email and make username
        var email = data.email
        var username = email.slice(0, email.indexOf('@'))
        router.push('/u/' + username)
    }

    return (
        <div className='talent-card'>
            <div className="tc-data">
                <div className="tc-img">
                    <img src={data.image} onClick={navtouser} alt={data.name} referrerPolicy='no-referrer' />
                </div>
                <div className="tc-name">
                    <p className='text-2xl font-bold' onClick={navtouser}>{data.name}</p>
                    <p className='text-xl'>{data?.profession || "Student"} . {data?.followers.length} Followers</p>
                    <p className='text-xl'>{length} Projects . 0 Blogs</p>
                </div>
            </div>
            <div className="tc-fc">
                {(auth) && <div className="fc-btn btn btn-primary" onClick={followuser}>{isFollowed ? 'Unfollow' : 'Follow'} </div>}
                <div className="fc-btn btn btn-warning" onClick={navtouser}>Visit Profile</div>
            </div>
        </div>
    )
}

export default TalentCard
