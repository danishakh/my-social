import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {

    // Dispatch the loader
    dispatch({
        type: LOADING_UI
    });

    axios.post('/login', userData)
        .then(res => {
            const firebaseUserToken = `Bearer ${res.data.token}`;
            // Add token to every axios request header
            axios.defaults.headers.common['Authorization'] = firebaseUserToken;

            // Set the token in localStorage so if user refreshes they're still logged in
            localStorage.setItem('FirebaseToken', firebaseUserToken);

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
            // this.setState({
            //     errors: err.response.data,
            //     loading: false,
            // }, () => {
            //     if (this.state.errors.error) {
            //         this.setState({notifOpen: true});
            //     }
            // });
        })
}

export const getLoggedInUserData = () => dispatch => {
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