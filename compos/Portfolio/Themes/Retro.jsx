import React from 'react'
import Head from 'next/head'
import SocialCard from '../../socialCard/Socials'
import Postcard from '../../Me/PostCard'


function Retro({ data, posts, socials, user }) {
    console.log(data)
    return (
        <div className="pp-portfolio r-portfolio">
            <Head>
                <title>{data.websiteDetail.title}</title>
                <meta name="description" content={data.websiteDetail.description} />
            </Head>
            <div className="pp-portfolio-landing">
                <div className="ph-img r-img">
                    {<img src="https://wallpapercrafter.com/desktop/105776-cyberpunk-Bladerunner-rain-neon-lights-futuristic-city-wet-street-neon-cyan.jpg" alt={data.websiteDetail.title} />}
                </div>
                <div className="ph-content r-content">
                    <section>
                        <div className="hero-container">
                            {(!!data.landing.heading) ? <h2 className="hero glitch layers w-300" data-text={data.landing.heading}><span>{data.landing.heading}</span></h2> : <h2 className="hero glitch layers w-300" data-text="Hello Stranger"><span>Hello Stranger</span></h2>}
                            {(!!data.landing.subHeading) && <p className="text text-primary" data-text={data.landing.subHeading}><span>{data.landing.subHeading}</span></p>}
                        </div>
                    </section>
                </div>
            </div>
            <div className="pp-portfolio-about r-about">
                <div className="ph-about-img r-about-img">
                    {data?.about?.aboutImage ? <img src={data?.about?.aboutImage} alt={data.websiteDetail.title} /> : <img src={user.image} alt={data.websiteDetail.title} />}
                </div>
                <div className="ph-aboutDetail">
                    {(!!data.about.heading) ? <h1 className='hero glitch layers w-300' data-text={data?.about?.heading}>{data?.about?.heading}</h1> :
                        <h1 className='hero glitch layers w-300' data-text="About Me">About Me</h1>
                    }
                    {(!!data.about.aboutDesc) ? <p>{data?.about?.aboutDesc}</p> : <p>Hey, I am {user.name} and this is my portfolio website. These are some Information related to me. Thank you for visiting me</p>}
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
            {(posts.length > 0) && <div className="ph-projects r-projs">
                <h2 className='hero glitch layers w-300' data-text="My Projects">My Projects</h2>
                <p>Browse some of the porjects I uploaded on Artverse</p>
                <div className="ph-projects-list">
                    {posts.map(post => (
                        <Postcard post={post} key={post.$id} />
                    ))}
                </div>
            </div>}
            <div className="ph-footer ">
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

export default Retro