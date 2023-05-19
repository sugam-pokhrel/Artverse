import React from 'react'
import site from '../../images/sites.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'


function Landing() {
    const { ref, inView, entry } = useInView()
    var router = useRouter()
    function navLogin() {
        router.push('/login')
    }
    function navExplore() {
        router.push('/explore')
    }
    return (
        <motion.div className="hero min-h-screen bg-base-200 landing"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: (inView) ? 1 : 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className="hero text-center ">
                <div className="max-w-md">
                    <h1 className="text-6xl font-bold">Hello Artist!!</h1>
                    <p className="py-8">Showcase your projects and skills with millions of internet users in a minute, make your portfolio now, with <span className='text text-warning'>Zero</span> Coding. </p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={navLogin} className="btn btn-primary">Create a Portfolio</button>
                        <button onClick={navExplore} className='btn btn-secondary'>Explore</button>
                    </div>
                    <p className='text-1xl py-4'>*Try now for Free</p>
                </div>
            </div>

        </motion.div>
    )
}

export default Landing