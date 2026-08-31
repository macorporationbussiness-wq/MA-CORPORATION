import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';

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

    useEffect(() => {
        API.get('/courses?featured=true').then((r) => setCourses(r.data)).catch(() => { });
        API.get('/services').then((r) => setServices(r.data.slice(0, 4))).catch(() => { });
        API.get('/team').then((r) => setTeam(r.data.slice(0, 4))).catch(() => { });
    }, []);

    return (
        <div>
            {/* Banner with hero content */}
            <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <img
                    src="/sell-banner.jfif"
                    alt="SELL BAN"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,23,51,0.85) 0%, rgba(10,23,51,0.4) 50%, rgba(10,23,51,0.2) 100%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '60px 0',
                    }}
                >
                    <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'center' }}>
                        <div className="fade-up" style={{ textAlign: 'center' }}>
                            <span className="badge" style={{ marginBottom: 18, background: 'rgba(45,212,191,0.15)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.3)' }}>Professional Education & Services</span>
                            <h1 style={{ color: '#fff', fontSize: '3.1rem', marginBottom: 20, lineHeight: 1.15, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                Empowering People. <span style={{ color: '#2DD4BF' }}>Building Skills.</span>{' '}
                                <span style={{ color: '#2DD4BF' }}>Creating Opportunities.</span>
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.12rem', marginBottom: 30, maxWidth: 640, margin: '0 auto 30px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                                M.A. Corporation provides professional courses and quality business
                                services designed to help individuals, students, and organizations
                                achieve their goals.
                            </p>
                            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                                <Link to="/services" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>Our Services</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Introduction — light */}
            <section className="section section-light">
                <div className="container" style={{ maxWidth: 820, textAlign: 'center' }}>
                    <span className="eyebrow primary" style={{ fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.78rem' }}>Who We Are</span>
                    <h2 style={{ fontSize: '2.3rem', margin: '12px 0 18px' }}>Welcome to M.A. Corporation</h2>
                    <p className="muted" style={{ fontSize: '1.08rem', marginBottom: 24 }}>
                        M.A. Corporation is a professional organization committed to providing
                        quality education, practical learning opportunities, and reliable
                        professional services. Our goal is to connect knowledge with real-world
                        skills and provide individuals and businesses with solutions that create
                        meaningful and sustainable results.
                    </p>
                    <Link to="/about" className="btn btn-ghost">Read More →</Link>
                </div>
            </section>

            {/* Key Areas — dark */}
            <section className="section-sm section-dark">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">What We Do</span>
                        <h2>Our Key Areas</h2>
                    </div>
                    <div className="grid grid-4">
                        {keyAreas.map((a) => (
                            <div key={a.title} className="card">
                                <div className="icon-chip">{a.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{a.title}</h3>
                                <p className="muted" style={{ fontSize: '0.95rem' }}>{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer — dark */}
            <section className="section-sm section-dark">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">What We Offer</span>
                        <h2>All Marketing • AI • Consulting • Technology</h2>
                    </div>
                    <div className="grid grid-4">
                        {[
                            { title: 'Marketing', desc: 'Strategic marketing solutions to grow your brand and reach.', icon: '📢' },
                            { title: 'AI', desc: 'Artificial intelligence tools and solutions for modern businesses.', icon: '🤖' },
                            { title: 'Consulting', desc: 'Expert consulting services tailored to your business needs.', icon: '💼' },
                            { title: 'Technology', desc: 'Cutting-edge technology services and development solutions.', icon: '💻' },
                        ].map((item) => (
                            <div key={item.title} className="card" style={{ textAlign: 'center' }}>
                                <div className="icon-chip" style={{ fontSize: '2rem', marginBottom: 14 }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: 10 }}>{item.title}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services — light */}
            <section className="section section-white">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Services</span>
                        <h2>Our Professional Services</h2>
                        <p>Reliable, customized services designed to meet the needs of individuals, professionals, and businesses.</p>
                    </div>
                    <div className="grid grid-4">
                        {services.map((s) => (
                            <div key={s._id} className="card">
                                <div className="icon-chip">⚙️</div>
                                <h3 style={{ fontSize: '1.15rem', marginBottom: 10 }}>{s.title}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem' }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/services" className="btn btn-outline">View All Services</Link>
                    </div>
                </div>
            </section>

            {/* Popular Courses — dark */}
            <section className="section-sm section-dark">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Courses</span>
                        <h2>Explore Our Courses</h2>
                        <p>Learn practical skills from experienced professionals and take the next step in your career.</p>
                    </div>
                    <div className="grid grid-3">
                        {courses.map((c) => (
                            <div key={c._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: 12 }}>{c.level}</span>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{c.name}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem', flex: 1 }}>{c.shortDescription}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0', fontSize: '0.85rem' }} className="muted">
                                    <span>⏱ {c.durationWeeks} Weeks</span>
                                    <span>🌐 {c.mode}</span>
                                    <span className="primary">PKR {c.fee.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <Link to={`/courses/${c.slug}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>View Details</Link>
                                    <Link to="/admissions" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>Enroll Now</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us — light */}
            <section className="section section-light">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Why Choose Us</span>
                        <h2>Our Core Values</h2>
                    </div>
                    <div className="grid grid-3">
                        {coreValues.map((v) => (
                            <div key={v.title} className="card">
                                <div className="icon-chip">{v.icon}</div>
                                <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>{v.title}</h3>
                                <p className="muted" style={{ fontSize: '0.92rem' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team — dark */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">Our Team</span>
                        <h2>Meet The Experts</h2>
                    </div>
                    <div className="grid grid-4">
                        {team.map((m) => (
                            <div key={m._id} className="card" style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: 84, height: 84, borderRadius: '50%', margin: '0 auto 14px',
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.6rem', fontWeight: 700, color: '#fff',
                                    }}
                                >
                                    {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </div>
                                <h3 style={{ fontSize: '1.1rem' }}>{m.name}</h3>
                                <p className="accent" style={{ fontSize: '0.88rem', marginBottom: 10 }}>{m.position}</p>
                                <Link to="/team" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Visit Portfolio</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — light */}
            <section className="section-sm section-light">
                <div className="container">
                    <div
                        className="card"
                        style={{
                            padding: '56px 40px',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #0A1733, #102A5C)',
                            border: '1px solid rgba(45,212,191,0.25)',
                        }}
                    >
                        <h2 style={{ color: '#fff', fontSize: '2.2rem', marginBottom: 14 }}>Ready to Start Your Journey?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 26px', fontSize: '1.05rem' }}>
                            Join thousands of students and professionals building their future with
                            M.A. Corporation.
                        </p>
                        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/admissions" className="btn btn-primary">Get Started</Link>
                            <a
                                href={buildWhatsAppLink(settings.whatsapp, 'Hello! I want to enroll in a course.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-accent"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
