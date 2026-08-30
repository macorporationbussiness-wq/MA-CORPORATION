import React, { useState } from 'react';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import PageHeader from '../components/PageHeader';

export default function Contact() {
    const { settings } = useSettings();
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/inquiries', { type: 'contact', ...form });
        } catch (err) {
            console.error(err);
        }
        setSent(true);
    };

    return (
        <div>
            <PageHeader
                eyebrow="Contact"
                title="Get In Touch"
                subtitle="We typically respond within a few hours. You can also reach us directly on WhatsApp."
            />
            <section className="section-light">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'start' }}>
                    <div>
                        <div className="card" style={{ marginBottom: 24 }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Company Information</h3>
                            <ul style={{ display: 'grid', gap: 14 }} className="muted">
                                <li>🏢 <strong style={{ color: '#0a1733' }}>{settings.companyName}</strong></li>
                                <li>📍 {settings.address}</li>
                                <li>📞 <a href={`tel:${settings.phone}`}>{settings.phone}</a></li>
                                <li>✉️ <a href={`mailto:${settings.email}`}>{settings.email}</a></li>
                                <li>💬 <a href={buildWhatsAppLink(settings.whatsapp, 'Hello!')} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                            </ul>
                            <p className="muted" style={{ fontSize: '0.82rem', marginTop: 16 }}>
                                Our admin team can receive and reply to inquiries anonymously and securely.
                            </p>
                        </div>

                        {settings.mapsEmbed ? (
                            <div
                                style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(10,23,51,0.12)' }}
                                dangerouslySetInnerHTML={{ __html: settings.mapsEmbed }}
                            />
                        ) : (
                            <div className="card text-center" style={{ color: '#94A3B8' }}>
                                📍 Google Maps embed will appear here once configured in Admin → Settings.
                            </div>
                        )}
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Send Us a Message</h3>
                        {sent ? (
                            <div style={{ background: 'rgba(20,184,166,0.12)', padding: 20, borderRadius: 10, color: '#0ea5a4' }}>
                                ✓ Thank you! Your message has been received. Our team will get back to you shortly.
                            </div>
                        ) : (
                            <form onSubmit={submit}>
                                <div className="grid grid-2">
                                    <div className="field">
                                        <label>Name *</label>
                                        <input required value={form.name} onChange={update('name')} />
                                    </div>
                                    <div className="field">
                                        <label>Email *</label>
                                        <input type="email" required value={form.email} onChange={update('email')} />
                                    </div>
                                </div>
                                <div className="grid grid-2">
                                    <div className="field">
                                        <label>Phone</label>
                                        <input value={form.phone} onChange={update('phone')} />
                                    </div>
                                    <div className="field">
                                        <label>Subject</label>
                                        <input value={form.subject} onChange={update('subject')} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Message *</label>
                                    <textarea required value={form.message} onChange={update('message')} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
