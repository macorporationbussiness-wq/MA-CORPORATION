import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);
    const [counts, setCounts] = useState({ courses: 0, services: 0, team: 0, certs: 0, portfolios: 0 });

    useEffect(() => {
        API.get('/inquiries/stats').then((r) => setStats(r.data)).catch(() => { });
        API.get('/inquiries?type=admission').then((r) => setRecent(r.data.slice(0, 5))).catch(() => { });
        API.get('/courses/all').then((r) => setCounts((c) => ({ ...c, courses: r.data.length }))).catch(() => { });
        API.get('/services/all').then((r) => setCounts((c) => ({ ...c, services: r.data.length }))).catch(() => { });
        API.get('/team/all').then((r) => setCounts((c) => ({ ...c, team: r.data.length }))).catch(() => { });
        API.get('/certificates/all').then((r) => setCounts((c) => ({ ...c, certs: r.data.length }))).catch(() => { });
        API.get('/portfolios/all').then((r) => setCounts((c) => ({ ...c, portfolios: r.data.length }))).catch(() => { });
    }, []);

    const cards = [
        { label: 'Total Inquiries', value: stats?.total || 0, icon: '✉️', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
        { label: 'Courses', value: counts.courses, icon: '🎓', gradient: 'linear-gradient(135deg, #14B8A6, #0EA5A4)' },
        { label: 'Services', value: counts.services, icon: '⚙️', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
        { label: 'Team Members', value: counts.team, icon: '👥', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
        { label: 'Projects', value: counts.portfolios, icon: '📁', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
        { label: 'Certificates', value: counts.certs, icon: '🏅', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    ];

    return (
        <div>
            <div style={{ marginBottom: 28 }}>
                <h1
                    style={{
                        fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                        marginBottom: 6,
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #0A1733, #2DD4BF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Dashboard
                </h1>
                <p className="muted">Welcome back! Here's an overview of your platform.</p>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 20,
                    marginBottom: 32,
                }}
            >
                {cards.map((c) => (
                    <div
                        key={c.label}
                        className="admin-stat-card"
                        style={{
                            position: 'relative',
                            background: '#fff',
                            borderRadius: 16,
                            padding: 24,
                            boxShadow: '0 6px 20px rgba(10,23,51,0.08)',
                            border: '1px solid rgba(10,23,51,0.06)',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 120,
                                height: 120,
                                background: c.gradient,
                                opacity: 0.1,
                                borderRadius: '50%',
                                transform: 'translate(40%, -40%)',
                            }}
                        />
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: c.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.4rem',
                                marginBottom: 14,
                                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                            }}
                        >
                            {c.icon}
                        </div>
                        <div
                            style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                color: '#0A1733',
                                lineHeight: 1,
                            }}
                        >
                            {c.value}
                        </div>
                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: '#64748b',
                                margin: '4px 0 0',
                                fontWeight: 500,
                            }}
                        >
                            {c.label}
                        </p>
                    </div>
                ))}
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 24,
                }}
            >
                <div
                    style={{
                        background: '#fff',
                        borderRadius: 16,
                        padding: 24,
                        boxShadow: '0 6px 20px rgba(10,23,51,0.08)',
                        border: '1px solid rgba(10,23,51,0.06)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 18,
                        }}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                            }}
                        >
                            📊
                        </div>
                        <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 800, color: '#0A1733' }}>
                            Inquiry Breakdown
                        </h3>
                    </div>
                    <div style={{ display: 'grid', gap: 8 }}>
                        {[
                            { l: 'Contact Inquiries', v: stats?.contact, color: '#3B82F6' },
                            { l: 'Course Applications', v: stats?.course, color: '#0EA5A4' },
                            { l: 'Admissions', v: stats?.admission, color: '#A855F7' },
                            { l: 'Career Applications', v: stats?.career, color: '#F59E0B' },
                            { l: 'Pending', v: stats?.pending, color: '#EF4444' },
                        ].map((s) => (
                            <div
                                key={s.l}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 14px',
                                    borderRadius: 10,
                                    background: '#f8fafc',
                                }}
                            >
                                <span style={{ color: '#475569', fontSize: '0.9rem' }}>{s.l}</span>
                                <span
                                    style={{
                                        fontWeight: 800,
                                        color: s.color,
                                        fontSize: '1rem',
                                    }}
                                >
                                    {s.v || 0}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        background: '#fff',
                        borderRadius: 16,
                        padding: 24,
                        boxShadow: '0 6px 20px rgba(10,23,51,0.08)',
                        border: '1px solid rgba(10,23,51,0.06)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 18,
                        }}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                            }}
                        >
                            🆕
                        </div>
                        <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 800, color: '#0A1733' }}>
                            Recent Applications
                        </h3>
                    </div>
                    {recent.length === 0 ? (
                        <p style={{ color: '#94a3b8', textAlign: 'center', padding: 24 }}>No applications yet.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: 10 }}>
                            {recent.map((a) => (
                                <div
                                    key={a._id}
                                    style={{
                                        padding: 12,
                                        borderRadius: 10,
                                        background: '#f8fafc',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 4,
                                        }}
                                    >
                                        <strong style={{ fontSize: '0.92rem' }}>{a.name}</strong>
                                        <span
                                            style={{
                                                padding: '3px 10px',
                                                borderRadius: 999,
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                background: 'rgba(20,184,166,0.12)',
                                                color: '#0ea5a4',
                                            }}
                                        >
                                            {a.status}
                                        </span>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: '0.78rem',
                                            color: '#64748b',
                                            margin: 0,
                                        }}
                                    >
                                        {a.course} • {a.city}
                                    </p>
                                </div>
                            ))}
                            <Link
                                to="/admin/inquiries"
                                style={{
                                    marginTop: 8,
                                    padding: '10px 16px',
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                    color: '#fff',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    fontSize: '0.88rem',
                                    fontWeight: 700,
                                    boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                }}
                            >
                                View All Inquiries →
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .admin-stat-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .admin-stat-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 40px rgba(10,23,51,0.15) !important;
                }
            `}</style>
        </div>
    );
}
