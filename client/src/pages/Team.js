import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

const colorPalette = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #8E2DE2, #4A00E0)',
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
];

export default function Team() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gridRef, gridVisible] = useInView();

    useEffect(() => {
        API.get('/team').then((r) => setTeam(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <PageHeader
                eyebrow="Our Team"
                title="Meet Our Team"
                subtitle="Experienced professionals committed to providing quality guidance and support."
            />

            <section
                className="section section-dark"
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 20%, rgba(45,212,191,0.1), transparent 50%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div className="container" ref={gridRef} style={{ position: 'relative' }}>
                    {loading ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 60,
                                textAlign: 'center',
                                color: '#2DD4BF',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                            }}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    border: '3px solid rgba(45,212,191,0.2)',
                                    borderTopColor: '#2DD4BF',
                                    borderRadius: '50%',
                                    margin: '0 auto 16px',
                                    animation: 'spin 0.8s linear infinite',
                                }}
                            />
                            Loading team…
                        </div>
                    ) : team.length === 0 ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 60,
                                textAlign: 'center',
                                background: 'rgba(10, 23, 51, 0.5)',
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>👥</div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem' }}>
                                Our team profiles will appear here once added.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-4">
                            {team.map((m, i) => {
                                const gradient = colorPalette[i % colorPalette.length];
                                return (
                                    <div
                                        key={m._id}
                                        className={`team-card ${gridVisible ? 'visible' : ''}`}
                                        style={{
                                            position: 'relative',
                                            background: '#fff',
                                            borderRadius: 20,
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: `${i * 100}ms`,
                                            opacity: 0,
                                            transform: 'translateY(30px)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'relative',
                                                height: 140,
                                                background: gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: -40,
                                                    right: -40,
                                                    width: 120,
                                                    height: 120,
                                                    background: 'rgba(255,255,255,0.1)',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: -30,
                                                    left: -30,
                                                    width: 100,
                                                    height: 100,
                                                    background: 'rgba(255,255,255,0.08)',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                width: 110,
                                                height: 110,
                                                borderRadius: '50%',
                                                margin: '-55px auto 16px',
                                                background: gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '2rem',
                                                fontWeight: 800,
                                                color: '#fff',
                                                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                                                border: '5px solid #fff',
                                                position: 'relative',
                                                zIndex: 1,
                                            }}
                                        >
                                            {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                        </div>
                                        <div style={{ padding: '0 24px 28px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: 6, fontWeight: 800, color: '#0A1733' }}>
                                                {m.name}
                                            </h3>
                                            <p
                                                style={{
                                                    color: '#0ea5a4',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    letterSpacing: 0.5,
                                                    marginBottom: 14,
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {m.position}
                                            </p>
                                            {m.bio && (
                                                <p
                                                    className="muted"
                                                    style={{
                                                        fontSize: '0.9rem',
                                                        lineHeight: 1.6,
                                                        marginBottom: 16,
                                                        minHeight: 50,
                                                    }}
                                                >
                                                    {m.bio}
                                                </p>
                                            )}
                                            {m.skills && m.skills.length > 0 && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        gap: 6,
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'center',
                                                        marginBottom: 18,
                                                    }}
                                                >
                                                    {m.skills.slice(0, 3).map((s) => (
                                                        <span
                                                            key={s}
                                                            style={{
                                                                padding: '4px 10px',
                                                                borderRadius: 999,
                                                                fontSize: '0.72rem',
                                                                fontWeight: 600,
                                                                background: 'rgba(20,184,166,0.1)',
                                                                color: '#0ea5a4',
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <Link
                                                to="/portfolios"
                                                className="btn-glow"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    padding: '9px 20px',
                                                    borderRadius: 10,
                                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                                }}
                                            >
                                                View Portfolio <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .team-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .team-card:hover {
                    transform: translateY(-10px) !important;
                    box-shadow: 0 24px 60px rgba(0,0,0,0.35) !important;
                }
            `}</style>
        </div>
    );
}
