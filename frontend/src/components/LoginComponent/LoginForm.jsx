// LoginForm.jsx
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService/AuthService';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false,
        };
    }

    componentDidMount() {
        // Check if the user is already authenticated, redirect if true
        if (AuthService.isAuthenticated()) {
            this.setState({ redirectToReferrer: true });
        }
    }

    handleLogin = async () => {
        const { email, password } = this.state;

        try {
            await AuthService.login(email, password);
            console.log('Login successful.');

            // Assuming AuthService has a method like setAuthenticatedStatus
            AuthService.setAuthenticatedStatus(true);

            // Set redirectToReferrer to true to trigger redirection
            this.setState({ redirectToReferrer: true });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    render() {
        const { email, password, redirectToReferrer } = this.state;

        // If redirectToReferrer is true, redirect to the dashboard
        if (redirectToReferrer) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => this.setState({ email: e.target.value })} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />

                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
}

export default withRouter(LoginForm);
