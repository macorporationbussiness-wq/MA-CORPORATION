import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const values = [
    { title: 'Integrity', desc: 'We believe in honesty and transparency in everything we do.', icon: '🤝' },
    { title: 'Excellence', desc: 'We continuously work to improve the quality of our services.', icon: '⭐' },
    { title: 'Innovation', desc: 'We encourage modern ideas, technology, and new approaches.', icon: '💡' },
    { title: 'Customer Focus', desc: 'Our clients and students remain at the center of our work.', icon: '🎯' },
    { title: 'Growth', desc: 'We believe in continuous personal, professional, and organizational development.', icon: '📈' },
];

export default function About() {
    return (
        <div>
            <PageHeader
                eyebrow="About Us"
                title="About M.A. Corporation"
                subtitle="Quality education, professional services, and practical learning under one platform."
            />

            <section className="section section-light">
                <div className="container" style={{ maxWidth: 860, textAlign: 'center' }}>
                    <p className="muted" style={{ fontSize: '1.1rem', marginBottom: 20 }}>
                        M.A. Corporation was established with the vision of providing reliable
                        professional services and practical learning opportunities under one
                        platform. We believe that knowledge becomes valuable when it can be
                        applied in the real world.
                    </p>
                    <p className="muted" style={{ fontSize: '1.1rem' }}>
                        Our approach focuses on practical learning, professional guidance,
                        customer satisfaction, and continuous improvement. Our team works to
                        understand the needs of every client and student and provide solutions
                        that are practical, accessible, and results-oriented.
                    </p>
                </div>
            </section>

            <section className="section-sm section-dark">
                <div className="container">
                    <div className="grid grid-2" style={{ gap: 40, alignItems: 'center' }}>
                        <div className="card">
                            <div className="icon-chip">👁️</div>
                            <h3 style={{ fontSize: '1.5rem', margin: '14px 0' }}>Our Vision</h3>
                            <p className="muted">
                                To become a trusted and recognized organization known for quality
                                education, professional services, innovation, and customer
                                satisfaction.
                            </p>
                        </div>
                        <div className="card">
                            <div className="icon-chip">🎯</div>
                            <h3 style={{ fontSize: '1.5rem', margin: '14px 0' }}>Our Mission</h3>
                            <p className="muted">
                                Our mission is to empower individuals and organizations through
                                practical knowledge, professional services, and opportunities that
                                contribute to personal and business growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-light">
                <div className="container">
                    <div className="section-head">
                        <span className="eyebrow">What Drives Us</span>
                        <h2>Our Core Values</h2>
                    </div>
                    <div className="grid grid-3">
                        {values.map((v) => (
                            <div key={v.title} className="card">
                                <div className="icon-chip">{v.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{v.title}</h3>
                                <p className="muted" style={{ fontSize: '0.95rem' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/team" className="btn btn-primary">Meet Our Team</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
