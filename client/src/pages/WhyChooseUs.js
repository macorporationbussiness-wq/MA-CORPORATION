import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const reasons = [
    { title: 'Practical Learning', desc: 'Courses built around real-world application, not just theory.', icon: '🎓' },
    { title: 'Expert Instructors', desc: 'Learn from experienced professionals active in their fields.', icon: '👨‍🏫' },
    { title: 'Career Focused', desc: 'Programs designed to improve employability and skills.', icon: '💼' },
    { title: 'Flexible Online Mode', desc: 'Study from anywhere with fully online delivery.', icon: '🌐' },
    { title: 'Customer Satisfaction', desc: 'We put our students and clients at the center of everything.', icon: '⭐' },
    { title: 'Trusted Services', desc: 'Reliable business services from SEO to AI systems.', icon: '🛡️' },
];

export default function WhyChooseUs() {
    return (
        <div>
            <PageHeader
                eyebrow="Why Choose Us"
                title="Why Choose M.A. Corporation"
                subtitle="A trusted partner for learning, professional development, and business support."
            />
            <section className="section-light">
                <div className="container">
                    <div className="grid grid-3">
                        {reasons.map((r) => (
                            <div key={r.title} className="card">
                                <div className="icon-chip" style={{ fontSize: '1.6rem' }}>{r.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>{r.title}</h3>
                                <p className="muted" style={{ fontSize: '0.95rem' }}>{r.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
