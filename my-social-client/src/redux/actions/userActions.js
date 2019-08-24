import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

// Helper Function
const setAuthorizationHeader = token => {
    const firebaseToken = `Bearer ${token}`;
    
    // Set the token in localStorage so if user refreshes the page, they will still be logged in
    localStorage.setItem('firebaseToken', firebaseToken);

    // Add the token to every axios request header
    axios.defaults.headers.common['Authorization'] = firebaseToken;
}

export const loginUser = (userData, history) => dispatch => {

    // Dispatch the loader
    dispatch({
        type: LOADING_UI
    });

    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);

            // Dispatch these functions
            dispatch(getLoggedInUserData())
            dispatch({ type: CLEAR_ERRORS });

            // Redirect user to homepage
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getLoggedInUserData = () => dispatch => {
    dispatch({ type: LOADING_USER });
    
    axios.get('/user')
        .then(res => {
            // Set the user with the logged in user's data
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch(err => console.error(err));
}

export const registerUser = (newUserData, history) => dispatch => {

    // Dispatch the loader
    dispatch({
        type: LOADING_UI
    });

    axios.post('/register', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);

            // Dispatch these functions
            dispatch(getLoggedInUserData())
            dispatch({ type: CLEAR_ERRORS });

            // Redirect user to homepage
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const logoutUser = () => dispatch => {
    // Delete token from localStorage
    localStorage.removeItem('firebaseToken');
    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}