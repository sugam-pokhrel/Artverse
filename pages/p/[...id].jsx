import React, { useEffect, useState } from 'react';
import Home from '../../compos/Explore/ExplorePost/Home';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Login from '../../compos/Login/Login';
import Head from 'next/head';

function PostId() {
    const { data: session } = useSession();
    const router = useRouter();
    const [postData, setPostData] = useState({});
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.query.id) {
            renderPost(router.query.id);
        }
    }, [router.query.id]);

    function renderPost(a) {
        fetch("/api/post/" + a, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                setPostData(data);
                getUser(data.createdBy);
            });
    }

    function getUser(e) {
        fetch("/api/users/getbyemail?email=" + e)
            .then(res => res.json())
            .then(data => {
                setUserData(data?.user[0]);
                setLoading(false);
            });
    }


    return (
        <>
            <Head>
                <title>{postData.title} | ArtVerse</title>
                <meta name="description" content={postData.description} />

                <meta property="og:title" content={postData.title} />
                <meta property="og:description" content={postData.description} />
                <meta property="og:image" content={postData.thumbnail} />
                <meta property="og:url" content={"https://artverse.vercel.app/p/" + postData._id} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Artverse" />

                <meta name="twitter:title" content={postData.title} />
                <meta name="twitter:description" content={postData.description} />
                <meta name="twitter:image" content={postData.thumbnail} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {loading ? (
                <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>
            ) : (
                <Home user={userData} post={postData} />
            )}
        </>
    );

}

export default PostId;
