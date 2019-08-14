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

// Get a post (with comments)
exports.getPost = (req, res) => {
    let postData = {};

    db.doc(`/posts/${req.params.postId}`).get()
        .then(doc => {
            if(!doc.exists) {
                return res.status(404).json({ error: 'Post not found!' });
            }

            postData = doc.data();  
            postData.postId = doc.id;   // also insert the postId in our postData object

            // now we need to add in all the comments for this post
            return db.collection('comments').orderBy('createdAt', 'desc').where('postId', '==', req.params.postId).get();
        })
        .then(data => {
            postData.comments = [];
            data.forEach(doc => {
                postData.comments.push(doc.data())   // insert comments
            });

            return res.json(postData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// Add new comment to a post
exports.addCommentToPost = (req, res) => {
    
    // Check for empty comment
    if(req.body.body.trim() === "") {
        return res.status(400).json({ error: 'Must not be empty '});
    }

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        username: req.user.username,
        userImage: req.user.imageUrl
    }

    // Check if this post exists
    db.doc(`/posts/${req.params.postId}`).get()
        .then(doc => {
            if(!doc.exists) {
                res.status(404).json({ error: 'Post not found!' })
            }
            return db.collection('comments').add(newComment)
        })
        .then(() => {
            res.json(newComment);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong' });
        });


}