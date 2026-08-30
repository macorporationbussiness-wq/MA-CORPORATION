import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
});

// Attach token if present
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('ma_token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default API;
