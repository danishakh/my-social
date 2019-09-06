import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_UI, LOADING_DATA, DELETE_POST, ADD_POST, SET_ERRORS, CLEAR_ERRORS, SET_POST, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
import axios from 'axios';


// Get All Posts
export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            });
        });
}

// Like a Post
export const likePost = postId => dispatch => {
    axios.get(`/post/${postId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.error(err));
}

// Unlike a Post
export const unlikePost = postId => dispatch => {
    axios.get(`/post/${postId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.error(err));
}

// Delete a Post
export const deletePost = postId => dispatch => {
    axios.delete(`/post/${postId}`)
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            });
        })
        .catch(err => console.error(err));
}

// Add a Post
export const addPost = newPost => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost)
        .then(res => {
            dispatch({ 
                type: ADD_POST,
                payload: res.data
            });
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Clear Errors in NewPost Dialog
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
}

 
// Get A Post
export const getPost = postId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/post/${postId}`)
        .then(res => {
            dispatch({ 
               type: SET_POST,
               payload: res.data 
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => {
            console.error(err);
        });
}

// Submit a comment
export const submitComment = (postId, commentData) => dispatch => {
    axios.post(`/post/${postId}/comment`, commentData)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
            // dispatch(getPosts());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

// Get a User's Profile
export const getUserProfile = username => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get(`/user/${username}`)
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data.posts
            });
        })
        .catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null
            });
        })
}