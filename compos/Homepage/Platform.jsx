import React from 'react'
import site from '../../images/sites.png'
import Image from 'next/image'
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Artist', 'Singer', 'Designer', 'Developers', 'Writer', 'Student'];

function Platform() {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <Image src={site} className='max-w-sm rounded-lg shadow-2xl' />
                <div className='max-w-xl'>
                    <h1 className="text-4xl font-bold flex ">
                        A platform for
                        <TextTransition className='text text-warning pl-4' springConfig={presets.slow}> {TEXTS[index % TEXTS.length]}</TextTransition>
                        .
                    </h1>
                    <p className="py-6">Show your talent to the world by making a perfect portfolio for your profile also that, for free with zero idea about coding.. </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Platform