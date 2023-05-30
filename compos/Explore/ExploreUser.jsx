import React from 'react'
import Link from 'next/link'
import { AiOutlineInfoCircle, AiOutlineGlobal } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'

function ExploreUser({ user }) {
    return (
        <div className='ep-userCard'>
            <div className="epc-top">
                <img src={user?.image} alt="" referrerPolicy='no-referrer' />
            </div>
            <div className="epc-info">
                <h2>{user?.name}</h2>
                {/* <p><AiOutlineInfoCircle/>{user?.bio}</p> */}
                {(user?.bio) ? <p className="epc-bio"><AiOutlineInfoCircle />{user?.bio}</p> : null}
                {(user?.location) ? <p className="epc-location"><GoLocation />{user?.location}</p> : null
                }
                {(user?.website) ? <p className="epc-website"><AiOutlineGlobal /><Link href={user?.website} target='_blank'>{user?.website}</Link></p> : null}
            </div>

        </div>
    )
}

export default ExploreUser