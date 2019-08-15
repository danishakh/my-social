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
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0
    };

    db
        .collection('posts')
        .add(newPost)
        .then(doc => {
            const resPost = newPost;
            resPost.postId = doc.id;    // add the postId of the post we just added

            res.json(resPost);
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
            // Increase commentCount
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
        })
        .then(() => {
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

// Like a post
exports.likePost = (req, res) => {
    // Get Like document - check if there is a like by our username for a specific postId
    const likeDoc = db.collection('likes').where('username', '==', req.user.username)
        .where('postId', '==', req.params.postId).limit(1);
    
    // Get Post document that needs to be liked
    const postDoc = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDoc.get()
        .then(doc => {
            if (doc.exists) {   // check if this post exists (cant like a post that doesnt exist)
                postData = doc.data();
                postData.postId = doc.id;
                return likeDoc.get();   
            }
            else {
                return res.status(404).json({ error: 'Post not found '});
            }
        })
        .then(data => {     // querySnapshot of returned like document
            if (data.empty) {   // if Like document for this postId by our username does NOT exist, add it
                return db.collection('likes').add({
                    postId: req.params.postId,
                    username: req.user.username
                })
                .then(() => {       // not sure why we are chaining then() inside here
                    postData.likeCount++        // increment likeCount of that post in posts document
                    return postDoc.update({ likeCount: postData.likeCount })
                })
                .then(() => {
                    return res.json(postData);
                })
            }
            else {
                return res.status(400).json({ error: 'Post already liked! '});
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// Unlike a post
exports.unlikePost = (req, res) => {

    const likeDoc = db.collection('likes').where('username', '==', req.user.username)
        .where('postId', '==', req.params.postId).limit(1);
    
    const postDoc = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDoc.get()
        .then(doc => {
            // Check if post exists
            if (doc.exists) {
                postData = doc.data();
                postData.postId = doc.id;
                return likeDoc.get();
            }
            else {
                return res.status(404).json({ error: 'Post not found '});
            }
        })
        .then(data => {
            // If no Like document returned that means we never even liked it
            if (data.empty) {
                return res.status(400).json({ error: 'Post not liked yet' });
            }
            else {
                // if there is a Like by our user for this post, delete it
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        // reduce the likeCount in our post and update post document
                        postData.likeCount--;
                        return postDoc.update({ likeCount: postData.likeCount });
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// Delete a post
exports.deletePost = (req, res) => {
    const postDoc = db.doc(`/posts/${req.params.postId}`);
    postDoc.get()
        .then(doc => {
            if(!doc.exists) {
                return res.status(404).json({ error: 'Post not found' });
            }
            // Check the userId to make sure user can only delete their own comment
            if(doc.data().username !== req.user.username) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            else {
                return postDoc.delete();
            }
        })
        .then(() => {
            res.json({ message: 'Post deleted successfully '});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}

