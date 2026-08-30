import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('admin@macorporation.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 0%, rgba(20,184,166,0.18), #0a1733)',
                padding: 24,
            }}
        >
            <form className="card" onSubmit={submit} style={{ width: 380, maxWidth: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <img
                        src="/logo.png"
                        alt="M.A. Corporation"
                        style={{ height: 76, width: 'auto', borderRadius: 12, margin: '0 auto 14px', display: 'block' }}
                    />
                    <h2 style={{ fontSize: '1.5rem' }}>Admin Login</h2>
                    <p className="muted" style={{ fontSize: '0.88rem' }}>M.A. Corporation Dashboard</p>
                </div>
                {error && (
                    <div style={{ background: 'rgba(239,68,68,0.12)', color: '#F87171', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: '0.88rem' }}>
                        {error}
                    </div>
                )}
                <div className="field">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
                <p className="muted" style={{ fontSize: '0.78rem', textAlign: 'center', marginTop: 16 }}>
                    Default: admin@macorporation.com / admin123
                </p>
            </form>
        </div>
    );
}
