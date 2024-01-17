// AuthService.js


import { toast } from 'react-toastify';

class AuthService {
    async login(credentials) {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
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
                // Gọi hàm để lấy thông tin người dùng và lưu vào localStorage
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
                        const userInfo = await userResponse.json();
                        console.log(userInfo)
                        // Example: Assuming each user has an 'email' field
                        const desiredEmail = credentials.email; // Replace with the desired email
                        console.log(desiredEmail)
                        console.log(userInfo)
                        // Check if the user's email matches the desired email
                        if (userInfo.email === credentials.email) {
                            localStorage.setItem('currentUser', JSON.stringify(userInfo));
                        } else {
                            console.error('User not found with the specified email');
                        }
                    } else {
                        const errorResponse = await userResponse.json();
                        throw new Error(errorResponse.message || 'Failed to get user info');
                    }
                } catch (error) {
                    console.error('Error getting user info:', error);
                    throw error;
                }

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

    async getUserInfoAndSaveToLocalStorage(credentials) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            // Update the endpoint to fetch user information
            const userEndpoint = 'http://localhost:8080/api/auth/userinfo';

            const userResponse = await fetch(userEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (userResponse.ok) {
                const userInfo = await userResponse.json();

                // Save user information to local storage
                localStorage.setItem('currentUser', JSON.stringify(userInfo));
            } else {
                const errorResponse = await userResponse.json();
                throw new Error(errorResponse.message || 'Failed to get user info');
            }
        } catch (error) {
            console.error('Error getting user info:', error);
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
            const response = await fetch('http://localhost:8080/api/auth/userinfo', { // Change the endpoint
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                // Log error message from the server
                const errorText = await response.text();
                console.error('Server error:', errorText);

                throw new Error('Failed to fetch user info');
            }
            const user = await response.json();
            return user;
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw new Error('Failed to fetch user info');
        }
    }

}
export default new AuthService();
