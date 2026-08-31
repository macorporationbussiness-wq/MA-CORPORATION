import React from 'react';

export default function PageHeader({ title, subtitle, eyebrow }) {
    return (
        <div
            style={{
                background:
                    'linear-gradient(135deg, #0A1733 0%, #0D1F47 60%, #102A5C 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: 'clamp(48px, 8vh, 72px) 0 clamp(36px, 6vh, 52px)',
                textAlign: 'center',
            }}
        >
            <div className="container">
                {eyebrow && (
                    <span
                        style={{
                            color: '#2DD4BF',
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            textTransform: 'uppercase',
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        }}
                    >
                        {eyebrow}
                    </span>
                )}
                <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '10px 0 12px' }}>{title}</h1>
                {subtitle && (
                    <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 640, margin: '0 auto', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
