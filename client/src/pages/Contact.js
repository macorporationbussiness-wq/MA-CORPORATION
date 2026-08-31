import React, { useState } from 'react';
import API from '../api';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../components/WhatsAppButton';
import PageHeader from '../components/PageHeader';
import useInView from '../hooks/useInView';

export default function Contact() {
    const { settings } = useSettings();
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [infoRef, infoVisible] = useInView();
    const [formRef, formVisible] = useInView();

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

    const contactItems = [
        { icon: '🏢', label: 'Company', value: settings.companyName, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
        { icon: '📍', label: 'Address', value: settings.address, color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
        { icon: '📞', label: 'Phone', value: settings.phone, link: `tel:${settings.phone}`, color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
        { icon: '✉️', label: 'Email', value: settings.email, link: `mailto:${settings.email}`, color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
        { icon: '💬', label: 'WhatsApp', value: 'Chat with us', link: buildWhatsAppLink(settings.whatsapp, 'Hello!'), external: true, color: 'linear-gradient(135deg, #25D366, #128C7E)' },
    ];

    return (
        <div>
            <PageHeader
                eyebrow="Contact"
                title="Get In Touch"
                subtitle="We typically respond within a few hours. You can also reach us directly on WhatsApp."
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
                <div
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                <div
                    className="container"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.2fr',
                        gap: 40,
                        alignItems: 'start',
                        position: 'relative',
                    }}
                >
                    <div ref={infoRef} className={`contact-info ${infoVisible ? 'visible' : ''}`}>
                        <span
                            style={{
                                display: 'inline-block',
                                color: '#0ea5a4',
                                fontWeight: 700,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontSize: '0.85rem',
                                marginBottom: 12,
                            }}
                        >
                            Reach Us
                        </span>
                        <h2
                            style={{
                                fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                                margin: '0 0 24px',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #0A1733, #2DD4BF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Let's start a conversation
                        </h2>

                        <div
                            className="glass-card"
                            style={{
                                padding: 24,
                                marginBottom: 24,
                                background: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            {contactItems.map((item, i) => (
                                <a
                                    key={item.label}
                                    href={item.link || '#'}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className="contact-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        padding: '14px 0',
                                        borderBottom: i < contactItems.length - 1 ? '1px solid rgba(10,23,51,0.08)' : 'none',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 12,
                                            background: item.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.3rem',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                fontSize: '0.75rem',
                                                color: '#64748b',
                                                textTransform: 'uppercase',
                                                letterSpacing: 1,
                                                fontWeight: 700,
                                                marginBottom: 2,
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '0.95rem',
                                                color: '#0A1733',
                                                fontWeight: 600,
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {settings.mapsEmbed ? (
                            <div
                                className="glass-card"
                                style={{
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(10,23,51,0.1)',
                                    padding: 0,
                                }}
                                dangerouslySetInnerHTML={{ __html: settings.mapsEmbed }}
                            />
                        ) : (
                            <div
                                className="glass-card"
                                style={{
                                    padding: 32,
                                    textAlign: 'center',
                                    color: '#94A3B8',
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                                    border: '1px solid #e2e8f0',
                                }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: 8 }}>📍</div>
                                Map will appear here once configured
                            </div>
                        )}
                    </div>

                    <div ref={formRef} className={`contact-form-wrap ${formVisible ? 'visible' : ''}`}>
                        <div
                            className="glass-card"
                            style={{
                                padding: 32,
                                background: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            {sent ? (
                                <div style={{ textAlign: 'center', padding: 32 }}>
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '2.5rem',
                                            margin: '0 auto 20px',
                                            boxShadow: '0 12px 30px rgba(20,184,166,0.4)',
                                        }}
                                    >
                                        ✓
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: '1.5rem',
                                            marginBottom: 10,
                                            fontWeight: 800,
                                            color: '#0A1733',
                                        }}
                                    >
                                        Message Sent!
                                    </h3>
                                    <p className="muted" style={{ fontSize: '1rem', marginBottom: 24 }}>
                                        Thank you for reaching out. Our team will get back to you shortly.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSent(false);
                                            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                                        }}
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
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submit}>
                                    <h3
                                        style={{
                                            fontSize: '1.4rem',
                                            marginBottom: 6,
                                            fontWeight: 800,
                                            color: '#0A1733',
                                        }}
                                    >
                                        Send us a message
                                    </h3>
                                    <p className="muted" style={{ fontSize: '0.9rem', marginBottom: 24 }}>
                                        Fill out the form and we'll respond within hours.
                                    </p>
                                    <div className="grid grid-2" style={{ gap: 14 }}>
                                        <div className="field">
                                            <input required value={form.name} onChange={update('name')} placeholder="Name *" />
                                        </div>
                                        <div className="field">
                                            <input
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={update('email')}
                                                placeholder="Email *"
                                            />
                                        </div>
                                        <div className="field">
                                            <input value={form.phone} onChange={update('phone')} placeholder="Phone" />
                                        </div>
                                        <div className="field">
                                            <input value={form.subject} onChange={update('subject')} placeholder="Subject" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <textarea
                                            required
                                            value={form.message}
                                            onChange={update('message')}
                                            placeholder="Your message *"
                                            rows={5}
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
                                        Send Message <span>→</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .contact-info.visible, .contact-form-wrap.visible {
                    animation: fadeUp 0.7s ease forwards;
                }
                .contact-item:hover {
                    transform: translateX(4px);
                }
            `}</style>
        </div>
    );
}
