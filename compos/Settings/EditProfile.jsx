import React from 'react'
import { useSession } from 'next-auth/react'

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
        var domain = url.split('/')[2]
        // setDomain(domain)
        var afterDomain = url.trim().substring(domain.length + 8)
        // setUsername(afterDomain)
    }
    function submitSocial() {
        var socials = socials
        socials.push({ domain: domain, username: username })
        setSocials(socials)
        setDomain('')
        setUsername('')
    }
    return (
        <div className="ep-home">
            {/* <div className="ep-social">
                <div className="socialAdd">
                    <input type="text" onChange={(e) => checkifWebsite(e.target)} placeholder='Enter or paste your link' />
                    <button className='btn btn-primary' onClick={submitSocial}>Add</button>
                    <button className='btn btn-warning'>Cancel</button>

                </div>
            </div> */}
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
                    <button className='btn btn-base'>+ Add</button>
                </div>
            </div>
        </div>
    )
}

export default Edit