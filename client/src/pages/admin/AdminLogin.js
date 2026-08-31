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
                background: 'linear-gradient(135deg, #0A1733 0%, #0D1F47 50%, #102A5C 100%)',
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(45,212,191,0.2), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: 500,
                    height: 500,
                    background: 'radial-gradient(circle, rgba(20,184,166,0.15), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite reverse',
                }}
            />

            <form
                onSubmit={submit}
                style={{
                    position: 'relative',
                    width: 420,
                    maxWidth: '100%',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 20,
                    padding: 40,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 18px',
                            boxShadow: '0 12px 30px rgba(20,184,166,0.4)',
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="M.A. Corporation"
                            style={{ height: 50, width: 'auto', borderRadius: 8, display: 'block' }}
                        />
                    </div>
                    <h2
                        style={{
                            fontSize: '1.6rem',
                            margin: '0 0 6px',
                            color: '#fff',
                            fontWeight: 800,
                        }}
                    >
                        Admin Login
                    </h2>
                    <p
                        style={{
                            fontSize: '0.9rem',
                            color: 'rgba(255,255,255,0.7)',
                            margin: 0,
                        }}
                    >
                        M.A. Corporation Dashboard
                    </p>
                </div>
                {error && (
                    <div
                        style={{
                            background: 'rgba(239,68,68,0.15)',
                            color: '#FCA5A5',
                            padding: 12,
                            borderRadius: 10,
                            marginBottom: 16,
                            fontSize: '0.88rem',
                            border: '1px solid rgba(239,68,68,0.3)',
                            textAlign: 'center',
                        }}
                    >
                        ⚠ {error}
                    </div>
                )}
                <div style={{ marginBottom: 16 }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: 8,
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 600,
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '13px 16px',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 10,
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    />
                </div>
                <div style={{ marginBottom: 24 }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: 8,
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 600,
                        }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '13px 16px',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 10,
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontFamily: "'Inter', sans-serif",
                            outline: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow"
                    style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                        color: '#fff',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: loading ? 'wait' : 'pointer',
                        boxShadow: '0 8px 22px rgba(20,184,166,0.4)',
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? 'Signing in…' : 'Sign In →'}
                </button>
                <p
                    style={{
                        fontSize: '0.78rem',
                        textAlign: 'center',
                        marginTop: 18,
                        color: 'rgba(255,255,255,0.5)',
                    }}
                >
                    Default: <strong style={{ color: 'rgba(255,255,255,0.8)' }}>admin@macorporation.com</strong> / admin123
                </p>
            </form>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
}
