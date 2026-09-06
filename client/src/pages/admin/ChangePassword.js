import React, { useState } from 'react';
import API from '../../api';

export default function ChangePassword() {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setErr('');

        if (form.newPassword !== form.confirmPassword) {
            setErr('New passwords do not match');
            return;
        }
        if (form.newPassword.length < 6) {
            setErr('New password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const res = await API.put('/auth/password', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            setMsg(res.data.msg);
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setErr(error.response?.data?.msg || 'Failed to change password');
        }
        setLoading(false);
    };

    return (
        <div>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', marginBottom: 6, fontWeight: 800, background: 'linear-gradient(135deg, #0A1733, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Change Password
                </h1>
                <p className="muted">Update your admin account password.</p>
            </div>

            {msg && <div style={{ background: 'rgba(16,185,129,0.12)', color: '#065f46', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: '0.88rem', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center' }}>✓ {msg}</div>}
            {err && <div style={{ background: 'rgba(239,68,68,0.15)', color: '#FCA5A5', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: '0.88rem', border: '1px solid rgba(239,68,68,0.3)', textAlign: 'center' }}>⚠ {err}</div>}

            <div style={{ maxWidth: 480, background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 6px 20px rgba(10,23,51,0.08)', border: '1px solid rgba(10,23,51,0.06)' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Current Password</label>
                        <input name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} required placeholder="Enter current password" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>New Password</label>
                        <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} required placeholder="Min 6 characters" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: 22 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Confirm New Password</label>
                        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required placeholder="Re-enter new password" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)', color: '#fff', border: 'none', fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'wait' : 'pointer', boxShadow: '0 6px 18px rgba(20,184,166,0.3)' }}>
                        {loading ? 'Updating…' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
