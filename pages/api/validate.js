import { databases } from "../../appwrite";


export default async function validate(req, res) {

    var email = req.query.email;

    const promise = databases.listDocuments('6468f10e6e9b67980c51', '646c2809265ac09c5196');

    promise.then(function (response) {
        let docs = response.documents
        const emailExists = docs.some(obj => obj.email === email);

        if (emailExists) {
            return res.status(200).json({ message: "Email exists" })
        } else {
            const promise = databases.createDocument('6468f10e6e9b67980c51', '646c2809265ac09c5196', ID.unique(), { name: session.user.name, email: session.user.email, image: session.user.image })
            promise.then(function (response) {
                return res.status(200).json({ message: "Email does not exist, so created one" })
            }, function (error) {
                return res.status(200).json({ message: error })
            });
        }

    }, function (error) {
        return res.status(200).json({ message: error })
    }
    );
}
