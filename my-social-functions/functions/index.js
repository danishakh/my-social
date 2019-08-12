const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require("./keys/my-social-7b8185040aea.json");

// To use the admin, we need to initialize our firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-social-ff134.firebaseio.com"
});

const app = require('express')();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


// GET All Posts
app.get('/posts', (req, res) => {
    admin
        .firestore()
        .collection('posts')
        .get()
        .then(data => {
            let posts = [];

            data.forEach(doc => {
                posts.push(doc.data()); // doc.data() - function that returns the data inside the document
            });

            return res.json(posts);
        })
        .catch(err => console.error(err));
})


app.post('/post', (req, res) => {
    // if you send a GET method to a route which expects POST, send this error
    if(req.method !== 'POST') {
        return res.status(400).json({ error: 'Method not allowed!'});
    }

    const newPost = {
        body: req.body.body,
        username: req.body.username,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    }

    admin
        .firestore()
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


// https://baseurl.com/posts -> bad practice, rather want to have /api/posts
exports.api = functions.https.onRequest(app);