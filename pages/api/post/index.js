import { databases } from '../../../appwrite'
import { getSession } from 'next-auth/react';
export default async function handler(req, res) {
    
    var session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ error: "Not Authenticated" });
    }
    const promise =  databases.listDocuments('646ed509771c8bf97447',"646ed512bc1b4def6d45");
    promise.then(function (response) {
    res.send(response); // Success
}, function (error) {
    console.log(error); // Failure
});

}
