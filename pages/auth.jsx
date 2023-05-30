import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '../compos/Login/Login'
import { databases } from '../appwrite'
import { ID } from 'appwrite';
import { useRouter } from 'next/router'
function auth() {
    const { data: session, status } = useSession()
    var router = useRouter()
    if (status === "loading") return <p>Loading...</p>
    if (status === "error") return <p>{error.message}</p>
    if (!session) {
        return (
            <Login />
        )
    }
    else {
        console.log(session.user.email)
        const promise = databases.listDocuments('6468f10e6e9b67980c51', '646c2809265ac09c5196');

        promise.then(function (response) {
            let docs = response.documents
            console.log(docs)

            const emailToFind = session.user.email;

            const emailExists = docs.some(obj => obj.email === emailToFind);

            if (emailExists) {
                console.log("Email exists in the array");
            } else {
                console.log("Email does not exist in the array");
                const promise = databases.createDocument('6468f10e6e9b67980c51', '646c2809265ac09c5196', ID.unique(), { name: session.user.name, email: session.user.email, image: session.user.image })

                promise.then(function (response) {

                }, function (error) {

                });
            }
            router.push('/')

            // let isUser=false;
            // docs.map(doc=>{
            //     if(session.user.email==doc.email){
            //         isUser=true


            //     }

            // console.log(isUser)    

            //         if(!isUser){
            //              const promise = databases.createDocument('6468f10e6e9b67980c51', '6468f11ef0b4d9ad1d9e',  ID.unique(), {name:session.user.name,email:session.user.email,image:session.user.image});
            //             promise.then(function (response) {
            //     console.log(response); // Success
            // }, function (error) {
            //     console.log(error); // Failure
            // });

            //         } 
        })

        // }, function (error) {
        //     console.log(error); // Failure
        // });



        return (
            <div className="explore-load">
                <img src="https://i.ibb.co/sWNd2Vc/ARTVERSE-1.gif" alt="loading" />
            </div>
        )
    }
}

export default auth