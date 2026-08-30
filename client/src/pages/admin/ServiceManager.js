import React, { useEffect, useState } from 'react';
import API from '../../api';

const empty = { title: '', category: 'General', description: '', icon: 'star', image: '', isActive: true };

export default function ServiceManager() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => API.get('/services/all').then((r) => setServices(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    // File upload helper
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

    // Upload service image file
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, image: url }));
        } catch (err) {
            setMsg('Error uploading image');
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/services/${editingId}`, form);
                setMsg('Service updated');
            } else {
                await API.post('/services', form);
                setMsg('Service created');
            }
            setForm(empty);
            setEditingId(null);
            load();
        } catch (err) {
            setMsg('Error saving service');
        }
    };

    const edit = (s) => { setForm(s); setEditingId(s._id); };
    const remove = async (id) => {
        if (!window.confirm('Delete this service?')) return;
        await API.delete(`/services/${id}`);
        load();
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Service Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Manage your professional service offerings.</p>
            {msg && <div className="badge" style={{ marginBottom: 16 }}>{msg}</div>}

            <form className="card" onSubmit={submit} style={{ marginBottom: 30 }}>
                <h3 style={{ marginBottom: 16 }}>{editingId ? 'Edit Service' : 'Add Service'}</h3>
                <div className="grid grid-2">
                    <div className="field"><label>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                    <div className="field"><label>Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                </div>
                <div className="field"><label>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="field"><label>Icon (name)</label><input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
                <div className="field">
                    <label>
                        Image URL
                        <label
                            style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                fontSize: '0.75rem',
                                marginLeft: 8,
                                background: 'var(--surface)',
                                border: '1px solid var(--border-dark)',
                                borderRadius: 4,
                                color: 'var(--text-light)',
                                cursor: 'pointer',
                            }}
                        >
                            📷 Upload
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </label>
                    <input
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="Or paste image URL (https://example.com/image.jpg)"
                    />
                    {form.image && (
                        <img
                            src={form.image}
                            alt="preview"
                            style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    )}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                    {editingId && <button type="button" className="btn btn-outline" onClick={() => { setForm(empty); setEditingId(null); }}>Cancel</button>}
                </div>
            </form>

            <div className="grid grid-3">
                {services.map((s) => (
                    <div key={s._id} className="card">
                        <h4 style={{ fontSize: '1.05rem' }}>{s.title}</h4>
                        <p className="muted" style={{ fontSize: '0.82rem', margin: '8px 0' }}>{s.category}</p>
                        <p className="muted" style={{ fontSize: '0.85rem' }}>{s.description}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => edit(s)}>Edit</button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => remove(s._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
