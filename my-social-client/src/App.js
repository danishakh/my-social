import React from 'react';
import './App.css';
import axios from 'axios';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import customTheme from './utils/theme';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getLoggedInUserData } from './redux/actions/userActions';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './utils/AuthRoute';


const theme = createMuiTheme(customTheme);

const token = localStorage.firebaseToken;
if (token) {
  const decoded = jwtDecode(token);
  
  // If token expired
  if(decoded.exp * 1000 < Date.now()) {
    // Logout the user and redirect to Login page
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    // Set authenticated
    store.dispatch({ type: SET_AUTHENTICATED });
    // When browser is refreshed, axios clears the header so we set it again here
    axios.defaults.headers.common['Authorization'] = token;
    // Get the Logged In User Data then (based on token in header)
    store.dispatch(getLoggedInUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container"> 
            <Switch>
                <Route exact path="/" component={ Home } />
                <AuthRoute exact path="/login" component={ Login }  />
                <AuthRoute exact path="/register" component={ Register }  />
                <Route exact path="/users/:username" component={ UserProfile } />
                <Route exact path="/users/:username/post/:postId" component={ UserProfile } />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
