import React, { useState } from 'react';
import AuthService from './AuthService';

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');
    const [isRequestSent, setIsRequestSent] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async () => {
        try {
            // Call the backend endpoint to initiate the password reset
            await AuthService.forgotPassword(email);

            // Set a state flag indicating that the request has been sent successfully
            setIsRequestSent(true);
        } catch (error) {
            console.error('Error initiating password reset:', error.message);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            {!isRequestSent ? (
                <>
                    <p>Enter your email to receive a password reset link:</p>
                    <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            ) : (
                <p>Password reset link sent to your email. Check your inbox for further instructions.</p>
            )}
        </div>
    );
};

export default ForgotPasswordComponent;
