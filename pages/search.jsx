import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SearchIndex from '../compos/search'

function search() {

    return (
        <div className='search'>
            <SearchIndex />
        </div>
    )
}

export default search