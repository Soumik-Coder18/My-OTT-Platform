import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to automatically include the auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not on login page to allow error toasts to show
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
        // Token expired or invalid - clear storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Note: We can't use the AuthContext here directly, so we'll handle logout in components
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;