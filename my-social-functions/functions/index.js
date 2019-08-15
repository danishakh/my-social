const functions = require('firebase-functions');

// Initialize Express
const app = require('express')();

// Authentication Middleware
const firebaseAuth = require('./utils/firebaseAuth');

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


// Notifications - Cloud Firestore Triggers
exports.createNotificationOnLike = functions.region('us-central1').firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`/posts/${snapshot.data().postId}`).get()
            .then(doc => {
                if (doc.exists) {
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
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.deleteNotificationOnUnlike = functions.region('us-central1').firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

exports.createNotificationOnComment = functions.region('us-central1').firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        db.doc(`/posts/${snapshot.data().postId}`).get()
            .then(doc => {
                if (doc.exists) {
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
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });