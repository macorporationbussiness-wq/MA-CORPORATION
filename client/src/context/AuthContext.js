import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('ma_token');
        if (token) {
            API.get('/auth')
                .then((r) => setAdmin(r.data))
                .catch(() => localStorage.removeItem('ma_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('ma_token', res.data.token);
        setAdmin(res.data.admin);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('ma_token');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, setAdmin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
