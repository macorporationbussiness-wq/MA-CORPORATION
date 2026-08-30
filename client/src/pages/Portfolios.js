import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

export default function Portfolios() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        API.get('/portfolios')
            .then((r) => setPortfolios(r.data || []))
            .catch(() => setPortfolios([]))
            .finally(() => setLoading(false));
    }, []);

    // Extract unique project types for filter buttons
    const types = ['All', ...Array.from(
        new Set(portfolios.map((p) => p.projectType).filter(Boolean))
    )];

    const filtered = activeFilter === 'All'
        ? portfolios
        : portfolios.filter((p) => p.projectType === activeFilter);

    const getCategoryColor = (type) => {
        const colors = {
            'Web App': '#6C63FF',
            'Mobile App': '#4ECDC4',
            'Branding': '#FF6B6B',
            'UI/UX Design': '#FFE66D',
            'AI/ML': '#00D4AA',
            'Other': '#8B85FF',
        };
        return colors[type] || '#6C63FF';
    };

    const initials = (name) => {
        if (!name) return '📁';
        return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    };

    if (loading) {
        return (
            <div>
                <PageHeader eyebrow="PORTFOLIO" title="Projects" subtitle="Handcrafted digital experiences" />
                <section className="section-light" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                    <div className="container">
                        <p className="muted text-center">Loading portfolio projects…</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div>
            <PageHeader eyebrow="PORTFOLIO" title="Projects" subtitle="Handcrafted digital experiences" />

            <section className="section-dark" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
                <div className="container">
                    {/* Filters */}
                    <div className="project-filters">
                        {types.map((t) => (
                            <button
                                key={t}
                                className={`filter-btn ${activeFilter === t ? 'active' : ''}`}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '20px',
                                    border: activeFilter === t ? 'none' : '1px solid var(--border-dark)',
                                    background: activeFilter === t
                                        ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
                                        : 'var(--surface)',
                                    color: activeFilter === t ? '#fff' : 'var(--text-light)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'var(--font-mono)',
                                    letterSpacing: '0.5px',
                                }}
                                onClick={() => setActiveFilter(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <p className="muted">No projects in this category yet.</p>
                        </div>
                    ) : (
                        <div
                            className="projects-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                                gap: '32px',
                            }}
                        >
                            {filtered.map((p) => (
                                <div
                                    key={p._id}
                                    className="project-card"
                                    style={{
                                        background: 'var(--card)',
                                        borderRadius: 'var(--radius)',
                                        overflow: 'hidden',
                                        border: '1px solid var(--border-dark)',
                                        transition: 'all 0.3s ease',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    {/* Image / Placeholder */}
                                    <div
                                        className="project-image"
                                        style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            aspectRatio: '16/10',
                                        }}
                                    >
                                        {(() => {
                                            const primaryImage = (p.projectImages && p.projectImages.length > 0)
                                                ? p.projectImages[0]
                                                : p.projectImage;
                                            return primaryImage ? (
                                                <img
                                                    src={primaryImage}
                                                    alt={p.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                                    loading="lazy"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        background: `linear-gradient(135deg, ${getCategoryColor(p.projectType)}, ${getCategoryColor(p.projectType)}99)`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '3rem',
                                                        fontWeight: 700,
                                                        color: '#fff',
                                                        fontFamily: 'var(--font-mono)',
                                                    }}
                                                >
                                                    {initials(p.teamMember?.name || p.title)}
                                                </div>
                                            );
                                        })()}

                                        {/* Overlay with Visit Portfolio button */}
                                        <div
                                            className="project-overlay"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.9), rgba(0, 212, 170, 0.8))',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '14px',
                                                opacity: 0,
                                                transition: 'opacity 0.4s ease',
                                            }}
                                        >
                                            <Link
                                                to={`/portfolios/${p.slug || p._id}`}
                                                className="btn btn-sm"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.15)',
                                                    backdropFilter: 'blur(10px)',
                                                    color: '#fff',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    padding: '8px 18px',
                                                    fontSize: '0.85rem',
                                                    borderRadius: 'var(--radius-sm)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <i className="fas fa-arrow-up-right"></i>
                                                Visit Portfolio
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="project-info" style={{ padding: '28px' }}>
                                        {p.featured && (
                                            <span className="badge" style={{
                                                display: 'inline-block',
                                                fontSize: '0.65rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                color: '#FFE66D',
                                                background: 'rgba(108, 99, 255, 0.15)',
                                                padding: '4px 12px',
                                                borderRadius: '4px',
                                                marginBottom: '10px',
                                                fontFamily: 'var(--font-mono)',
                                            }}>
                                                Featured
                                            </span>
                                        )}
                                        <span
                                            className="project-category"
                                            style={{
                                                display: 'inline-block',
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                color: getCategoryColor(p.projectType),
                                                background: `${getCategoryColor(p.projectType)}20`,
                                                padding: '4px 12px',
                                                borderRadius: '4px',
                                                marginBottom: p.featured ? '8px' : '12px',
                                                fontFamily: 'var(--font-mono)',
                                            }}
                                        >
                                            {p.projectType}
                                        </span>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            marginBottom: '8px',
                                            color: 'var(--text)',
                                        }}>
                                            {p.title}
                                        </h3>
                                        {p.role && (
                                            <p className="muted" style={{ fontSize: '0.8rem', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                                                Role: {p.role}
                                            </p>
                                        )}
                                        {p.skills && p.skills.length > 0 && (
                                            <p className="project-tech" style={{
                                                fontSize: '0.8rem',
                                                color: 'var(--text-lighter)',
                                                fontFamily: 'var(--font-mono)',
                                                marginBottom: '12px',
                                            }}>
                                                {p.skills.join(' · ')}
                                            </p>
                                        )}
                                        <p style={{
                                            color: 'var(--text-light)',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.7,
                                        }}>
                                            {p.description}
                                        </p>

                                        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                                            <Link
                                                to={`/portfolios/${p.slug || p._id}`}
                                                className="btn btn-sm"
                                                style={{
                                                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                                    color: '#fff',
                                                    padding: '8px 16px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: 'var(--radius-sm)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                }}
                                            >
                                                <i className="fas fa-arrow-up-right"></i>
                                                Visit Portfolio
                                            </Link>
                                            {p.projectUrl && (
                                                <a
                                                    href={p.projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm"
                                                    style={{
                                                        background: 'rgba(108, 99, 255, 0.15)',
                                                        backdropFilter: 'blur(10px)',
                                                        color: '#fff',
                                                        border: '1px solid var(--border-dark)',
                                                        padding: '8px 16px',
                                                        fontSize: '0.8rem',
                                                        borderRadius: 'var(--radius-sm)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                    }}
                                                >
                                                    <i className="fas fa-external-link-alt"></i>
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
