import React, { useEffect } from 'react'
import SocialCard from '../../../../socialCard/Socials'
import Head from 'next/head'

function Basic({ data, posts, socials, user }) {
    var [error, setError] = React.useState(false)
    useEffect(() => {
        if (!!data, !!user) {
            setError(false)
        } else {
            setError(true)
        }
        console.log(data, user)
    }, [data, user])


    var [showNumber, setShowNumber] = React.useState(1)
    return (
        <>
            {(!!user && !!data) && <div className='pro-basic'>
                <Head>
                    <title>Preview - ({data.websiteDetail.title})</title>
                    <meta name="description" content={data.websiteDetail.description} />
                </Head>
                <div className="pro-header">
                    <div className="pro-header-bg">
                        {(data.landing.bgimg) ? <img src={data?.landing.bgImg} alt="" /> :
                            <img src="https://th.bing.com/th/id/R.14911ae05bd97ed583f57b18376a4c6a?rik=heIG%2bZDE4HwuIQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f1%2f9%2f2%2f1086460-amazing-programmer-wallpapers-2560x1440-for-mobile-hd.jpg&ehk=VwVE8A9FjRKziwgiOZQXSrKsnuiN0jOXjsfV4uBAtlI%3d&risl=&pid=ImgRaw&r=0" alt="" />}
                    </div>
                    <div className="pro-header-content">
                        {(!!data.landing.heading) ? <h1 className='text text-warning'>{data.landing.heading}</h1> :
                            <h1 className='text text-warning'>Welcome!!!</h1>
                        }
                        {(!!data.landing.subHeading) ? <p>{data.landing.subHeading}</p>
                            :
                            <p>Hey, I am {user?.name} and this is my portfolio website.Thank you for visiting me. You can learn about me by readyng my portfolio below</p>
                        }
                    </div>

                </div>
                <div className="pro-about">
                    <div className="pro-about-abs">
                        {(!!data.about.heading) ? <h2 className='text text-warning'>{data.about.heading}</h2> :
                            <h1 className='text text-warning'>About Me</h1>
                        }
                    </div>
                    {/*Personal Details */}
                    {(showNumber == 1) && <div className="pro-about-desc-card" onClick={() => setShowNumber(2)}>
                        <div className="padc-close">
                            <div className="padc-btns">
                                <div className="padc-btn"></div>
                                <div className="padc-btn"></div>
                                <div className="padc-btn"></div>
                            </div>
                        </div>
                        <p><span className='const'>const</span> person = &#10100;</p>
                        <div className="padc-det">
                            <p><span>name: </span>"{user.name},"</p>
                            <p><span>email:</span>"{user.email},"</p>
                            <p><span>location:</span>"{user.location},"</p>
                            <p><span>profession:</span>"{user.profession},"</p>
                            {(user.website) ? <p><span>website:</span>"{user.website}"</p> : null}
                        </div>
                        <p>&#10101;;</p>
                    </div>}
                    {/* projects */}

                    {(showNumber == 2) && <div className="pro-about-desc-card" onClick={() => setShowNumber(3)}>
                        <div className="padc-close">
                            <div className="padc-btns">
                                <div className="padc-btn"></div>
                                <div className="padc-btn"></div>
                                <div className="padc-btn"></div>
                            </div>
                        </div>
                        <p><span className='const'>const</span> projects = &#10100;</p>
                        {posts.length > 0 ? posts.slice(0, 3).map((post, index) => {
                            return (
                                <div className="padc-det padt-proj">
                                    &#10100;
                                    <p><span>Id:</span>"{post.$id},"</p>
                                    <p key={index}><span>title: </span>"{post.title},"</p>
                                    &#10101;,
                                </div>
                            )
                        })
                            :
                            <div className="padc-det padt-proj">
                                <p><span>status:</span>"404",</p>
                                <p><span>message:</span>"No projects found"</p>,
                            </div>
                        }
                        <p>&#10101;;</p>
                    </div>}
                    {/* socials */}
                    {(showNumber == 3) && <div className="pro-about-desc-card" onClick={() => setShowNumber(1)}>
                        <div className="padc-close">
                            <div className="padc-btns">
                                <div className="padc-btn"></div>
                                <div className="padc-btn"></div>
                                <div className="padc-btn"></div>
                            </div>
                        </div>
                        <p><span className='const'>const</span> socials = &#10100;</p>
                        {socials.length > 0 ? socials.map((social, index) => {
                            // remove www and .com
                            var newdom = social.domain.replace('www.', '')
                            newdom = newdom.replace('.com', '')

                            return (
                                <div className="padc-det">
                                    <p><span>{newdom}:</span>"<a href={`https://${social.domain}${social.username}`} target='_blank'>{social.domain}{social.username}</a>,"</p>
                                </div>
                            )
                        })
                            :
                            <div className="padc-det">
                                <p><span>status:</span>"404",</p>
                                <p><span>message:</span>"No socials found"</p>,
                            </div>
                        }
                        <p>&#10101;;</p>
                    </div>}

                    <div className="pro-about-pics">
                        <div className="pro-about-pics-img">
                            {(!!data.about.aboutImage) ? <img src={data.about.aboutImage} alt="user Image" /> :
                                <img src={user.image} alt="user Image" referrerPolicy='no-referrer' />}
                        </div>
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
            </div>}
            {(!data || !user) && <div className="pro-loading">
                <div className="pro-loading-content">

                    <div className="pro-loading-content-text">
                        <h1 className='text text-warning'>Loading...</h1>
                    </div>
                </div>
            </div>
            }
        </>

    )
}

export default Basic