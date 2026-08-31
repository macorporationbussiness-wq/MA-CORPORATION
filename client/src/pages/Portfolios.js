import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

export default function Portfolios() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/portfolios').then((r) => setPortfolios(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <PageHeader
                eyebrow="Portfolios"
                title="Team Portfolios & Projects"
                subtitle="Explore the skills, education, experience, and projects of our team members."
            />
            <section className="section-light">
                <div className="container">
                    {loading ? (
                        <p className="text-center muted">Loading portfolios…</p>
                    ) : portfolios.length > 0 ? (
                        <div className="grid grid-3">
                            {portfolios.map((p) => (
                                <div key={p._id} className="card">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                        <div
                                            style={{
                                                width: 48, height: 48, borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, color: '#ffffff',
                                            }}
                                        >
                                            {p.teamMember?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1rem' }}>{p.teamMember?.name}</h4>
                                            <p className="accent" style={{ fontSize: '0.8rem' }}>{p.teamMember?.position}</p>
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>{p.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.9rem', marginBottom: 12 }}>{p.description}</p>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {p.skills?.map((s) => (
                                            <span key={s} className="badge" style={{ fontSize: '0.7rem' }}>{s}</span>
                                        ))}
                                    </div>
                                    {p.projectUrl && (
                                        <a href={p.projectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: 14, padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex' }}>
                                            View Project →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: '60px 40px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0' }}>
                            <p className="muted" style={{ fontSize: '1rem', marginBottom: '24px', maxWidth: 400, margin: '0 auto 24px' }}>
                                Our team members haven't added their portfolio projects yet.
                                Check back soon to see their work, skills, and achievements.
                            </p>
                            <Link to="/team" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                Meet the Team →
                            </Link>
                        </div>
                    )}
                    <div className="text-center mt-3">
                        <Link to="/team" className="btn btn-outline">Back to Team</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
