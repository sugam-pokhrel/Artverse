import { databases } from '../../../appwrite'
import { ID } from 'appwrite';
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "646c2809265ac09c5196");

    const userEmail =req.query.email
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.email === req.query.email
        }
        )
        if (user) {
           let userId=user[0].$id;
            if(req.method ==='GET'){

                // let social=user[0].social


                // if(social==null){

                //     social=[];
                // }
                // if(!social==null){
                //     social=JSON.parse(social)


                // }


                if(user[0]){
                    if(!user[0].followers){
                         return res.send({ follow:0})
                    }else{
                        return res.send({follow:user[0].followers})
                    }
                   
                
                }
               else{
                return res.send({msg:"notfound"})
               }
             
                
                
                // return res.send({social:social,profession:user[0].profession,location:user[0].location,bio:user[0].bio,website:user[0].website})
            
            }
if (req.method === 'POST') {
      
     
      // if (!session) {
      //   return res.status(401).json({ error: "Not Authenticated" });
      // }

      const likedby = req.body.likedby;
      
      const docPromise = databases.getDocument('6468f10e6e9b67980c51', '646c2809265ac09c5196', userId);
      const doc = await docPromise;
      let emails = doc.followers;

      if (emails.includes(likedby)) {
        const updatedemails = emails.filter((email) => email !== likedby);

        const updatePromise = databases.updateDocument('6468f10e6e9b67980c51', '646c2809265ac09c5196', userId, { followers: updatedemails });
        const response = await updatePromise;
        res.send({ msg: "done" });
      } else {
        const updatePromise = databases.updateDocument('6468f10e6e9b67980c51', '646c2809265ac09c5196', userId, { followers: [...doc.followers, likedby] });
        const response = await updatePromise;
        res.send(response);
      }
    }
        }
        else {
            return res.status(404).json({ error: "User not found" })
        }
    }

}
