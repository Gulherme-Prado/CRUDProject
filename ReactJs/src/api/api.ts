import axios from "axios";

export const api = axios.create({
    baseURL: 'http:localhost:3000',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/';
        }
        return Promise.reject(error)
    }
)