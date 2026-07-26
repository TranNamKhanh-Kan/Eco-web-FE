import React, { createContext, useState, useContext, useEffect } from 'react';
import authApi from '../utils/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    
    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.post('/api/auth/login', { email, password });
      const { accessToken, refreshToken, user: userData } = response.data;
      
      // Save to state
      setUser(userData);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại';
      return { success: false, message };
    }
  };

  const register = async (username, email, password, confirmPassword) => {
    try {
      const response = await authApi.post('/api/auth/register', {
        username,
        email,
        password,
        confirmPassword
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      if (refreshToken) {
        await authApi.post('/api/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state and localStorage
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authApi.post('/api/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Gửi mã xác thực thất bại';
      return { success: false, message };
    }
  };

  const resetPassword = async (email, code, newPassword, confirmPassword) => {
    try {
      const response = await authApi.post('/api/auth/reset-password', {
        email,
        code,
        newPassword,
        confirmPassword
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Đặt lại mật khẩu thất bại';
      return { success: false, message };
    }
  };

  const verifyEmail = async (email, code) => {
    try {
      const response = await authApi.post('/api/auth/verify-email', {
        email,
        code
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Xác thực email thất bại';
      return { success: false, message };
    }
  };

  const resendVerificationCode = async (email) => {
    try {
      // Sử dụng forgot-password endpoint để resend code
      // (Backend logic tương tự: tạo code mới và gửi email)
      const response = await authApi.post('/api/auth/forgot-password', {
        email
      });
      return { success: true, message: "Mã xác thực mới đã được gửi đến email của bạn" };
    } catch (error) {
      const message = error.response?.data?.message || 'Gửi lại mã xác thực thất bại';
      return { success: false, message };
    }
  };

  const googleLogin = async (idToken, deviceType = 'Web') => {
    try {
      const response = await authApi.post('/api/auth/google-login', {
        idToken,
        deviceType
      });
      
      const { accessToken, refreshToken, user: userData } = response.data;
      
      // Save to state
      setUser(userData);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng nhập Google thất bại';
      return { success: false, message };
    }
  };

  const value = {
    user,
    accessToken,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationCode,
    googleLogin,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

