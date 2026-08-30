import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import PageHeader from '../components/PageHeader';

const whoCanJoin = [
    'Students',
    'Fresh Graduates',
    'Job Seekers',
    'Professionals',
    'Business Owners',
    'Freelancers',
];

export default function CourseDetails() {
    const { slug } = useParams();
    const { settings } = useSettings();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' });
    const [sent, setSent] = useState(false);

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

    if (loading) return <p className="text-center muted" style={{ padding: 80 }}>Loading…</p>;
    if (!course) return <p className="text-center muted" style={{ padding: 80 }}>Course not found.</p>;

    return (
        <div>
            <PageHeader eyebrow={course.category} title={course.name} subtitle={course.shortDescription} />

            <section className="section-light">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40, alignItems: 'start' }}>
                    <div>
                        <h2 style={{ fontSize: '1.7rem', marginBottom: 14 }}>Course Introduction</h2>
                        <p className="muted" style={{ marginBottom: 28 }}>{course.introduction}</p>

                        <h3 style={{ fontSize: '1.3rem', marginBottom: 14 }}>What You Will Learn</h3>
                        <ul style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
                            {course.whatYouWillLearn?.map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: 10 }} className="muted">
                                    <span className="primary">✓</span> {item}
                                </li>
                            ))}
                        </ul>

                        <h3 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Course Outline</h3>
                        <ol style={{ display: 'grid', gap: 10, marginBottom: 28, paddingLeft: 20 }}>
                            {course.courseOutline?.map((item, i) => (
                                <li key={i} className="muted">{item}</li>
                            ))}
                        </ol>

                        <h3 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Final Assessment</h3>
                        <p className="muted" style={{ marginBottom: 28 }}>{course.finalAssessment}</p>

                        <h3 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Who Should Join?</h3>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                            {whoCanJoin.map((w) => (
                                <span key={w} className="badge" style={{ padding: '8px 14px' }}>{w}</span>
                            ))}
                        </div>
                    </div>

                    {/* Enrollment sidebar */}
                    <div className="card" style={{ position: 'sticky', top: 90 }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Course Information</h3>
                        <table style={{ width: '100%', fontSize: '0.92rem', marginBottom: 20 }}>
                            <tbody>
                                <tr><td className="muted" style={{ padding: '8px 0' }}>Duration</td><td style={{ textAlign: 'right', fontWeight: 600 }}>{course.durationWeeks} Weeks</td></tr>
                                <tr><td className="muted" style={{ padding: '8px 0' }}>Level</td><td style={{ textAlign: 'right', fontWeight: 600 }}>{course.level}</td></tr>
                                <tr><td className="muted" style={{ padding: '8px 0' }}>Mode</td><td style={{ textAlign: 'right', fontWeight: 600 }}>{course.mode}</td></tr>
                                <tr><td className="muted" style={{ padding: '8px 0' }}>Classes</td><td style={{ textAlign: 'right', fontWeight: 600 }}>{course.classesPerWeek} / week</td></tr>
                                <tr><td className="muted" style={{ padding: '8px 0' }}>Fee</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#0ea5a4' }}>PKR {course.fee.toLocaleString()}</td></tr>
                            </tbody>
                        </table>

                        {sent ? (
                            <div style={{ background: 'rgba(20,184,166,0.12)', padding: 16, borderRadius: 10, color: '#0ea5a4', fontSize: '0.9rem', marginBottom: 14 }}>
                                ✓ WhatsApp opened. Our team will review your details and update your status.
                            </div>
                        ) : (
                            <p className="muted" style={{ fontSize: '0.85rem', marginBottom: 16 }}>
                                Fill the form and click Enroll Now — it opens WhatsApp with your details pre-filled.
                            </p>
                        )}

                        <div className="field">
                            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="field">
                            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="field">
                            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div className="field">
                            <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                        </div>
                        <div className="field">
                            <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                        </div>
                        <button onClick={openEnroll} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Enroll Now
                        </button>
                        <Link to="/admissions" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                            Full Application
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
