const { db } = require('../utils/admin');


// Get All Posts - (/api/posts)
exports.getAllPosts = (req, res) => {
    db  
        .collection('posts')
        .orderBy('createdAt', 'desc')   // order our response by newest post 1st
        .get()
        .then(data => {
            let posts = [];

            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    body: doc.data().body,
                    username: doc.data().username,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount
                }); // doc.data() - function that returns the data inside the document
            });

            return res.json(posts);
        })
        .catch(err => console.error(err));
}


// Add new post - (/api/post)
exports.addPost = (req, res) => {
    // if you send a GET method to a route which expects POST, send this error
    if(req.method !== 'POST') {
        return res.status(400).json({ error: 'Method not allowed!'});
    }

    const newPost = {
        body: req.body.body,
        username: req.user.username,
        createdAt: new Date().toISOString()
    };

    db
        .collection('posts')
        .add(newPost)
        .then(doc => {
            res.json({ message: `Document ${doc.id} added successfully!`});
        })
        .catch(err => {
            res.status(500).json({ message: 'Server Error'});
            console.error(err);
        });
}