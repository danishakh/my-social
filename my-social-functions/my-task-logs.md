# Firebase Cloud Functions - Tasks/Stories Logs

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
```javascript 
    app.post('/register', registerUser) 
```
- Create our express route for Signup
- Include validation, user credential handling, token handling and db persistence
- Use `validator` and `is-empty` for validation
- Test signup route on Postman

### Login Route
```javascript 
    app.post('/login', loginUser) 
```
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


## Image Upload
```javascript 
    app.post('/user/image', firebaseAuth, uploadImage) 
```
- `npm install --save busboy`
- Use buyboy to process our uploading to our firebase storage library
- Use busboy's on file method to handle the upload image file by user
- Use busboy's on finish method to upload the file to our firebase storage bucket
    - Also create the imageUrl to add to our user document
- Test out image upload using Postman
    - Login with a user
    - Pass the Bearer {token} and attach image file
    - Make sure everything works by checking Firebase Database and Storage


## Add User Details Functionality
```javascript 
    app.post('/user', firebaseAuth, addUserDeteails) 
```
- allows users to update their profile 
- perform the necessary validation/formatting of the client input that we will receive
- update the users collection in firebase


## Get User Details Functionality (logged in user)
```javascript 
    app.get('/user', firebaseAuth, getLoggedInUserDetails) 
```
- we want to keep the login route minimal so that its fast, so we don't return anything besides the token in it
- once the user is going to be redirected to the homepage, we will use this route to pull in all the details of that user so that we can update the homepage. (user details/likes and more)
- this data will be used by our redux store in the front-end
- this route will return a userData object which will have info from different collections
    - userCredentials: from users document
    - likes: from the likes document


## Get A Post
```javascript 
    app.get('/post/:postId', getPost) 
```
- created another route to get a specific post with all comments
- the returned object includes all the post details, and also includes an array of comments for that post which was pulled from the comments db collection.


## Post a comment
```javascript
    app.post('/post/:postId/comment', firebaseAuth, addCommentToPost)
```
- created a route to add comments to a post
    - check if the post exists before doing anything or firebase will kill you
    - include username and user's imageUrl properties from the `req.user` object we get from our middleware
    - return the comment with the user info in the response


## Like a post
```javascript
    app.get('/post/:postId/like', firebaseAuth, likePost)
```
- Need to make 2 checks here:
    1. Check if the post exists
    2. Check to see if there is a like document with our user and the passed in post
        - If there isn't one, then add our Like document with the appropriate username and postId
        - Increment that specific post's `likeCount`
- Return the post


## Unlike a post
```javascript
    app.get('/post/:postId/unlike', firebaseAuth, unlikePost)
```
- Need to make 2 checks here:
    1. Check if the post exists
    2. Check to see if there is a like document with our user and the passed in post
        - If there is one, then unlike it
        - Decrement that post's `likeCount`
        - Delete the Like document
- Return the post


## Delete a Post
```javascript
    app.delete('/post/:postId', firebaseAuth, deletePost)
```
- Get the post of the passed in postId parameter
- If it exists, check if the username of the post creator = loggedInUser
- Delete the post document


## Notifications
We want to have our users get notifications when their posts were liked/commented on.
We will use Cloud Firestore triggers that are listeners that listen to changes on certain documents, and based on those changes it creates/deletes notifications.
A new notifications collection will be created when the 1st notification document is created

### Create Notification on Like
- We create a notification cloud function in our `index.js` with the same region as our storage and db.
- We use `onCreate` - whenever a like document is created
    - We get the post that just got liked because we need some data from it (owner of the post)
    - Create our notification document with all the necessary fields
    - Note: Later on we will give the notification the same id as the like/comment it is notifying on

### Delete Notification on Unlike
- Same thing as above
- We use `onDelete` - whenever a like document is deleted
- We just delete the notification. (use `/notifications/${snapshot.id})`)

### Create Notification on Comment
- Same thing as 'Create Notification on Like'
- We use `onCreate` - whenever a comment document is created for a post
    - We get the post that just got liked because we need some data from it (owner of the post)
    - Create our notification document with all the necessary fields
    - Note: Later on we will give the notification the same id as the like/comment it is notifying on

*NOTE: THESE ARE DB TRIGGERS SO YOU NEED TO DEPLOY TO GET THESE TO WORK! MAKE SURE YOU SEE THESE NOTIFICATIONS ON OUR FIREBASE FUNCTIONS!

### Edits to GetLoggedInUser
- When we get the user data and their likes, we need to get their notifications as well bec we need to access them and show them in our front-end
- Get the notifications where 'recipient' is our logged in user
- Add an array of the notifications to the `userData` object that we will return to the front-end

* NOTE: When you test out getting notifications for a user in `GET /user` route. You will get an `{ error: 9 }` response - if you look at the logs, it will provide a link to create an index in the database between users and notifications because we are performing a complex query. 


## Get A User's Details 
```javascript
    app.get('/user/:username', getUserDetails)
```
- Get the user document of any username passed in the request parameters
- Add a `userData.user` object to contain the return user
- Get this user's posts and initialize `userData.posts = []` and push the posts
- Return the `userData`

*NOTE: When you test this route, you will get an `{ error: 9 }` response - if you look at the logs, it will provide a link to create an index in the database between users and posts because we are performing a complex query. 


## Mark Notifications as Read 
```javascript
    app.post('/notifications', firebaseAuth, markNotificationsRead)
```
- When our user opens notifs dropdown and sees unread notifications, we will send an array of ids of those notifications to our server to mark them as 'read'
- We will use a batch write function that firebase provides us to update multiple documents
- We get the notificationIds in our request from which we get our documents
- We then update each notification with `{ read: true }`
- We then commit our updates with `batch.commit()`