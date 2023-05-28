import { databases } from '../../../appwrite';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  var session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: "Not Authenticated" });
  }

  const { commentid } = req.body || req.query; //this refers to the postId
  if (req.method === 'PUT') {
      const docPromise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', commentid);
      const doc = await docPromise;
      
         const { commentBody } = req.body||session.user.email; //data must be passed as form data //the comment body must be provided as a stringifed json
          


        

        const updatePromise = databases.updateDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', commentid, { likes: [...doc.comments, commentBody] });
        const response = await updatePromise;
        res.send(response);
      
    } else {
      res.status(400).json({ msg: "Invalid request method" });
    }
  

 }
 