import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

// Get the authenticated value from redux store, which is gonna be in props so it can be used above as props
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(AuthRoute);