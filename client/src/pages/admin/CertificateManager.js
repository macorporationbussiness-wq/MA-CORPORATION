import React, { useEffect, useState } from 'react';
import API from '../../api';

const empty = { title: '', issuedTo: '', course: '', certificateUrl: '', isActive: true };

export default function CertificateManager() {
    const [certs, setCerts] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => API.get('/certificates/all').then((r) => setCerts(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/certificates/${editingId}`, form);
                setMsg('Certificate updated');
            } else {
                await API.post('/certificates', form);
                setMsg('Certificate created');
            }
            setForm(empty);
            setEditingId(null);
            load();
        } catch (err) {
            setMsg('Error saving certificate');
        }
    };

    const edit = (c) => { setForm(c); setEditingId(c._id); };
    const remove = async (id) => {
        if (!window.confirm('Delete this certificate?')) return;
        await API.delete(`/certificates/${id}`);
        load();
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Certificate Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Upload and manage certificates.</p>
            {msg && <div className="badge" style={{ marginBottom: 16 }}>{msg}</div>}

            <form className="card" onSubmit={submit} style={{ marginBottom: 30 }}>
                <h3 style={{ marginBottom: 16 }}>{editingId ? 'Edit Certificate' : 'Add Certificate'}</h3>
                <div className="grid grid-2">
                    <div className="field"><label>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                    <div className="field"><label>Issued To</label><input value={form.issuedTo} onChange={(e) => setForm({ ...form, issuedTo: e.target.value })} required /></div>
                    <div className="field"><label>Course</label><input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required /></div>
                    <div className="field"><label>Certificate URL</label><input value={form.certificateUrl} onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })} /></div>
                </div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                    {editingId && <button type="button" className="btn btn-outline" onClick={() => { setForm(empty); setEditingId(null); }}>Cancel</button>}
                </div>
            </form>

            <div className="grid grid-3">
                {certs.map((c) => (
                    <div key={c._id} className="card">
                        <h4 style={{ fontSize: '1.05rem' }}>{c.title}</h4>
                        <p className="muted" style={{ fontSize: '0.82rem' }}>{c.issuedTo} • {c.course}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => edit(c)}>Edit</button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => remove(c._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
