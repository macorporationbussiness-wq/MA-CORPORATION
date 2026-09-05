import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import useInView from '../hooks/useInView';

// Helper to determine icon type and render appropriately
const getIconInfo = (icon) => {
    if (!icon) return { type: 'emoji', value: '⭐' };

    // Check if it's a Cloudinary URL
    if (icon.startsWith('http')) {
        return { type: 'image', value: icon };
    }

    // Check if it's a PNG/JPG/SVG/WebP filename
    if (icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg') || icon.endsWith('.svg') || icon.endsWith('.webp')) {
        return { type: 'image', value: '/' + icon };
    }

    // Default to emoji
    return { type: 'emoji', value: icon };
};

const keyAreaEmoji = (icon) => {
    const map = {
        graduation: '🎓',
        'icon-graduation.png': '🎓',
        briefcase: '💼',
        'icon-briefcase.png': '💼',
        team: '👥',
        'icon-team.png': '👥',
        rocket: '🚀',
        'icon-rocket.png': '🚀',
    };
    return map[icon] || '⭐';
};

const coreValueEmoji = (icon) => {
    const map = {
        handshake: '🤝',
        'icon-handshake.png': '🤝',
        star: '⭐',
        'icon-star.png': '⭐',
        target: '🎯',
        'icon-target.png': '🎯',
        growth: '📈',
        'icon-growth.png': '📈',
        lightbulb: '💡',
        'icon-lightbulb.png': '💡',
    };
    return map[icon] || '⭐';
};

