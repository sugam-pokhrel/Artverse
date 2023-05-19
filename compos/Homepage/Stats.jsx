import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Stats() {
    var [fullDate, setFullDate] = useState('')

    function getToday() {
        var date = new Date()
        var month = date.getMonth()
        //get date from 1 to 31
        var day = date.getDate()

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December']

        if (day < 10) {
            day = '0' + day
        }
        setFullDate(months[month] + ' ' + day + ', ' + date.getFullYear())
    }

    useEffect(() => {
        getToday()
    }, [])
    return (
        <div className="grid">
            <h2 className='text text-center text-4xl font-bold py-5'>Our website&apos;s Report</h2>
            <div className="stats flex-col sm:flex-row shadow p-10 flex justify-center">
                <div className="stat place-items-center">
                    <div className="stat-title">User Registered</div>
                    <div className="stat-value">33</div>
                    <div className="stat-desc">From Feburary 1 to {fullDate}</div>
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