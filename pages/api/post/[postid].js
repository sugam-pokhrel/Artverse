import { databases } from '../../../appwrite';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not Authenticated' });
  }

  const { postid } = req.body || req.query;

  try {
    const promise = databases.getDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);
    const response = await promise;
    const userData = response.createdBy;

    if (req.method === 'GET') {
      res.send(response);
    } else if (req.method === 'PUT') {
      if (session.user.email !== userData) {
        return res.status(401).json({ error: 'Not Authenticated' });
      }

      const { formdata } = req.body||req.query; // Data must be passed as form data

      const updatePromise = databases.updateDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid, formdata);
      const updateResponse = await updatePromise;
      res.send(updateResponse);
    } else if (req.method === 'DELETE') {
      if (session.user.email !== userData) {
        return res.status(401).json({ error: 'Not Authenticated' });
      }

      const deletePromise = databases.deleteDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', postid);
      await deletePromise;
      res.send({ msg: 'Deleted Successfully' });
    } else {
      res.status(400).json({ msg: 'Invalid request method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
