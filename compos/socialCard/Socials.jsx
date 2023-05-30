import React from 'react'

function Socials(props) {
    var social = props.a
    var iconval = ""
    var icons = {
        'facebook': 'https://th.bing.com/th/id/R.32415e54fa3a2cc29f7ddb9d4592dbfe?rik=YBhnPskHRg3cXA&pid=ImgRaw&r=0',
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

export default Socials