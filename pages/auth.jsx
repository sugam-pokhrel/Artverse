import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '../compos/Login/Login'
import { databases } from '../appwrite'
function auth() {
    const { data: session, status } = useSession()
    if (status === "loading") return <p>Loading...</p>
    if (status === "error") return <p>{error.message}</p>
    if (!session) {
        return (
            <Login />
        )
    }
    else {
        console.log(session.user.email)
        const promise = databases.listDocuments('6468f10e6e9b67980c51', '6468f11ef0b4d9ad1d9e');

    promise.then(function (response) {
    let  docs=response.documents
    docs.map(doc=>{
        if(!session.user.email==doc.email){
            const promise = databases.createDocument('6468f10e6e9b67980c51', '6468f11ef0b4d9ad1d9e',  ID.unique(), {name:session.user.name,email:session.user.email,img:session.user.image});
            promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});


        } else{
            console.log("user already in db")
        }
    })
    
}, function (error) {
    console.log(error); // Failure
});

        

        return (
            <div>Logged In</div>
        )
    }
}

export default auth