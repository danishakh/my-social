const admin = require('firebase-admin');

const serviceAccount = require("../keys/my-social-7b8185040aea.json");

// To use the firebase admin, we need to initialize our firebase app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-social-ff134.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };