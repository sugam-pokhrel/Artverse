import { databases } from '../../../appwrite'

export default async function handler(req, res) {

    // dont need Sessions just to view post

    const { postid } = req.query;

    //this is the get

    const promise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);

    promise.then(function (response) {

        let userData = response.createdBy;

        if (req.method === 'GET') {

            res.send(response);

        }
        // Success
    }, function (error) {
        console.log(error); // Failure
    });




    if (req.method === 'PUT') {
        if (session.user.email != userData) {
            return res.status(401).json({ error: "Not Authenticated" });

        }

        const { formdata } = req.query; //data must be passed as form data


        // Process a PUT request

        const promise = databases.updateDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid, formdata);

        promise.then(function (response) {
            res.send(response) // Success this is the updated document
        }, function (error) {
            console.log(error); // Failure
        });

    }


    if (req.method === 'DELETE') {

        if (session.user.email != userData) {
            return res.status(401).json({ error: "Not Authenticated" });

        }



        // Process a Delete request

        const promise = databases.deleteDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);

        promise.then(function (response) {
            res.send({ msg: "deleted Successfully" }) // Success this is the updated document
        }, function (error) {
            console.log(error); // Failure
        });

    }




}
