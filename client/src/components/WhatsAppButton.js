import React from 'react';
import { useSettings } from '../context/SettingsContext';

// Builds a WhatsApp deep link with an optional pre-filled message
export function buildWhatsAppLink(number, message) {
    const clean = (number || '').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(message || '');
    return `https://wa.me/${clean}?text=${text}`;
}

export default function WhatsAppButton() {
    const { settings } = useSettings();
    const link = buildWhatsAppLink(
        settings.whatsapp,
        'Hello M.A. Corporation! I would like to know more about your courses and services.'
    );

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 999,
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="#fff">
                <path d="M16.002 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.53-1.71a12.74 12.74 0 0 0 6.27 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16.002 3.2zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.88 1.02 1.04-3.78-.25-.4a10.56 10.56 0 0 1-1.62-5.62c0-5.86 4.77-10.62 10.64-10.62 2.84 0 5.5 1.1 7.5 3.1a10.55 10.55 0 0 1 3.11 7.52c0 5.86-4.77 10.62-10.64 10.62zm5.84-7.97c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.36.48-.54.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-.99-2.41-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.85.4-.3.32-1.13 1.1-1.13 2.69 0 1.59 1.16 3.13 1.32 3.34.16.21 2.27 3.47 5.5 4.86.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.22-.61-.38z" />
            </svg>
        </a>
    );
}
