// Trong LoginComponent.js
import React, { useState } from 'react';
import AuthService from './AuthService';
import { useHistory } from 'react-router-dom';
function LoginComponent({ onLogin, onLogout }) {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [userInfo, setUserInfo] = useState(null); // Thêm state để lưu thông tin người dùng

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const token = await AuthService.login(credentials);
            localStorage.setItem('token', token);

            // After successful login, get user information
            // const user = await getUserInfo();
            // console.log(user)
            // // Check if the user is active before allowing login
            // if (user && user.trangThai === 1) {
            //     // Check if the account status is 'active' before allowing login
            //     if (user.trangThai === 1) {
            //         setUserInfo(user);
            //         onLogin();
            //     } else {
            //         // If the account status is not 'active', prevent login
            //         console.error('User account is not active. Login is not allowed.');
            //         handleLogout(); // Log out immediately if login is not allowed
            //     }
            // } else {
            //     // If user status is not 'active', prevent login
            //     console.error('User is not active. Login is not allowed.');
            //     handleLogout(); // Log out immediately if login is not allowed
            // }
        } catch (error) {
            // Handle login error, display a message, etc.
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        onLogout(); // Ensure onLogout is defined before calling
        setUserInfo(null); // Đăng xuất cũng cần xóa thông tin người dùng
        localStorage.removeItem('token'); // Xóa token khi đăng xuất
        localStorage.removeItem('currentUser'); // Xóa thông tin người dùng khi đăng xuất
    };

    // Hàm để lấy thông tin người dùng từ backend
    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            // Fetch the specific user using the provided endpoint
            const userEndpoint = 'http://localhost:8080/tai_khoan/nhan-vien-quyen-1';

            const userResponse = await fetch(userEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(userResponse)
            console.log("credentials"+credentials.email)
            if (userResponse.ok) {
                const allUsers = await userResponse.json();

                // Example: Assuming each user in allUsers has an 'email' field
                const desiredEmail = credentials.email; // Replace with the desired email

                // Find the user with the matching email in the array
                const matchingUser = allUsers.find(user => user.email === desiredEmail);

                if (matchingUser) {
                    localStorage.setItem('currentUser', JSON.stringify(matchingUser));
                    console.log('User found and saved to local storage:', matchingUser);
                } else {
                    console.error('User not found with the specified email:', desiredEmail);

                }
            } else {
                const errorResponse = await userResponse.json();
                throw new Error(errorResponse.message || 'Failed to get user info');
            }
        } catch (error) {
            console.error('Error getting user info:', error);
            throw error;
        }
    };


    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p className="text-center small">Enter your username & password to login</p>
                </div>
                <form className="row g-3 needs-validation" noValidate>
                    <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                            onChange={handleInputChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter your email.</div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            onChange={handleInputChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter your password!</div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary w-100" type="button" onClick={handleLogin}>Login</button>
                    </div>
                    <div className="col-12">
                        {userInfo ? (
                            <div>
                                <p className="small mb-0">Welcome, {userInfo.email}!</p>
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <p className="small mb-0">Don't have account? <a href='/forgot-password'>Create an account</a></p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
