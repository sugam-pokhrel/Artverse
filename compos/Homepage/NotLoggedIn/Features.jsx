import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

function Features() {
    const { ref, inView } = useInView()
    return (
        <motion.div
            className="px-10 py-8 "
            ref={ref}
            initial={{ transform: 'translateX(-100%)', opacity: 0 }}
            animate={{ transform: (inView) ? 'translateX(0%)' : 'translateX(-100%)', opacity: (inView) ? 1 : 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <h1 className="mb-8 text-center text-3xl font-bold text ">Features of Artverse :</h1>

            <ul className="grid place-content-center items-center w-full sm:grid-cols-2 gap-8">
                <li className="flex items-center justify-center">
                    <div className="px-4 text-5xl font-extralight text ">01.</div>
                    <div>
                        <div className="text-xl font-bold text ">Portfolio</div>
                        <p className="max-w-xs py-2 text-sm text ">User will be able to create their own portfolio site in a minute without even a single line of coding, they can choose theme based on their interest and showcase their skills and projects among the world</p>
                    </div>
                </li>
                <li className="flex items-center justify-center">
                    <div className="px-4 text-5xl font-extralight text ">02.</div>
                    <div>
                        <div className="text-xl font-bold text ">Custom Link</div>
                        <p className="max-w-xs py-2 text-sm text ">Users will be able to create a parent page, where they can add multiple social handlers, and they can share that link with anyone, so that they can find all the social handlers of that person at one place.
                        </p>
                    </div>
                </li>
                <li className="flex items-center justify-center">
                    <div className="px-4 text-5xl font-extralight text ">03.</div>
                    <div>
                        <div className="text-xl font-bold text ">Show Their Project</div>
                        <p className="max-w-xs py-2 text-sm text ">User can show their projects to the world, they can add their projects with title, description, and link to the project, so that anyone can see their project and can contact them for any query.
                        </p>
                    </div>
                </li>
                <li className="flex items-center justify-center">
                    <div className="px-4 text-5xl font-extralight text ">04.</div>
                    <div>
                        <div className="text-xl font-bold text ">Grow</div>
                        <p className="max-w-xs py-2 text-sm text ">User can grow their network by connecting with other users, they can follow other users, and can see their projects, and can contact them for any query.
                        </p>
                    </div>
                </li>
                <li className="flex items-center justify-center">
                    <div className="px-4 text-5xl font-extralight text ">05.</div>
                    <div>
                        <div className="text-xl font-bold text ">Skill matters</div>
                        <p className="max-w-xs py-2 text-sm text ">User can add their skills, so that other users can see their skills, and can contact them for any query.Also other can hire the user for various job based on user's Skills and parst projects
                        </p>
                    </div>
                </li>
            </ul>
        </motion.div>
    )
}

export default Features