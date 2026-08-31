import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

const reasons = [
    { title: 'Practical Learning', desc: 'Courses built around real-world application, not just theory.', icon: '🎓', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { title: 'Expert Instructors', desc: 'Learn from experienced professionals active in their fields.', icon: '👨‍🏫', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { title: 'Career Focused', desc: 'Programs designed to improve employability and skills.', icon: '💼', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { title: 'Flexible Online Mode', desc: 'Study from anywhere with fully online delivery.', icon: '🌐', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { title: 'Customer Satisfaction', desc: 'We put our students and clients at the center of everything.', icon: '⭐', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { title: 'Trusted Services', desc: 'Reliable business services from SEO to AI systems.', icon: '🛡️', color: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' },
];

const stats = [
    { v: '98%', l: 'Satisfaction Rate' },
    { v: '24/7', l: 'Support' },
    { v: '50+', l: 'Industry Partners' },
    { v: '95%', l: 'Completion Rate' },
];

export default function WhyChooseUs() {
    const [gridRef, gridVisible] = useInView();
    const [statsRef, statsVisible] = useInView();

    return (
        <div>
            <PageHeader
                eyebrow="Why Choose Us"
                title="Why Choose M.A. Corporation"
                subtitle="A trusted partner for learning, professional development, and business support."
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
                    <div className="grid grid-3">
                        {reasons.map((r, i) => (
                            <div
                                key={r.title}
                                className={`reason-card ${gridVisible ? 'visible' : ''}`}
                                style={{
                                    position: 'relative',
                                    background: '#fff',
                                    borderRadius: 20,
                                    padding: 32,
                                    textAlign: 'center',
                                    boxShadow: '0 8px 32px rgba(10,23,51,0.08)',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${i * 100}ms`,
                                    opacity: 0,
                                    transform: 'translateY(30px)',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 4,
                                        background: r.color,
                                    }}
                                />
                                <div
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 20,
                                        background: r.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.4rem',
                                        margin: '0 auto 20px',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                        transition: 'transform 0.4s ease',
                                    }}
                                    className="reason-icon"
                                >
                                    {r.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                                        marginBottom: 12,
                                        fontWeight: 800,
                                        color: '#0A1733',
                                    }}
                                >
                                    {r.title}
                                </h3>
                                <p
                                    className="muted"
                                    style={{
                                        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {r.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="section-sm section-dark"
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.1), transparent 50%)',
                    }}
                />
                <div className="container" ref={statsRef} style={{ position: 'relative' }}>
                    <div className="section-head">
                        <span className="eyebrow">By the Numbers</span>
                        <h2 style={{ fontWeight: 800 }}>What Sets Us Apart</h2>
                    </div>
                    <div className="grid grid-4">
                        {stats.map((s, i) => (
                            <div
                                key={s.l}
                                className={`reason-stats ${statsVisible ? 'visible' : ''}`}
                                style={{
                                    textAlign: 'center',
                                    padding: 24,
                                    borderRadius: 16,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #fff, #2DD4BF)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        marginBottom: 6,
                                    }}
                                >
                                    {s.v}
                                </div>
                                <div
                                    style={{
                                        fontSize: '0.85rem',
                                        color: 'rgba(255,255,255,0.8)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1.5,
                                        fontWeight: 600,
                                    }}
                                >
                                    {s.l}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="section-sm"
                style={{
                    background: 'linear-gradient(135deg, #14B8A6 0%, #0EA5A4 50%, #0D8B8A 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2
                        style={{
                            color: '#fff',
                            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                            marginBottom: 14,
                            fontWeight: 800,
                        }}
                    >
                        Ready to Get Started?
                    </h2>
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            maxWidth: 600,
                            margin: '0 auto 28px',
                            lineHeight: 1.6,
                        }}
                    >
                        Join thousands of students and businesses who trust M.A. Corporation.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            to="/courses"
                            className="btn-glow"
                            style={{
                                padding: '14px 32px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                borderRadius: 12,
                                background: '#fff',
                                color: '#0A1733',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            }}
                        >
                            Explore Courses <span>→</span>
                        </Link>
                        <Link
                            to="/contact"
                            className="btn-glass"
                            style={{
                                padding: '14px 32px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                borderRadius: 12,
                                border: '2px solid rgba(255,255,255,0.4)',
                                color: '#fff',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                .reason-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .reason-card:hover {
                    transform: translateY(-10px) !important;
                    box-shadow: 0 24px 60px rgba(10,23,51,0.18) !important;
                }
                .reason-card:hover .reason-icon {
                    transform: scale(1.1) rotate(-5deg);
                }
                .reason-stats.visible {
                    animation: fadeUp 0.6s ease forwards;
                }
            `}</style>
        </div>
    );
}
