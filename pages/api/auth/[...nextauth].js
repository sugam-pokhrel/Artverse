import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        })
        // ...add more providers here
    ],
    pages: {
        signIn: '/auth'
    }

}

export default NextAuth(authOptions)