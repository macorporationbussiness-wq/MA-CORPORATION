import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Privacy() {
    return (
        <div>
            <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="How M.A. Corporation collects, uses, and protects your information." />
            <section className="section-light">
                <div className="container" style={{ maxWidth: 820 }}>
                    <div className="card" style={{ display: 'grid', gap: 18 }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>1. Information We Collect</h3>
                            <p className="muted">We collect information you provide through inquiry forms, admission applications, and course enrollments, including your name, email, phone, city, and course preferences.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>2. How We Use Information</h3>
                            <p className="muted">Information is used to respond to inquiries, process admissions, deliver courses, and improve our services. We do not sell your data to third parties.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>3. Data Security</h3>
                            <p className="muted">We implement reasonable security measures including HTTPS encryption and access-controlled admin systems to protect your data.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>4. WhatsApp Communication</h3>
                            <p className="muted">When you use Enroll Now or contact forms, your details may be shared via WhatsApp with our official number for follow-up.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>5. Your Rights</h3>
                            <p className="muted">You may request access to or deletion of your personal data by contacting us through the Contact page.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>6. Updates</h3>
                            <p className="muted">This policy may be updated periodically. Continued use of the site constitutes acceptance of the current policy.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
