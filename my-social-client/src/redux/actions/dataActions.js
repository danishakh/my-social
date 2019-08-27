import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from '../types';
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