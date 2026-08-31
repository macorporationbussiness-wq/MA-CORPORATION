import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

export default function Certificates() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/certificates').then((r) => setCerts(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <PageHeader
                eyebrow="Certificates"
                title="Our Certifications"
                subtitle="Recognizing achievement and verified learning across our programs."
            />
            <section className="section-white">
                <div className="container">
                    {loading ? (
                        <p className="text-center muted">Loading certificates…</p>
                    ) : certs.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: '60px 40px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0' }}>
                            <p className="muted" style={{ fontSize: '1rem', marginBottom: '24px', maxWidth: 400, margin: '0 auto 24px' }}>
                                Check back soon to see our latest certifications and achievements.
                            </p>
                            <Link to="/certificates" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                Our Certification →
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {certs.map((c) => (
                                <div key={c._id} className="card" style={{ textAlign: 'center' }}>
                                    <div className="icon-chip" style={{ margin: '0 auto 18px', fontSize: '1.6rem' }}>🏅</div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{c.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.9rem' }}>Awarded to: {c.issuedTo}</p>
                                    <p className="accent" style={{ fontSize: '0.85rem', margin: '6px 0' }}>{c.course}</p>
                                    <p className="muted" style={{ fontSize: '0.8rem' }}>
                                        {new Date(c.issueDate).toLocaleDateString()}
                                    </p>
                                    {c.certificateUrl && (
                                        <a href={c.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: 12, padding: '8px 16px', fontSize: '0.85rem' }}>
                                            View Certificate
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
