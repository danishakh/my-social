import React from 'react';
import './App.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import customTheme from './utils/theme';
import jwtDecode from 'jwt-decode';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './utils/AuthRoute';


const theme = createMuiTheme(customTheme);

let authenticated;
const token = localStorage.FirebaseToken;
if (token) {
  const decoded = jwtDecode(token);
  //console.log(decoded);
  if(decoded.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container"> 
            <Switch>
                <Route exact path="/" component={ Home } />
                <AuthRoute exact path="/login" component={ Login } authenticated={authenticated} />
                <AuthRoute exact path="/register" component={ Register } authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
