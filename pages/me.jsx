import React from 'react'
import Home from '../compos/Me/Home'
import { useSession } from 'next-auth/react'

function me() {
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
    }, [session.status])

    return (
        <div>
            {(auth && !loading) ? <Home /> : <div className='h-screen w-full flex flex-col justify-center items-center'>
                <h2 >Login to view this Page</h2>
            </div>}
        </div>
    )
}

export default me