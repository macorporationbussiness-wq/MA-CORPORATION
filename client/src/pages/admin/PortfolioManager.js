import React, { useEffect, useState } from 'react';
import API from '../../api';

const empty = { teamMember: '', title: '', description: '', image: '', projectUrl: '', skills: '' };

export default function PortfolioManager() {
    const [items, setItems] = useState([]);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => {
        API.get('/portfolios').then((r) => setItems(r.data)).catch(() => { });
        API.get('/team/all').then((r) => setMembers(r.data)).catch(() => { });
    };
    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        const payload = { ...form, skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean) };
        try {
            if (editingId) {
                await API.put(`/portfolios/${editingId}`, payload);
                setMsg('Portfolio updated');
            } else {
                await API.post('/portfolios', payload);
                setMsg('Portfolio created');
            }
            setForm(empty);
            setEditingId(null);
            load();
        } catch (err) {
            setMsg('Error saving portfolio');
        }
    };

    const edit = (p) => {
        setForm({ ...p, skills: (p.skills || []).join(', '), teamMember: p.teamMember?._id || p.teamMember });
        setEditingId(p._id);
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this portfolio?')) return;
        await API.delete(`/portfolios/${id}`);
        load();
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Portfolio Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Manage team member portfolios and projects.</p>
            {msg && <div className="badge" style={{ marginBottom: 16 }}>{msg}</div>}

            <form className="card" onSubmit={submit} style={{ marginBottom: 30 }}>
                <h3 style={{ marginBottom: 16 }}>{editingId ? 'Edit Portfolio' : 'Add Portfolio'}</h3>
                <div className="grid grid-2">
                    <div className="field">
                        <label>Team Member</label>
                        <select value={form.teamMember} onChange={(e) => setForm({ ...form, teamMember: e.target.value })} required>
                            <option value="">Select member</option>
                            {members.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
                        </select>
                    </div>
                    <div className="field"><label>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                </div>
                <div className="field"><label>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-2">
                    <div className="field"><label>Image URL</label><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
                    <div className="field"><label>Project URL</label><input value={form.projectUrl} onChange={(e) => setForm({ ...form, projectUrl: e.target.value })} /></div>
                </div>
                <div className="field"><label>Skills (comma separated)</label><input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} /></div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                    {editingId && <button type="button" className="btn btn-outline" onClick={() => { setForm(empty); setEditingId(null); }}>Cancel</button>}
                </div>
            </form>

            <div className="grid grid-3">
                {items.map((p) => (
                    <div key={p._id} className="card">
                        <h4 style={{ fontSize: '1.05rem' }}>{p.title}</h4>
                        <p className="muted" style={{ fontSize: '0.82rem' }}>{p.teamMember?.name}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => edit(p)}>Edit</button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => remove(p._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
