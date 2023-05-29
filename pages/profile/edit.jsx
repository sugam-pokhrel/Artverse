import { useSession } from 'next-auth/react'
import React from 'react'
import Edit from '../../compos/Settings/EditProfile'

function edit() {
    var session = useSession()
    var [loading, setLoading] = React.useState(true)
    var [auth, setAuth] = React.useState(false)
    React.useEffect(() => {
        if (session.status === 'loading') {
            return
        }
        if (session.status === 'authenticated') {
            setAuth(true)
            setLoading(false)
        } else {
            setAuth(false)
            setLoading(false)
        }
        if (session.status === 'unauthenticated') {
            window.location.href = '/login'
        }
    }, [session.status])

    return (
        <div className='editProfile'>
            {(auth && !loading) &&
                <Edit />
            }
        </div>
    )
}

export default edit