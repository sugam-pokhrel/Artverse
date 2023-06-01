import { databases } from '../../../appwrite'
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "6476a30f14f33a95d2a0");

    const userEmail =req.query.email
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.email === req.query.email
        }
        )
        if (user) {
           
            if(req.method ==='GET'){

                if(user[0]){
                    return res.send(true)
                }
                return res.send(false)


               
                
             
                
                
                
            
            }
        
        
        }
    }
}