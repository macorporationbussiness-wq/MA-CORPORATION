import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

export default function Certificates() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gridRef, gridVisible] = useInView();

    useEffect(() => {
        API.get('/certificates').then((r) => setCerts(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <PageHeader
                eyebrow="Certificates"
                title="Our Certifications"
                subtitle="Recognizing achievement and verified learning across our programs."
            />

            <section
                className="section-light"
                style={{
                    padding: '80px 0',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
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
                                color: '#0ea5a4',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                            }}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    border: '3px solid rgba(20,184,166,0.2)',
                                    borderTopColor: '#0ea5a4',
                                    borderRadius: '50%',
                                    margin: '0 auto 16px',
                                    animation: 'spin 0.8s linear infinite',
                                }}
                            />
                            Loading certificates…
                        </div>
                    ) : certs.length === 0 ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 60,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🏅</div>
                            <p className="muted" style={{ fontSize: '1.05rem', marginBottom: 20 }}>
                                Check back soon to see our latest certifications and achievements.
                            </p>
                            <Link
                                to="/courses"
                                className="btn-glow"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '12px 24px',
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                }}
                            >
                                Browse Courses →
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {certs.map((c, i) => (
                                <div
                                    key={c._id}
                                    className={`cert-card ${gridVisible ? 'visible' : ''}`}
                                    style={{
                                        position: 'relative',
                                        background: '#fff',
                                        borderRadius: 20,
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 32px rgba(10,23,51,0.08)',
                                        border: '1px solid rgba(10,23,51,0.06)',
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
                                            background: 'linear-gradient(135deg, #0A1733, #102A5C)',
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
                                                background: 'radial-gradient(circle at 30% 30%, rgba(45,212,191,0.4), transparent 60%)',
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: -40,
                                                right: -40,
                                                width: 120,
                                                height: 120,
                                                background: 'rgba(255,255,255,0.05)',
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
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'relative',
                                                fontSize: '4rem',
                                                filter: 'drop-shadow(0 8px 20px rgba(45,212,191,0.5))',
                                            }}
                                        >
                                            🏅
                                        </div>
                                    </div>
                                    <div style={{ padding: 24, textAlign: 'center' }}>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                borderRadius: 999,
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                background: 'rgba(20,184,166,0.12)',
                                                color: '#0ea5a4',
                                                letterSpacing: 1,
                                                textTransform: 'uppercase',
                                                marginBottom: 12,
                                            }}
                                        >
                                            Certificate
                                        </span>
                                        <h3
                                            style={{
                                                fontSize: '1.1rem',
                                                marginBottom: 12,
                                                fontWeight: 800,
                                                color: '#0A1733',
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {c.title}
                                        </h3>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 6,
                                                marginBottom: 18,
                                                padding: '14px 0',
                                                borderTop: '1px dashed rgba(10,23,51,0.1)',
                                                borderBottom: '1px dashed rgba(10,23,51,0.1)',
                                            }}
                                        >
                                            <div className="muted" style={{ fontSize: '0.85rem' }}>
                                                <strong style={{ color: '#0A1733' }}>Awarded to:</strong> {c.issuedTo}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#0ea5a4', fontWeight: 600 }}>
                                                {c.course}
                                            </div>
                                            <div className="muted" style={{ fontSize: '0.8rem' }}>
                                                📅 {new Date(c.issueDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {c.certificateUrl && (
                                            <a
                                                href={c.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
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
                                                View Certificate →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .cert-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .cert-card:hover {
                    transform: translateY(-10px) !important;
                    box-shadow: 0 24px 60px rgba(10,23,51,0.18) !important;
                }
            `}</style>
        </div>
    );
}
