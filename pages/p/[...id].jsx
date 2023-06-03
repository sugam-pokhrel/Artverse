import React, { useEffect, useState } from 'react';
import Home from '../../compos/Explore/ExplorePost/Home';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Login from '../../compos/Login/Login';

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
