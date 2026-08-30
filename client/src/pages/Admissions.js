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
        // Save inquiry in DB
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
        // Open WhatsApp with full details
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
            <section className="section-light">
                <div className="container" style={{ maxWidth: 720 }}>
                    {submitted ? (
                        <div className="card text-center" style={{ padding: 40 }}>
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
                            <h2 style={{ fontSize: '1.6rem', marginBottom: 12 }}>Application Submitted</h2>
                            <p className="muted" style={{ marginBottom: 20 }}>
                                Thank you for your application. Our admissions team will contact you
                                shortly. We will review your details and update your status on the
                                website.
                            </p>
                            <button onClick={() => setSubmitted(false)} className="btn btn-outline">Submit Another</button>
                        </div>
                    ) : (
                        <form className="card" onSubmit={submit}>
                            <div className="grid grid-2">
                                <div className="field">
                                    <label>Full Name *</label>
                                    <input required value={form.fullName} onChange={update('fullName')} />
                                </div>
                                <div className="field">
                                    <label>Father's Name</label>
                                    <input value={form.fatherName} onChange={update('fatherName')} />
                                </div>
                                <div className="field">
                                    <label>Email *</label>
                                    <input type="email" required value={form.email} onChange={update('email')} />
                                </div>
                                <div className="field">
                                    <label>Phone Number *</label>
                                    <input required value={form.phone} onChange={update('phone')} />
                                </div>
                                <div className="field">
                                    <label>CNIC (Optional)</label>
                                    <input value={form.cnic} onChange={update('cnic')} />
                                </div>
                                <div className="field">
                                    <label>City *</label>
                                    <input required value={form.city} onChange={update('city')} />
                                </div>
                                <div className="field">
                                    <label>Select Course *</label>
                                    <select required value={form.course} onChange={update('course')}>
                                        <option value="">Choose a course</option>
                                        {courses.map((c) => (
                                            <option key={c._id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Education</label>
                                    <input value={form.education} onChange={update('education')} placeholder="e.g. Bachelor's" />
                                </div>
                            </div>
                            <div className="field">
                                <label>Preferred Mode</label>
                                <select value={form.preferredMode} onChange={update('preferredMode')}>
                                    <option>Online</option>
                                    <option>Hybrid</option>
                                    <option>On-Campus</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Message</label>
                                <textarea value={form.message} onChange={update('message')} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Submit Application
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
