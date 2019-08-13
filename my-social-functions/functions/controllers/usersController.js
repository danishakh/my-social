const { db } = require('../utils/admin');

// Firebase App Config
const config = require('../utils/config');

const firebase = require('firebase');
firebase.initializeApp(config);

// Load input validation
const validateSignupInput = require("../validation/validateSignupInput");
const validateLoginInput = require("../validation/validateLoginInput");


let token, userId;
// Register User Controller
exports.registerUser = (req, res) => {

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
}

// Login User Controller
exports.loginUser = (req, res) => {

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = {
        email: req.body.email,
        password: req.body.password
    }

    // firebase signin
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            // Get the token from the data returned
            return data.user.getIdToken();
        })
        // Send the token in our response
        .then(token => {
            return res.json({ token });
        })
        // handle errors
        .catch(err => {
            if(err.code === "auth/wrong-password") {
                return res.status(401).json({ error: 'Auth Failed - Incorrect Username/Password!'})
            }
            else {
                console.error(err);
                return res.status(500).json({ error: err.code});
            }
        });
}