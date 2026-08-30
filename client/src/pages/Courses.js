import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PageHeader from '../components/PageHeader';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        API.get('/courses').then((r) => setCourses(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
    const filtered = courses.filter((c) => {
        const matchCat = category === 'All' || c.category === category;
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.shortDescription.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div>
            <PageHeader
                eyebrow="Courses"
                title="Explore Our Courses"
                subtitle="Learn practical skills from experienced professionals and take the next step in your career."
            />
            <section className="section-light">
                <div className="container">
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 30, alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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
                        <input
                            placeholder="Search courses…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: '11px 16px',
                                background: '#ffffff',
                                border: '1px solid rgba(10,23,51,0.12)',
                                borderRadius: 10,
                                color: '#0a1733',
                                minWidth: 240,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        />
                    </div>

                    {loading ? (
                        <p className="text-center muted">Loading courses…</p>
                    ) : filtered.length === 0 ? (
                        <p className="text-center muted">No courses found.</p>
                    ) : (
                        <div className="grid grid-3">
                            {filtered.map((c) => (
                                <div key={c._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <span className="badge">{c.level}</span>
                                        <span className="badge" style={{ background: 'rgba(20,184,166,0.12)', color: '#0ea5a4' }}>{c.category}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: 10 }}>{c.name}</h3>
                                    <p className="muted" style={{ fontSize: '0.92rem', flex: 1 }}>{c.shortDescription}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0', fontSize: '0.85rem' }} className="muted">
                                        <span>⏱ {c.durationWeeks} Weeks</span>
                                        <span>📚 {c.classesPerWeek}/wk</span>
                                        <span className="primary">PKR {c.fee.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <Link to={`/courses/${c.slug}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>View Details</Link>
                                        <Link to="/admissions" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>Enroll Now</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
