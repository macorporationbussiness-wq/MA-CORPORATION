import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [gridRef, gridVisible] = useInView();

    useEffect(() => {
        API.get('/courses').then((r) => setCourses(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
    const filtered = courses.filter((c) => {
        const matchCat = category === 'All' || c.category === category;
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.shortDescription.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div>
            <PageHeader
                eyebrow="Courses"
                title="Explore Our Courses"
                subtitle="Learn practical skills from experienced professionals and take the next step in your career."
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
                        right: -100,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div className="container" style={{ position: 'relative' }}>
                    <div
                        className="glass-card"
                        style={{
                            padding: 24,
                            marginBottom: 40,
                            display: 'flex',
                            gap: 16,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            background: 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    className={category === c ? 'btn btn-primary' : 'btn btn-outline'}
                                    style={{
                                        padding: '10px 22px',
                                        fontSize: '0.88rem',
                                        fontWeight: 600,
                                        borderRadius: 10,
                                        transition: 'all 0.3s ease',
                                        boxShadow: category === c ? '0 6px 18px rgba(20,184,166,0.35)' : 'none',
                                    }}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                        <div style={{ position: 'relative', minWidth: 260, flex: '1 1 260px', maxWidth: 360 }}>
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 14,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '1rem',
                                    color: '#0ea5a4',
                                    pointerEvents: 'none',
                                }}
                            >
                                🔍
                            </span>
                            <input
                                placeholder="Search courses…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 42px',
                                    background: '#ffffff',
                                    border: '1px solid rgba(10,23,51,0.12)',
                                    borderRadius: 10,
                                    color: '#0a1733',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#0ea5a4';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(10,23,51,0.12)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
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
                            Loading courses…
                        </div>
                    ) : filtered.length === 0 ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 60,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
                            <p className="muted" style={{ fontSize: '1.05rem' }}>
                                No courses found. Try a different filter or search.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-3" ref={gridRef}>
                                {filtered.map((c, i) => (
                                    <div
                                        key={c._id}
                                        className={`glass-card course-card ${gridVisible ? 'visible' : ''}`}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: 0,
                                            overflow: 'hidden',
                                            transitionDelay: `${i * 80}ms`,
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
                                                    background: 'radial-gradient(circle at 30% 30%, rgba(45,212,191,0.3), transparent 60%)',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    left: 12,
                                                    display: 'flex',
                                                    gap: 6,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                {c.featured && (
                                                    <span
                                                        style={{
                                                            padding: '4px 10px',
                                                            borderRadius: 999,
                                                            fontSize: '0.7rem',
                                                            fontWeight: 700,
                                                            background: 'linear-gradient(135deg, #FFE66D, #FFC700)',
                                                            color: '#0A1733',
                                                            letterSpacing: 0.5,
                                                        }}
                                                    >
                                                        ⭐ FEATURED
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '3.5rem',
                                                    filter: 'drop-shadow(0 6px 20px rgba(45,212,191,0.4))',
                                                    position: 'relative',
                                                }}
                                            >
                                                {c.level === 'Beginner'
                                                    ? '🌱'
                                                    : c.level === 'Advanced'
                                                        ? '🚀'
                                                        : '🎓'}
                                            </div>
                                        </div>
                                        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    gap: 6,
                                                    marginBottom: 12,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <span
                                                    className="badge"
                                                    style={{
                                                        background: 'rgba(20,184,166,0.12)',
                                                        color: '#0ea5a4',
                                                    }}
                                                >
                                                    {c.level}
                                                </span>
                                                <span className="badge">{c.category}</span>
                                            </div>
                                            <h3
                                                style={{
                                                    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                                                    marginBottom: 10,
                                                    fontWeight: 700,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {c.name}
                                            </h3>
                                            <p
                                                className="muted"
                                                style={{
                                                    fontSize: '0.92rem',
                                                    flex: 1,
                                                    lineHeight: 1.6,
                                                    marginBottom: 16,
                                                }}
                                            >
                                                {c.shortDescription}
                                            </p>
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                                    gap: 8,
                                                    margin: '12px 0 16px',
                                                    padding: '12px 0',
                                                    borderTop: '1px solid rgba(10,23,51,0.08)',
                                                    borderBottom: '1px solid rgba(10,23,51,0.08)',
                                                }}
                                            >
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                        Duration
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1733', marginTop: 2 }}>
                                                        {c.durationWeeks}w
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                        Classes
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1733', marginTop: 2 }}>
                                                        {c.classesPerWeek}/wk
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                        Fee
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: '0.9rem',
                                                            fontWeight: 800,
                                                            background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            backgroundClip: 'text',
                                                            marginTop: 2,
                                                        }}
                                                    >
                                                        PKR {c.fee > 999 ? `${(c.fee / 1000).toFixed(0)}k` : c.fee.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                                <Link
                                                    to={`/courses/${c.slug}`}
                                                    style={{
                                                        flex: 1,
                                                        minWidth: 120,
                                                        padding: '11px 16px',
                                                        borderRadius: 10,
                                                        border: '2px solid #0ea5a4',
                                                        color: '#0ea5a4',
                                                        background: 'transparent',
                                                        textDecoration: 'none',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 700,
                                                        textAlign: 'center',
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = '#0ea5a4';
                                                        e.currentTarget.style.color = '#fff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = '#0ea5a4';
                                                    }}
                                                >
                                                    View Details
                                                </Link>
                                                <Link
                                                    to="/admissions"
                                                    className="btn-glow"
                                                    style={{
                                                        flex: 1,
                                                        minWidth: 120,
                                                        padding: '11px 16px',
                                                        borderRadius: 10,
                                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                        color: '#fff',
                                                        textDecoration: 'none',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 700,
                                                        textAlign: 'center',
                                                        boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                                        border: 'none',
                                                    }}
                                                >
                                                    Enroll Now →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .course-card.visible {
                    animation: fadeUp 0.6s ease forwards;
                }
            `}</style>
        </div>
    );
}
