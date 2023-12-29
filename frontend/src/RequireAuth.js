// RequireAuth.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './services/AuthService/AuthService'; // Thay đổi đường dẫn tới AuthService của bạn

const RequireAuth = (WrappedComponent) => {
    return class extends Component {
        render() {
            if (AuthService.isAuthenticated()) {
                // Người dùng đã đăng nhập, cho phép truy cập
                return <WrappedComponent {...this.props} />;
            } else {
                // Người dùng chưa đăng nhập, điều hướng về trang đăng nhập
                return <Redirect to="/login" />;
            }
        }
    };
};

export default RequireAuth;
