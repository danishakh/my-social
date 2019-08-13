const functions = require('firebase-functions');

// Initialize Express
const app = require('express')();

// Authentication Middleware
const firebaseAuth = require('./utils/firebaseAuth');

// Controllers
const { getAllPosts, addPost } = require('./controllers/postController');
const { registerUser, loginUser } = require('./controllers/usersController');


// ======================
// API ROUTES
// ======================

// Posts Routes
app.get('/posts', getAllPosts)
app.post('/post', firebaseAuth, addPost);

// Users Routes
app.post('/register', registerUser);
app.post('/login', loginUser);



// https://baseurl.com/posts -> bad practice, rather want to have /api/posts
exports.api = functions.https.onRequest(app);