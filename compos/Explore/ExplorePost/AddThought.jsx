import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function AddThought() {
    var session = useSession()
    var [auth, setAuth] = useState(false)
    var [thought, setThought] = useState('')
    useEffect(() => {
        if (session.status === 'authenticated') {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [session.data])

    function postComment() {
        if (!!thought) {
            // push comment
        } else {
            alert('Please enter a thought, thought cannot be empty')
        }
    }

    return (
        <div className='addThought'>
            {auth ? (
                <div className="addThought-input flex">
                    <img src={session.data.user.image} alt="" />
                    <input type="text" placeholder='Add a thought...' onChange={(e) => setThought(e.target.value)} />
                    <button className='btn btn-primary' onClick={postComment}>Post</button>
                </div>
            ) : (
                <div className="addThought-input flex">
                    <h2><Link href={"/auth"}>Login</Link> to add a thought to this project</h2>
                </div>
            )}
        </div>
    )
}

export default AddThought