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

    // Use dynamic contact items from settings.contactPage.contactItems, with fallback to defaults
    const contactPageConfig = settings.contactPage || {};
    const contactItemsConfig = contactPageConfig.contactItems || [];

    // Map valueKey to emoji icons
    const iconMap = {
        companyName: '🏢',
        address: '📍',
        phone: '📞',
        email: '✉️',
        whatsapp: '💬',
        whatsappText: '💬',
    };

    const contactItems = contactItemsConfig.length > 0
        ? contactItemsConfig.map((item) => {
            // Get the value from settings using valueKey
            const valueKey = item.valueKey;
            const linkKey = item.linkKey;
            const linkPrefix = item.linkPrefix || '';
            const value = settings[valueKey] || '';
            const linkValue = linkKey ? settings[linkKey] : '';

            let link = '#';
            if (linkValue && linkPrefix) {
                link = `${linkPrefix}${linkValue}`;
            } else if (linkValue) {
                link = linkValue;
            }

            // Special handling for WhatsApp
            if (valueKey === 'whatsappText' || valueKey === 'whatsapp') {
                link = buildWhatsAppLink(settings.whatsapp, 'Hello!');
            }

            // Determine icon: emoji, PNG filename, or Cloudinary URL
            let icon = iconMap[valueKey] || item.icon || '📍';
            let isImageIcon = false;
            let iconSrc = icon;
            if (icon && typeof icon === 'string') {
                // Check if it's a Cloudinary URL or PNG filename
                if (icon.startsWith('http') || icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg') || icon.endsWith('.svg') || icon.endsWith('.webp')) {
                    isImageIcon = true;
                    // For PNG filenames from public folder, prepend "/"
                    if (!icon.startsWith('http') && (icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.jpeg') || icon.endsWith('.svg') || icon.endsWith('.webp'))) {
                        iconSrc = '/' + icon;
                    }
                }
            }

            return {
                icon: iconSrc,
                isImageIcon: isImageIcon,
                label: item.label || valueKey,
                value: value || 'Not configured',
                link: link,
                external: item.external || false,
                color: item.color || 'linear-gradient(135deg, #667eea, #764ba2)',
            };
        })
        : [
            // Fallback defaults - use emoji icons
            { icon: '🏢', isImageIcon: false, label: 'Company', value: settings.companyName, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { icon: '📍', isImageIcon: false, label: 'Address', value: settings.address, color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { icon: '📞', isImageIcon: false, label: 'Phone', value: settings.phone, link: `tel:${settings.phone}`, color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { icon: '✉️', isImageIcon: false, label: 'Email', value: settings.email, link: `mailto:${settings.email}`, color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { icon: '💬', isImageIcon: false, label: 'WhatsApp', value: 'Chat with us', link: buildWhatsAppLink(settings.whatsapp, 'Hello!'), external: true, color: 'linear-gradient(135deg, #25D366, #128C7E)' },
        ];

    // Extract dynamic content from contactPage config with fallbacks
    const eyebrow = contactPageConfig.eyebrow || 'Contact';
    const title = contactPageConfig.title || 'Get In Touch';
    const subtitle = contactPageConfig.subtitle || 'We typically respond within a few hours. You can also reach us directly on WhatsApp.';
    const infoEyebrow = contactPageConfig.infoEyebrow || 'Reach Us';
    const infoTitle = contactPageConfig.infoTitle || "Let's start a conversation";
    const formTitle = contactPageConfig.formTitle || 'Send us a message';
    const formDesc = contactPageConfig.formDesc || "Fill out the form and we'll respond within hours.";
    const formSuccessTitle = contactPageConfig.formSuccessTitle || 'Message Sent!';
    const formSuccessDesc = contactPageConfig.formSuccessDesc || 'Thank you for reaching out. Our team will get back to you shortly.';
    const formSuccessBtn = contactPageConfig.formSuccessBtn || 'Send Another';
    const submitBtn = contactPageConfig.submitBtn || 'Send Message';

    return (
        <div>
            <PageHeader
                eyebrow={eyebrow}
                title={title}
                subtitle={subtitle}
            />

            <section
                className="section-light contact-section"
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
                    className="container contact-grid"
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
                            {infoEyebrow}
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
                            {infoTitle}
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
                                        className="icon-wrap"
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
                                        {item.isImageIcon ? (
                                            <img
                                                src={item.icon}
                                                alt={item.label}
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                                        )}
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

                        {settings.mapsEmbed && (
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
                                        {formSuccessTitle}
                                    </h3>
                                    <p className="muted" style={{ fontSize: '1rem', marginBottom: 24 }}>
                                        {formSuccessDesc}
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
                                        {formSuccessBtn}
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
                                        {formTitle}
                                    </h3>
                                    <p className="muted" style={{ fontSize: '0.9rem', marginBottom: 24 }}>
                                        {formDesc}
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
                                        className="btn-glow contact-submit-btn"
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
                                        {submitBtn} <span>→</span>
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
