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
    AdminImageUpload,
} from '../../components/AdminUI';

const empty = { title: '', category: 'General', description: '', icon: 'star', image: '', isActive: true };

const colorPalette = [
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #8E2DE2, #4A00E0)',
];

export default function ServiceManager() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    const load = () => API.get('/services/all').then((r) => setServices(r.data)).catch(() => { });
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, image: url }));
        } catch (err) {
            setMsg({ text: 'Error uploading image', type: 'error' });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/services/${editingId}`, form);
                setMsg({ text: 'Service updated', type: 'success' });
            } else {
                await API.post('/services', form);
                setMsg({ text: 'Service created', type: 'success' });
            }
            setForm(empty);
            setEditingId(null);
            load();
            setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
        } catch (err) {
            setMsg({ text: 'Error saving service', type: 'error' });
        }
    };

    const edit = (s) => {
        setForm(s);
        setEditingId(s._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this service?')) return;
        await API.delete(`/services/${id}`);
        load();
    };

    return (
        <div>
            <AdminPageHeader
                title="Service Management"
                subtitle="Manage your professional service offerings."
                icon="⚙️"
                color="linear-gradient(135deg, #f093fb, #f5576c)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <div className="admin-form-card">
                <AdminFormCard
                    title={editingId ? 'Edit Service' : 'Add New Service'}
                    icon={editingId ? '✎' : '+'}
                    color="linear-gradient(135deg, #f093fb, #f5576c)"
                >
                    <form onSubmit={submit}>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Title *</label>
                                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Category</label>
                                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Icon (name)</label>
                                <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Image</label>
                                <AdminImageUpload
                                    value={form.image}
                                    onChange={(v) => setForm({ ...form, image: v })}
                                    onUpload={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <AdminToggle
                                checked={form.isActive}
                                onChange={(v) => setForm({ ...form, isActive: v })}
                                label="Active"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <AdminSubmitButton editing={!!editingId} label="Service" />
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
                {services.map((s, i) => (
                    <AdminItemCard
                        key={s._id}
                        title={s.title}
                        subtitle={s.description}
                        badges={[s.category, s.isActive ? 'Active' : 'Inactive'].filter(Boolean)}
                        image={s.image}
                        icon={s.icon?.charAt(0).toUpperCase() || '⚙️'}
                        color={colorPalette[i % colorPalette.length]}
                        onEdit={() => edit(s)}
                        onDelete={() => remove(s._id)}
                    />
                ))}
            </div>
            {services.length === 0 && (
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
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>⚙️</div>
                    No services yet. Create one using the form above.
                </div>
            )}
        </div>
    );
}
