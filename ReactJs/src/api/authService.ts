import { api } from "./api";

export const login = async (credentials: { email: string; password: string}) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
}

export const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/'
};