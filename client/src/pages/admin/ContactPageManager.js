import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useSettings } from '../../context/SettingsContext';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminToast,
} from '../../components/AdminUI';

const emptyContact = {
    eyebrow: '',
    title: '',
    subtitle: '',
    infoEyebrow: '',
    infoTitle: '',
    formTitle: '',
    formDesc: '',
    formSuccessTitle: '',
    formSuccessDesc: '',
    formSuccessBtn: '',
    submitBtn: '',
    contactItems: [],
};

const emptyItem = {
    icon: '',
    label: '',
    valueKey: '',
    linkKey: '',
    linkPrefix: '',
    external: false,
    color: '',
};

export default function ContactPageManager() {
    const { settings, fetchSettings } = useSettings();
    const [form, setForm] = useState(emptyContact);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    useEffect(() => {
        setForm({ ...emptyContact, ...(settings.contactPage || {}) });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const updateItem = (idx, key, value) => {
        const items = [...(form.contactItems || [])];
        items[idx] = { ...items[idx], [key]: value };
        setForm({ ...form, contactItems: items });
    };

    const addItem = () => {
        setForm({ ...form, contactItems: [...(form.contactItems || []), { ...emptyItem }] });
    };

    const removeItem = (idx) => {
        const items = [...(form.contactItems || [])];
        items.splice(idx, 1);
        setForm({ ...form, contactItems: items });
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: 'success' });
        try {
            await API.put('/settings', { contactPage: form });
            fetchSettings();
            setMsg({ text: 'Contact page settings saved successfully', type: 'success' });
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
                title="Contact Page Manager"
                subtitle="Edit Contact Us page content: hero, info section, form labels, and contact items."
                icon="📞"
                color="linear-gradient(135deg, #43e97b, #38f9d7)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <form onSubmit={submit}>
                <div className="admin-form-card">
                    <AdminFormCard
                        title="Hero Section"
                        icon="🎬"
                        color="linear-gradient(135deg, #43e97b, #38f9d7)"
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
                        title="Info Section"
                        icon="ℹ️"
                        color="linear-gradient(135deg, #4facfe, #00f2fe)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Eyebrow</label>
                                <input value={form.infoEyebrow} onChange={update('infoEyebrow')} />
                            </div>
                            <div className="field">
                                <label>Title</label>
                                <input value={form.infoTitle} onChange={update('infoTitle')} />
                            </div>
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Contact Form"
                        icon="✉️"
                        color="linear-gradient(135deg, #f093fb, #f5576c)"
                    >
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Form Title</label>
                                <input value={form.formTitle} onChange={update('formTitle')} />
                            </div>
                            <div className="field">
                                <label>Submit Button Text</label>
                                <input value={form.submitBtn} onChange={update('submitBtn')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Form Description</label>
                            <textarea value={form.formDesc} onChange={update('formDesc')} rows={2} />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Success Title</label>
                                <input value={form.formSuccessTitle} onChange={update('formSuccessTitle')} />
                            </div>
                            <div className="field">
                                <label>Success Button Text</label>
                                <input value={form.formSuccessBtn} onChange={update('formSuccessBtn')} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Success Description</label>
                            <textarea value={form.formSuccessDesc} onChange={update('formSuccessDesc')} rows={2} />
                        </div>
                    </AdminFormCard>
                </div>

                <div className="admin-form-card">
                    <AdminFormCard
                        title="Contact Items (Cards)"
                        icon="📇"
                        color="linear-gradient(135deg, #fa709a, #fee140)"
                    >
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 12 }}>
                            These cards display company contact information. Use the valueKey to reference settings
                            fields (e.g. companyName, address, phone, email, whatsappText). linkPrefix adds a
                            prefix like "tel:" or "mailto:".
                        </p>
                        {(form.contactItems || []).map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 10,
                                    marginBottom: 14,
                                    padding: 14,
                                    background: 'rgba(10,23,51,0.03)',
                                    borderRadius: 10,
                                    border: '1px solid rgba(10,23,51,0.06)',
                                }}
                            >
                                <div className="field">
                                    <label>Label</label>
                                    <input
                                        value={item.label || ''}
                                        onChange={(e) => updateItem(i, 'label', e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label>Icon Filename</label>
                                    <input
                                        value={item.icon || ''}
                                        onChange={(e) => updateItem(i, 'icon', e.target.value)}
                                        placeholder="icon-globe.png"
                                    />
                                </div>
                                <div className="field">
                                    <label>Value Key (settings field)</label>
                                    <input
                                        value={item.valueKey || ''}
                                        onChange={(e) => updateItem(i, 'valueKey', e.target.value)}
                                        placeholder="companyName, address, phone, email, whatsappText"
                                    />
                                </div>
                                <div className="field">
                                    <label>Link Key (optional)</label>
                                    <input
                                        value={item.linkKey || ''}
                                        onChange={(e) => updateItem(i, 'linkKey', e.target.value)}
                                        placeholder="phone, email, whatsapp"
                                    />
                                </div>
                                <div className="field">
                                    <label>Link Prefix</label>
                                    <input
                                        value={item.linkPrefix || ''}
                                        onChange={(e) => updateItem(i, 'linkPrefix', e.target.value)}
                                        placeholder="tel:, mailto:, https://wa.me/"
                                    />
                                </div>
                                <div className="field">
                                    <label>Color (CSS gradient)</label>
                                    <input
                                        value={item.color || ''}
                                        onChange={(e) => updateItem(i, 'color', e.target.value)}
                                        placeholder="linear-gradient(135deg, #667eea, #764ba2)"
                                    />
                                </div>
                                <div className="field" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <input
                                        type="checkbox"
                                        checked={!!item.external}
                                        onChange={(e) => updateItem(i, 'external', e.target.checked)}
                                    />
                                    <label style={{ marginBottom: 0 }}>Open in new tab</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(i)}
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
                                        🗑 Remove Item
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addItem}
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
                            + Add Contact Item
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
                        💾 Save Contact Page Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
