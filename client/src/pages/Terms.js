import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Terms() {
    return (
        <div>
            <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle="The terms governing your use of the M.A. Corporation website and services." />
            <section className="section-light">
                <div className="container" style={{ maxWidth: 820 }}>
                    <div className="card" style={{ display: 'grid', gap: 18 }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>1. Acceptance of Terms</h3>
                            <p className="muted">By accessing this website, you agree to be bound by these Terms & Conditions and all applicable laws.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>2. Use of Services</h3>
                            <p className="muted">Courses and services are provided for educational and professional purposes. Enrollment is subject to availability and review by our admissions team.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>3. Payments & Fees</h3>
                            <p className="muted">Course fees are as listed. Online payments and a student portal are planned for future release. Current enrollments are confirmed via WhatsApp.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>4. Intellectual Property</h3>
                            <p className="muted">All content, branding, and materials are the property of M.A. Corporation and may not be reproduced without permission.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>5. Limitation of Liability</h3>
                            <p className="muted">M.A. Corporation is not liable for any indirect damages arising from the use of this website or its services.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>6. Changes</h3>
                            <p className="muted">We reserve the right to modify these terms at any time. Changes take effect upon posting.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
