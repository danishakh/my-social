const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');

const serviceAccount = require("./keys/my-social-7b8185040aea.json");

// Load input validation
const validateSignupInput = require("./validation/validateSignupInput");

// Initialize Express
const app = require('express')();

// To use the firebase admin, we need to initialize our firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-social-ff134.firebaseio.com"
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDhJfDDDdNCHuqxF7djMygZAexBEvz0Lvs",
    authDomain: "my-social-ff134.firebaseapp.com",
    databaseURL: "https://my-social-ff134.firebaseio.com",
    projectId: "my-social-ff134",
    storageBucket: "my-social-ff134.appspot.com",
    messagingSenderId: "929667223940",
    appId: "1:929667223940:web:20b7c91366e6133d"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

// ======================
// API ROUTES
// ======================


// GET All Posts - (/api/posts)
app.get('/posts', (req, res) => {
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
})


// Add new post - (/api/post)
app.post('/post', (req, res) => {
    // if you send a GET method to a route which expects POST, send this error
    if(req.method !== 'POST') {
        return res.status(400).json({ error: 'Method not allowed!'});
    }

    const newPost = {
        body: req.body.body,
        username: req.body.username,
        createdAt: new Date().toISOString()
    }

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
});


// Signup Route
let token, userId;

app.post('/signup', (req, res) => {

    // Form validation
    const { errors, isValid } = validateSignupInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username
    }

    db
        .doc(`/users/${newUser.username}`)
        .get()
        .then(doc => {
            // check if username already exists in db, return error  
            if(doc.exists) {
                return res.status(400).json({ username: 'Username already exists!'})
            }
            // register & create user
            else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        // If we reach here, user has been created - get uid and token out of the created user
        .then(data => {
            userId = data.user.uid; // get our uid of the created user
            return data.user.getIdToken()   // get token for our current user
        })
        // we store the returned token in a variable for later user
        .then(idToken => {
            token = idToken;

            // create our user credentials to persist in our db
            const userCredentials = {
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };

            // REMEMBER: 'username' is our main ID for our users documents
            return db.doc(`/users/${newUser.username}`).set(userCredentials);
        })
        // return token
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            // Check for client error and return 400 Bad Request
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use'})
            } 
            // Else it's probably some Server Error
            else {
                return res.status(500).json({ error: err.code });
            }
        });
});





// https://baseurl.com/posts -> bad practice, rather want to have /api/posts
exports.api = functions.https.onRequest(app);