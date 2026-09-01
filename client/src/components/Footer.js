import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
    const { settings } = useSettings();
    const year = new Date().getFullYear();

    const socials = [
        { name: 'Facebook', url: settings.facebook, icon: '📘' },
        { name: 'Instagram', url: settings.instagram, icon: '📷' },
        { name: 'LinkedIn', url: settings.linkedin, icon: '💼' },
        { name: 'YouTube', url: settings.youtube, icon: '▶️' },
        { name: 'WhatsApp', url: `https://wa.me/${settings.whatsapp}`, icon: '💬' },
    ].filter((s) => s.url);

    return (
        <footer
            style={{
                background: 'linear-gradient(135deg, #0A1733 0%, #0D1F47 100%)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: 64,
                marginTop: 40,
            }}
        >
            <div className="container">
                <div
                    className="grid grid-4"
                    style={{ alignItems: 'start', gap: 36 }}
                >
                    <div>
                        <Link to="/" className="brand" style={{ marginBottom: 16 }}>
                            <img src="/logo.png" alt={settings.companyName} />
                            <span className="brand-name">{settings.companyName}</span>
                        </Link>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>
                            Empowering people through knowledge, professional services, and
                            opportunities.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: 16, fontSize: '1.05rem' }}>Quick Links</h4>
                        <ul style={{ display: 'grid', gap: 10 }}>
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About' },
                                { to: '/courses', label: 'Courses' },
                                { to: '/services', label: 'Services' },
                                { to: '/team', label: 'Team' },
                                { to: '/contact', label: 'Contact' },
                            ].map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: 16, fontSize: '1.05rem' }}>Support</h4>
                        <ul style={{ display: 'grid', gap: 10 }}>
                            {[
                                { to: '/admissions', label: 'Admissions' },
                                { to: '/privacy', label: 'Privacy Policy' },
                                { to: '/terms', label: 'Terms & Conditions' },
                                { to: '/certificates', label: 'Certification' },
                                { to: '/portfolios', label: 'Projects' },
                            ].map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: 16, fontSize: '1.05rem' }}>Contact</h4>
                        <ul style={{ display: 'grid', gap: 10, fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)' }}>
                            <li>📞 {settings.phone}</li>
                            <li>✉️ {settings.email}</li>
                            <li>📍 {settings.address}</li>
                        </ul>
                        {socials.length > 0 && (
                            <div style={{ display: 'flex', gap: 12, marginTop: 16, fontSize: '1.3rem' }}>
                                {socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.name}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        marginTop: 48,
                        padding: '24px 0',
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.88rem',
                    }}
                >
                    © {year} {settings.companyName}. All Rights Reserved. Designed & Developed by{' '}
                    {settings.companyName}.
                </div>
            </div>
        </footer>
    );
}
