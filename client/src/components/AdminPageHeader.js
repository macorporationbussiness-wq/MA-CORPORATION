import React from 'react';

export default function AdminPageHeader({ title, subtitle, action, icon, color = 'linear-gradient(135deg, #14B8A6, #0EA5A4)' }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                marginBottom: 28,
                flexWrap: 'wrap',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {icon && (
                    <div
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: 14,
                            background: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            boxShadow: '0 8px 22px rgba(20,184,166,0.3)',
                        }}
                    >
                        {icon}
                    </div>
                )}
                <div>
                    <h1
                        style={{
                            fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                            margin: 0,
                            fontWeight: 800,
                            color: '#0A1733',
                        }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            style={{
                                color: '#64748b',
                                fontSize: '0.92rem',
                                margin: '4px 0 0',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {action}
        </div>
    );
}
