import React from 'react'
import { useSession } from 'next-auth/react'

function Social(a) {
    console.log(a.a)
    var social = a.a
    var iconval = ""
    var icons = {
        'facebook': 'https://th.bing.com/th/id/OIP.hGaetDAQWapgIJbIOhPhXwHaHa?pid=ImgDet&rs=1',
        'twitter': 'https://th.bing.com/th/id/R.3f7189662f19f8318fc75252deee723a?rik=Qa956Np1tp8Zcg&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f06%2fTwitter-Logo.png&ehk=6ekNd2ZmhpvFDGRZF19QcumP9fb8pZRkwrbFbK%2bpULA%3d&risl=&pid=ImgRaw&r=0',
        'instagram': 'https://freepngimg.com/thumb/computer/68394-computer-instagram-icons-png-file-hd.png',
        'linkedin': 'https://th.bing.com/th/id/R.c3fcc390427d68b89647e834adf7fc87?rik=5W%2fa9g9fys8WDg&pid=ImgRaw&r=0',
        'youtube': 'https://hdclipartall.com/images/youtube-clipart-youtube-square-icons-1600x1600.png',
        'github': 'https://th.bing.com/th/id/R.7aaf70cb7b91181819e62720db9e4498?rik=3yIi20%2beDqXgdw&pid=ImgRaw&r=0',
        'pinterest': 'https://th.bing.com/th/id/R.6e9e33c516506bb8b599a2b6b8b55b4c?rik=F%2ftQNhVjNOkX4Q&pid=ImgRaw&r=0',
        "tiktok": 'https://th.bing.com/th/id/R.4a691e981276229f1c6bd2117efc82ab?rik=jjHjItPM2%2bCP0A&pid=ImgRaw&r=0',
        "messenger": "https://th.bing.com/th/id/R.a2d9a1da2c43ae5a0545a0c28d15b67a?rik=9GjiRln4TkgiGQ&pid=ImgRaw&r=0"
    }
    // remove www. and .com from domain
    social = social.replace('www.', '')
    social = social.replace('.com', '')
    social = social.replace('.in', '')
    social = social.replace('.co', '')
    social = social.replace('.org', '')
    social = social.replace('.net', '')
    social = social.replace('.edu', '')
    social = social.replace('.gov', '')
    social = social.replace('.io', '')
    social = social.replace('.ai', '')
    social = social.replace('.me', '')
    // lowercase
    social = social.toLowerCase()
    // check if social is in icons
    if (social in icons) {
        iconval = icons[social]
    } else {
        iconval = 'https://th.bing.com/th/id/R.53c27d1ef4ab5c32521eccf5d1061397?rik=212WzEK%2fXS9XTQ&pid=ImgRaw&r=0'
    }
    return (
        <div className="ep-soc-">
            <img src={iconval} alt="icons" />
        </div>
    )
}

function Edit() {
    var session = useSession()
    var [auth, setAuth] = React.useState(false)
    React.useEffect(() => {
        if (session.status === 'loading') {
            return
        }
        if (session.status === 'authenticated') {
            setAuth(true)
        } else {
            setAuth(false)
        }
        if (session.status === 'unauthenticated') {
            window.location.href = '/login'
        }
    }, [session.status])
    var [domain, setDomain] = React.useState('')
    var [username, setUsername] = React.useState('')
    var [socials, setSocials] = React.useState([])

    function checkifWebsite(e) {
        var url = e.value
        if (url.includes('https://') || url.includes('http://')) {
            e.style.border = '1px solid transparent'

        } else {
            e.style.border = '1px solid red'
        }
        try {
            var domain = url.split('/')[2]
            setDomain(domain)

            var afterDomain = url.trim().substring(domain.length + 8)
            setUsername(afterDomain)
        } catch (error) {
            // 
        }

    }
    const [showSocial, setShowSocial] = React.useState(false)
    function submitSocial() {
        if (!!domain && !!username) {

            setSocials([...socials, { domain: domain, username: username }])
            setDomain('')
            setUsername('')
            setShowSocial(false)
        } else {
            alert("Your URL isnt Valid")
        }
    }
    function showAddSocial() {
        setShowSocial(true)
    }
    return (
        <div className="ep-home">
            {(showSocial) && <div className="ep-social">
                <div className="socialAdd">
                    <input type="text" onChange={(e) => checkifWebsite(e.target)} placeholder='Enter or paste your link' />
                    <button className='btn btn-primary' onClick={submitSocial}>Add</button>
                    <button className='btn btn-warning' onClick={() => setShowSocial(false)}>Cancel</button>

                </div>
            </div>}
            <div className="editProfile__header">
                <div className="ep-image">
                    <img src={session.data.user.image} alt="" referrerPolicy='no-referrer' />
                </div>
                <div className="ep-info">
                    <div className="ep-name">
                        <h1>{session.data.user.name}</h1>
                        <h1>/ Edit Profile</h1>
                    </div>
                    <div className="ep-gyan">
                        <p>Set up your accunt to 100% to create a faboulous Portfolio</p>
                    </div>
                </div>
            </div>
            <div className="ep-earea">
                <div className="ep-etext">
                    <p>Name:</p>
                    <input type="text" value={session.data.user.name} readOnly />
                    <span>This Name field is readonly and cannot be edited</span>
                </div>
                <div className="ep-etext">
                    <p>Email:</p>
                    <input type="text" value={session.data.user.email} readOnly />
                    <span>This Email field is readonly and cannot be edited</span>
                </div>
                <div className="ep-etext">
                    <p>Profession:</p>
                    <select name="profession" id="profession">
                        <option value="Student">Student</option>
                        <option value="Artist">Artist</option>
                        <option value="Musician">Musician</option>
                        <option value="Photographer">Photographer</option>
                        <option value="Writer">Writer</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Other">Other</option>
                    </select>
                    <span>Choose a profession, and our algorithm will set homepage for you</span>
                </div>
                <div className="ep-etext">
                    <p>Location:</p>
                    <input type="text" placeholder="Where Do you live?" />
                </div>
                <div className="ep-etext">
                    <p>Website:</p>
                    <input type="text" placeholder="Enter your website if you have any" />
                </div>
                <div className="ep-etext">
                    <p>Bio: </p>
                    <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Enter your bio"></textarea>
                </div>
                <div className="ep-etext">
                    <p>Socials Medias</p>
                    <button className='btn btn-base' onClick={showAddSocial}>+ Add</button>
                    {(socials.length > 0) && <div className="ep-socials">
                        {socials.map((social, index) => {
                            return (
                                <div className="ep-soc-card" key={index}>
                                    <div className="ec-left">
                                        <Social a={social.domain} />
                                        <p>{social.domain} - {social.username}</p>
                                    </div>
                                    <div className="ep-del">
                                        <button className='btn btn-primary bg-red-800'>Remove</button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>}
                </div>
                <div className="ep-etext">
                    {/* save */}
                    <button className='btn btn-primary'>Save Changes</button>

                </div>
            </div>
        </div>
    )
}

export default Edit