import { databases } from '../../../appwrite'
import { getSession } from 'next-auth/react';
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('646ed509771c8bf97447', "646ed512bc1b4def6d45");
    //   get only user's post
    const userEmail = req.query.email
    if (!!promise.documents) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.createdBy === userEmail
        }
        )
        if (user) {
            return res.status(200).json({ post: user })
        }
        else {
            return res.status(404).json({ error: "Post not found" })
        }
    }
}