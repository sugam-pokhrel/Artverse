import { databases } from '../../../appwrite'
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });
    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "6476a30f14f33a95d2a0");

    const userEmail = session.user.email;
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.email === session.user.email
        }
        )
        if (user) {

            if (req.method === 'GET') {

                if (user[0]) {
                    return res.send(true)
                }
                return res.send(false)
            }


        }
    }
}