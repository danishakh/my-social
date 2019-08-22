import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Functional Component 
// Destructure the props, we will pass a component, authenticated and any others if need be
const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    <Route 
        {...rest}
        // Render Method trigger
        // If authenticated, render a redirect else just render that component (Login/Register)
        render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    />
);

export default AuthRoute;