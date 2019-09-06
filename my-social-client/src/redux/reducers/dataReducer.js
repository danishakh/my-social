import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, ADD_POST, SET_POST, SUBMIT_COMMENT } from '../types';

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
            // If we like/unlike a post that is opened, then update that post as well with the new like/unlike
            if (state.post.postId === action.payload.postId) {
                state.post.likeCount = action.payload.likeCount;
            } 
            return {
                ...state,
                post: {
                    ...state.post
                }
            }
        case SUBMIT_COMMENT:
            // Update the commentCount in 'post'
            let count = state.post.commentCount + 1;
            // Update the commentCount in 'posts'
            let postIndex2 = state.posts.findIndex((post) => post.postId === action.payload.postId);
            //state.posts[postIndex2] = action.payload.postData;
            state.posts[postIndex2].commentCount += 1;
            //console.log(state.posts[postIndex2]);
            return {
                ...state,
                posts: [
                    ...state.posts
                ],
                post: {
                    ...state.post,
                    comments: [
                        action.payload,
                        ...state.post.comments
                    ],
                    commentCount: count
                }
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
        case SET_POST:
            return {
                ...state,
                post: action.payload
            }
        default:
            return {
                ...state
            }
    }
}