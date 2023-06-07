import { databases } from '../../../appwrite'
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const posts = await databases.listDocuments('646ed509771c8bf97447', "646ed512bc1b4def6d45");
    const user = await databases.listDocuments('6468f10e6e9b67980c51', "646c2809265ac09c5196");

    var query = req.query.query

    var userResults = []
    var postResults = []

    if (posts) {
        var docs = posts.documents
        // search for query in title and description
        var results = docs.filter(function (post) {
            // search both uppercase and lowecase
            query = query.toLowerCase()
            var title = post?.title.toLowerCase()
            var description = post?.desc.toLowerCase()
            return title.includes(query) || description.includes(query)
        }
        )
        if (results) {
            postResults = results
        } else {
            postResults = []
        }

    }
    if (user) {
        var docs = user.documents
        // search for query in title and description
        var results = docs.filter(function (user) {
            // search both uppercase and lowecase
            query = query.toLowerCase()
            var name = user?.name.toLowerCase()
            var email = user?.email.toLowerCase()
            return name.includes(query) || email.includes(query)
        }
        )
        if (results) {
            userResults = results
        } else {
            userResults = []
        }
    }

    if (userResults || postResults) {
        return res.status(200).json({ user: userResults, post: postResults })
    }
    else {
        return res.status(404).json({ error: "No results found" })
    }
}