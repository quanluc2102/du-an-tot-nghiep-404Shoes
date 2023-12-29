// LogoutComponent.js
import React, { Component } from 'react';
import AuthService from './AuthService';

class LogoutComponent extends Component {
    handleLogout = () => {
        // Thực hiện các công việc cần thiết trước khi logout (gửi request đến server, xóa cookie, ...)

        // Xóa token khi logout
        AuthService.logout();

        // Chuyển hướng hoặc cập nhật state của component để hiển thị trạng thái logout
        console.log('Logout successful');

        // Ví dụ: chuyển hướng đến trang login sau khi logout
        this.props.history.push('/login');
    };

    render() {
        return (
            <div>
                <h2>Logout</h2>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default LogoutComponent;
