// AuthService.js

import { toast } from 'react-toastify';
class AuthService {
    async login(credentials) {
        try {
            const response = await fetch('http://localhost:8080/api/auth/loginKH', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('token', token);
                console.log(credentials)
                                return token;
            } else if (response.status === 401) {
                toast.error('Đăng nhập thất bại, hãy kiểm tra lại tài khoản mật khẩu');
                throw new Error('Unauthorized');
            } else {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại, hãy kiểm tra lại tài khoản mật khẩu');
            throw error;
        }
    }


    logout() {
        try {
            // Xóa token khỏi localStorage
            // localStorage.removeItem('token');

            // Hoặc xóa tất cả dữ liệu trong localStorage
            localStorage.clear();
        } catch (error) {
            console.error('Logout failed', error);
            throw error;
        }
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    async getUserInfo() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        try {
            const response = await fetch('http://localhost:8080/api/user/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const user = await response.json(); // Chú ý await ở đây
            return user;
        } catch (error) {
            throw new Error('Failed to fetch user info');
        }
    }
}

export default new AuthService();
