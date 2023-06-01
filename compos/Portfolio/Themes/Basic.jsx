import React from 'react'
import Head from 'next/head'
import SocialCard from '../../socialCard/Socials'
import Postcard from '../../Me/PostCard'


function Basic({ data, posts, socials, user }) {
    console.log(socials)
    return (
        <div className="pp-portfolio">
            <Head>
                <title>Preview - ({data.websiteDetail.title})</title>
                <meta name="description" content={data.websiteDetail.description} />
            </Head>
            <div className="pp-portfolio-landing">
                <div className="ph-img">
                    {data.landing.bgImg ? <img src={data.landing.bgImg} alt={data.websiteDetail.title} /> : <img src="https://th.bing.com/th/id/R.07711086bcc73c621d551d7ab7cc60fe?rik=dQo%2fLWsjhjOkwA&pid=ImgRaw&r=0" alt={data.websiteDetail.title} />}
                </div>
                <div className="ph-content">
                    <h1>{data.landing.heading}</h1>
                    <p>{data.landing.subHeading}</p>
                </div>
            </div>
            <div className="pp-portfolio-about">
                <div className="ph-about-img">
                    {data?.about?.aboutImage ? <img src={data?.about?.aboutImage} alt={data.websiteDetail.title} /> : <img src={user.image} alt={data.websiteDetail.title} />}
                </div>
                <div className="ph-aboutDetail">
                    <h1 className='text text-warning'>{data?.about?.heading}</h1>
                    <p>{data?.about?.aboutDesc}</p>
                    <div className="pha-tbl">
                        <div className="pha-tbl-row">
                            <div className="pha-tbl-col">
                                <h3 className='text text-warning'>Full Name: </h3>
                            </div>
                            <div className="pha-tbl-col">
                                <p>{user?.name}</p>
                            </div>
                        </div>
                        <div className="pha-tbl-row">
                            <div className="pha-tbl-col">
                                <h3 className='text text-warning'>Email: </h3>
                            </div>
                            <div className="pha-tbl-col">
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <div className="pha-tbl-row">
                            <div className="pha-tbl-col">
                                <h3 className='text text-warning'>Address: </h3>
                            </div>
                            <div className="pha-tbl-col">
                                <p>{user?.location}</p>
                            </div>
                        </div>
                        {user?.profession && <div className="pha-tbl-row">
                            <div className="pha-tbl-col">
                                <h3 className='text text-warning'>Profession: </h3>
                            </div>
                            <div className="pha-tbl-col">
                                <p>{user?.profession}</p>
                            </div>
                        </div>}
                        {user?.website && <div className="pha-tbl-row">
                            <div className="pha-tbl-col">
                                <h3 className='text text-warning'>Website: </h3>
                            </div>
                            <div className="pha-tbl-col">
                                <a href={user?.website} target='_blank'>{user?.website}</a>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="ph-projects">
                <h1 className='text text-warning'>My Projects</h1>
                <div className="ph-projects-list">
                    {(posts.length > 0) && posts.map(post => (
                        <Postcard post={post} key={post.$id} />
                    ))}
                    {(posts.length == 0) && <h1 className='text text-warning'>No Projects Found</h1>}
                </div>
            </div>
            <div className="ph-footer">
                <p>© 2023 {user?.name} | All Rights Reserved</p>
                <div className="ph-socials">
                    {socials.map((social, index) => (
                        <a href={"https://" + social.domain + social.username} target='_blank' key={index}>
                            <SocialCard a={social.domain} />
                        </a>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Basic