import React, { useEffect, useState } from 'react';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import PageHeader from '../components/PageHeader';

export default function Admissions() {
    const { settings } = useSettings();
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        fullName: '', fatherName: '', email: '', phone: '', cnic: '',
        city: '', course: '', education: '', preferredMode: 'Online', message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        API.get('/courses').then((r) => setCourses(r.data)).catch(() => { });
    }, []);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/inquiries', {
                type: 'admission',
                name: form.fullName,
                fatherName: form.fatherName,
                email: form.email,
                phone: form.phone,
                cnic: form.cnic,
                city: form.city,
                course: form.course,
                education: form.education,
                preferredMode: form.preferredMode,
                message: form.message,
            });
        } catch (err) {
            console.error(err);
        }
        const msg = `Hello M.A. Corporation! I would like to submit my admission application.

*Full Name:* ${form.fullName}
*Father's Name:* ${form.fatherName}
*Email:* ${form.email}
*Phone:* ${form.phone}
*CNIC:* ${form.cnic || 'N/A'}
*City:* ${form.city}
*Course:* ${form.course}
*Education:* ${form.education}
*Preferred Mode:* ${form.preferredMode}
*Message:* ${form.message}`;
        window.open(buildWhatsAppLink(settings.whatsapp, msg), '_blank');
        setSubmitted(true);
    };

    return (
        <div>
            <PageHeader
                eyebrow="Admissions"
                title="Start Your Learning Journey"
                subtitle="Complete the application below. On submit, your details open in WhatsApp for our team to review."
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
                        left: -100,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                <div className="container" style={{ maxWidth: 760, position: 'relative' }}>
                    {submitted ? (
                        <div
                            className="glass-card"
                            style={{
                                padding: 48,
                                textAlign: 'center',
                                background: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div
                                style={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    margin: '0 auto 20px',
                                    boxShadow: '0 16px 40px rgba(20,184,166,0.4)',
                                }}
                            >
                                ✓
                            </div>
                            <h2
                                style={{
                                    fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                                    marginBottom: 12,
                                    fontWeight: 800,
                                    color: '#0A1733',
                                }}
                            >
                                Application Submitted!
                            </h2>
                            <p
                                className="muted"
                                style={{ fontSize: '1rem', marginBottom: 28, lineHeight: 1.6 }}
                            >
                                Thank you for your application. Our admissions team will contact you shortly to confirm your enrollment.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="btn-glow"
                                style={{
                                    padding: '12px 28px',
                                    borderRadius: 10,
                                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                }}
                            >
                                Submit Another
                            </button>
                        </div>
                    ) : (
                        <div
                            className="glass-card"
                            style={{
                                padding: 36,
                                background: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    marginBottom: 24,
                                }}
                            >
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 12,
                                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.4rem',
                                        boxShadow: '0 6px 18px rgba(20,184,166,0.3)',
                                    }}
                                >
                                    📝
                                </div>
                                <div>
                                    <h2
                                        style={{
                                            fontSize: 'clamp(1.4rem, 3vw, 1.7rem)',
                                            margin: 0,
                                            fontWeight: 800,
                                            color: '#0A1733',
                                        }}
                                    >
                                        Application Form
                                    </h2>
                                    <p className="muted" style={{ fontSize: '0.9rem' }}>
                                        Fields marked with * are required
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={submit}>
                                <div className="grid grid-2" style={{ gap: 14 }}>
                                    <div className="field">
                                        <input required value={form.fullName} onChange={update('fullName')} placeholder="Full Name *" />
                                    </div>
                                    <div className="field">
                                        <input value={form.fatherName} onChange={update('fatherName')} placeholder="Father's Name" />
                                    </div>
                                    <div className="field">
                                        <input type="email" required value={form.email} onChange={update('email')} placeholder="Email *" />
                                    </div>
                                    <div className="field">
                                        <input required value={form.phone} onChange={update('phone')} placeholder="Phone *" />
                                    </div>
                                    <div className="field">
                                        <input value={form.cnic} onChange={update('cnic')} placeholder="CNIC (Optional)" />
                                    </div>
                                    <div className="field">
                                        <input required value={form.city} onChange={update('city')} placeholder="City *" />
                                    </div>
                                    <div className="field">
                                        <select required value={form.course} onChange={update('course')}>
                                            <option value="">Select Course *</option>
                                            {courses.map((c) => (
                                                <option key={c._id} value={c.name}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="field">
                                        <input
                                            value={form.education}
                                            onChange={update('education')}
                                            placeholder="Education (e.g. Bachelor's)"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <select value={form.preferredMode} onChange={update('preferredMode')}>
                                        <option>Online</option>
                                        <option>Hybrid</option>
                                        <option>On-Campus</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <textarea
                                        value={form.message}
                                        onChange={update('message')}
                                        placeholder="Additional message (optional)"
                                        rows={4}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-glow"
                                    style={{
                                        width: '100%',
                                        padding: '14px 24px',
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
                                    Submit Application <span>→</span>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
