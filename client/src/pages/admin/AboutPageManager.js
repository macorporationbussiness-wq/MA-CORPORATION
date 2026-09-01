import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useSettings } from '../../context/SettingsContext';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminToast,
    AdminImageUpload,
} from '../../components/AdminUI';

const emptyAbout = {
    eyebrow: '',
    title: '',
    subtitle: '',
    introEyebrow: '',
    introTitle: '',
    introDesc1: '',
    introDesc2: '',
    introBadge: '',
    introBadgeDesc: '',
    logoImage: '',
    visionTitle: '',
    visionDesc: '',
    missionTitle: '',
    missionDesc: '',
    valuesEyebrow: '',
    valuesTitle: '',
    valuesDesc: '',
    journeyEyebrow: '',
    journeyTitle: '',
    journeyDesc: '',
    ctaTitle: '',
    ctaDesc: '',
    ctaTeamBtn: '',
    ctaContactBtn: '',
};

export default function AboutPageManager() {
    const { settings, fetchSettings } = useSettings();
    const [form, setForm] = useState(emptyAbout);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    useEffect(() => {
        setForm({ ...emptyAbout, ...(settings.aboutPage || {}) });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const resp = await fetch('http://localhost:5000/api/upload/single', {
            method: 'POST',
            body: formData,
        });
        const data = await resp.json();
        return data.url;
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, logoImage: url }));
        } catch (err) {
            setMsg({ text: 'Error uploading logo', type: 'error' });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: 'success' });
        try {
            await API.put('/settings', { aboutPage: form });
            fetchSettings();
            setMsg({ text: 'About page settings saved successfully', type: 'success' });
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
                title="About Page Manager"
                subtitle="Edit all About Us page content: hero, story, vision, mission, values, journey, and CTA."
                icon="ℹ️"
                color="linear-gradient(135deg, #667eea, #764ba2)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <form onSubmit={submit}>
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Hero Section"
                        icon="🎬"
                        color="linear-gradient(135deg, #667eea, #764ba2)"
                    >
                        <div className="field">
                            <label>Eyebrow</label>
                            <input value={form.eyebrow} onChange={update('eyebrow')} placeholder="About Us" />
                        </div>
                        <div className="field">
                            <label>Title</label>
                            <input value={form.title} onChange={update('title')} placeholder="About M.A. Corporation" />
                        </div>
                        <div className="field">
                            <label>Subtitle</label>
                            <textarea value={form.subtitle} onChange={update('subtitle')} rows={2} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Introduction / Story"
                        icon="📖"
                        color="linear-gradient(135deg, #f093fb, #f5576c)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Intro Eyebrow</label>
                                <input value={form.introEyebrow} onChange={update('introEyebrow')} placeholder="Our Story" />
                            </div>
                            <div className="field">
                                <label>Intro Title</label>
                                <input value={form.introTitle} onChange={update('introTitle')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Description Paragraph 1</label>
                            <textarea value={form.introDesc1} onChange={update('introDesc1')} rows={3} />
                        </div>
                        <div className="field">
                            <label>Description Paragraph 2</label>
                            <textarea value={form.introDesc2} onChange={update('introDesc2')} rows={3} />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Badge Text</label>
                                <input value={form.introBadge} onChange={update('introBadge')} placeholder="Since 2019" />
                            </div>
                            <div className="field">
                                <label>Badge Description</label>
                                <input value={form.introBadgeDesc} onChange={update('introBadgeDesc')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Logo / Image</label>
                            <AdminImageUpload
                                value={form.logoImage}
                                onChange={(v) => setForm({ ...form, logoImage: v })}
                                onUpload={handleLogoUpload}
                            />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Vision & Mission"
                        icon="🎯"
                        color="linear-gradient(135deg, #4facfe, #00f2fe)"
                    >
                        <div className="field">
                            <label>Vision Title</label>
                            <input value={form.visionTitle} onChange={update('visionTitle')} />
                        </div>
                        <div className="field">
                            <label>Vision Description</label>
                            <textarea value={form.visionDesc} onChange={update('visionDesc')} rows={3} />
                        </div>
                        <div className="field">
                            <label>Mission Title</label>
                            <input value={form.missionTitle} onChange={update('missionTitle')} />
                        </div>
                        <div className="field">
                            <label>Mission Description</label>
                            <textarea value={form.missionDesc} onChange={update('missionDesc')} rows={3} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Core Values Section"
                        icon="💎"
                        color="linear-gradient(135deg, #8E2DE2, #4A00E0)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Section Eyebrow</label>
                                <input value={form.valuesEyebrow} onChange={update('valuesEyebrow')} />
                            </div>
                            <div className="field">
                                <label>Section Title</label>
                                <input value={form.valuesTitle} onChange={update('valuesTitle')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Section Description</label>
                            <textarea value={form.valuesDesc} onChange={update('valuesDesc')} rows={2} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Journey / Milestones"
                        icon="🚀"
                        color="linear-gradient(135deg, #fa709a, #fee140)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Eyebrow</label>
                                <input value={form.journeyEyebrow} onChange={update('journeyEyebrow')} />
                            </div>
                            <div className="field">
                                <label>Title</label>
                                <input value={form.journeyTitle} onChange={update('journeyTitle')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea value={form.journeyDesc} onChange={update('journeyDesc')} rows={2} />
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            Timeline items can be added/edited on the public site in a future update.
                        </p>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Call to Action"
                        icon="📣"
                        color="linear-gradient(135deg, #11998e, #38ef7d)"
                    >
                        <div className="field">
                            <label>CTA Title</label>
                            <input value={form.ctaTitle} onChange={update('ctaTitle')} />
                        </div>
                        <div className="field">
                            <label>CTA Description</label>
                            <textarea value={form.ctaDesc} onChange={update('ctaDesc')} rows={2} />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Team Button Text</label>
                                <input value={form.ctaTeamBtn} onChange={update('ctaTeamBtn')} />
                            </div>
                            <div className="field">
                                <label>Contact Button Text</label>
                                <input value={form.ctaContactBtn} onChange={update('ctaContactBtn')} />
                            </div>
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
                        💾 Save About Page Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
