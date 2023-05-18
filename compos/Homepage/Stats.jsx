import React, { useEffect, useState } from 'react'

function Stats() {
    var [month, setMonth] = useState("")
    var [day, setDay] = useState('')

    function getToday() {
        var date = new Date()



    }

    useEffect(() => {
        getToday()
    }, [])
    return (
        <div className="grid">
            <h2 className='text text-center text-4xl font-bold py-5'>Our website&apos;s Report</h2>
            <div className="stats shadow p-10 flex justify-center">
                <div className="stat place-items-center">
                    <div className="stat-title">User Registered</div>
                    <div className="stat-value">23</div>
                    <div className="stat-desc">From Feburary 1st to February 1st</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">23</div>
                    <div className="stat-desc text-secondary">↗︎ 25 (2%)</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">21</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    )
}

export default Stats