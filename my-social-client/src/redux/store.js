import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// NOTE @SELF: refer to 'redux-example' for detailed explanation on redux setup
const initialState = {};
const middleware = [thunk];

// create our dedicated store with our rootReducer, initialState and enhancers
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // Check if the browser has redux devtools, else do not use redux devtools extension enhancer or app will not render on the browsers
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose
  )
);

export default store;

