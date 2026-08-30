import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const url = category === 'All' ? '/services' : `/services?category=${category}`;
        API.get(url).then((r) => setServices(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, [category]);

    const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

    return (
        <div>
            <PageHeader
                eyebrow="Services"
                title="Our Professional Services"
                subtitle="At M.A. Corporation, we provide professional and customized services designed to meet the needs of individuals, professionals, and businesses."
            />
            <section className="section-white">
                <div className="container">
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={category === c ? 'btn btn-primary' : 'btn btn-outline'}
                                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <p className="text-center muted">Loading services…</p>
                    ) : services.length === 0 ? (
                        <p className="text-center muted">No services found.</p>
                    ) : (
                        <div className="grid grid-3">
                            {services.map((s) => (
                                <div key={s._id} className="card">
                                    <div className="icon-chip" style={{ fontSize: '1.6rem' }}>⚙️</div>
                                    <span className="badge" style={{ marginBottom: 10 }}>{s.category}</span>
                                    <h3 style={{ fontSize: '1.25rem', margin: '8px 0 12px' }}>{s.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.95rem' }}>{s.description}</p>
                                    <Link to="/contact" className="btn btn-ghost" style={{ marginTop: 18, padding: '8px 16px', fontSize: '0.85rem' }}>
                                        Get a Quote
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
