import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

const isPdf = (url) => url && url.toLowerCase().match(/\.(pdf)(\?|$)/i);

export default function CertificateDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/certificates')
            .then((r) => {
                const list = r.data || [];
                const found = list.find((c) => c._id === id) || null;
                setCert(found);
            })
            .catch(() => setCert(null))
            .finally(() => setLoading(false));
    }, [id]);

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/certificates');
        }
    };

    if (loading) {
        return (
            <div>
                <PageHeader eyebrow="Certificates" title="Loading…" subtitle="Loading certificate details…" />
                <section className="section-light" style={{ padding: '60px 0' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
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
                        <p className="muted">Loading certificate…</p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                </section>
            </div>
        );
    }

    if (!cert) {
        return (
            <div>
                <PageHeader eyebrow="Certificates" title="Not Found" subtitle="The certificate you are looking for does not exist." />
                <section className="section-light" style={{ padding: '40px 0' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <button
                            onClick={goBack}
                            className="btn-glow"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '12px 24px',
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                color: '#fff',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            ← Back to Certificates
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                eyebrow="Certificates"
                title={cert.title}
                subtitle={cert.course}
            />

            <section
                className="section-light"
                style={{
                    padding: '60px 0',
                    position: 'relative',
                }}
            >
                <div className="container" style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    {/* Back Button */}
                    <div style={{ marginBottom: 24 }}>
                        <button
                            onClick={goBack}
                            className="btn-glow"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '10px 20px',
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 10px 24px rgba(20,184,166,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 6px 18px rgba(20,184,166,0.3)';
                            }}
                        >
                            ← Back to Certificates
                        </button>
                    </div>

                    {/* Certificate Info */}
                    <div
                        className="glass-card"
                        style={{
                            background: '#fff',
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(10,23,51,0.08)',
                            border: '1px solid rgba(10,23,51,0.06)',
                            marginBottom: 24,
                        }}
                    >
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
                                    marginBottom: 16,
                                }}
                            >
                                Certificate
                            </span>
                            <h2 style={{ fontSize: '1.6rem', marginBottom: 8, fontWeight: 800, color: '#0A1733' }}>
                                {cert.title}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 0', borderBottom: '1px dashed rgba(10,23,51,0.1)', color: '#475569', fontSize: '0.9rem' }}>
                                <div><strong style={{ color: '#0A1733' }}>Awarded to:</strong> {cert.issuedTo}</div>
                                <div><strong style={{ color: '#0A1733' }}>Course:</strong> {cert.course}</div>
                                <div>📅 {new Date(cert.issueDate).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Viewer */}
                    <div
                        className="glass-card"
                        style={{
                            background: '#fff',
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(10,23,51,0.08)',
                            border: '1px solid rgba(10,23,51,0.06)',
                        }}
                    >
                        {cert.certificateUrl ? (
                            isPdf(cert.certificateUrl) ? (
                                <iframe
                                    src={cert.certificateUrl}
                                    title={cert.title}
                                    style={{ width: '100%', height: 600, border: 'none' }}
                                />
                            ) : (
                                <img
                                    src={cert.certificateUrl}
                                    alt={cert.title}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            )
                        ) : (
                            <div style={{ padding: 60, textAlign: 'center', color: '#475569' }}>
                                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🏅</div>
                                <p>No certificate image available.</p>
                            </div>
                        )}
                    </div>

                    {/* Download / New Tab Button */}
                    {cert.certificateUrl && (
                        <div style={{ textAlign: 'center', marginTop: 24 }}>
                            <a
                                href={cert.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-glow"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '10px 24px',
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                }}
                            >
                                Open in New Tab ↗
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
