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
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { to: '/admin/courses', label: 'Courses', icon: '🎓' },
    { to: '/admin/services', label: 'Services', icon: '⚙️' },
    { to: '/admin/team', label: 'Team', icon: '👥' },
    { to: '/admin/portfolios', label: 'Portfolios', icon: '📁' },
    { to: '/admin/certificates', label: 'Certificates', icon: '🏅' },
    { to: '/admin/inquiries', label: 'Inquiries', icon: '✉️' },
    { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
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
                    background: 'linear-gradient(180deg, #0a1733 0%, #0d1f47 100%)',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    padding: '24px 16px',
                    position: 'fixed',
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30, padding: '0 8px' }}>
                    <img src="/logo.png" alt="M.A. Corporation" style={{ height: 46, width: 'auto', borderRadius: 8, display: 'block' }} />
                    <span style={{ fontWeight: 800, color: '#fff' }}>Admin</span>
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
                                borderRadius: 8,
                                color: isActive ? '#2dd4bf' : '#b6c2d9',
                                background: isActive ? 'rgba(45,212,191,0.12)' : 'transparent',
                                fontSize: '0.92rem',
                                fontWeight: 500,
                            })}
                        >
                            <span>{l.icon}</span> {l.label}
                        </NavLink>
                    ))}
                </nav>
                <div style={{ marginTop: 30, display: 'grid', gap: 8 }}>
                    <button onClick={() => navigate('/')} className="btn btn-outline" style={{ justifyContent: 'center', fontSize: '0.85rem' }}>View Site</button>
                    <button onClick={logout} className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: '0.85rem' }}>Logout</button>
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
