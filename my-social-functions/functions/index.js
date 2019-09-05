const functions = require('firebase-functions');

// Initialize Express
const app = require('express')();

// Authentication Middleware
const firebaseAuth = require('./utils/firebaseAuth');

const cors = require('cors');
app.use(cors());

const { db } = require('./utils/admin');

// Controllers
const { getAllPosts, addPost, getPost, addCommentToPost, likePost, unlikePost, deletePost } = require('./controllers/postController');
const { registerUser, loginUser, uploadImage, addUserDetails, getLoggedInUserDetails, getUserDetails, markNotificationsRead } = require('./controllers/usersController');


// ======================
// API ROUTES
// ======================

// Posts Routes
app.get('/posts', getAllPosts)
app.post('/post', firebaseAuth, addPost);
app.get('/post/:postId', getPost);
app.delete('/post/:postId', firebaseAuth, deletePost);
app.get('/post/:postId/like', firebaseAuth, likePost);
app.get('/post/:postId/unlike', firebaseAuth, unlikePost);
app.post('/post/:postId/comment', firebaseAuth, addCommentToPost);


// User Data Routes
app.post('/user/image', firebaseAuth, uploadImage);
app.post('/user', firebaseAuth, addUserDetails);
app.get('/user', firebaseAuth, getLoggedInUserDetails); // get logged in user's details when login is successful and we are routing them to the homepage
app.get('/user/:username', getUserDetails);     // get any user's public info
app.post('/notifications', firebaseAuth, markNotificationsRead);


// Login/Register Routes
app.post('/register', registerUser);
app.post('/login', loginUser);




// https://baseurl.com/posts -> bad practice, rather want to have /api/posts
exports.api = functions.https.onRequest(app);


// ====================================
// Notifications - Cloud Firestore Triggers
// ====================================
exports.createNotificationOnLike = functions.region('us-central1').firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then(doc => {
                // check to see if the post exists, and its not a post by our user 
                if (doc.exists && doc.data().username !== snapshot.data().username) {
                    // create our notification
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().username,
                        sender: snapshot.data().username,
                        type: 'like',
                        read: false,
                        postId: doc.id
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
    });

exports.deleteNotificationOnUnlike = functions.region('us-central1').firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => {
                console.error(err);
            });
    });

exports.createNotificationOnComment = functions.region('us-central1').firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().username !== snapshot.data().username) {
                    // create our notification
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().username,
                        sender: snapshot.data().username,
                        type: 'comment',
                        read: false,
                        postId: doc.id
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
    });

// Everytime a user changes their image, change it for all their posts/comments
exports.onUserImageChange = functions.region('us-central1').firestore.document('/users/{userId}')
    .onUpdate((change) => {
        // If the imageURL before and after the trigger are not the same
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            let batch = db.batch();

            // update the image beside all their posts
            return db.collection('posts')
                .where('username', '==', change.before.data().username)
                .get()
                .then(data => {
                    data.forEach(doc => {
                        const post = db.doc(`/posts/${doc.id}`);
                        batch.update(post, { userImage: change.after.data().imageUrl });
                    });
                    //return batch.commit();
                })
                .then(() => {
                    // update the image beside all their
                    return db.collection('comments')
                        .where('username', '==', change.before.data().username)
                        .get()         
                })
                .then(data => {
                    data.forEach(doc => {
                        const comment = db.doc(`/comments/${doc.id}`);
                        batch.update(comment, { userImage: change.after.data().imageUrl });
                    });
                    return batch.commit();
                });
        }
        else {
            // just return out of the function
            return true;
        }
    });

// When a post is deleted, delete all the corresponding comments, likes and notifications
exports.onPostDelete = functions.region('us-central1').firestore.document('/posts/{postId}')
    .onDelete((snapshot, context) => {
        const postId = context.params.postId;
        const batch = db.batch();

        console.log(snapshot);
        console.log(context);
        
        return db.collection('comments').where('postId', '==', postId).get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db.collection('likes').where('postId', '==', postId).get()
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db.collection('notifications').where('postId', '==', postId).get()
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch(err => {
                console.error(err);
            })
    });