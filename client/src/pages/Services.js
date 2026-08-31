import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

const iconMap = {
    'Web Development': '💻',
    'SEO Optimization': '📈',
    'RAG Systems': '🤖',
    'Business Consulting': '💼',
    'Marketing': '📢',
    'AI': '🧠',
    'Consulting': '🎯',
    'Technology': '⚡',
    'Design': '🎨',
    'default': '⚙️',
};

const colorMap = {
    'Web Development': 'linear-gradient(135deg, #667eea, #764ba2)',
    'SEO Optimization': 'linear-gradient(135deg, #11998e, #38ef7d)',
    'RAG Systems': 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
    'Business Consulting': 'linear-gradient(135deg, #f093fb, #f5576c)',
    'Marketing': 'linear-gradient(135deg, #fa709a, #fee140)',
    'AI': 'linear-gradient(135deg, #4facfe, #00f2fe)',
    'Consulting': 'linear-gradient(135deg, #43e97b, #38f9d7)',
    'Technology': 'linear-gradient(135deg, #fa709a, #fee140)',
    'Design': 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
    'default': 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
};

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [gridRef, gridVisible] = useInView();

    useEffect(() => {
        const url = category === 'All' ? '/services' : `/services?category=${category}`;
        API.get(url).then((r) => setServices(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, [category]);

    const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

    return (
        <div>
            <PageHeader
                eyebrow="Services"
                title="Our Professional Services"
                subtitle="At M.A. Corporation, we provide professional and customized services designed to meet the needs of individuals, professionals, and businesses."
            />

            <section
                className="section-light"
                style={{
                    padding: '64px 0',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -150,
                        right: -150,
                        width: 450,
                        height: 450,
                        background: 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                <div className="container" style={{ position: 'relative' }}>
                    <div
                        className="glass-card"
                        style={{
                            padding: 18,
                            marginBottom: 48,
                            display: 'flex',
                            gap: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            background: 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={category === c ? 'btn btn-primary' : 'btn btn-outline'}
                                style={{
                                    padding: '10px 24px',
                                    fontSize: '0.92rem',
                                    fontWeight: 700,
                                    borderRadius: 10,
                                    transition: 'all 0.3s ease',
                                    boxShadow: category === c ? '0 6px 20px rgba(20,184,166,0.4)' : 'none',
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

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
                            Loading services…
                        </div>
                    ) : services.length === 0 ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 60,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🛠️</div>
                            <p className="muted" style={{ fontSize: '1.05rem' }}>
                                No services found in this category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-3" ref={gridRef}>
                            {services.map((s, i) => {
                                const icon = iconMap[s.title] || iconMap[s.category] || iconMap.default;
                                const color = colorMap[s.title] || colorMap[s.category] || colorMap.default;
                                return (
                                    <div
                                        key={s._id}
                                        className={`service-card ${gridVisible ? 'visible' : ''}`}
                                        style={{
                                            position: 'relative',
                                            background: '#fff',
                                            borderRadius: 20,
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 32px rgba(10,23,51,0.08)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: `${i * 100}ms`,
                                            opacity: 0,
                                            transform: 'translateY(30px)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'relative',
                                                height: 160,
                                                background: color,
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
                                            <div
                                                style={{
                                                    fontSize: '4rem',
                                                    filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
                                                    position: 'relative',
                                                    transition: 'transform 0.4s ease',
                                                }}
                                                className="service-icon"
                                            >
                                                {icon}
                                            </div>
                                        </div>
                                        <div style={{ padding: 28, textAlign: 'center' }}>
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
                                                {s.category}
                                            </span>
                                            <h3
                                                style={{
                                                    fontSize: 'clamp(1.15rem, 2vw, 1.3rem)',
                                                    margin: '8px 0 12px',
                                                    fontWeight: 800,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {s.title}
                                            </h3>
                                            <p
                                                className="muted"
                                                style={{
                                                    fontSize: '0.92rem',
                                                    lineHeight: 1.6,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                {s.description}
                                            </p>
                                            <Link
                                                to="/contact"
                                                className="btn-glow"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    padding: '10px 22px',
                                                    borderRadius: 10,
                                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 700,
                                                    boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                                }}
                                            >
                                                Get a Quote <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {!loading && services.length > 0 && (
                        <div
                            className="glass-card"
                            style={{
                                marginTop: 60,
                                padding: 48,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(10,23,51,0.95), rgba(16,42,92,0.95))',
                                border: '1px solid rgba(45,212,191,0.3)',
                                borderRadius: 20,
                                color: '#fff',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 200,
                                    height: 200,
                                    background: 'radial-gradient(circle, rgba(45,212,191,0.2), transparent 70%)',
                                    borderRadius: '50%',
                                }}
                            />
                            <div style={{ position: 'relative' }}>
                                <h3
                                    style={{
                                        fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                                        marginBottom: 12,
                                        fontWeight: 800,
                                        color: '#fff',
                                    }}
                                >
                                    Need a Custom Service?
                                </h3>
                                <p
                                    style={{
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                        marginBottom: 24,
                                        maxWidth: 600,
                                        margin: '0 auto 24px',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    We tailor our services to fit your unique needs. Let's discuss how we can help.
                                </p>
                                <Link
                                    to="/contact"
                                    className="btn-glow"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '14px 32px',
                                        borderRadius: 12,
                                        background: '#fff',
                                        color: '#0A1733',
                                        textDecoration: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    Contact Us <span>→</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .service-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .service-card:hover {
                    transform: translateY(-10px) !important;
                    box-shadow: 0 24px 60px rgba(10,23,51,0.18);
                }
                .service-card:hover .service-icon {
                    transform: scale(1.15) rotate(-5deg);
                }
            `}</style>
        </div>
    );
}
