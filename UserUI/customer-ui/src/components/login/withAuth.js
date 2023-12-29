import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (Component, isLoggedIn) => {
    return class extends React.Component {
        render() {
            return isLoggedIn ? <Component {...this.props} /> : <Redirect to="/login" />;
        }
    };
};

export default withAuth;
