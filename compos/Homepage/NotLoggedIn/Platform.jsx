import React from 'react'
import site from '../../../images/sites.png'
import Image from 'next/image'
import TextTransition, { presets } from 'react-text-transition';
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';

const TEXTS = ['Artist', 'Singer', 'Designer', 'Developers', 'Writer', 'Student'];

function Platform() {
    const [index, setIndex] = React.useState(0);
    const { ref, inView } = useInView()

    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
        <motion.div className="hero min-h-screen bg-base-200"
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: (inView) ? 1 : 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className="hero-content flex-col lg:flex-row-reverse">
                <Image src={site} className='w-60 sm:max-w rounded-lg shadow-2xl' />
                <div className='max-w-xl'>
                    <h1 className="text-xl sm:text-4xl font-bold flex ">
                        A platform for
                        <TextTransition className='text text-warning pl-4' springConfig={presets.slow}> {TEXTS[index % TEXTS.length]}</TextTransition>
                        .
                    </h1>
                    <p className="py-6 text-sm sm:text-xl">Show your talent to the world by making a perfect portfolio for your profile also that, for free with zero idea about coding.. </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </motion.div>
    )
}

export default Platform