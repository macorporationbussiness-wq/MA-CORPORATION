import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        companyName: 'M.A. Corporation',
        address: '123 Business Avenue, Karachi, Pakistan',
        phone: '+92 300 1234567',
        email: 'info@macorporation.com',
        whatsapp: '923001234567',
        facebook: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        mapsEmbed: '',
        stats: {
            students: '1,000+',
            courses: '25+',
            services: '15+',
            team: '10+',
            years: '5+',
        },
    });

    const fetchSettings = async () => {
        try {
            const res = await API.get('/settings');
            setSettings((prev) => ({ ...prev, ...res.data }));
        } catch (err) {
            console.error('Failed to load settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings, fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
