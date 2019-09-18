import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIF_READ } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED: 
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;    // just return the initialState with auth=false and no user data
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload   // fill up the credentials, likes, notifications from our API response
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            return {
                ...state,
                // Add the new like that we just did in our likes array
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                // Remove that like from our likes array
                likes: state.likes.filter(like => like.postId !== action.payload.postId)
            }
        case MARK_NOTIF_READ:
            state.notifications.forEach(notif => notif.read = true);
            return {
                ...state
            }
        default:
            return state;
    }
}