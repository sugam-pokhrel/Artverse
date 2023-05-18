import React from 'react'
import site from '../../images/sites.png'
import Image from 'next/image'


function Landing() {
    return (
        <div className="hero min-h-screen bg-base-200 landing">
            <div className="hero text-center ">
                <div className="max-w-md">
                    <h1 className="text-6xl font-bold">Hello Artist!!</h1>
                    <p className="py-8">Showcase your projects and skills with millions of internet users in a minute, make your portfolio now, with <span className='text text-warning'>Zero</span> Coding. </p>
                    <div className="flex gap-3 justify-center">
                        <button className="btn btn-primary">Create a Portfolio</button>
                        <button className='btn btn-secondary'>Explore</button>
                    </div>
                    <p className='text-1xl py-4'>*Try now for Free</p>
                </div>
            </div>

        </div>
    )
}

export default Landing