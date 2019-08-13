# Tasks Logs

This document contains the list of tasks and the order in which I completed the tasks so that I can always refer back to this file when creating similar applications using Firebase.


## Firebase Setup
- Create project on Firebase

### Firebase Functions Setup
- Install `firebase-tools` package
- Login using `firebase login`
- Go to your project folder and create a folder `/my-social-functions`
- `firebase init` and select Functions, and let it install all the required dependencies
- We now should have our initial firebase functions setup 


## Initialize Firebase App and Start Creating Routes
`../functions/index.js`

### Create Post Routes
- Go to Firebase Console and Add our db collections with some sample data
- Create GET posts route
- Create POST post route
- Verify functions are present on our Firebase Console
- Test routes with Postman
- Make sure API routes have a prefix of `/api` so that route looks like `/api/posts` for example

### Implement Express
- Initialize express app
- Use express methods for our routes

### Authentication Setup
- Go to Authentication on Firebase Console and enable user/pass signin option
- Get app config from Project Settings
- Install `firebase` via `npm install`
- Initialize Firebase App with our app config

### Signup Route
- Create our express route for Signup
- Include validation, user credential handling, token handling and db persistence
- Use `validator` and `is-empty` for validation
- Test signup route on Postman

### Login Route
- Create our express route for Login
- Include validation, user/pass checks, token handling
- Use `validator` and `is-empty` for validation
- Test login route on Postman


## Implement authentication middleware to protect our API routes
- Users need to be logged in to create/view posts
- Middleware will check for authentication token that is sent by the user, and extract the username from it

### Firebase Middleware
- Check to see if request has an Authorization header, and a token in it
- Verify if the token is from our server using firebase functions
- Return the user with the corresponding token from our firebase db
- Add the user's username to the request object and call `next()` to move forward with the actual resource request

## Refactor/Organize Code
- Create controllers to handle the work for each route
    - users controller
    - posts controller
- Create a utils folder to hold
    - `/utils/admin.js` : to hold and initialize our firebase app admin
    - `/utils/config.js` : to hold our firebase app config
    - `/utils/firebaseAuth.js` : to hold our authentication middleware function
- Make sure validation function files are required in the correct controllers
- Make sure all controllers and firebaseAuth files require needed objects (admin, db)
- Make sure to import all these files into our `index.js`