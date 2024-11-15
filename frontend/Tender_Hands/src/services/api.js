// api.js
import axios from 'axios';

// Set up the base URL for the API, using an environment variable if available
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to set the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    // Set token in header if available
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove token from headers if none is available
    delete api.defaults.headers.common['Authorization'];
  }
};

// Request interceptor to automatically attach tokens to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.error("Unauthorized. Redirecting to login.");
      // Optionally, redirect or refresh token
    }
    return Promise.reject(error);
  }
);

// Example API functions

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token } = response.data;
    localStorage.setItem('authToken', token); // Store token locally
    setAuthToken(token); // Attach token to future requests
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Fetch Charities List
export const getCharities = async () => {
  try {
    const response = await api.get('/charities');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('authToken'); // Clear token from local storage
  setAuthToken(null); // Clear auth token from header
};

export default api;
