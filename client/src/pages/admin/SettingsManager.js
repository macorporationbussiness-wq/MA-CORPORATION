import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useSettings } from '../../context/SettingsContext';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminToast,
} from '../../components/AdminUI';

export default function SettingsManager() {
    const { settings, fetchSettings } = useSettings();
    const [form, setForm] = useState({
        companyName: '', address: '', phone: '', email: '', whatsapp: '',
        facebook: '', instagram: '', linkedin: '', youtube: '', mapsEmbed: '',
        stats: { students: '', courses: '', services: '', team: '', years: '' },
        homeHero: { badge: '', title: '', subtitle: '', primaryBtnText: '', secondaryBtnText: '' },
        homeIntro: { badge: '', title: '', description: '', readMoreText: '' },
        homeKeyAreas: [],
        homeCoreValues: [],
        homeServices: { eyebrow: '', title: '', subtitle: '', viewAllText: '' },
        homeValues: { eyebrow: '', title: '' },
        homeCta: { title: '', description: '', primaryBtnText: '', whatsappBtnText: '', whatsappMessage: '' },
        contactPage: { whatsappMessage: '' },
    });
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    useEffect(() => {
        setForm({
            companyName: settings.companyName || '',
            address: settings.address || '',
            phone: settings.phone || '',
            email: settings.email || '',
            whatsapp: settings.whatsapp || '',
            facebook: settings.facebook || '',
            instagram: settings.instagram || '',
            linkedin: settings.linkedin || '',
            youtube: settings.youtube || '',
            mapsEmbed: settings.mapsEmbed || '',
            stats: settings.stats || { students: '', courses: '', services: '', team: '', years: '' },
            homeHero: settings.homeHero || { badge: '', title: '', subtitle: '', primaryBtnText: '', secondaryBtnText: '' },
            homeIntro: settings.homeIntro || { badge: '', title: '', description: '', readMoreText: '' },
            homeKeyAreas: settings.homeKeyAreas || [],
            homeCoreValues: settings.homeCoreValues || [],
            homeServices: settings.homeServices || { eyebrow: '', title: '', subtitle: '', viewAllText: '' },
            homeValues: settings.homeValues || { eyebrow: '', title: '' },
            homeCta: settings.homeCta || { title: '', description: '', primaryBtnText: '', whatsappBtnText: '', whatsappMessage: '' },
            contactPage: settings.contactPage ? { whatsappMessage: settings.contactPage.whatsappMessage || '' } : { whatsappMessage: '' },
        });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const updateStat = (k) => (e) => setForm({ ...form, stats: { ...form.stats, [k]: e.target.value } });
    const updateNested = (parent, k) => (e) => setForm({ ...form, [parent]: { ...form[parent], [k]: e.target.value } });

    const updateArrayItem = (arrayName, index, field, value) => {
        const arr = [...(form[arrayName] || [])];
        arr[index] = { ...arr[index], [field]: value };
        setForm({ ...form, [arrayName]: arr });
    };

    const addArrayItem = (arrayName, emptyItem) => {
        setForm({ ...form, [arrayName]: [...(form[arrayName] || []), { ...emptyItem }] });
    };

    const removeArrayItem = (arrayName, index) => {
        const arr = [...(form[arrayName] || [])];
        arr.splice(index, 1);
        setForm({ ...form, [arrayName]: arr });
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: 'success' });
        try {
            await API.put('/settings', form);
            fetchSettings();
            setMsg({ text: 'Settings saved successfully', type: 'success' });
            setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
        } catch (err) {
            setMsg({
                text: 'Error saving settings: ' + (err.response?.data?.msg || err.message),
                type: 'error',
            });
        }
    };

    const emptyKeyArea = { title: '', desc: '', icon: '' };
    const emptyCoreValue = { title: '', desc: '', icon: '' };

    return (
        <div>
            <AdminPageHeader
                title="Site Settings"
                subtitle="Manage company info, contact details, social links, statistics, and home page content."
                icon="⚙️"
                color="linear-gradient(135deg, #11998e, #38ef7d)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <form onSubmit={submit}>
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Company & Contact"
                        icon="🏢"
                        color="linear-gradient(135deg, #14B8A6, #0EA5A4)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Company Name</label>
                                <input value={form.companyName} onChange={update('companyName')} />
                            </div>
                            <div className="field">
                                <label>WhatsApp Number (with country code, no + or spaces)</label>
                                <input value={form.whatsapp} onChange={update('whatsapp')} placeholder="923001234567" />
                            </div>
                            <div className="field">
                                <label>Phone</label>
                                <input value={form.phone} onChange={update('phone')} />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="email" value={form.email} onChange={update('email')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input value={form.address} onChange={update('address')} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="WhatsApp Messages"
                        icon="💬"
                        color="linear-gradient(135deg, #25D366, #128C7E)"
                    >
                        <div className="field">
                            <label>Contact Page — WhatsApp Message (opens when user clicks WhatsApp button)</label>
                            <textarea
                                value={form.contactPage.whatsappMessage}
                                onChange={updateNested('contactPage', 'whatsappMessage')}
                                placeholder="Hello M.A. Corporation! I would like to know more about your courses and services."
                                rows={3}
                            />
                            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 6 }}>
                                This message pre-fills when a user clicks the WhatsApp button on the Contact page.
                            </p>
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Social Media"
                        icon="🌐"
                        color="linear-gradient(135deg, #667eea, #764ba2)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Facebook</label>
                                <input value={form.facebook} onChange={update('facebook')} placeholder="https://facebook.com/..." />
                            </div>
                            <div className="field">
                                <label>Instagram</label>
                                <input value={form.instagram} onChange={update('instagram')} placeholder="https://instagram.com/..." />
                            </div>
                            <div className="field">
                                <label>LinkedIn</label>
                                <input value={form.linkedin} onChange={update('linkedin')} placeholder="https://linkedin.com/..." />
                            </div>
                            <div className="field">
                                <label>YouTube</label>
                                <input value={form.youtube} onChange={update('youtube')} placeholder="https://youtube.com/..." />
                            </div>
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Statistics (displayed on home page)"
                        icon="📊"
                        color="linear-gradient(135deg, #f093fb, #f5576c)"
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                gap: 14,
                            }}
                        >
                            {[
                                { key: 'students', l: 'Students / Clients' },
                                { key: 'courses', l: 'Courses' },
                                { key: 'services', l: 'Services' },
                                { key: 'team', l: 'Team' },
                                { key: 'years', l: 'Years' },
                            ].map((s) => (
                                <div key={s.key} className="field">
                                    <label>{s.l}</label>
                                    <input value={form.stats[s.key]} onChange={updateStat(s.key)} placeholder="1,000+" />
                                </div>
                            ))}
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Google Maps Embed"
                        icon="📍"
                        color="linear-gradient(135deg, #43e97b, #38f9d7)"
                    >
                        <div className="field">
                            <label>Embed iframe HTML</label>
                            <textarea
                                value={form.mapsEmbed}
                                onChange={update('mapsEmbed')}
                                placeholder='<iframe src="..." width="600" height="450" ...></iframe>'
                                rows={4}
                            />
                            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 6 }}>
                                Paste the full iframe HTML from Google Maps. Shown on the Contact page.
                            </p>
                        </div>
                    </AdminFormCard>
                </div>

                {/* Home Page Hero Section */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Hero Section"
                        icon="🎬"
                        color="linear-gradient(135deg, #667eea, #764ba2)"
                    >
                        <div className="field">
                            <label>Badge Text</label>
                            <input value={form.homeHero.badge} onChange={updateNested('homeHero', 'badge')} placeholder="✨ Professional Education & Services" />
                        </div>
                        <div className="field">
                            <label>Title (use <br /> for line breaks)</label>
                            <input value={form.homeHero.title} onChange={updateNested('homeHero', 'title')} placeholder="Empowering People. Building Skills. Creating Opportunities." />
                        </div>
                        <div className="field">
                            <label>Subtitle / Description</label>
                            <textarea
                                value={form.homeHero.subtitle}
                                onChange={updateNested('homeHero', 'subtitle')}
                                placeholder="M.A. Corporation provides professional courses..."
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Primary Button Text</label>
                                <input value={form.homeHero.primaryBtnText} onChange={updateNested('homeHero', 'primaryBtnText')} placeholder="Explore Courses" />
                            </div>
                            <div className="field">
                                <label>Secondary Button Text</label>
                                <input value={form.homeHero.secondaryBtnText} onChange={updateNested('homeHero', 'secondaryBtnText')} placeholder="Our Services" />
                            </div>
                        </div>
                    </AdminFormCard>
                </div>

                {/* Home Page Intro Section */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Company Introduction"
                        icon="👋"
                        color="linear-gradient(135deg, #f093fb, #f5576c)"
                    >
                        <div className="field">
                            <label>Badge Text</label>
                            <input value={form.homeIntro.badge} onChange={updateNested('homeIntro', 'badge')} placeholder="Who We Are" />
                        </div>
                        <div className="field">
                            <label>Title</label>
                            <input value={form.homeIntro.title} onChange={updateNested('homeIntro', 'title')} placeholder="Welcome to M.A. Corporation" />
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea
                                value={form.homeIntro.description}
                                onChange={updateNested('homeIntro', 'description')}
                                placeholder="M.A. Corporation is a professional organization..."
                                rows={4}
                            />
                        </div>
                        <div className="field">
                            <label>Read More Button Text</label>
                            <input value={form.homeIntro.readMoreText} onChange={updateNested('homeIntro', 'readMoreText')} placeholder="Read More" />
                        </div>
                    </AdminFormCard>
                </div>

                {/* Home Page Key Areas */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Key Areas"
                        icon="🎯"
                        color="linear-gradient(135deg, #4facfe, #00f2fe)"
                    >
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 12 }}>
                            Icon filenames from /client/public/ (e.g. icon-graduation.png)
                        </p>
                        {(form.homeKeyAreas || []).map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    gap: 10,
                                    alignItems: 'end',
                                    marginBottom: 14,
                                    padding: 14,
                                    background: 'rgba(10,23,51,0.03)',
                                    borderRadius: 10,
                                    border: '1px solid rgba(10,23,51,0.06)',
                                }}
                            >
                                <div className="field">
                                    <label>Title</label>
                                    <input
                                        value={item.title}
                                        onChange={(e) => updateArrayItem('homeKeyAreas', i, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <input
                                        value={item.desc}
                                        onChange={(e) => updateArrayItem('homeKeyAreas', i, 'desc', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Icon Filename</label>
                                    <input
                                        value={item.icon}
                                        onChange={(e) => updateArrayItem('homeKeyAreas', i, 'icon', e.target.value)}
                                        placeholder="icon-graduation.png"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('homeKeyAreas', i)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        background: 'rgba(239,68,68,0.1)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239,68,68,0.2)',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    🗑 Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('homeKeyAreas', emptyKeyArea)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 8,
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                marginTop: 8,
                            }}
                        >
                            + Add Key Area
                        </button>
                    </AdminFormCard>
                </div>

                {/* Home Page Core Values */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Core Values"
                        icon="💎"
                        color="linear-gradient(135deg, #8E2DE2, #4A00E0)"
                    >
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 12 }}>
                            Icon filenames from /client/public/ (e.g. icon-handshake.png)
                        </p>
                        {(form.homeCoreValues || []).map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    gap: 10,
                                    alignItems: 'end',
                                    marginBottom: 14,
                                    padding: 14,
                                    background: 'rgba(10,23,51,0.03)',
                                    borderRadius: 10,
                                    border: '1px solid rgba(10,23,51,0.06)',
                                }}
                            >
                                <div className="field">
                                    <label>Title</label>
                                    <input
                                        value={item.title}
                                        onChange={(e) => updateArrayItem('homeCoreValues', i, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <input
                                        value={item.desc}
                                        onChange={(e) => updateArrayItem('homeCoreValues', i, 'desc', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Icon Filename</label>
                                    <input
                                        value={item.icon}
                                        onChange={(e) => updateArrayItem('homeCoreValues', i, 'icon', e.target.value)}
                                        placeholder="icon-handshake.png"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('homeCoreValues', i)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        background: 'rgba(239,68,68,0.1)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239,68,68,0.2)',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    🗑 Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('homeCoreValues', emptyCoreValue)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 8,
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                marginTop: 8,
                            }}
                        >
                            + Add Core Value
                        </button>
                    </AdminFormCard>
                </div>

                {/* Home Page Services Section */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Services Section"
                        icon="⚙️"
                        color="linear-gradient(135deg, #14B8A6, #0EA5A4)"
                    >
                        <div className="field">
                            <label>Section Eyebrow</label>
                            <input value={form.homeServices.eyebrow} onChange={updateNested('homeServices', 'eyebrow')} placeholder="Services" />
                        </div>
                        <div className="field">
                            <label>Section Title</label>
                            <input value={form.homeServices.title} onChange={updateNested('homeServices', 'title')} placeholder="Our Professional Services" />
                        </div>
                        <div className="field">
                            <label>Section Subtitle</label>
                            <textarea
                                value={form.homeServices.subtitle}
                                onChange={updateNested('homeServices', 'subtitle')}
                                placeholder="Reliable, customized services..."
                                rows={3}
                            />
                        </div>
                        <div className="field">
                            <label>View All Button Text</label>
                            <input value={form.homeServices.viewAllText} onChange={updateNested('homeServices', 'viewAllText')} placeholder="View All Services" />
                        </div>
                    </AdminFormCard>
                </div>

                {/* Home Page Values Section */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Core Values Section"
                        icon="💎"
                        color="linear-gradient(135deg, #fa709a, #fee140)"
                    >
                        <div className="field">
                            <label>Section Eyebrow</label>
                            <input value={form.homeValues.eyebrow} onChange={updateNested('homeValues', 'eyebrow')} placeholder="Why Choose Us" />
                        </div>
                        <div className="field">
                            <label>Section Title</label>
                            <input value={form.homeValues.title} onChange={updateNested('homeValues', 'title')} placeholder="Our Core Values" />
                        </div>
                    </AdminFormCard>
                </div>

                {/* Home Page CTA Section */}
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Home Page — Call to Action"
                        icon="🚀"
                        color="linear-gradient(135deg, #11998e, #38ef7d)"
                    >
                        <div className="field">
                            <label>CTA Title</label>
                            <input value={form.homeCta.title} onChange={updateNested('homeCta', 'title')} placeholder="Ready to Start Your Journey?" />
                        </div>
                        <div className="field">
                            <label>CTA Description</label>
                            <textarea
                                value={form.homeCta.description}
                                onChange={updateNested('homeCta', 'description')}
                                placeholder="Join thousands of students..."
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Primary Button Text</label>
                                <input value={form.homeCta.primaryBtnText} onChange={updateNested('homeCta', 'primaryBtnText')} placeholder="Get Started" />
                            </div>
                            <div className="field">
                                <label>WhatsApp Button Text</label>
                                <input value={form.homeCta.whatsappBtnText} onChange={updateNested('homeCta', 'whatsappBtnText')} placeholder="Chat on WhatsApp" />
                            </div>
                        </div>
                        <div className="field">
                            <label>WhatsApp Message</label>
                            <input value={form.homeCta.whatsappMessage} onChange={updateNested('homeCta', 'whatsappMessage')} placeholder="Hello! I want to enroll in a course." />
                        </div>
                    </AdminFormCard>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        className="btn-glow"
                        style={{
                            padding: '14px 36px',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                            color: '#fff',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 8px 22px rgba(20,184,166,0.4)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        💾 Save All Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
