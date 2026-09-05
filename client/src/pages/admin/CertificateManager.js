import React, { useEffect, useState } from 'react';
import API from '../../api';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminItemCard,
    AdminSubmitButton,
    AdminCancelButton,
    AdminToast,
    AdminToggle,
    AdminIconPicker,
} from '../../components/AdminUI';

const empty = { title: '', issuedTo: '', course: '', issueDate: '', certificateUrl: '', isActive: true, icon: '' };

const colorPalette = [
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(135deg, #667eea, #764ba2)',
];

export default function CertificateManager() {
    const [certs, setCerts] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    const load = () => API.get('/certificates/all').then((r) => setCerts(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

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

    const handleCertificateUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, certificateUrl: url }));
        } catch (err) {
            setMsg({ text: 'Error uploading certificate', type: 'error' });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/certificates/${editingId}`, form);
                setMsg({ text: 'Certificate updated', type: 'success' });
            } else {
                await API.post('/certificates', form);
                setMsg({ text: 'Certificate created', type: 'success' });
            }
            setForm(empty);
            setEditingId(null);
            load();
            setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
        } catch (err) {
            setMsg({ text: 'Error saving certificate', type: 'error' });
        }
    };

    const edit = (c) => {
        setForm({ ...c, icon: c.icon || '' });
        setEditingId(c._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this certificate?')) return;
        await API.delete(`/certificates/${id}`);
        load();
    };

    return (
        <div>
            <AdminPageHeader
                title="Certificate Management"
                subtitle="Upload and manage certificates."
                icon="🏅"
                color="linear-gradient(135deg, #43e97b, #38f9d7)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <div className="admin-form-card">
                <AdminFormCard
                    title={editingId ? 'Edit Certificate' : 'Add New Certificate'}
                    icon={editingId ? '✎' : '+'}
                    color="linear-gradient(135deg, #43e97b, #38f9d7)"
                >
                    <form onSubmit={submit}>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Title *</label>
                                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Issued To *</label>
                                <input value={form.issuedTo} onChange={(e) => setForm({ ...form, issuedTo: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Course *</label>
                                <input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Issue Date</label>
                                <input
                                    type="date"
                                    value={form.issueDate ? new Date(form.issueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                                />
                            </div>
                            <div className="field">
                                <label>Certificate (Image or PDF)</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 8,
                                        alignItems: 'center',
                                        marginBottom: 6,
                                    }}
                                >
                                    <label
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: '6px 12px',
                                            fontSize: '0.78rem',
                                            fontWeight: 700,
                                            background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(14,165,164,0.12))',
                                            color: '#0ea5a4',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            border: '1px solid rgba(20,184,166,0.3)',
                                        }}
                                    >
                                        📎 Upload
                                        <input
                                            type="file"
                                            accept="image/*,application/pdf"
                                            onChange={handleCertificateUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>or paste URL below</span>
                                </div>
                                <input
                                    value={form.certificateUrl}
                                    onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
                                    placeholder="https://example.com/cert.jpg or .pdf"
                                />
                                {form.certificateUrl && (
                                    <div style={{ marginTop: 8 }}>
                                        {form.certificateUrl.endsWith('.pdf') ? (
                                            <a
                                                href={form.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: '#0ea5a4',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                📄 View PDF
                                            </a>
                                        ) : (
                                            <img
                                                src={form.certificateUrl}
                                                alt="preview"
                                                style={{
                                                    width: '100%',
                                                    height: 80,
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    border: '1px solid rgba(10,23,51,0.1)',
                                                }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label>Icon</label>
                            <AdminIconPicker
                                value={form.icon}
                                onChange={(v) => setForm({ ...form, icon: v })}
                                onUpload={handleCertificateUpload}
                            />
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <AdminToggle
                                checked={form.isActive}
                                onChange={(v) => setForm({ ...form, isActive: v })}
                                label="Active"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <AdminSubmitButton editing={!!editingId} label="Certificate" />
                            {editingId && <AdminCancelButton onClick={() => { setForm(empty); setEditingId(null); }} />}
                        </div>
                    </form>
                </AdminFormCard>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 18,
                }}
            >
                {certs.map((c, i) => (
                    <AdminItemCard
                        key={c._id}
                        title={c.title}
                        subtitle={`${c.issuedTo} • ${c.course}`}
                        badges={[c.isActive ? 'Active' : 'Inactive', c.certificateUrl && '🔗 Linked'].filter(Boolean)}
                        image={c.certificateUrl && !c.certificateUrl.endsWith('.pdf') ? c.certificateUrl : null}
                        icon="🏅"
                        color={colorPalette[i % colorPalette.length]}
                        onEdit={() => edit(c)}
                        onDelete={() => remove(c._id)}
                    />
                ))}
            </div>
            {certs.length === 0 && (
                <div
                    style={{
                        background: '#fff',
                        borderRadius: 16,
                        padding: 48,
                        textAlign: 'center',
                        color: '#94a3b8',
                        boxShadow: '0 4px 18px rgba(10,23,51,0.06)',
                    }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🏅</div>
                    No certificates yet. Add one using the form above.
                </div>
            )}
        </div>
    );
}
