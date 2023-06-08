import { getSession } from 'next-auth/react';
import { databases } from '../../../appwrite'
export default async function handler(req, res) {
    var session = await getSession({ req })

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "646c2809265ac09c5196");

    const userEmail = session.user.email
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var followers = []
        for (var i = 0; i < docs.length; i++) {
            if (docs[i].followers.includes(userEmail)) {
                followers.push(docs[i])
            }
        }
    }
    if (followers) {
        return res.status(200).json({ followings: followers, status: 200 })
    }
    else {
        return res.status(404).json({ status: 404, error: "No followers found" })
    }
}