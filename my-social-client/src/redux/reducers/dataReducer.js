import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, ADD_POST } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state=initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case LIKE_POST:
        case UNLIKE_POST:
            // When we like/unlike a post, we get the updated post object back in the response
            // Find the post inside posts array in redux, that has the postId of our payload postId
            let postIndex = state.posts.findIndex((post) => post.postId === action.payload.postId)
            // and update that post
            state.posts[postIndex] = action.payload
            return {
                ...state,
            }
        case DELETE_POST:
            // When we delete, we get the postId in the response of the deleted post
            // Find the index of that post in the posts array, and remove that post
            let deleteIndex = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(deleteIndex, 1);
            return {
                ...state
            }
        case ADD_POST: 
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        default:
            return {
                ...state
            }
    }
}