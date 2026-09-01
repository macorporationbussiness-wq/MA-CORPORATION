import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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

export default function Portfolios() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [gridRef, gridVisible] = useInView();

    useEffect(() => {
        API.get('/portfolios')
            .then((r) => setPortfolios(r.data || []))
            .catch(() => setPortfolios([]))
            .finally(() => setLoading(false));
    }, []);

    const types = ['All', ...Array.from(new Set(portfolios.map((p) => p.projectType).filter(Boolean)))];
    const filtered = activeFilter === 'All'
        ? portfolios
        : portfolios.filter((p) => p.projectType === activeFilter);

    return (
        <div>
            <PageHeader
                eyebrow="Projects"
                title="Team Projects"
                subtitle="Explore the skills, education, experience, and projects of our team members."
            />

            <section
                className={clsx('section', 'section-dark')}
                style={{
                    paddingTop: 48,
                    paddingBottom: 80,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 30%, rgba(45,212,191,0.1), transparent 50%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '40%',
                        right: 0,
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.06), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                <div className="container" style={{ position: 'relative' }}>
                    {types.length > 1 && (
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
                                background: 'rgba(255,255,255,0.05)',
                                borderColor: 'rgba(255,255,255,0.1)',
                            }}
                        >
                            {types.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setActiveFilter(t)}
                                    className={activeFilter === t ? 'btn btn-primary' : 'btn btn-outline'}
                                    style={{
                                        padding: '9px 20px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        borderRadius: 10,
                                        transition: 'all 0.3s ease',
                                        boxShadow: activeFilter === t ? '0 6px 18px rgba(20,184,166,0.4)' : 'none',
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}

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
                            Loading projects…
                        </div>
                    ) : filtered.length === 0 ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 60,
                                textAlign: 'center',
                                background: 'rgba(10, 23, 51, 0.5)',
                                borderColor: 'rgba(255,255,255,0.1)',
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>📁</div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: 20 }}>
                                Our team members haven't added their projects yet.
                            </p>
                            <Link
                                to="/team"
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
                                Meet the Team →
                            </Link>
                        </div>
                    ) : (
                        <div
                            ref={gridRef}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: 28,
                            }}
                        >
                            {filtered.map((p, i) => {
                                const gradient = colorPalette[i % colorPalette.length];
                                const primaryImage = (p.projectImages && p.projectImages.length > 0)
                                    ? p.projectImages[0]
                                    : p.projectImage;
                                return (
                                    <div
                                        key={p._id}
                                        className={`portfolio-card ${gridVisible ? 'visible' : ''}`}
                                        style={{
                                            position: 'relative',
                                            background: 'rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(12px)',
                                            borderRadius: 20,
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: `${i * 80}ms`,
                                            opacity: 0,
                                            transform: 'translateY(30px)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'relative',
                                                aspectRatio: '16/10',
                                                background: gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {primaryImage ? (
                                                <img
                                                    src={primaryImage}
                                                    alt={p.title}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                    }}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <>
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
                                                            fontSize: '3.5rem',
                                                            color: '#fff',
                                                            fontWeight: 800,
                                                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        {(p.teamMember?.name || p.title || '?')
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                </>
                                            )}

                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    left: 12,
                                                    right: 12,
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    gap: 8,
                                                }}
                                            >
                                                {p.featured && (
                                                    <span
                                                        style={{
                                                            padding: '4px 10px',
                                                            borderRadius: 999,
                                                            fontSize: '0.7rem',
                                                            fontWeight: 700,
                                                            background: 'linear-gradient(135deg, #FFE66D, #FFC700)',
                                                            color: '#0A1733',
                                                        }}
                                                    >
                                                        ⭐ FEATURED
                                                    </span>
                                                )}
                                                {p.projectType && (
                                                    <span
                                                        style={{
                                                            padding: '4px 10px',
                                                            borderRadius: 999,
                                                            fontSize: '0.7rem',
                                                            fontWeight: 700,
                                                            background: 'rgba(0,0,0,0.6)',
                                                            color: '#fff',
                                                            backdropFilter: 'blur(8px)',
                                                            marginLeft: 'auto',
                                                        }}
                                                    >
                                                        {p.projectType}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ padding: 24 }}>
                                            {p.teamMember?.name && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 10,
                                                        marginBottom: 14,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: '50%',
                                                            background: gradient,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 700,
                                                            color: '#fff',
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        {p.teamMember.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: '0.85rem',
                                                                color: '#fff',
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            {p.teamMember.name}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: '0.72rem',
                                                                color: 'rgba(255,255,255,0.6)',
                                                            }}
                                                        >
                                                            {p.teamMember.position}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <h3
                                                style={{
                                                    fontSize: '1.15rem',
                                                    marginBottom: 8,
                                                    fontWeight: 800,
                                                    color: '#fff',
                                                }}
                                            >
                                                {p.title}
                                            </h3>
                                            <p
                                                style={{
                                                    color: 'rgba(255,255,255,0.7)',
                                                    fontSize: '0.9rem',
                                                    lineHeight: 1.6,
                                                    marginBottom: 14,
                                                }}
                                            >
                                                {p.description}
                                            </p>

                                            {p.skills && p.skills.length > 0 && (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        gap: 6,
                                                        flexWrap: 'wrap',
                                                        marginBottom: 18,
                                                    }}
                                                >
                                                    {p.skills.slice(0, 4).map((s) => (
                                                        <span
                                                            key={s}
                                                            style={{
                                                                padding: '3px 10px',
                                                                borderRadius: 999,
                                                                fontSize: '0.7rem',
                                                                fontWeight: 600,
                                                                background: 'rgba(45,212,191,0.15)',
                                                                color: '#2DD4BF',
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                <Link
                                                    to={`/portfolios/${p.slug || p._id}`}
                                                    className="btn-glow"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        padding: '9px 18px',
                                                        borderRadius: 10,
                                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                        color: '#fff',
                                                        textDecoration: 'none',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 700,
                                                        boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                                    }}
                                                >
                                                    View Details →
                                                </Link>
                                                {p.projectUrl && (
                                                    <a
                                                        href={p.projectUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: 6,
                                                            padding: '9px 16px',
                                                            borderRadius: 10,
                                                            background: 'rgba(255,255,255,0.08)',
                                                            color: '#fff',
                                                            textDecoration: 'none',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 600,
                                                            border: '1px solid rgba(255,255,255,0.15)',
                                                        }}
                                                    >
                                                        ↗ Live Demo
                                                    </a>
                                                )}
                                            </div>
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
                .portfolio-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .portfolio-card:hover {
                    transform: translateY(-10px) !important;
                    border-color: rgba(45,212,191,0.4) !important;
                    box-shadow: 0 24px 60px rgba(0,0,0,0.35) !important;
                }
            `}</style>
        </div>
    );
}
