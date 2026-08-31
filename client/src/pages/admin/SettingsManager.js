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
        });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const updateStat = (k) => (e) => setForm({ ...form, stats: { ...form.stats, [k]: e.target.value } });

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

    return (
        <div>
            <AdminPageHeader
                title="Site Settings"
                subtitle="Manage company info, contact details, social links, and statistics."
                icon="⚙️"
                color="linear-gradient(135deg, #11998e, #38ef7d)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

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

            <form onSubmit={submit}>
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
