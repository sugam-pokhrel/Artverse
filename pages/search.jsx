import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SearchIndex from '../compos/search'
import Head from 'next/head'

function search() {

    return (
        <div className='search'>
            <Head>
                <title>Search | ArtVerse</title>
                <meta name="description" content="Search ArtVerse, see the letest projects that has been uploaded to artverse Recently" />
            </Head>
            <SearchIndex />
        </div>
    )
}

export default search