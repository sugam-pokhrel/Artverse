import React from 'react'
import Portfolio from '../../compos/Create/Portfolio'
import Head from 'next/head'

function portfolio() {
    return (
        <>
            <Head>
                <title>Create Portfolio | Artverse</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Create your portfolio with Artverse" />
            </Head>
            <Portfolio />
        </>
    )
}

export default portfolio