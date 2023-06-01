import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react"

export default NextAuth({
    baseUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    // Configure one or more authentication providers

    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        })
        // ...add more providers here
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    pages: {
        signIn: '/auth'
    },
})