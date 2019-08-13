const { admin, db } = require('../utils/admin');

// Firebase App Config
const config = require('../utils/config');
const firebase = require('firebase');
firebase.initializeApp(config);

// Load input validation
const validateSignupInput = require("../validation/validateSignupInput");
const validateLoginInput = require("../validation/validateLoginInput");

// Busboy - Image Upload
const Busboy = require('busboy');

// Default packages available in Node
const path = require('path');
const os = require('os');
const fs = require('fs');



// Register User Controller
let token, userId;
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

    // Default image for every user that signs up
    const noImg = 'no-image.png';

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
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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


// User Upload Image Controller
exports.uploadImage = (req, res) => {
    const busboy = new Busboy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    // on file event (check busboy docs)
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        // eg: myimage.png or my.image.png or my.image2.jpg

        // Check to make sure file is either jpg or png, and not any other type (txt,json,etc)
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Incorrect file type submitted for upload!'});
        }

        // extension of image file
        const imageExtension = filename.split('.')[filename.split('.').length - 1];

        // image file name - random number to store in our firebase storage - 13214214.png
        imageFileName = `${Math.round(Math.random() * 10000000)}.${imageExtension}`;

        // file path in our cloud function
        const filepath = path.join(os.tmpdir(), imageFileName);

        // our image file that we will upload
        imageToBeUploaded = { filepath, mimetype };

        // use filesystem library to create this file
        file.pipe(fs.createWriteStream(filepath));
    });

    // once we get done with the upload event from user, we need to upload our file to firebase
    busboy.on('finish', () => {

        // upload the image file to our storage bucket
        admin.storage().bucket('my-social-ff134.appspot.com/').upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }                
            }
        })
        // upload() returns a promise
        .then(() => {
            // need to construct our image url to add to our user document in our db
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media` // by adding 'alt=media' it shows it on our browser instead of downloading it to our desktop
            return db.doc(`/users/${req.user.username}`).update({ imageUrl });  //req.user is from the auth middleware
        })
        .then(() => {
            res.json({ message: 'Image uploaded successfully '});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
    });

    busboy.end(req.rawBody);
}