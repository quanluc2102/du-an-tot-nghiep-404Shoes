// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        try {
            // Thực hiện logic đăng nhập ở đây (ví dụ: gửi yêu cầu mạng)
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, matKhau: password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const token = await response.json();

            if (!token) {
                throw new Error('Invalid token received');
            }

            // Cập nhật trạng thái
            setIsAuthenticated(true);
            console.log('Login successful');
        } catch (error) {
            console.error('Login error:', error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Thực hiện logic đăng xuất ở đây (ví dụ: gửi yêu cầu mạng)
            const token = localStorage.getItem('authToken');

            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Cập nhật trạng thái
            setIsAuthenticated(false);
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error.message);
            throw error;
        }
    };


        const forgotPassword = async (email) => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to initiate forgot password process');
                }

                // Assuming the server responds with a success message
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Forgot password error:', error.message);
                throw error;
            }
        };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
