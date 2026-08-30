import React, { useEffect, useState } from 'react';
import API from '../../api';

const empty = {
    name: '', position: '', email: '', phone: '', bio: '', photo: '',
    skills: '', education: '', experience: '', projects: '',
    social: { linkedin: '', github: '', twitter: '' },
    hasPortfolio: true, isActive: true, order: 0,
};

export default function TeamManager() {
    const [team, setTeam] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => API.get('/team/all').then((r) => setTeam(r.data)).catch(() => { });
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

    // Upload team member photo
    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, photo: url }));
        } catch (err) {
            setMsg('Error uploading photo');
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
            education: form.education.split('\n').filter(Boolean),
            experience: form.experience.split('\n').filter(Boolean),
            projects: form.projects.split('\n').filter(Boolean),
            order: Number(form.order),
        };
        try {
            if (editingId) {
                await API.put(`/team/${editingId}`, payload);
                setMsg('Member updated');
            } else {
                await API.post('/team', payload);
                setMsg('Member created');
            }
            setForm(empty);
            setEditingId(null);
            load();
        } catch (err) {
            setMsg('Error saving member');
        }
    };

    const edit = (m) => {
        setForm({
            ...m,
            skills: (m.skills || []).join(', '),
            education: (m.education || []).join('\n'),
            experience: (m.experience || []).join('\n'),
            projects: (m.projects || []).join('\n'),
            social: m.social || { linkedin: '', github: '', twitter: '' },
        });
        setEditingId(m._id);
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this member?')) return;
        await API.delete(`/team/${id}`);
        load();
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Team Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Manage team members, roles, skills, and portfolios.</p>
            {msg && <div className="badge" style={{ marginBottom: 16 }}>{msg}</div>}

            <form className="card" onSubmit={submit} style={{ marginBottom: 30 }}>
                <h3 style={{ marginBottom: 16 }}>{editingId ? 'Edit Member' : 'Add Member'}</h3>
                <div className="grid grid-2">
                    <div className="field"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                    <div className="field"><label>Position</label><input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required /></div>
                    <div className="field"><label>Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                    <div className="field"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                    <div className="field">
                        <label>
                            Photo URL
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
                                    onChange={handlePhotoUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </label>
                        <input
                            value={form.photo}
                            onChange={(e) => setForm({ ...form, photo: e.target.value })}
                            placeholder="Or paste photo URL (https://example.com/photo.jpg)"
                        />
                        {form.photo && (
                            <img
                                src={form.photo}
                                alt="preview"
                                style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        )}
                    </div>
                    <div className="field"><label>Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></div>
                </div>
                <div className="field"><label>Bio</label><textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
                <div className="field"><label>Skills (comma separated)</label><input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} /></div>
                <div className="field"><label>Education (one per line)</label><textarea value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} /></div>
                <div className="field"><label>Experience (one per line)</label><textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
                <div className="field"><label>Projects (one per line)</label><textarea value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} /></div>
                <div className="grid grid-3">
                    <div className="field"><label>LinkedIn</label><input value={form.social.linkedin} onChange={(e) => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} /></div>
                    <div className="field"><label>GitHub</label><input value={form.social.github} onChange={(e) => setForm({ ...form, social: { ...form.social, github: e.target.value } })} /></div>
                    <div className="field"><label>Twitter</label><input value={form.social.twitter} onChange={(e) => setForm({ ...form, social: { ...form.social, twitter: e.target.value } })} /></div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={form.hasPortfolio} onChange={(e) => setForm({ ...form, hasPortfolio: e.target.checked })} /> Has Portfolio</label>
                    <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                    {editingId && <button type="button" className="btn btn-outline" onClick={() => { setForm(empty); setEditingId(null); }}>Cancel</button>}
                </div>
            </form>

            <div className="grid grid-3">
                {team.map((m) => (
                    <div key={m._id} className="card">
                        <h4 style={{ fontSize: '1.05rem' }}>{m.name}</h4>
                        <p className="accent" style={{ fontSize: '0.82rem' }}>{m.position}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => edit(m)}>Edit</button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => remove(m._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
