import { useRouter } from 'next/router'
import React from 'react'

function Following({ user }) {
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
        <div className='f-card' onClick={gotouser}>
            {(!!user.image) && <img src={img} onError={() => console.log("error")} referrerPolicy='no-referrer' alt='User Image' />}
        </div>
    )
}

export default Following