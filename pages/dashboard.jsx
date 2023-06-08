import React, { useState, useEffect } from 'react'
import Dashboard from '../compos/Homepage/LoggedIn/Dashboard'
import { useSession } from 'next-auth/react'

function dashboard() {
    var [auth, setAuth] = useState(false)
    var [loading, setLoading] = useState(true)
    var session = useSession()
    useEffect(() => {
        if (session.status === 'authenticated') {
            setAuth(true)
            setLoading(false)
        } else if (session.status === 'unauthenticated') {
            setAuth(false)
            setLoading(false)
        }
    }, [session])

    return (
        <div className="dash">{(auth && !loading) ? <Dashboard /> :
            null
        }
            {(!auth && !loading) && <div className="dash">
                <h1 className='text-3xl font-bold'>You are not logged in</h1>
                <p className='text-xl'>Please login to view your dashboard</p>
            </div>}
        </div>
    )
}

export default dashboard