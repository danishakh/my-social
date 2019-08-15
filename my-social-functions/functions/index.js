const functions = require('firebase-functions');

// Initialize Express
const app = require('express')();

// Authentication Middleware
const firebaseAuth = require('./utils/firebaseAuth');

// Controllers
const { getAllPosts, addPost, getPost, addCommentToPost, likePost, unlikePost, deletePost } = require('./controllers/postController');
const { registerUser, loginUser, uploadImage, addUserDetails, getLoggedInUserDetails } = require('./controllers/usersController');


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


// Login/Register Routes
app.post('/register', registerUser);
app.post('/login', loginUser);




// https://baseurl.com/posts -> bad practice, rather want to have /api/posts
exports.api = functions.https.onRequest(app);