import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useSettings } from '../../context/SettingsContext';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminToast,
} from '../../components/AdminUI';

const emptyPrivacy = {
    eyebrow: '',
    title: '',
    subtitle: '',
    sections: [],
};

const emptySection = { title: '', desc: '' };

export default function PrivacyPageManager() {
    const { settings, fetchSettings } = useSettings();
    const [form, setForm] = useState(emptyPrivacy);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    useEffect(() => {
        setForm({ ...emptyPrivacy, ...(settings.privacyPage || {}) });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const updateSection = (idx, key, value) => {
        const sections = [...(form.sections || [])];
        sections[idx] = { ...sections[idx], [key]: value };
        setForm({ ...form, sections });
    };

    const addSection = () => {
        setForm({ ...form, sections: [...(form.sections || []), { ...emptySection }] });
    };

    const removeSection = (idx) => {
        const sections = [...(form.sections || [])];
        sections.splice(idx, 1);
        setForm({ ...form, sections });
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: 'success' });
        try {
            await API.put('/settings', { privacyPage: form });
            fetchSettings();
            setMsg({ text: 'Privacy page settings saved successfully', type: 'success' });
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
                title="Privacy Policy Manager"
                subtitle="Edit Privacy Policy page hero and content sections."
                icon="🔒"
                color="linear-gradient(135deg, #8E2DE2, #4A00E0)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <form onSubmit={submit}>
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Hero Section"
                        icon="🎬"
                        color="linear-gradient(135deg, #8E2DE2, #4A00E0)"
                    >
                        <div className="field">
                            <label>Eyebrow</label>
                            <input value={form.eyebrow} onChange={update('eyebrow')} />
                        </div>
                        <div className="field">
                            <label>Title</label>
                            <input value={form.title} onChange={update('title')} />
                        </div>
                        <div className="field">
                            <label>Subtitle</label>
                            <textarea value={form.subtitle} onChange={update('subtitle')} rows={2} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Content Sections"
                        icon="📜"
                        color="linear-gradient(135deg, #667eea, #764ba2)"
                    >
                        {(form.sections || []).map((section, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: 14,
                                    padding: 14,
                                    background: 'rgba(10,23,51,0.03)',
                                    borderRadius: 10,
                                    border: '1px solid rgba(10,23,51,0.06)',
                                }}
                            >
                                <div className="field">
                                    <label>Section Title</label>
                                    <input
                                        value={section.title || ''}
                                        onChange={(e) => updateSection(i, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Section Description</label>
                                    <textarea
                                        value={section.desc || ''}
                                        onChange={(e) => updateSection(i, 'desc', e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeSection(i)}
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
                                    🗑 Remove Section
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSection}
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
                            + Add Section
                        </button>
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
                        💾 Save Privacy Page Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
