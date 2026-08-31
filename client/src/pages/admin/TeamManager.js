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

const empty = {
    name: '', position: '', email: '', phone: '', bio: '', photo: '',
    skills: '', education: '', experience: '', projects: '',
    social: { linkedin: '', github: '', twitter: '' },
    hasPortfolio: true, isActive: true, order: 0,
};

const colorPalette = [
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
];

export default function TeamManager() {
    const [team, setTeam] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

    const load = () => API.get('/team/all').then((r) => setTeam(r.data)).catch(() => { });
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

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, photo: url }));
        } catch (err) {
            setMsg({ text: 'Error uploading photo', type: 'error' });
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
                setMsg({ text: 'Member updated', type: 'success' });
            } else {
                await API.post('/team', payload);
                setMsg({ text: 'Member created', type: 'success' });
            }
            setForm(empty);
            setEditingId(null);
            load();
            setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
        } catch (err) {
            setMsg({ text: 'Error saving member', type: 'error' });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this member?')) return;
        await API.delete(`/team/${id}`);
        load();
    };

    return (
        <div>
            <AdminPageHeader
                title="Team Management"
                subtitle="Manage team members, roles, skills, and portfolios."
                icon="👥"
                color="linear-gradient(135deg, #4facfe, #00f2fe)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <div className="admin-form-card">
                <AdminFormCard
                    title={editingId ? 'Edit Member' : 'Add New Member'}
                    icon={editingId ? '✎' : '+'}
                    color="linear-gradient(135deg, #4facfe, #00f2fe)"
                >
                    <form onSubmit={submit}>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Name *</label>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Position *</label>
                                <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Phone</label>
                                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Photo</label>
                                <AdminImageUpload
                                    value={form.photo}
                                    onChange={(v) => setForm({ ...form, photo: v })}
                                    onUpload={handlePhotoUpload}
                                />
                            </div>
                            <div className="field">
                                <label>Order (display priority)</label>
                                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Bio</label>
                            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2} />
                        </div>
                        <div className="field">
                            <label>Skills (comma separated)</label>
                            <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, MongoDB" />
                        </div>
                        <div className="grid grid-3" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Education (one per line)</label>
                                <textarea value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} rows={3} />
                            </div>
                            <div className="field">
                                <label>Experience (one per line)</label>
                                <textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} rows={3} />
                            </div>
                            <div className="field">
                                <label>Projects (one per line)</label>
                                <textarea value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} rows={3} />
                            </div>
                        </div>
                        <div className="grid grid-3" style={{ gap: 14 }}>
                            <div className="field">
                                <label>LinkedIn</label>
                                <input value={form.social.linkedin} onChange={(e) => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} />
                            </div>
                            <div className="field">
                                <label>GitHub</label>
                                <input value={form.social.github} onChange={(e) => setForm({ ...form, social: { ...form.social, github: e.target.value } })} />
                            </div>
                            <div className="field">
                                <label>Twitter</label>
                                <input value={form.social.twitter} onChange={(e) => setForm({ ...form, social: { ...form.social, twitter: e.target.value } })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
                            <AdminToggle
                                checked={form.hasPortfolio}
                                onChange={(v) => setForm({ ...form, hasPortfolio: v })}
                                label="Has Portfolio"
                            />
                            <AdminToggle
                                checked={form.isActive}
                                onChange={(v) => setForm({ ...form, isActive: v })}
                                label="Active"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <AdminSubmitButton editing={!!editingId} label="Member" />
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
                {team.map((m, i) => (
                    <AdminItemCard
                        key={m._id}
                        title={m.name}
                        subtitle={m.position}
                        badges={[
                            m.email,
                            m.hasPortfolio && '📁 Portfolio',
                            m.isActive ? 'Active' : 'Inactive',
                        ].filter(Boolean)}
                        image={m.photo}
                        icon={m.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        color={colorPalette[i % colorPalette.length]}
                        onEdit={() => edit(m)}
                        onDelete={() => remove(m._id)}
                    />
                ))}
            </div>
            {team.length === 0 && (
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
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>👥</div>
                    No team members yet. Add one using the form above.
                </div>
            )}
        </div>
    );
}
