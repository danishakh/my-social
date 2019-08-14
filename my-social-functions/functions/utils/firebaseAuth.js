const { admin, db } = require('./admin');

// Firebase Authentication Middleware
module.exports = (req, res, next) => {
    let idToken;

    // Check header for token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split(' ')[1];
    }
    else {
        console.error('Unauthorized - Missing/Incorrect Token');
        return res.status(403).json({ error: 'Unauthorized'});
    }

    // Verify this token is of a user from our server
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {     // decodedToken holds the data inside our token -> user data
            // Add this data to our request object
            req.user = decodedToken;

            // Return username which is stored in our db
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })  
        .then(data => {
            // Set the username from our db to the request object
            req.user.username = data.docs[0].data().username;
            console.log(req.user);
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token', err);
            return res.status(403).json(err);
        });
}