import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);
    const [counts, setCounts] = useState({ courses: 0, services: 0, team: 0, certs: 0 });

    useEffect(() => {
        API.get('/inquiries/stats').then((r) => setStats(r.data)).catch(() => { });
        API.get('/inquiries?type=admission').then((r) => setRecent(r.data.slice(0, 5))).catch(() => { });
        API.get('/courses/all').then((r) => setCounts((c) => ({ ...c, courses: r.data.length }))).catch(() => { });
        API.get('/services/all').then((r) => setCounts((c) => ({ ...c, services: r.data.length }))).catch(() => { });
        API.get('/team/all').then((r) => setCounts((c) => ({ ...c, team: r.data.length }))).catch(() => { });
        API.get('/certificates/all').then((r) => setCounts((c) => ({ ...c, certs: r.data.length }))).catch(() => { });
    }, []);

    const cards = [
        { label: 'Total Students / Clients', value: stats?.total || 0, icon: '👥', color: '#14B8A6' },
        { label: 'Total Courses', value: counts.courses, icon: '🎓', color: '#0EA5A4' },
        { label: 'Total Inquiries', value: stats?.total || 0, icon: '✉️', color: '#3B82F6' },
        { label: 'Total Employees', value: counts.team, icon: '💼', color: '#A855F7' },
    ];

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Dashboard</h1>
            <p className="muted" style={{ marginBottom: 28 }}>Welcome back! Here's an overview of your platform.</p>

            <div className="grid grid-4">
                {cards.map((c) => (
                    <div key={c.label} className="card">
                        <div className="icon-chip" style={{ fontSize: '1.6rem' }}>{c.icon}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: c.color }}>{c.value}</div>
                        <p className="muted" style={{ fontSize: '0.88rem' }}>{c.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-2" style={{ marginTop: 28, gap: 28 }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Inquiry Breakdown</h3>
                    <div style={{ display: 'grid', gap: 12 }}>
                        {[
                            { l: 'Contact Inquiries', v: stats?.contact },
                            { l: 'Course Applications', v: stats?.course },
                            { l: 'Admissions', v: stats?.admission },
                            { l: 'Career Applications', v: stats?.career },
                            { l: 'Pending', v: stats?.pending },
                        ].map((s) => (
                            <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(10,23,51,0.08)' }}>
                                <span className="muted">{s.l}</span>
                                <strong>{s.v || 0}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Recent Applications</h3>
                    {recent.length === 0 ? (
                        <p className="muted">No applications yet.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: 12 }}>
                            {recent.map((a) => (
                                <div key={a._id} style={{ padding: '10px 0', borderBottom: '1px solid rgba(10,23,51,0.08)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{a.name}</strong>
                                        <span className="badge">{a.status}</span>
                                    </div>
                                    <p className="muted" style={{ fontSize: '0.82rem' }}>{a.course} • {a.city}</p>
                                </div>
                            ))}
                            <Link to="/admin/inquiries" className="btn btn-ghost" style={{ marginTop: 8, justifyContent: 'center' }}>View All Inquiries</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
