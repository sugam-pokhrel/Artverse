import React from 'react'
import { BsGoogle, BsFacebook } from 'react-icons/bs'
import { useSession, signIn, signOut } from "next-auth/react"

function Login() {
    const { data: session, status } = useSession()
    if (status === "loading") return <p>Loading...</p>
    if (status === "error") return <p>{error.message}</p>
    if (!session) {
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="p-5 bg-neutral flex justify-center items-center flex-col gap-5 rounded-2xl">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Log In to <span className='text text-secondary'>Artverse</span></h1>
                            <p className="py-5"> with your favourate social media, it will save your time, and you should not have to remember the password again and again.</p>
                            <div className="p-5 flex justify-center  flex-col gap-5">
                                <button className="btn flex items-center gap-5 btn-primary" onClick={() => signIn("google",{callbackUrl:"/auth"})}>
                                    <BsGoogle />
                                    Login with Google</button>
                                <button className="btn flex items-center gap-5 btn-secondary">
                                    <BsFacebook />
                                    Login With Facebook</button>
                            </div>
                            <p className='text text-warning opacity-80 text-xs'>By signing in, you accepts our <span className='text text-primary'>Terms and Conditions</span> and <span className='text text-primary'>Terms and Conditions</span>. Please review it before Signing in</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login