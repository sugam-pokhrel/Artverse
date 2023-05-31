import React, { useEffect } from 'react'
import Socials from '../socialCard/Socials'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function Linkcard({ links, user }) {
    var router = useRouter()
    var [loading, setLoading] = React.useState(true)
    var [showQr, setShowQr] = React.useState(false)
    var [showCopied, setShowCopied] = React.useState(false)
    var [sameUserx, setSameUser] = React.useState(false)
    var session = useSession()

    function sameUser() {
        if (session.data.user.email === user.email) {
            setSameUser(true)
        } else {
            setSameUser(false)
        }
    }

    useEffect(() => {
        if (!!user) {
            setLoading(false)
            sameUser()
        } else {
            setLoading(true)
        }
        console.log(user)
    }, [user])
    function getQr() {
        setShowQr(!showQr)
        try {

            setTimeout(() => {
                var qr = document.getElementById('getqr')
                // get befor @ of email
                var username = user?.email.split('@')[0]
                // get full website name
                var website = window.location.origin
                var url = website + "/linkify/" + username
                if (qr)
                    qr.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}" alt="qr code" />`
            }, 100);

        } catch (error) {

        }
    }
    function toggleCopied() {
        setShowCopied(!showCopied)
        setTimeout(() => {
            setShowCopied(false)
        }, 3000);
        // copy to clipboard
        var username = user?.email.split('@')[0]
        // get full website name
        var website = window.location.origin
        var url = website + "/linkify/" + username
        navigator.clipboard.writeText(url)
    }



    return (
        <div className='hero h-screen flex justify-center items-center'>

            {(!loading) && <div className="link-card">
                <h2 className='text text-warning text-2xl font-bold '>Linkify - Manage Links</h2>
                <div className="link-card-header">
                    <img src={user?.image} alt="" referrerPolicy='no-referrer' />
                </div>
                {(links) && <div className="link-card-links">
                    <h2>Social Media Links</h2>
                    {links.map((link, index) => (
                        <Link href={"https://" + link.domain + link.username} target="_blank" className="ep-soc-card" key={index} >
                            <div className="ec-lefty ec-left">
                                <Socials a={link.domain} />
                                <p>
                                    {link.domain}{link.username}
                                </p>
                            </div>
                        </Link>
                    ))}
                    <div className="ep-bts">
                        {(sameUserx) && <div className="btn btn-primary" onClick={() => router.push("/profile/edit")}>Add more</div>}
                        <div className="btn btn-warning" onClick={toggleCopied}>Share</div>
                        <div className="btn btn-info" onClick={getQr}>
                            {(showQr) ? "Hide QR" : "Get QR"}
                        </div>
                    </div>
                    {(showQr) && <div className="getQr">
                        <p>Share this QR code with other to navigate to this linkify page</p>
                        <div id="getqr"></div>
                    </div>}
                </div>
                }
                {(!links) && <div className="link-card-links">
                    <h2>No Links Found</h2>
                </div>
                }
            </div>}
            {(loading) &&
                <div className="explore-load">
                    <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
                </div>}
            {(showCopied) && <div className="copied">
                <div className="alert alert-success shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Share link has been copied to clipboard!</span>
                    </div>
                </div>
            </div>}
            {(showQr) && <div className="copied">
                <div className="alert alert-info shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>QR code has been Generated, download and Share!</span>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Linkcard