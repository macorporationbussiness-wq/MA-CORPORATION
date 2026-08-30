import React, { useEffect, useState } from 'react';
import API from '../../api';

const tabs = [
    { key: 'all', label: 'All' },
    { key: 'contact', label: 'Contact' },
    { key: 'course-application', label: 'Course' },
    { key: 'admission', label: 'Admission' },
    { key: 'career', label: 'Career' },
];

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
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Inquiry Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Review contact inquiries, course applications, and admissions.</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                {tabs.map((t) => (
                    <button key={t.key} onClick={() => setTab(t.key)} className={tab === t.key ? 'btn btn-primary' : 'btn btn-outline'} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-2">
                <div style={{ display: 'grid', gap: 12 }}>
                    {inquiries.map((i) => (
                        <div key={i._id} className="card" style={{ cursor: 'pointer', borderColor: selected?._id === i._id ? '#14B8A6' : undefined }} onClick={() => setSelected(i)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong>{i.name}</strong>
                                <span className="badge">{i.status}</span>
                            </div>
                            <p className="muted" style={{ fontSize: '0.82rem', marginTop: 4 }}>
                                {i.type} {i.course ? `• ${i.course}` : ''} {i.city ? `• ${i.city}` : ''}
                            </p>
                        </div>
                    ))}
                    {inquiries.length === 0 && <p className="muted">No inquiries in this category.</p>}
                </div>

                <div>
                    {selected ? (
                        <div className="card" style={{ position: 'sticky', top: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <h3 style={{ fontSize: '1.2rem' }}>{selected.name}</h3>
                                <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.78rem' }} onClick={() => setSelected(null)}>Close</button>
                            </div>
                            <div style={{ display: 'grid', gap: 8, fontSize: '0.9rem' }}>
                                <div><span className="muted">Type:</span> {selected.type}</div>
                                <div><span className="muted">Email:</span> {selected.email}</div>
                                <div><span className="muted">Phone:</span> {selected.phone}</div>
                                {selected.fatherName && <div><span className="muted">Father:</span> {selected.fatherName}</div>}
                                {selected.city && <div><span className="muted">City:</span> {selected.city}</div>}
                                {selected.course && <div><span className="muted">Course:</span> {selected.course}</div>}
                                {selected.education && <div><span className="muted">Education:</span> {selected.education}</div>}
                                {selected.subject && <div><span className="muted">Subject:</span> {selected.subject}</div>}
                                {selected.message && <div><span className="muted">Message:</span> {selected.message}</div>}
                                <div><span className="muted">Date:</span> {new Date(selected.createdAt).toLocaleString()}</div>
                            </div>
                            <div style={{ marginTop: 18 }}>
                                <label className="muted" style={{ fontSize: '0.85rem' }}>Update Status</label>
                                <select value={selected.status} onChange={(e) => updateStatus(selected._id, e.target.value)} style={{ width: '100%', marginTop: 6, padding: '10px', background: '#ffffff', border: '1px solid rgba(10,23,51,0.12)', borderRadius: 8, color: '#0a1733' }}>
                                    <option>pending</option><option>reviewed</option><option>contacted</option><option>enrolled</option><option>rejected</option>
                                </select>
                            </div>
                            <button className="btn btn-outline" style={{ marginTop: 16, color: '#ef4444', width: '100%', justifyContent: 'center' }} onClick={() => remove(selected._id)}>Delete Inquiry</button>
                        </div>
                    ) : (
                        <div className="card text-center muted">Select an inquiry to view details.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
