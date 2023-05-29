import { databases } from '../../../appwrite'
import { getSession } from 'next-auth/react';
export default async function handler(req, res) {
    var session = await getSession({ req });
    if (!session) {
        res.status(401).send({ error: 'Unauthorized' })
        return
    }
    var { id } = req.query;
    var userEmail = session.user.email;

    //doesnt requre authentication for this
    const promise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', id);
    const response = await promise;
    // if likes array contains the user email, then return true
    if (response.likes.includes(userEmail)) {
        return res.send(true);
    }
    // else return false
    return res.send(false);
}