import axios from 'axios';

// API instance riêng cho EcoIdentity (Auth Service)
const authApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'https://localhost:7218'  // EcoIdentity API port
    : 'https://ecoidentity.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor - Tự động thêm token vào header
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi và refresh token
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn (401) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // Gọi API refresh token
          const response = await authApi.post('/api/auth/refresh-token', {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: refreshToken
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Lưu token mới
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry request với token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return authApi(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token thất bại -> Logout
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authApi;

