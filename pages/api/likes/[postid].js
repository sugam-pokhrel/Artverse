
import { databases } from '../../../appwrite'

import { getSession } from "next-auth/react";

export default async function handler(req, res) {

    var session = await getSession({ req })



    if (!session) {
        return res.status(401).json({ error: "Not Authenticated" });
    }




    const {postid}=req.body||req.query;

    //this is the get

    const promise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);

    promise.then(function (response) {

       
      

res.send({response})
    // Success
}, function (error) {
   res.send(error); // Failure
});

    
//for update

    if (req.method === 'PUT') {
        const doc = database.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);


    const {likedby}=req.body; //data must be passed as form data


    // Process a PUT request

const promise = databases.updateDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid,{ likes: [...doc.likes, likedby]});

promise.then(function (response) {
    res.send(response) // Success this is the updated document
}, function (error) {
   res.status(400).json({msg:"document not found"}) // Failure
});

  } 
}