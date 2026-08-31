import React, { useEffect, useState } from 'react';
import API from '../../api';
import AdminPageHeader from '../../components/AdminPageHeader';

const tabs = [
    { key: 'all', label: 'All', icon: '📋', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { key: 'contact', label: 'Contact', icon: '✉️', color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
    { key: 'course-application', label: 'Course', icon: '🎓', color: 'linear-gradient(135deg, #14B8A6, #0EA5A4)' },
    { key: 'admission', label: 'Admission', icon: '📝', color: 'linear-gradient(135deg, #A855F7, #7E22CE)' },
    { key: 'career', label: 'Career', icon: '💼', color: 'linear-gradient(135deg, #F59E0B, #D97706)' },
];

const statusColors = {
    pending: { bg: 'rgba(239,68,68,0.12)', color: '#dc2626' },
    reviewed: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb' },
    contacted: { bg: 'rgba(168,85,247,0.12)', color: '#9333ea' },
    enrolled: { bg: 'rgba(20,184,166,0.12)', color: '#0ea5a4' },
    rejected: { bg: 'rgba(107,114,128,0.12)', color: '#475569' },
};

export default function InquiryManager() {
    const [inquiries, setInquiries] = useState([]);
    const [tab, setTab] = useState('all');
    const [selected, setSelected] = useState(null);

    const load = () => {
        const url = tab === 'all' ? '/inquiries' : `/inquiries?type=${tab}`;
        API.get(url).then((r) => setInquiries(r.data)).catch(() => { });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { load(); }, [tab]);

    const updateStatus = async (id, status) => {
        await API.put(`/inquiries/${id}`, { status });
        load();
        if (selected) setSelected({ ...selected, status });
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this inquiry?')) return;
        await API.delete(`/inquiries/${id}`);
        load();
        if (selected?._id === id) setSelected(null);
    };

    return (
        <div>
            <AdminPageHeader
                title="Inquiry Management"
                subtitle="Review contact inquiries, course applications, and admissions."
                icon="✉️"
                color="linear-gradient(135deg, #8E2DE2, #4A00E0)"
            />

            <div
                className="glass-card"
                style={{
                    padding: 14,
                    marginBottom: 24,
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        style={{
                            padding: '9px 18px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            borderRadius: 10,
                            border: 'none',
                            cursor: 'pointer',
                            color: tab === t.key ? '#fff' : '#475569',
                            background: tab === t.key ? t.color : '#f1f5f9',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            boxShadow: tab === t.key ? '0 6px 18px rgba(0,0,0,0.15)' : 'none',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <span>{t.icon}</span> {t.label}
                    </button>
                ))}
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: 24,
                }}
            >
                <div style={{ display: 'grid', gap: 12 }}>
                    {inquiries.map((i) => {
                        const sc = statusColors[i.status] || statusColors.pending;
                        return (
                            <div
                                key={i._id}
                                onClick={() => setSelected(i)}
                                style={{
                                    background: '#fff',
                                    borderRadius: 14,
                                    padding: 18,
                                    boxShadow: '0 4px 18px rgba(10,23,51,0.06)',
                                    border: selected?._id === i._id
                                        ? '2px solid #0ea5a4'
                                        : '1px solid rgba(10,23,51,0.06)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 6,
                                    }}
                                >
                                    <strong style={{ fontSize: '0.95rem', color: '#0A1733' }}>{i.name}</strong>
                                    <span
                                        style={{
                                            padding: '3px 10px',
                                            borderRadius: 999,
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            background: sc.bg,
                                            color: sc.color,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {i.status}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: '0.82rem',
                                        color: '#64748b',
                                        margin: 0,
                                    }}
                                >
                                    {i.type} {i.course ? `• ${i.course}` : ''} {i.city ? `• ${i.city}` : ''}
                                </p>
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        color: '#94a3b8',
                                        margin: '4px 0 0',
                                    }}
                                >
                                    {new Date(i.createdAt).toLocaleString()}
                                </p>
                            </div>
                        );
                    })}
                    {inquiries.length === 0 && (
                        <div
                            style={{
                                background: '#fff',
                                borderRadius: 14,
                                padding: 48,
                                textAlign: 'center',
                                color: '#94a3b8',
                                boxShadow: '0 4px 18px rgba(10,23,51,0.06)',
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
                            No inquiries in this category.
                        </div>
                    )}
                </div>

                <div>
                    {selected ? (
                        <div
                            style={{
                                background: '#fff',
                                borderRadius: 16,
                                padding: 24,
                                position: 'sticky',
                                top: 20,
                                boxShadow: '0 6px 24px rgba(10,23,51,0.1)',
                                border: '1px solid rgba(10,23,51,0.06)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: '#0A1733' }}>
                                    {selected.name}
                                </h3>
                                <button
                                    onClick={() => setSelected(null)}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: 8,
                                        background: '#f1f5f9',
                                        color: '#475569',
                                        border: 'none',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    ✕ Close
                                </button>
                            </div>
                            <div
                                style={{
                                    display: 'grid',
                                    gap: 12,
                                    fontSize: '0.9rem',
                                    marginBottom: 20,
                                }}
                            >
                                {[
                                    { l: 'Type', v: selected.type },
                                    { l: 'Email', v: selected.email },
                                    { l: 'Phone', v: selected.phone },
                                    selected.fatherName && { l: 'Father', v: selected.fatherName },
                                    selected.city && { l: 'City', v: selected.city },
                                    selected.course && { l: 'Course', v: selected.course },
                                    selected.education && { l: 'Education', v: selected.education },
                                    selected.subject && { l: 'Subject', v: selected.subject },
                                ].filter(Boolean).map((row) => (
                                    <div
                                        key={row.l}
                                        style={{
                                            display: 'flex',
                                            padding: '10px 0',
                                            borderBottom: '1px dashed rgba(10,23,51,0.08)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 100,
                                                color: '#94a3b8',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5,
                                            }}
                                        >
                                            {row.l}
                                        </span>
                                        <span style={{ flex: 1, color: '#0A1733', fontWeight: 600 }}>{row.v}</span>
                                    </div>
                                ))}
                                {selected.message && (
                                    <div
                                        style={{
                                            padding: 14,
                                            background: '#f8fafc',
                                            borderRadius: 10,
                                            border: '1px solid rgba(10,23,51,0.06)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: '#94a3b8',
                                                fontSize: '0.78rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5,
                                                marginBottom: 6,
                                            }}
                                        >
                                            Message
                                        </div>
                                        <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>{selected.message}</p>
                                    </div>
                                )}
                                <div
                                    style={{
                                        padding: '10px 0',
                                        borderBottom: '1px dashed rgba(10,23,51,0.08)',
                                        display: 'flex',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 100,
                                            color: '#94a3b8',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5,
                                        }}
                                    >
                                        Date
                                    </span>
                                    <span style={{ flex: 1, color: '#0A1733' }}>
                                        {new Date(selected.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: 6,
                                        fontSize: '0.85rem',
                                        color: '#475569',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    Update Status
                                </label>
                                <select
                                    value={selected.status}
                                    onChange={(e) => updateStatus(selected._id, e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '11px 14px',
                                        background: '#f8fafc',
                                        border: '1px solid rgba(10,23,51,0.1)',
                                        borderRadius: 10,
                                        color: '#0A1733',
                                        fontSize: '0.92rem',
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 600,
                                        outline: 'none',
                                    }}
                                >
                                    <option>pending</option>
                                    <option>reviewed</option>
                                    <option>contacted</option>
                                    <option>enrolled</option>
                                    <option>rejected</option>
                                </select>
                            </div>
                            <button
                                onClick={() => remove(selected._id)}
                                style={{
                                    width: '100%',
                                    padding: '11px 16px',
                                    borderRadius: 10,
                                    background: 'rgba(239,68,68,0.1)',
                                    color: '#dc2626',
                                    border: '1px solid rgba(239,68,68,0.2)',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                }}
                            >
                                🗑 Delete Inquiry
                            </button>
                        </div>
                    ) : (
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
                            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>👈</div>
                            Select an inquiry to view details.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
