import { databases } from '../../../appwrite'
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "646c2809265ac09c5196");

    const userEmail = req.query.email
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.email === userEmail
        }
        )
        if (user) {
            return res.status(200).json({ user: user })
        }
        else {
            return res.status(404).json({ error: "User not found" })
        }
    }

}
