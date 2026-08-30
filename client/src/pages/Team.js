import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

export default function Team() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/team').then((r) => setTeam(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <PageHeader
                eyebrow="Our Team"
                title="Meet Our Team"
                subtitle="Experienced professionals committed to providing quality guidance and support."
            />
            <section className="section-dark">
                <div className="container">
                    {loading ? (
                        <p className="text-center muted">Loading team…</p>
                    ) : (
                        <div className="grid grid-4">
                            {team.map((m) => (
                                <div key={m._id} className="card" style={{ textAlign: 'center' }}>
                                    <div
                                        style={{
                                            width: 96, height: 96, borderRadius: '50%', margin: '0 auto 16px',
                                            background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.8rem', fontWeight: 700, color: '#ffffff',
                                        }}
                                    >
                                        {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem' }}>{m.name}</h3>
                                    <p className="accent" style={{ fontSize: '0.88rem', marginBottom: 10 }}>{m.position}</p>
                                    <p className="muted" style={{ fontSize: '0.88rem', minHeight: 40 }}>{m.bio}</p>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', margin: '12px 0' }}>
                                        {m.skills?.slice(0, 3).map((s) => (
                                            <span key={s} className="badge" style={{ fontSize: '0.7rem' }}>{s}</span>
                                        ))}
                                    </div>
                                    <Link to="/portfolios" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                                        Visit Portfolio
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
