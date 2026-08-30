import React, { useState, useRef, useEffect } from 'react';
import API from '../api';

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content:
                "Hi! I'm the M.A. Corporation assistant. Ask me about our courses, services, enrollment, or anything about the company.",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    const send = async () => {
        if (!input.trim() || loading) return;
        const userMsg = { role: 'user', content: input };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        try {
            const res = await API.post('/chatbot', { messages: newMessages });
            setMessages([
                ...newMessages,
                { role: 'assistant', content: res.data.reply },
            ]);
        } catch (err) {
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: 'Sorry, I am having trouble responding right now.',
                },
            ]);
        }
        setLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open chat assistant"
                style={{
                    position: 'fixed',
                    bottom: 96,
                    right: 24,
                    zIndex: 999,
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                    color: '#fff',
                    fontSize: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(20,184,166,0.4)',
                }}
            >
                {open ? '✕' : '💬'}
            </button>

            {open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 168,
                        right: 24,
                        zIndex: 1000,
                        width: 'min(360px, calc(100vw - 48px))',
                        height: 480,
                        background: '#0A1733',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(10,23,51,0.5)',
                    }}
                >
                    <div
                        style={{
                            padding: '16px 18px',
                            background: 'linear-gradient(135deg, #0A1733, #102A5C)',
                            color: '#fff',
                            fontWeight: 700,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            borderBottom: '1px solid rgba(45,212,191,0.25)',
                        }}
                    >
                        M.A. Corporation Assistant
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: 12,
                                    display: 'flex',
                                    justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: '80%',
                                        padding: '10px 14px',
                                        borderRadius: 12,
                                        fontSize: '0.9rem',
                                        background: m.role === 'user' ? '#14B8A6' : 'rgba(255,255,255,0.06)',
                                        color: m.role === 'user' ? '#fff' : '#E2E8F0',
                                    }}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                Typing…
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>
                    <div style={{ display: 'flex', padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && send()}
                            placeholder="Type your message…"
                            style={{
                                flex: 1,
                                padding: '10px 12px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 10,
                                color: '#E2E8F0',
                                fontFamily: "'Inter', sans-serif",
                            }}
                        />
                        <button
                            onClick={send}
                            style={{
                                marginLeft: 8,
                                padding: '0 16px',
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                color: '#fff',
                                borderRadius: 10,
                                fontWeight: 600,
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