export default function Home() {
    const { settings } = useSettings();
    const [courses, setCourses] = useState([]);
    const [services, setServices] = useState([]);
    const [keyAreasRef, keyAreasVisible] = useInView();
    const [servicesRef, servicesVisible] = useInView();
    const [coursesRef, coursesVisible] = useInView();
    const [valuesRef, valuesVisible] = useInView();
    const [ctaRef, ctaVisible] = useInView();

    // Use settings with fallback to defaults
    const homeHero = settings.homeHero || {};
    const homeIntro = settings.homeIntro || {};
    const homeKeyAreas = settings.homeKeyAreas || [];
    const homeCoreValues = settings.homeCoreValues || [];
    const homeServices = settings.homeServices || {};
    const homeValues = settings.homeValues || {};
    const homeCta = settings.homeCta || {};

    useEffect(() => {
        API.get('/courses?featured=true').then((r) => setCourses(r.data)).catch(() => { });
        API.get('/services').then((r) => setServices(r.data.slice(0, 4))).catch(() => { });
    }, []);

    return (
        <div>
            {/* Hero — full-width banner with text overlay */}
            <section className="section-dark"
                style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundImage: 'url(/sell-banner.jfif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'scroll',
                }}
            >
                {/* Dark overlay to ensure text readability over the banner */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(10, 23, 51, 0.65)',
                        zIndex: 1,
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(45,212,191,0.25), transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        animation: 'float 6s ease-in-out infinite',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '10%',
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.18), transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        animation: 'float 8s ease-in-out infinite reverse',
                    }}
                />

                <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 20px' }}>
                    <div style={{ maxWidth: 900, textAlign: 'center', margin: '0 auto' }}>
                        <div className="fade-up">
                            <span
                                className="hero-badge"
                                style={{
                                    display: 'inline-block',
                                    marginBottom: 24,
                                    background: 'rgba(45,212,191,0.15)',
                                    color: '#2DD4BF',
                                    border: '1px solid rgba(45,212,191,0.3)',
                                    padding: '10px 24px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    letterSpacing: 2,
                                    textTransform: 'uppercase',
                                    borderRadius: 999,
                                    backdropFilter: 'blur(8px)',
                                }}
                            >
                                {homeHero.badge || '✨ Professional Education & Services'}
                            </span>
                            <h1
                                className="hero-title"
                                style={{
                                    color: '#fff',
                                    fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                                    marginBottom: 28,
                                    lineHeight: 1.1,
                                    fontWeight: 800,
                                    fontFamily: "var(--heading)",
                                    textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                {homeHero.title || 'Empowering People. Building Skills. Creating Opportunities.'}
                            </h1>
                            <p
                                style={{
                                    color: 'rgba(255,255,255,0.92)',
                                    fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
                                    marginBottom: 48,
                                    maxWidth: 720,
                                    margin: '0 auto 48px',
                                    lineHeight: 1.7,
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                }}
                            >
                                {homeHero.subtitle || 'M.A. Corporation provides professional courses and quality business services designed to help individuals, students, and organizations achieve their goals.'}
                            </p>
                            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link
                                    to="/courses"
                                    className="btn-glow"
                                    style={{
                                        padding: '16px 40px',
                                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                        fontWeight: 700,
                                        borderRadius: 14,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        boxShadow: '0 10px 30px rgba(20,184,166,0.4)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {homeHero.primaryBtnText || 'Explore Courses'}
                                    <span style={{ fontSize: '1.2rem' }}>→</span>
                                </Link>
                                <Link
                                    to="/services"
                                    className="btn-glass"
                                    style={{
                                        padding: '16px 40px',
                                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                        fontWeight: 700,
                                        borderRadius: 14,
                                        border: '2px solid rgba(255,255,255,0.4)',
                                        color: '#fff',
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {homeHero.secondaryBtnText || 'Our Services'}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                        aria-label="Scroll down"
                        style={{
                            position: 'absolute',
                            bottom: -60,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10,
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            backdropFilter: 'blur(8px)',
                            animation: 'bounce 2s ease-in-out infinite',
                        }}
                    >
                        ↓
                    </button>
                </div>
            </section>

            {/* Company Introduction — light */}
            <section
                className={clsx('section', 'section-light')}
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div className="container" style={{ maxWidth: 860, textAlign: 'center', position: 'relative' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            color: '#0ea5a4',
                            fontWeight: 700,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            fontSize: '0.78rem',
                            padding: '6px 16px',
                            background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(14,165,164,0.12))',
                            border: '1px solid rgba(20,184,166,0.25)',
                            borderRadius: 999,
                            marginBottom: 14,
                        }}
                    >
                        {homeIntro.badge || 'Who We Are'}
                    </span>
                    <h2
                        style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                            margin: '12px 0 20px',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #0A1733 0%, #14B8A6 50%, #0EA5A4 100%)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shimmer 8s ease-in-out infinite',
                        }}
                    >
                        {homeIntro.title || 'Welcome to M.A. Corporation'}
                    </h2>
                    <p
                        className="muted"
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                            marginBottom: 32,
                            lineHeight: 1.8,
                        }}
                    >
                        {homeIntro.description || 'M.A. Corporation is a professional organization committed to providing quality education, practical learning opportunities, and reliable professional services. Our goal is to connect knowledge with real-world skills and provide individuals and businesses with solutions that create meaningful and sustainable results.'}
                    </p>
                    <Link
                        to="/about"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 28px',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(14,165,164,0.12))',
                            color: '#0ea5a4',
                            textDecoration: 'none',
                            fontWeight: 700,
                            border: '1px solid rgba(20,184,166,0.3)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {homeIntro.readMoreText || 'Read More'} <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Key Areas — dark */}
            <section className={clsx('section-sm', 'section-dark')} style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 50%, rgba(45,212,191,0.1), transparent 50%)',
                    }}
                />
                <div className="container" ref={keyAreasRef} style={{ position: 'relative' }}>
                    <div className="section-head">
                        <span className="eyebrow">What We Do</span>
                        <h2 style={{ fontWeight: 800 }}>Our Key Areas</h2>
                    </div>
                    <div className={clsx('grid', 'grid-4')}>
                        {homeKeyAreas.map((a, i) => {
                            const iconInfo = getIconInfo(a.icon);
                            return (
                                <div
                                    key={a.title}
                                    className={`glass-card ${keyAreasVisible ? 'visible' : ''}`}
                                    style={{
                                        textAlign: 'center',
                                        padding: 32,
                                        transitionDelay: `${i * 100}ms`,
                                    }}
                                >
                                    <div style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 16,
                                        background: 'linear-gradient(135deg, rgba(45,212,191,0.2), rgba(20,184,166,0.2))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 18px',
                                        border: '1px solid rgba(45,212,191,0.3)',
                                    }}>
                                        {iconInfo.type === 'image' ? (
                                            <img src={iconInfo.value} alt={a.title} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                                        ) : (
                                            <span style={{ fontSize: 36 }}>{iconInfo.value}</span>
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: 10, fontWeight: 700 }}>{a.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{a.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services — light */}
            <section className={clsx('section', 'section-white')}>
                <div className="container" ref={servicesRef}>
                    <div className="section-head">
                        <span className="eyebrow">{homeServices.eyebrow || 'Services'}</span>
                        <h2 style={{ fontWeight: 800 }}>{homeServices.title || 'Our Professional Services'}</h2>
                        <p>{homeServices.subtitle || 'Reliable, customized services designed to meet the needs of individuals, professionals, and businesses.'}</p>
                    </div>
                    <div className={clsx('grid', 'grid-4')}>
                        {services.map((s, i) => {
                            const iconInfo = getIconInfo(s.image || s.icon);
                            return (
                                <div
                                    key={s._id}
                                    className={`glass-card ${servicesVisible ? 'visible' : ''}`}
                                    style={{
                                        textAlign: 'center',
                                        padding: 28,
                                        transitionDelay: `${i * 100}ms`,
                                    }}
                                >
                                    <div style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 14,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                        boxShadow: '0 8px 20px rgba(20,184,166,0.3)',
                                        fontSize: '1.5rem',
                                    }}>
                                        {iconInfo.type === 'image' ? (
                                            <img src={iconInfo.value} alt={s.title} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                                        ) : (
                                            <span style={{ fontSize: 28 }}>{iconInfo.value}</span>
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', marginBottom: 10, fontWeight: 700 }}>{s.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{s.description}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className={clsx('text-center', 'mt-3')}>
                        <Link to="/services" className={clsx('btn', 'btn-outline')}>{homeServices.viewAllText || 'View All Services'} →</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us — light */}
            <section className={clsx('section', 'section-light')}>
                <div className="container" ref={valuesRef}>
                    <div className="section-head">
                        <span className="eyebrow">{homeValues.eyebrow || 'Why Choose Us'}</span>
                        <h2 style={{ fontWeight: 800 }}>{homeValues.title || 'Our Core Values'}</h2>
                    </div>
                    <div className={clsx('grid', 'grid-3')} style={{ justifyContent: 'center' }}>
                        {homeCoreValues.slice(0, 3).map((v, i) => {
                            const iconInfo = getIconInfo(v.icon);
                            return (
                                <div
                                    key={v.title}
                                    className={`glass-card ${valuesVisible ? 'visible' : ''}`}
                                    style={{
                                        textAlign: 'center',
                                        padding: 28,
                                        transitionDelay: `${i * 100}ms`,
                                    }}
                                >
                                    <div style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 16,
                                        background: 'linear-gradient(135deg, rgba(45,212,191,0.2), rgba(20,184,166,0.2))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 18px',
                                        border: '1px solid rgba(45,212,191,0.3)',
                                    }}>
                                        {iconInfo.type === 'image' ? (
                                            <img src={iconInfo.value} alt={v.title} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                                        ) : (
                                            <span style={{ fontSize: 36 }}>{iconInfo.value}</span>
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', marginBottom: 8, fontWeight: 700 }}>{v.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ maxWidth: 'calc(66.667% + 28px)', margin: '28px auto 0 auto' }}>
                        <div className={clsx('grid', 'grid-2')} style={{ justifyContent: 'center' }}>
                            {homeCoreValues.slice(3).map((v, i) => {
                                const iconInfo = getIconInfo(v.icon);
                                return (
                                    <div
                                        key={v.title}
                                        className={`glass-card ${valuesVisible ? 'visible' : ''}`}
                                        style={{
                                            textAlign: 'center',
                                            padding: 28,
                                            transitionDelay: `${(i + 3) * 100}ms`,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: 16,
                                                background: 'linear-gradient(135deg, rgba(45,212,191,0.2), rgba(20,184,166,0.2))',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 18px',
                                                border: '1px solid rgba(45,212,191,0.3)',
                                            }}
                                        >
                                            {iconInfo.type === 'image' ? (
                                                <img src={iconInfo.value} alt={v.title} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                                            ) : (
                                                <span style={{ fontSize: 36 }}>{iconInfo.value}</span>
                                            )}
                                        </div>
                                        <h3 style={{ fontSize: '1.15rem', marginBottom: 8, fontWeight: 700 }}>{v.title}</h3>
                                        <p className="muted" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{v.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA — light */}
            <section className={clsx('section-sm', 'section-light')}>
                <div className="container" ref={ctaRef}>
                    <div className={`cta-card ${ctaVisible ? 'visible' : ''}`}>
                        <h2
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #2DD4BF 50%, #14B8A6 100%)',
                                backgroundSize: '200% 200%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                animation: 'shimmer 8s ease-in-out infinite',
                                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                                marginBottom: 16,
                                position: 'relative',
                                zIndex: 1,
                                fontWeight: 800,
                            }}
                        >
                            {homeCta.title || 'Ready to Start Your Journey?'}
                        </h2>
                        <p
                            style={{
                                color: 'rgba(255,255,255,0.85)',
                                maxWidth: 600,
                                margin: '0 auto 32px',
                                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                                position: 'relative',
                                zIndex: 1,
                                lineHeight: 1.6,
                            }}
                        >
                            {homeCta.description || 'Join thousands of students and professionals building their future with M.A. Corporation.'}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                gap: 16,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <Link
                                to="/admissions"
                                className="btn-glow"
                                style={{
                                    padding: '14px 36px',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    borderRadius: 12,
                                    background: '#fff',
                                    color: '#0A1733',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {homeCta.primaryBtnText || 'Get Started'} <span>→</span>
                            </Link>
                            <a
                                href={buildWhatsAppLink(settings.whatsapp, homeCta.whatsappMessage || 'Hello! I want to enroll in a course.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: '14px 36px',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    borderRadius: 12,
                                    background: '#25D366',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    boxShadow: '0 10px 30px rgba(37,211,102,0.4)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {homeCta.whatsappBtnText || 'Chat on WhatsApp'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
