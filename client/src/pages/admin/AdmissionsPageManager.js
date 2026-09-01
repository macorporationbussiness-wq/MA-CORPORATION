import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useSettings } from '../../context/SettingsContext';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminToast,
} from '../../components/AdminUI';

const emptyAdmissions = {
    eyebrow: '',
    title: '',
    subtitle: '',
    formTitle: '',
    formDesc: '',
    submitBtn: '',
    successTitle: '',
    successDesc: '',
    submitAnotherBtn: '',
    whatsappMessage: '',
};

export default function AdmissionsPageManager() {
    const { settings, fetchSettings } = useSettings();
    const [form, setForm] = useState(emptyAdmissions);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    useEffect(() => {
        setForm({ ...emptyAdmissions, ...(settings.admissionsPage || {}) });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: 'success' });
        try {
            await API.put('/settings', { admissionsPage: form });
            fetchSettings();
            setMsg({ text: 'Admissions page settings saved successfully', type: 'success' });
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
                title="Admissions Page Manager"
                subtitle="Edit Admissions / Apply page content: hero, form labels, and success messages."
                icon="📝"
                color="linear-gradient(135deg, #f093fb, #f5576c)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <form onSubmit={submit}>
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Hero Section"
                        icon="🎬"
                        color="linear-gradient(135deg, #f093fb, #f5576c)"
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
                        title="Application Form"
                        icon="📋"
                        color="linear-gradient(135deg, #4facfe, #00f2fe)"
                    >
                        <div className="field">
                            <label>Form Title</label>
                            <input value={form.formTitle} onChange={update('formTitle')} />
                        </div>
                        <div className="field">
                            <label>Form Description</label>
                            <textarea value={form.formDesc} onChange={update('formDesc')} rows={2} />
                        </div>
                        <div className="field">
                            <label>Submit Button Text</label>
                            <input value={form.submitBtn} onChange={update('submitBtn')} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Success State"
                        icon="✅"
                        color="linear-gradient(135deg, #43e97b, #38f9d7)"
                    >
                        <div className="field">
                            <label>Success Title</label>
                            <input value={form.successTitle} onChange={update('successTitle')} />
                        </div>
                        <div className="field">
                            <label>Success Description</label>
                            <textarea value={form.successDesc} onChange={update('successDesc')} rows={2} />
                        </div>
                        <div className="field">
                            <label>Submit Another Button Text</label>
                            <input value={form.submitAnotherBtn} onChange={update('submitAnotherBtn')} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="WhatsApp Integration"
                        icon="💬"
                        color="linear-gradient(135deg, #25D366, #128C7E)"
                    >
                        <div className="field">
                            <label>Default WhatsApp Message</label>
                            <textarea
                                value={form.whatsappMessage}
                                onChange={update('whatsappMessage')}
                                rows={2}
                                placeholder="Hello M.A. Corporation! I would like to submit my admission application."
                            />
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
                        💾 Save Admissions Page Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
