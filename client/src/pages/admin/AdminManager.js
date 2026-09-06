import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function AdminManager() {
    const [admins, setAdmins] = useState([]);
    const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchAdmins = () => {
        API.get('/auth/admins')
            .then((r) => setAdmins(r.data))
            .catch(() => setAdmins([]));
    };

    useEffect(() => { fetchAdmins(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setErr('');
        setLoading(true);
        try {
            const res = await API.post('/auth/admins', form);
            setMsg(res.data.msg);
            setForm({ name: '', username: '', email: '', password: '' });
            fetchAdmins();
        } catch (error) {
            setErr(error.response?.data?.msg || 'Failed to create admin');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this admin account?')) return;
        try {
            await API.delete(`/auth/admins/${id}`);
            setMsg('Admin deleted');
            fetchAdmins();
        } catch (error) {
            setErr(error.response?.data?.msg || 'Failed to delete admin');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', marginBottom: 6, fontWeight: 800, background: 'linear-gradient(135deg, #0A1733, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Admin Accounts
                </h1>
                <p className="muted">Manage admin users for the dashboard.</p>
            </div>

            {msg && <div style={{ background: 'rgba(16,185,129,0.12)', color: '#065f46', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: '0.88rem', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center' }}>✓ {msg}</div>}
            {err && <div style={{ background: 'rgba(239,68,68,0.15)', color: '#FCA5A5', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: '0.88rem', border: '1px solid rgba(239,68,68,0.3)', textAlign: 'center' }}>⚠ {err}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
                {/* Add Admin Form */}
                <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 6px 20px rgba(10,23,51,0.08)', border: '1px solid rgba(10,23,51,0.06)' }}>
                    <h3 style={{ fontSize: '1.15rem', margin: '0 0 18px', fontWeight: 800, color: '#0A1733' }}>➕ Add New Admin</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Full Name</label>
                            <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Username</label>
                            <input name="username" value={form.username} onChange={handleChange} required placeholder="johndoe" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="admin@example.com" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: 18 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Password</label>
                            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)', color: '#fff', border: 'none', fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'wait' : 'pointer', boxShadow: '0 6px 18px rgba(20,184,166,0.3)' }}>
                            {loading ? 'Creating…' : 'Create Admin'}
                        </button>
                    </form>
                </div>

                {/* Admin List */}
                <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 6px 20px rgba(10,23,51,0.08)', border: '1px solid rgba(10,23,51,0.06)' }}>
                    <h3 style={{ fontSize: '1.15rem', margin: '0 0 18px', fontWeight: 800, color: '#0A1733' }}>👥 Existing Admins ({admins.length})</h3>
                    {admins.length === 0 ? (
                        <p style={{ color: '#94a3b8', textAlign: 'center', padding: 24 }}>No admins found.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: 10 }}>
                            {admins.map((a) => (
                                <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <div>
                                        <strong style={{ fontSize: '0.92rem', color: '#0A1733' }}>{a.name}</strong>
                                        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>@{a.username || '—'} • {a.email}</p>
                                    </div>
                                    <button onClick={() => handleDelete(a._id)} style={{ padding: '6px 12px', borderRadius: 6, background: 'rgba(239,68,68,0.1)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
