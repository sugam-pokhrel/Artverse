import React from 'react'
import { useState, useEffect } from 'react'
import Login from '../Login/Login'
import { useSession } from 'next-auth/react'
import Socials from '../socialCard/Socials'



function Edit() {


    const session = useSession();
    if (!session) {
        return <Login />
    }
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
    let [profession, setProfession] = useState('Other');
    let [location, setLocation] = useState('');
    let [website, setWebsite] = useState('');
    let [bio, setBio] = useState('');
    useEffect(() => {
        // Define an async function to fetch the data
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users/' + session.data.user.email);  // Replace with your API endpoint URL
                if (response.ok) {
                    const json = await response.json();
                    
                    
                 if (!json.social === "" || json.social === null || json.social === undefined){
                    var jsonstr = JSON.parse(json.social)
                    setSocials(jsonstr)

                 }             


                    
                        
                                        
                    
                    // stringify the json
                    if (json.profession !== null) {
                        setProfession(json.profession);
                    }



                    if (json.location !== null) {
                        setLocation(json.location);
                    }

                    if (json.bio !== null) {
                        setBio(json.bio);
                    }

                    if (json.website !== null) {
                        setWebsite(json.website);
                    }


                } else {
                    // Handle the error case if needed
                    console.log('Error: ' + response.status);
                }
            } catch (error) {
                // Handle any network or fetch-related erroreks
                console.error('Error: ' + error);
            }
        };

        fetchData(); // Call the async function to fetch the data
    }, []); // Empty dependency array to run the effect only once


    function saveChanges() {
        const requestBody = {};

        if (profession.trim() !== '') {
            requestBody.profession = profession;
        }
        if (location.trim() !== '') {
            requestBody.location = location;
        }
        if (website.trim() !== '') {
            requestBody.website = website;
        }
        if (bio.trim() !== '') {
            requestBody.bio = bio;
        }
        if (socials.length > 0) {


            requestBody.social = JSON.stringify(socials);
        }


        console.log(requestBody)

        let url = '/api/users/' + session.data.user.email;
        console.log(url)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
            })
            .catch((error) => {
                // Handle the error
                console.error('Error:', error);
            });
    };

    const handleProfessionChange = (event) => {
        setProfession(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
        console.log(socials)
    };


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
            {/* Social Media form */}
            {showSocial && (
                <div className="ep-social">
                    <div className="socialAdd">
                        <input type="text" onChange={(e) => checkifWebsite(e.target)} placeholder="Enter or paste your link" />
                        <button className="btn btn-primary" onClick={submitSocial}>
                            Add
                        </button>
                        <button className="btn btn-warning" onClick={() => setShowSocial(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {/* Rest of the code */}
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
                    <select name="profession" id="profession" value={profession} onChange={handleProfessionChange}>
                        <option value="Student">Student</option>
                        <option value="Artist">Artist</option>
                        <option value="Musician">Musician</option>
                        <option value="Photographer">Photographer</option>
                        <option value="Writer">Writer</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Other">Other</option>
                    </select>
                    <span>Choose a profession, and our algorithm will set a homepage for you</span>
                </div>
                <div className="ep-etext">
                    <p>Location:</p>
                    <input type="text" placeholder="Where Do you live?" value={location} onChange={handleLocationChange} />
                </div>
                <div className="ep-etext">
                    <p>Website:</p>
                    <input
                        type="text"
                        placeholder="Enter your website if you have any"
                        value={website}
                        onChange={handleWebsiteChange}
                    />
                </div>
                <div className="ep-etext">
                    <p>Bio: </p>
                    <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Enter your bio" value={bio} onChange={handleBioChange}></textarea>
                </div>
                <div className="ep-etext">
                    <p>Socials Medias</p>
                    <button className="btn btn-base" onClick={showAddSocial}>
                        + Add
                    </button>
                    {socials.length > 0 && (
                        <div className="ep-socials">
                            {socials.map((social, index) => {
                                return (
                                    <div className="ep-soc-card" key={index}>
                                        <div className="ec-left">
                                            <Socials a={social.domain} />
                                            <p>
                                                {social.domain} - {social.username}
                                            </p>
                                        </div>
                                        <div className="ep-del">
                                            <button className="btn btn-primary bg-red-800">Remove</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="ep-etext">
                    {/* save */}
                    <button className="btn btn-primary" onClick={saveChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default Edit
