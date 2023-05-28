import { databases } from '../../../appwrite';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { likedid } = req.query;

  try {
    if (req.method === 'GET') {
      const promise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', likedid);
      const response = await promise;
      res.send(response.likes);
    } else if (req.method === 'POST') {
      // const session = await getSession({ req });

      // if (!session) {
      //   return res.status(401).json({ error: "Not Authenticated" });
      // }

      const likedby = req.body.likedby; // Access the likedby value from req.body
      const docPromise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', likedid);
      const doc = await docPromise;
      let emails = doc.likes;

      if (emails.includes(likedby)) {
        const updatedemails = emails.filter((email) => email !== likedby);

        const updatePromise = databases.updateDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', likedid, { likes: updatedemails });
        const response = await updatePromise;
        res.send({ msg: "done" });
      } else {
        const updatePromise = databases.updateDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', likedid, { likes: [...doc.likes, likedby] });
        const response = await updatePromise;
        res.send(response);
      }
    } else {
      return res.status(400).json({ msg: "Invalid request method" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
