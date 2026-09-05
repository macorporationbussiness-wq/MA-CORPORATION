import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';
import { useSettings } from '../context/SettingsContext';

const getIconInfo = (icon) => {
    if (!icon) return { isImageIcon: false, iconSrc: null, emoji: '📍' };
    if (icon.startsWith('http') || icon.startsWith('https://res.cloudinary.com')) {
        return { isImageIcon: true, iconSrc: icon, emoji: null };
    }
    if (icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg') || icon.endsWith('.svg') || icon.endsWith('.webp')) {
        return { isImageIcon: true, iconSrc: `/${icon}`, emoji: null };
    }
    return { isImageIcon: false, iconSrc: null, emoji: icon };
};

export default function About() {
    const { settings } = useSettings();
    const p = settings.aboutPage || {};

    const values = p.values || [
        { title: 'Integrity', desc: 'We believe in honesty and transparency in everything we do.', icon: 'icon-handshake.png' },
        { title: 'Excellence', desc: 'We continuously work to improve the quality of our services.', icon: 'icon-star.png' },
        { title: 'Customer Focus', desc: 'Our clients and students remain at the center of our work.', icon: 'icon-target.png' },
        { title: 'Growth', desc: 'We believe in continuous personal, professional, and organizational development.', icon: 'icon-growth.png' },
        { title: 'Innovation', desc: 'We encourage modern ideas, technology, and new approaches.', icon: 'icon-lightbulb.png' },
    ];

    const coreValueEmoji = {
        'icon-handshake.png': '🤝',
        'icon-star.png': '⭐',
        'icon-target.png': '🎯',
        'icon-growth.png': '📈',
        'icon-lightbulb.png': '💡',
    };

    const journey = p.journeyItems || p.journey || [
        { year: '2019', title: 'Founded', desc: 'M.A. Corporation was established with a clear vision to bridge education and real-world skills.' },
        { year: '2021', title: 'Expansion', desc: 'Launched digital services, expanded our team, and onboarded our first 500 students.' },
        { year: '2023', title: 'Innovation', desc: 'Introduced AI-powered learning paths and corporate consulting services.' },
        { year: 'Today', title: 'Growing Strong', desc: 'Trusted by thousands of students and businesses across the region.' },
    ];

    const [introRef, introVisible] = useInView();
    const [visionRef, visionVisible] = useInView();
    const [missionRef, missionVisible] = useInView();
    const [valuesRef, valuesVisible] = useInView();
    const [journeyRef, journeyVisible] = useInView();
    const [ctaRef, ctaVisible] = useInView();

    return (
        <div>
            <PageHeader
                eyebrow={p.eyebrow || 'About Us'}
                title={p.title || 'About M.A. Corporation'}
                subtitle={p.subtitle || 'Quality education, professional services, and practical learning under one platform.'}
            />

            {/* Intro section with image */}
            <section className={clsx('section', 'section-light')} style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: -150,
                        left: -150,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        right: -100,
                        width: 350,
                        height: 350,
                        background: 'radial-gradient(circle, rgba(45,212,191,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div className="container" ref={introRef} style={{ position: 'relative' }}>
                    <div
                        className={clsx('grid', 'grid-2', 'about-intro-grid')}
                        style={{ gap: 'clamp(32px, 6vw, 60px)', alignItems: 'center' }}
                    >
                        <div className={`animate-on-scroll ${introVisible ? 'visible' : ''}`}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    color: '#0ea5a4',
                                    fontWeight: 700,
                                    letterSpacing: 2,
                                    textTransform: 'uppercase',
                                    fontSize: '0.85rem',
                                    marginBottom: 14,
                                }}
                            >
                                {p.introEyebrow || 'Our Story'}
                            </span>
                            <h2
                                style={{
                                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                                    margin: '12px 0 24px',
                                    fontWeight: 800,
                                    lineHeight: 1.2,
                                    background: 'linear-gradient(135deg, #0A1733, #2DD4BF)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {p.introTitle || 'Building Skills. Creating Opportunities.'}
                            </h2>
                            <p className="muted" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', marginBottom: 18, lineHeight: 1.8 }}>
                                {p.introDesc1 || 'M.A. Corporation was established with the vision of providing reliable professional services and practical learning opportunities under one platform. We believe that knowledge becomes valuable when it can be applied in the real world.'}
                            </p>
                            <p className="muted" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: 1.8 }}>
                                {p.introDesc2 || 'Our approach focuses on practical learning, professional guidance, customer satisfaction, and continuous improvement. Our team works to understand the needs of every client and student and provide solutions that are practical, accessible, and results-oriented.'}
                            </p>
                        </div>
                        <div
                            className={`animate-on-scroll ${introVisible ? 'visible' : ''}`}
                            style={{ transitionDelay: '200ms', textAlign: 'center' }}
                        >
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(45,212,191,0.15), transparent 70%)',
                                        filter: 'blur(20px)',
                                        width: 200,
                                        height: 200,
                                        margin: '-40px auto 0',
                                    }}
                                />
                                <img
                                    src={p.logoImage || '/logo.png'}
                                    alt="M.A. Corporation Logo"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: 280,
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 8px 32px rgba(45,212,191,0.25))',
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: 32 }}>
                                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: '#0A1733', marginBottom: 8, fontWeight: 800 }}>
                                    {p.introBadge || 'Since 2019'}
                                </h3>
                                <p style={{ color: '#647489', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', lineHeight: 1.6 }}>
                                    {p.introBadgeDesc || 'Empowering learners and businesses'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
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
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div className="container" ref={visionRef} style={{ position: 'relative' }}>
                    <div className="section-head">
                        <span className="eyebrow">{p.valuesEyebrow || 'What Drives Us'}</span>
                        <h2 style={{ fontWeight: 800 }}>{p.visionTitle || 'Our Vision'} & {p.missionTitle || 'Mission'}</h2>
                    </div>
                    <div className={clsx('grid', 'grid-2')} style={{ gap: 32 }}>
                        <div
                            className={`glass-card ${visionVisible ? 'visible' : ''}`}
                            style={{ padding: 40 }}
                        >
                            <div
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20,
                                    background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(20,184,166,0.15))',
                                    border: '1px solid rgba(45,212,191,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                    boxShadow: '0 8px 32px rgba(45,212,191,0.25)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <span style={{ fontSize: 40 }}>👁️</span>
                            </div>
                            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', margin: '0 0 16px', fontWeight: 800, color: '#fff' }}>
                                {p.visionTitle || 'Our Vision'}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, fontSize: '1rem' }}>
                                {p.visionDesc || 'To become a trusted and recognized organization known for quality education, professional services, innovation, and customer satisfaction.'}
                            </p>
                        </div>
                        <div
                            className={`glass-card ${missionVisible ? 'visible' : ''}`}
                            style={{ padding: 40, transitionDelay: '200ms' }}
                            ref={missionRef}
                        >
                            <div
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20,
                                    background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(20,184,166,0.15))',
                                    border: '1px solid rgba(45,212,191,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                    boxShadow: '0 8px 32px rgba(45,212,191,0.25)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <span style={{ fontSize: 40 }}>🎯</span>
                            </div>
                            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', margin: '0 0 16px', fontWeight: 800, color: '#fff' }}>
                                {p.missionTitle || 'Our Mission'}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, fontSize: '1rem' }}>
                                {p.missionDesc || 'Our mission is to empower individuals and organizations through practical knowledge, professional services, and opportunities that contribute to personal and business growth.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className={clsx('section', 'section-light')}>
                <div className="container" ref={valuesRef}>
                    <div className="section-head">
                        <span className="eyebrow">{p.valuesEyebrow || 'What Drives Us'}</span>
                        <h2
                            style={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #0A1733, #2DD4BF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {p.valuesTitle || 'Our Core Values'}
                        </h2>
                        <p>{p.valuesDesc || 'The principles that guide everything we do at M.A. Corporation.'}</p>
                    </div>
                    <div className={clsx('grid', 'grid-3')} style={{ justifyContent: 'center' }}>
                        {values.slice(0, 3).map((v, i) => (
                            <div
                                key={v.title}
                                className={`glass-card ${valuesVisible ? 'visible' : ''}`}
                                style={{
                                    textAlign: 'center',
                                    padding: 32,
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <div
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 20,
                                        background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(20,184,166,0.15))',
                                        border: '1px solid rgba(45,212,191,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 16,
                                        boxShadow: '0 8px 32px rgba(45,212,191,0.25)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <span style={{ fontSize: 40 }}>{coreValueEmoji[v.icon] || '⭐'}</span>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 10, fontWeight: 700 }}>
                                    {v.title}
                                </h3>
                                <p className="muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="about-values-row2" style={{ margin: '28px auto 0 auto' }}>
                        <div className={clsx('grid', 'grid-2')} style={{ justifyContent: 'center' }}>
                            {values.slice(3).map((v, i) => (
                                <div
                                    key={v.title}
                                    className={`glass-card ${valuesVisible ? 'visible' : ''}`}
                                    style={{
                                        textAlign: 'center',
                                        padding: 32,
                                        transitionDelay: `${(i + 3) * 100}ms`,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 20,
                                            background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(20,184,166,0.15))',
                                            border: '1px solid rgba(45,212,191,0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 16,
                                            boxShadow: '0 8px 32px rgba(45,212,191,0.25)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <span style={{ fontSize: 40 }}>{coreValueEmoji[v.icon] || '⭐'}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: 10, fontWeight: 700 }}>
                                        {v.title}
                                    </h3>
                                    <p className="muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                                        {v.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey */}
            <section className={clsx('section', 'section-white')}>
                <div className="container" ref={journeyRef}>
                    <div className="section-head">
                        <span className="eyebrow">{p.journeyEyebrow || 'Our Journey'}</span>
                        <h2
                            style={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #0A1733, #2DD4BF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {p.journeyTitle || 'Milestones That Shaped Us'}
                        </h2>
                        <p>{p.journeyDesc || 'A timeline of growth, learning, and impact.'}</p>
                    </div>
                    <div
                        className="about-journey"
                        style={{
                            position: 'relative',
                            maxWidth: 800,
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: 2,
                                background: 'linear-gradient(180deg, transparent, #2DD4BF, transparent)',
                                transform: 'translateX(-50%)',
                            }}
                            className="journey-line"
                        />
                        {journey.map((item, i) => (
                            <div
                                key={item.year}
                                className={`journey-item animate-on-scroll ${journeyVisible ? 'visible' : ''}`}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto 1fr',
                                    gap: 24,
                                    alignItems: 'center',
                                    marginBottom: 40,
                                    transitionDelay: `${i * 150}ms`,
                                }}
                            >
                                {i % 2 === 0 ? (
                                    <>
                                        <div
                                            className="journey-card glass-card"
                                            style={{ padding: 24, textAlign: 'right' }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '0.85rem',
                                                    color: '#0ea5a4',
                                                    fontWeight: 700,
                                                    letterSpacing: 1.5,
                                                    textTransform: 'uppercase',
                                                    marginBottom: 6,
                                                }}
                                            >
                                                {item.year}
                                            </div>
                                            <h3 style={{ fontSize: '1.15rem', marginBottom: 6, fontWeight: 700 }}>
                                                {item.title}
                                            </h3>
                                            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                        <div
                                            className="journey-dot"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #2DD4BF, #14B8A6)',
                                                boxShadow: '0 0 0 4px #fff, 0 0 0 6px rgba(45,212,191,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {(() => {
                                                const iconInfo = getIconInfo(item.icon);
                                                if (iconInfo.isImageIcon) {
                                                    return (
                                                        <img
                                                            src={iconInfo.iconSrc}
                                                            alt=""
                                                            style={{
                                                                width: '30px',
                                                                height: '30px',
                                                                objectFit: 'contain',
                                                            }}
                                                        />
                                                    );
                                                }
                                                return <span style={{ fontSize: '1.5rem' }}>{iconInfo.emoji}</span>;
                                            })()}
                                        </div>
                                        <div className="journey-spacer" />
                                    </>
                                ) : (
                                    <>
                                        <div className="journey-spacer" />
                                        <div
                                            className="journey-dot"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #2DD4BF, #14B8A6)',
                                                boxShadow: '0 0 0 4px #fff, 0 0 0 6px rgba(45,212,191,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {(() => {
                                                const iconInfo = getIconInfo(item.icon);
                                                if (iconInfo.isImageIcon) {
                                                    return (
                                                        <img
                                                            src={iconInfo.iconSrc}
                                                            alt=""
                                                            style={{
                                                                width: '30px',
                                                                height: '30px',
                                                                objectFit: 'contain',
                                                            }}
                                                        />
                                                    );
                                                }
                                                return <span style={{ fontSize: '1.5rem' }}>{iconInfo.emoji}</span>;
                                            })()}
                                        </div>
                                        <div
                                            className="journey-card glass-card"
                                            style={{ padding: 24, textAlign: 'left' }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '0.85rem',
                                                    color: '#0ea5a4',
                                                    fontWeight: 700,
                                                    letterSpacing: 1.5,
                                                    textTransform: 'uppercase',
                                                    marginBottom: 6,
                                                }}
                                            >
                                                {item.year}
                                            </div>
                                            <h3 style={{ fontSize: '1.15rem', marginBottom: 6, fontWeight: 700 }}>
                                                {item.title}
                                            </h3>
                                            <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={clsx('section-sm', 'section-light')}>
                <div className="container" ref={ctaRef}>
                    <div className={`cta-card ${ctaVisible ? 'visible' : ''}`}>
                        <h2
                            style={{
                                color: '#fff',
                                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                                marginBottom: 16,
                                position: 'relative',
                                zIndex: 1,
                                fontWeight: 800,
                            }}
                        >
                            {p.ctaTitle || 'Want to Work With Us?'}
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
                            {p.ctaDesc || 'Join our team or partner with us to create meaningful impact through education and services.'}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                gap: 'clamp(12px, 3vw, 16px)',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <Link
                                to="/team"
                                className="btn-glow"
                                style={{
                                    padding: 'clamp(12px, 3vw, 14px) clamp(24px, 6vw, 36px)',
                                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                    fontWeight: 700,
                                    borderRadius: 'clamp(8px, 2vw, 12px)',
                                    background: '#fff',
                                    color: '#0A1733',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                }}
                            >
                                {p.ctaTeamBtn || 'Meet Our Team'} <span>→</span>
                            </Link>
                            <Link
                                to="/contact"
                                className="btn-glass"
                                style={{
                                    padding: 'clamp(12px, 3vw, 14px) clamp(24px, 6vw, 36px)',
                                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                    fontWeight: 700,
                                    borderRadius: 'clamp(8px, 2vw, 12px)',
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
                                {p.ctaContactBtn || 'Contact Us'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
