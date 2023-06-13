import React, { useEffect } from 'react'
import Postcard from './PostCard';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

function Home() {
    var router = useRouter()
    var [user, setUser] = React.useState(null)
    var [posts, setPosts] = React.useState([])
    var [loading, setLoading] = React.useState(true)
    var [sortedPosts, setSortedPosts] = React.useState("newest")
    function getUser() {
        fetch('/api/users/getloggedin')
            .then(res => res.json())
            .then(data => {
                if (data?.user) {
                    setUser(data.user[0])
                    setLoading(false)
                    console.log(data.user[0])
                }
            })
            .catch(error => console.error('An error occurred while fetching the users:', error));
    }
    function getPost() {
        fetch("/api/post/getpostbyusers")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var post = data?.post
                var revpost = [...post].reverse()
                setPosts(revpost)
            }
            )
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
        getUser()
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
                    <div className="mp-btns">
                        {loading ? <div className="mp-load-btn  "></div> :
                            <button className='btn btn-primary' onClick={() => router.push("/profile/edit")}>Edit Profile</button>
                        }
                        {loading ? <div className="mp-load-btn"></div> :
                            <button className='btn bg-maroon-200' onClick={signOut}>Logout</button>
                        }
                    </div>
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