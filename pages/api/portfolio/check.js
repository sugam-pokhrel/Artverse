import { databases } from '../../../appwrite'
import { ID } from 'appwrite';
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "6476a30f14f33a95d2a0");

    const userEmail =req.body.email
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.email === req.query.email
        }
        )
        if (user) {
           
            res.send(true)

        
        
        }else{
            res.send(false)
        }
        
        
        
        }
    }