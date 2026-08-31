import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

const whoCanJoin = [
    'Students', 'Fresh Graduates', 'Job Seekers', 'Professionals', 'Business Owners', 'Freelancers',
];

export default function CourseDetails() {
    const { slug } = useParams();
    const { settings } = useSettings();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' });
    const [sent, setSent] = useState(false);
    const [sidebarRef, sidebarVisible] = useInView();

    useEffect(() => {
        API.get(`/courses/${slug}`)
            .then((r) => setCourse(r.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [slug]);

    const openEnroll = () => {
        const msg = `Hello M.A. Corporation! I want to enroll in the course: *${course?.name}*.

Name: ${form.name || '—'}
Email: ${form.email || '—'}
Phone: ${form.phone || '—'}
City: ${form.city || '—'}
Message: ${form.message || '—'}`;
        window.open(buildWhatsAppLink(settings.whatsapp, msg), '_blank');
        setSent(true);
    };

    if (loading) {
        return (
            <div
                style={{
                    padding: 100,
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
                Loading course…
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    if (!course) return <p className="text-center muted" style={{ padding: 80 }}>Course not found.</p>;

    return (
        <div>
            <PageHeader eyebrow={course.category} title={course.name} subtitle={course.shortDescription} />

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

                <div
                    className="container course-details-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1.6fr 1fr',
                        gap: 40,
                        alignItems: 'start',
                        position: 'relative',
                    }}
                >
                    <div>
                        <div
                            style={{
                                background: 'linear-gradient(135deg, #0A1733, #102A5C)',
                                borderRadius: 20,
                                padding: 40,
                                marginBottom: 32,
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(10,23,51,0.2)',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 200,
                                    height: 200,
                                    background: 'radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%)',
                                    borderRadius: '50%',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -50,
                                    left: -50,
                                    width: 200,
                                    height: 200,
                                    background: 'radial-gradient(circle, rgba(20,184,166,0.2), transparent 70%)',
                                    borderRadius: '50%',
                                }}
                            />
                            <div style={{ position: 'relative' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        borderRadius: 999,
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        background: 'rgba(45,212,191,0.15)',
                                        color: '#2DD4BF',
                                        letterSpacing: 1,
                                        textTransform: 'uppercase',
                                        marginBottom: 12,
                                    }}
                                >
                                    Course Introduction
                                </span>
                                <p
                                    style={{
                                        color: 'rgba(255,255,255,0.9)',
                                        fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                                        lineHeight: 1.7,
                                        margin: 0,
                                    }}
                                >
                                    {course.introduction}
                                </p>
                            </div>
                        </div>

                        <div
                            className="glass-card"
                            style={{ padding: 32, marginBottom: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
                        >
                            <h3
                                style={{
                                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                                    marginBottom: 16,
                                    fontWeight: 800,
                                    color: '#0A1733',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    ✓
                                </span>
                                What You Will Learn
                            </h3>
                            <ul style={{ display: 'grid', gap: 10 }}>
                                {course.whatYouWillLearn?.map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            gap: 10,
                                            alignItems: 'flex-start',
                                            color: '#475569',
                                        }}
                                    >
                                        <span
                                            style={{
                                                flexShrink: 0,
                                                color: '#0ea5a4',
                                                fontWeight: 700,
                                                marginTop: 2,
                                            }}
                                        >
                                            ✓
                                        </span>
                                        <span style={{ lineHeight: 1.6 }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className="glass-card"
                            style={{ padding: 32, marginBottom: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
                        >
                            <h3
                                style={{
                                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                                    marginBottom: 16,
                                    fontWeight: 800,
                                    color: '#0A1733',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    📋
                                </span>
                                Course Outline
                            </h3>
                            <ol style={{ display: 'grid', gap: 10, paddingLeft: 0, listStyle: 'none', counterReset: 'item' }}>
                                {course.courseOutline?.map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            gap: 12,
                                            alignItems: 'flex-start',
                                            color: '#475569',
                                            counterIncrement: 'item',
                                        }}
                                    >
                                        <span
                                            style={{
                                                flexShrink: 0,
                                                width: 28,
                                                height: 28,
                                                borderRadius: 8,
                                                background: 'rgba(20,184,166,0.12)',
                                                color: '#0ea5a4',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span style={{ lineHeight: 1.6, paddingTop: 3 }}>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div
                            className="glass-card"
                            style={{ padding: 32, marginBottom: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
                        >
                            <h3
                                style={{
                                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                                    marginBottom: 16,
                                    fontWeight: 800,
                                    color: '#0A1733',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    🎯
                                </span>
                                Final Assessment
                            </h3>
                            <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>{course.finalAssessment}</p>
                        </div>

                        <div
                            className="glass-card"
                            style={{ padding: 32, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)' }}
                        >
                            <h3
                                style={{
                                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                                    marginBottom: 16,
                                    fontWeight: 800,
                                    color: '#0A1733',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    👥
                                </span>
                                Who Should Join?
                            </h3>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {whoCanJoin.map((w) => (
                                    <span
                                        key={w}
                                        style={{
                                            padding: '8px 14px',
                                            borderRadius: 999,
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            background: 'rgba(20,184,166,0.12)',
                                            color: '#0ea5a4',
                                        }}
                                    >
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`course-details-sidebar glass-card ${sidebarVisible ? 'visible' : ''}`}
                        ref={sidebarRef}
                        style={{
                            position: 'sticky',
                            top: 90,
                            padding: 0,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                background: 'linear-gradient(135deg, #0A1733, #102A5C)',
                                padding: 24,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -30,
                                    right: -30,
                                    width: 120,
                                    height: 120,
                                    background: 'radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%)',
                                    borderRadius: '50%',
                                }}
                            />
                            <div style={{ position: 'relative' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        padding: '4px 10px',
                                        borderRadius: 999,
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        background: 'rgba(45,212,191,0.15)',
                                        color: '#2DD4BF',
                                        letterSpacing: 1,
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                    }}
                                >
                                    {course.level}
                                </span>
                                <h3
                                    style={{
                                        color: '#fff',
                                        fontSize: '1.2rem',
                                        margin: 0,
                                        fontWeight: 800,
                                    }}
                                >
                                    Course Information
                                </h3>
                                <div
                                    style={{
                                        marginTop: 12,
                                        fontSize: '0.9rem',
                                        color: 'rgba(255,255,255,0.7)',
                                    }}
                                >
                                    {course.durationWeeks} weeks • {course.mode}
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: 24 }}>
                            <table style={{ width: '100%', fontSize: '0.92rem', marginBottom: 20 }}>
                                <tbody>
                                    {[
                                        { l: 'Duration', v: `${course.durationWeeks} Weeks` },
                                        { l: 'Level', v: course.level },
                                        { l: 'Mode', v: course.mode },
                                        { l: 'Classes', v: `${course.classesPerWeek} / week` },
                                        { l: 'Category', v: course.category },
                                    ].map((row) => (
                                        <tr key={row.l} style={{ borderBottom: '1px dashed rgba(10,23,51,0.08)' }}>
                                            <td style={{ padding: '10px 0', color: '#64748b', fontSize: '0.85rem' }}>{row.l}</td>
                                            <td style={{ textAlign: 'right', fontWeight: 700, color: '#0A1733' }}>{row.v}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{ padding: '14px 0 0', color: '#0A1733', fontWeight: 700 }}>Fee</td>
                                        <td
                                            style={{
                                                textAlign: 'right',
                                                paddingTop: 14,
                                                fontWeight: 800,
                                                fontSize: '1.2rem',
                                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                            }}
                                        >
                                            PKR {course.fee.toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {sent ? (
                                <div
                                    style={{
                                        background: 'rgba(20,184,166,0.12)',
                                        padding: 16,
                                        borderRadius: 10,
                                        color: '#0ea5a4',
                                        fontSize: '0.9rem',
                                        marginBottom: 14,
                                        textAlign: 'center',
                                        fontWeight: 600,
                                    }}
                                >
                                    ✓ WhatsApp opened. Our team will review and update your status.
                                </div>
                            ) : (
                                <p
                                    className="muted"
                                    style={{ fontSize: '0.85rem', marginBottom: 16, textAlign: 'center' }}
                                >
                                    Fill the form and click <strong>Enroll Now</strong> — it opens WhatsApp.
                                </p>
                            )}

                            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
                                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                                <textarea
                                    placeholder="Message"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <button
                                onClick={openEnroll}
                                className="btn-glow"
                                style={{
                                    width: '100%',
                                    padding: '14px 20px',
                                    borderRadius: 12,
                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 22px rgba(20,184,166,0.35)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                }}
                            >
                                Enroll Now <span>→</span>
                            </button>
                            <Link
                                to="/admissions"
                                style={{
                                    display: 'block',
                                    marginTop: 12,
                                    padding: '12px 20px',
                                    borderRadius: 12,
                                    border: '2px solid #0ea5a4',
                                    color: '#0ea5a4',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                }}
                            >
                                Full Application
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .course-details-sidebar.visible {
                    animation: fadeUp 0.7s ease forwards;
                }
            `}</style>
        </div>
    );
}
