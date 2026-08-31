import React from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Dashboard from './Dashboard';
import CourseManager from './CourseManager';
import ServiceManager from './ServiceManager';
import TeamManager from './TeamManager';
import PortfolioManager from './PortfolioManager';
import CertificateManager from './CertificateManager';
import InquiryManager from './InquiryManager';
import SettingsManager from './SettingsManager';

const links = [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { to: '/admin/courses', label: 'Courses', icon: '🎓', color: 'linear-gradient(135deg, #14B8A6, #0EA5A4)' },
    { to: '/admin/services', label: 'Services', icon: '⚙️', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { to: '/admin/team', label: 'Team', icon: '👥', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { to: '/admin/portfolios', label: 'Portfolios', icon: '📁', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { to: '/admin/certificates', label: 'Certificates', icon: '🏅', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { to: '/admin/inquiries', label: 'Inquiries', icon: '✉️', color: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' },
    { to: '/admin/settings', label: 'Settings', icon: '⚙️', color: 'linear-gradient(135deg, #11998e, #38ef7d)' },
];

export default function AdminLayout() {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();

    if (!admin) return <Navigate to="/admin/login" replace />;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fb' }}>
            <aside
                style={{
                    width: 240,
                    background: 'linear-gradient(180deg, #0a1733 0%, #0d1f47 50%, #102A5C 100%)',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    padding: '24px 16px',
                    position: 'fixed',
                    height: '100vh',
                    overflowY: 'auto',
                    boxShadow: '4px 0 30px rgba(0,0,0,0.2)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 30,
                        padding: '0 8px',
                    }}
                >
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 6px 18px rgba(20,184,166,0.4)',
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="M.A. Corporation"
                            style={{ height: 30, width: 'auto', borderRadius: 6, display: 'block' }}
                        />
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>M.A. Corp</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Admin Panel</div>
                    </div>
                </div>
                <nav style={{ display: 'grid', gap: 4 }}>
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '11px 14px',
                                borderRadius: 10,
                                color: isActive ? '#fff' : '#b6c2d9',
                                background: isActive
                                    ? 'linear-gradient(135deg, rgba(45,212,191,0.25), rgba(20,184,166,0.15))'
                                    : 'transparent',
                                border: isActive ? '1px solid rgba(45,212,191,0.3)' : '1px solid transparent',
                                fontSize: '0.9rem',
                                fontWeight: isActive ? 700 : 500,
                                transition: 'all 0.2s ease',
                                textDecoration: 'none',
                            })}
                        >
                            {({ isActive }) => (
                                <>
                                    <span
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 6,
                                            background: isActive ? l.color : 'rgba(255,255,255,0.06)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        {l.icon}
                                    </span>
                                    <span>{l.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <div
                    style={{
                        marginTop: 30,
                        padding: 16,
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 8,
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#fff',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginBottom: 8,
                            transition: 'all 0.2s ease',
                        }}
                    >
                        🌐 View Site
                    </button>
                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: '#fff',
                            border: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </aside>

            <main style={{ flex: 1, marginLeft: 240, padding: '32px 40px' }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/courses" element={<CourseManager />} />
                    <Route path="/services" element={<ServiceManager />} />
                    <Route path="/team" element={<TeamManager />} />
                    <Route path="/portfolios" element={<PortfolioManager />} />
                    <Route path="/certificates" element={<CertificateManager />} />
                    <Route path="/inquiries" element={<InquiryManager />} />
                    <Route path="/settings" element={<SettingsManager />} />
                </Routes>
            </main>
        </div>
    );
}
