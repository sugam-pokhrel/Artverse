import { databases } from '../../../appwrite'
export default async function handler(req, res) {
    const {postid}=req.query;

    const promise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);

    promise.then(function (response) {
    res.send(response); // Success
}, function (error) {
    console.log(error); // Failure
});

}
