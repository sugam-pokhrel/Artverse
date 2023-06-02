import React, { useEffect, useState } from 'react'
import Postcard from '../Me/PostCard'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Link from 'next/link';

function Home({ user }) {
  const { data: session } = useSession();
  const [auth, setAuth] = React.useState(false);
  var [loadingFollow, setLoadingFollow] = React.useState(true)

  var router = useRouter()
  // var [user, setUser] = React.useState(null)
  var [posts, setPosts] = React.useState([])
  var [loading, setLoading] = React.useState(true)
  var [sortedPosts, setSortedPosts] = React.useState("newest")
  var [postLikes, setPostLikes] = React.useState(0)
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (session) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [session]);

  var [totalFollowers, setTotalFollowers] = React.useState(0)

  function fetchFollowers() {
    fetch("/api/follow/" + user?.email)
      .then(res => res.json())
      .then(data => {
        setTotalFollowers(data.follow.length)
        console.log(data.follow.length)
      }
      )
  }

  useEffect(() => {
    fetchFollowers()
    var url = "/api/follow/" + user?.email;
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch(url);
      const json = await data.json();
      console.log(json)
      const emailExists = json.follow.includes(session.user.email);

      if (emailExists) {
        console.log("The email exists in the object.");
        setIsFollowed(true)
      } else {
        console.log("The email does not exist in the object.");
      }
      setLoadingFollow(false)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const handleFollow = () => {
    setLoadingFollow(true)
    var url = "/api/follow/" + user?.email;
    if (auth) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likedby: session.user.email }), // Pass session email in the request body
      })
        .then((res) => {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            fetchFollowers()
            setIsFollowed(!isFollowed);
            setLoadingFollow(false)
            return res.json();
          } else {
            return 0;
          }
        })

    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {

  })
  // function getUser() {
  //     fetch('/api/users/getloggedin')
  //         .then(res => res.json())
  //         .then(data => {
  //             if (data?.user) {
  //                 setUser(data.user[0])
  //                 setLoading(false)
  //                 console.log(data.user[0])
  //             }
  //         })
  //         .catch(error => console.error('An error occurred while fetching the users:', error));
  // }
  function getPost() {
    fetch("/api/post/getpostbyEmail?email=" + user?.email)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var post = data?.post
        var revpost = [...post].reverse()
        setPosts(revpost)
        var postLikes = 0
        console.log(post[0].createdBy)
        // get all post likes
        for (var i = 0; i < post.length; i++) {
          var postsL = post[i].likes
          var plength = postsL.length
          postLikes += plength
          console.log(postLikes);
          setPostLikes(postLikes)
        }
      })
  }

  function changeSort(e) {
    setSortedPosts(e.target.value)
    if (e.target.value === "oldest") {
      const revPost = [...posts].reverse()
      setPosts(revPost)
    } else {
      const revPost = [...posts].reverse()
      setPosts(revPost)
    }
  }

  useEffect(() => {
    // getUser()
    getPost()
  }, [])
  return (
    <div className='me-Home'>
      <div className="me-profile">
        <div className="mp-image">
          {loading ? <div className="mp-load-img"></div> :
            <img src={user?.image} alt="userImage" referrerPolicy='no-referrer' />
          }
        </div>
        <div className="mp-name">
          {loading ? <div className="mp-load-name"></div> :
            <h1>{user?.name}</h1>
          }
          {loading ? <div className="mp-load-username"></div> :
            (user?.location) ? <p className="mp-username">{user?.location}</p> : <p className="mp-username">No Location</p>
          }
          {loading ? <div className="mp-load-bio"></div> :
            (user?.bio) ? <p className="mp-bio">{user?.bio}</p> : <p className="mp-bio">No Bio, Add bio from <span className='text text-primary'>EDIT PROFILE</span></p>
          }
          {loading ? <div className="mp-load-followers"></div> :
            <div className="mp-followers">
              <p className="mp-following"><span>{posts?.length}</span> Posts</p>
              <div className="mp-following">
                {totalFollowers !== 0 ? `${totalFollowers} Followers` : "0 Follower"
                }
              </div>
              <div className="mp-following">
                {postLikes > 0 ? `${postLikes} Post Likes` : "0 Post Like"}
              </div>
            </div>
          }
          {(auth) && <div className="mp-btns">
            {loading ? <div className="mp-load-btn  "></div> :
              !loadingFollow ? (<button className='btn btn-primary' onClick={handleFollow}>
                {isFollowed ? 'Unfollow' : 'Follow'}
              </button>)
                : loadingFollow && <div className="btn btn-primary likeload" >
                  <AiOutlineLoading3Quarters size={22} />
                </div>
            }
          </div>}
          {(!auth) && <div className="mp-btns">
            <Link href="/login">
              <button className='btn btn-primary'>
                Login to Follow this User
              </button>
            </Link>
          </div>}
        </div>
      </div>
      <div className="me-posts">
        <div className="mp-top">
          <h1>Posts</h1>
          <div className="mp-sort">
            <p>Sort By</p>
            <select name="sort" id="sort" onChange={(e) => changeSort(e)}>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="mp-posts">
          <div className="mp-post">
            {(posts.length > 0) && posts.map(post => (
              <Postcard post={post} key={post.$id} />
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home