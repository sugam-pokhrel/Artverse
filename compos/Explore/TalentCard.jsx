import { useRouter } from 'next/router'
import React from 'react'

function TalentCard({ user }) {
    // chec if image exists
    var img = user.image
    var router = useRouter()
    function gotouser() {
        var email = user.email
        // split to make username
        var username = email.split('@')[0]
        router.push('/u/' + username)

    }
    return (
        <div className='t-card' >
            {(!!user.image) && <img src={img} referrerPolicy='no-referrer' alt='User Image' />}
            <div className="t-detail">
                <h1 className='text text-xl sm:text-xl'>{user.name}</h1>
                <p className='text text-sm sm:text-base'>{user.followers.length} Followers</p>
                <div className="btn btn-primary" onClick={gotouser}>Visit</div>
            </div>
        </div>
    )
}

export default TalentCard