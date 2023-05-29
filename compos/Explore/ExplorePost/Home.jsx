import React, { useEffect } from 'react'
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaRegSave } from 'react-icons/fa'
import Thoughts from './Thoughts'
import AddThought from './AddThought'
import { useSession } from 'next-auth/react'


function Home({ post, user }) {

    const { data: session } = useSession()
    var [auth, setAuth] = React.useState(false)
    var [liked, setLiked] = React.useState(false)
    var [likeLoading, setLikeLoading] = React.useState(true)
    useEffect(() => {
        if (session) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [session])

    useEffect(() => {
        likedByuser()
    }, [])

    function likedByuser() {
        fetch("/api/likes/likedByuser?id=" + post.$id)
            .then(res => {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return res.json();
                } else {
                    return 0;
                }
            }
            )
            .then(data => {
                setLikeLoading(false)
                if (data == true) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            }
            )

    }


    function likePost() {
        setLikeLoading(true)
        var url = "/api/likes/" + post.$id;
        if (auth) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ likedby: session.user.email }), // Pass session email in the request body
            })
                .then(res => {
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return res.json();
                    } else {
                        return 0;
                    }
                })
                .then(data => {
                    console.log(data);
                    setLiked(true)
                    setLikeLoading(false)
                })
                .catch(error => {
                    console.error('An error occurred while liking the post:', error);
                });
        } else {
            console.log(url);
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return res.json();
                    } else {
                        return 0;
                    }
                })
                .then(data => {
                    console.log(data.length);
                })
                .catch(error => {
                    console.error('An error occurred while liking the post:', error);
                });
        }
    }

    return (
        <div className='explorePost'>
            <div className="ep-top">
                <div className="ep-user flex ">
                    <img src={user?.image} alt="" />
                    <div className="ep-u-data">
                        <p>{post.title}</p>
                        <div>{user?.name} . <span>Follow</span></div>
                    </div>
                </div>
                <div className="ep-u-actions flex gap-5">
                    {(!likeLoading) && <>
                        {liked ? <div className="btn btn-primary"><AiFillHeart size={22} />Liked</div>
                            : <div className="btn btn-primary" onClick={likePost}><AiOutlineHeart size={22} />Like</div>
                        }
                    </>}
                    {likeLoading && <div className="btn btn-primary likeload" ><AiOutlineLoading3Quarters size={22} /></div>
                    }

                    <div className="btn btn-warning"><FaRegSave size={22} />Save</div>
                </div>
            </div>
            <div className="ep-img">
                <img src={post.image} alt="" />
            </div>
            <div className="ep-desc">
                <p>{post.desc}</p>
            </div>
            <div className="ep-thoughts">
                <AddThought />
                <Thoughts />
            </div>
        </div>
    )
}

export default Home;
