import React, { useEffect, useState } from 'react';
import Home from '../../compos/Explore/ExplorePost/Home';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Login from '../../compos/Login/Login';
import Head from 'next/head';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";



export async function getServerSideProps(context) {
    var postid = null
    var newData = null
    try {
        postid = await context.query.id
        await fetch(`https://artverses.vercel.app/api/post/${postid}`)
            .then(res => res.json())
            .then(data => {
                newData = data
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
    return {
        props: {
            newData,
        }
    }
}

function PostId({ newData }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [postData, setPostData] = useState({});
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(newData)

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
                <title>{newData.title} | ArtVerse</title>
                <meta name="description" content={newData.desc} />

                <meta property="og:title" content={newData.title} />
                <meta property="og:description" content={newData.desc} />
                <meta property="og:image" content={newData.image} />
                <meta property="og:url" content={"https://artverses.vercel.app/p/" + newData.$id} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Artverses" />

                <meta name="twitter:title" content={newData.title} />
                <meta name="twitter:description" content={newData.description} />
                <meta name="twitter:image" content={newData.image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {loading ? (
                <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>
            ) : (
                <div className="wrap-home">
                    <div className="sharePost">
                        <FacebookShareButton
                            url={"https://artverses.vercel.app/p/" + newData.$id}
                            quote={newData.title}
                            hashtag="#artverses"
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={"https://artverses.vercel.app/p/" + newData.$id}
                            title={newData.title}
                            hashtags={["artverses"]}
                        >
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            url={"https://artverses.vercel.app/p/" + newData.$id}
                            title={newData.title}
                            separator=":: "
                        >
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>

                        <EmailShareButton
                            url={"https://artverses.vercel.app/p/" + newData.$id}
                            subject={newData.title}
                            body="body"
                        >
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>

                        <LinkedinShareButton
                            url={"https://artverses.vercel.app/p/" + newData.$id}
                            title={newData.title}
                            summary={newData.desc}
                            source={"https://artverses.vercel.app/p/" + newData.$id}
                        >
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>

                    </div>
                    <Home user={userData} post={postData} />
                </div>
            )}
        </>
    );

}

export default PostId;
