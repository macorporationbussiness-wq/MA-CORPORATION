import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import useInView from '../hooks/useInView';

const coreValues = [
    { title: 'Integrity', desc: 'We believe in honesty and transparency.', icon: '🤝' },
    { title: 'Excellence', desc: 'We continuously work to improve the quality of our services.', icon: '⭐' },
    { title: 'Innovation', desc: 'We encourage modern ideas, technology, and new approaches.', icon: '💡' },
    { title: 'Customer Focus', desc: 'Our clients and students remain at the center of our work.', icon: '🎯' },
    { title: 'Growth', desc: 'We believe in continuous personal, professional, and organizational development.', icon: '📈' },
];

const keyAreas = [
    { title: 'Professional Courses', desc: 'Practical and career-focused courses designed to develop valuable professional skills.', icon: '🎓' },
    { title: 'Business Services', desc: 'Reliable professional services tailored to meet individual and business requirements.', icon: '💼' },
    { title: 'Expert Team', desc: 'Experienced professionals committed to providing quality guidance and support.', icon: '👥' },
    { title: 'Career Development', desc: 'Helping students and professionals develop skills for better career opportunities.', icon: '🚀' },
];

export default function Home() {
    const { settings } = useSettings();
    const [courses, setCourses] = useState([]);
    const [services, setServices] = useState([]);
    const [team, setTeam] = useState([]);
    const [keyAreasRef, keyAreasVisible] = useInView();
    const [servicesRef, servicesVisible] = useInView();
    const [coursesRef, coursesVisible] = useInView();
    const [valuesRef, valuesVisible] = useInView();
    const [teamRef, teamVisible] = useInView();
    const [ctaRef, ctaVisible] = useInView();

    useEffect(() => {
        API.get('/courses?featured=true').then((r) => setCourses(r.data)).catch(() => { });
        API.get('/services').then((r) => setServices(r.data.slice(0, 4))).catch(() => { });
        API.get('/team').then((r) => setTeam(r.data.slice(0, 4))).catch(() => { });
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
                                ✨ Professional Education & Services
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
                                Empowering People.{' '}
                                <span className="gradient-text">Building Skills.</span>
                                <br />
                                <span className="gradient-text">Creating Opportunities.</span>
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
                                M.A. Corporation provides professional courses and quality business
                                services designed to help individuals, students, and organizations
                                achieve their goals.
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
                                    Explore Courses
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
                                    Our Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>



                <button
                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                    aria-label="Scroll down"
                    style={{
                        position: 'absolute',
                        bottom: 100,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 4,
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
            </section>

            {/* Company Introduction — light */}
            <section
                className="section section-light"
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
                        Who We Are
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
                        Welcome to M.A. Corporation
                    </h2>
                    <p
                        className="muted"
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                            marginBottom: 32,
                            lineHeight: 1.8,
                        }}
                    >
                        M.A. Corporation is a professional organization committed to providing
                        quality education, practical learning opportunities, and reliable
                        professional services. Our goal is to connect knowledge with real-world
                        skills and provide individuals and businesses with solutions that create
                        meaningful and sustainable results.
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
                        Read More <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Key Areas — dark */}
            <section className="section-sm section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
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
                    <div className="grid grid-4">
                        {keyAreas.map((a, i) => (
                            <div
                                key={a.title}
                                className={`glass-card ${keyAreasVisible ? 'visible' : ''}`}
                                style={{
                                    textAlign: 'center',
                                    padding: 32,
                                    transitionDelay: `${i * 100}ms`,
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
                                        fontSize: '2rem',
                                        margin: '0 auto 18px',
                                        border: '1px solid rgba(45,212,191,0.3)',
                                    }}
                                >
                                    {a.icon}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 10, fontWeight: 700 }}>{a.title}</h3>
                                <p className="muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services — light */}
            <section className="section section-white">
                <div className="container" ref={servicesRef}>
                    <div className="section-head">
                        <span className="eyebrow">Services</span>
                        <h2 style={{ fontWeight: 800 }}>Our Professional Services</h2>
                        <p>Reliable, customized services designed to meet the needs of individuals, professionals, and businesses.</p>
                    </div>
                    <div className="grid grid-4">
                        {services.map((s, i) => (
                            <div
                                key={s._id}
                                className={`glass-card ${servicesVisible ? 'visible' : ''}`}
                                style={{
                                    textAlign: 'center',
                                    padding: 28,
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 14,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                        margin: '0 auto 16px',
                                        boxShadow: '0 8px 20px rgba(20,184,166,0.3)',
                                    }}
                                >
                                    ⚙️
                                </div>
                                <h3 style={{ fontSize: '1.15rem', marginBottom: 10, fontWeight: 700 }}>{s.title}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/services" className="btn btn-outline">View All Services →</Link>
                    </div>
                </div>
            </section>

            {/* Popular Courses — dark */}
            <section className="section-sm section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 80% 30%, rgba(45,212,191,0.1), transparent 50%)',
                    }}
                />
                <div className="container" ref={coursesRef} style={{ position: 'relative' }}>
                    <div className="section-head">
                        <span className="eyebrow">Courses</span>
                        <h2 style={{ fontWeight: 800 }}>Explore Our Courses</h2>
                        <p>Learn practical skills from experienced professionals and take the next step in your career.</p>
                    </div>
                    <div className="grid grid-3">
                        {courses.map((c, i) => (
                            <div
                                key={c._id}
                                className={`glass-card ${coursesVisible ? 'visible' : ''}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 28,
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <span
                                    className="badge"
                                    style={{ alignSelf: 'flex-start', marginBottom: 12, padding: '6px 14px' }}
                                >
                                    {c.level}
                                </span>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 10, fontWeight: 700 }}>{c.name}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem', flex: 1, lineHeight: 1.6 }}>{c.shortDescription}</p>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '20px 0',
                                        fontSize: '0.85rem',
                                        flexWrap: 'wrap',
                                        gap: 8,
                                    }}
                                    className="muted"
                                >
                                    <span>⏱ {c.durationWeeks} Weeks</span>
                                    <span>🌐 {c.mode}</span>
                                    <span style={{ color: '#2DD4BF', fontWeight: 700 }}>PKR {c.fee.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    <Link
                                        to={`/courses/${c.slug}`}
                                        className="btn btn-outline"
                                        style={{ flex: 1, justifyContent: 'center', padding: '10px', minWidth: 120 }}
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        to="/admissions"
                                        className="btn btn-primary"
                                        style={{ flex: 1, justifyContent: 'center', padding: '10px', minWidth: 120 }}
                                    >
                                        Enroll Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us — light */}
            <section className="section section-light">
                <div className="container" ref={valuesRef}>
                    <div className="section-head">
                        <span className="eyebrow">Why Choose Us</span>
                        <h2 style={{ fontWeight: 800 }}>Our Core Values</h2>
                    </div>
                    <div className="grid grid-3">
                        {coreValues.map((v, i) => (
                            <div
                                key={v.title}
                                className={`glass-card ${valuesVisible ? 'visible' : ''}`}
                                style={{
                                    textAlign: 'center',
                                    padding: 28,
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '2.5rem',
                                        marginBottom: 14,
                                        filter: 'drop-shadow(0 4px 8px rgba(20,184,166,0.3))',
                                    }}
                                >
                                    {v.icon}
                                </div>
                                <h3 style={{ fontSize: '1.15rem', marginBottom: 8, fontWeight: 700 }}>{v.title}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team — dark */}
            <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.08), transparent 50%)',
                    }}
                />
                <div className="container" ref={teamRef} style={{ position: 'relative' }}>
                    <div className="section-head">
                        <span className="eyebrow">Our Team</span>
                        <h2 style={{ fontWeight: 800 }}>Meet The Experts</h2>
                    </div>
                    <div className="grid grid-4">
                        {team.map((m, i) => (
                            <div
                                key={m._id}
                                className={`glass-card ${teamVisible ? 'visible' : ''}`}
                                style={{
                                    textAlign: 'center',
                                    padding: 28,
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <div className="team-avatar">
                                    {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{m.name}</h3>
                                <p className="accent" style={{ fontSize: '0.88rem', marginBottom: 12 }}>{m.position}</p>
                                <Link
                                    to="/team"
                                    className="btn btn-ghost"
                                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                                >
                                    Visit Portfolio
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — light */}
            <section className="section-sm section-light">
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
                            Ready to Start Your Journey?
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
                            Join thousands of students and professionals building their future with
                            M.A. Corporation.
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
                                Get Started <span>→</span>
                            </Link>
                            <a
                                href={buildWhatsAppLink(settings.whatsapp, 'Hello! I want to enroll in a course.')}
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
                                💬 Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
