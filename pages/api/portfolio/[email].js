import { databases } from '../../../appwrite'
import { ID } from 'appwrite';
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

                // let social=user[0].social


                // if(social==null){

                //     social=[];
                // }
                // if(!social==null){
                //     social=JSON.parse(social)


                // }


                if(user[0]){
                    return res.send(user[0])
                
                }
               else{
                return res.send({msg:"notfound"})
               }
             
                
                
                // return res.send({social:social,profession:user[0].profession,location:user[0].location,bio:user[0].bio,website:user[0].website})
            
            }
            if (req.method === 'POST') {
                if(!user[0]){
                    const requestBody=req.body;

                    const promise = databases.createDocument('6468f10e6e9b67980c51',"6476a30f14f33a95d2a0",ID.unique(),requestBody );

                 
                promise.then(function (response) {
    return res.send(response); // Success
}, function (error) {
     return res.status(400).json({msg:error});  // Failure
});
} else{
                let current_userid=user[0].$id;
                const requestBody=req.body;

               
                const promise = databases.getDocument('6468f10e6e9b67980c51', "6476a30f14f33a95d2a0",current_userid );
                promise.then(function (response) {
                let updatedObj={...response,...requestBody};
                console.log(updatedObj)
                delete updatedObj['$collectionId'];
                delete updatedObj['$databaseId'];
                const promise = databases.updateDocument('6468f10e6e9b67980c51',"6476a30f14f33a95d2a0",current_userid,updatedObj );

                 
                promise.then(function (response) {
    return res.send(response); // Success
}, function (error) {
     return res.status(400).json({msg:error});  // Failure
});

//    Success
}
, function (error) {
    return res.status(400).json({msg:"err"}); // Failure
});}



            }
        }
        else {
            return res.status(404).json({ error: "User not found" })
        }
    }

}
