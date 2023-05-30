import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
function index() {
    var router = useRouter()

    useEffect(() => {
        router.push('/me')
    }, [])

    return (
        <div></div>
    )
}

export default index