import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './services/AuthService/AuthService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // Check if the user is authenticated
    const isAuthenticated = AuthService.isAuthenticated();

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated===true ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectedRoute;
