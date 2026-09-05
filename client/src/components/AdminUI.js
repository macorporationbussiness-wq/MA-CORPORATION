import React from 'react';

export function AdminFormCard({ title, icon, children, color = 'linear-gradient(135deg, #14B8A6, #0EA5A4)' }) {
    return (
        <div
            style={{
                background: '#fff',
                borderRadius: 20,
                padding: 28,
                boxShadow: '0 6px 24px rgba(10,23,51,0.08)',
                border: '1px solid rgba(10,23,51,0.06)',
                marginBottom: 28,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: color,
                }}
            />
            {title && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 20,
                        paddingBottom: 16,
                        borderBottom: '1px solid rgba(10,23,51,0.08)',
                    }}
                >
                    {icon && (
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.05rem',
                            }}
                        >
                            {icon}
                        </div>
                    )}
                    <h3
                        style={{
                            fontSize: '1.15rem',
                            margin: 0,
                            fontWeight: 800,
                            color: '#0A1733',
                        }}
                    >
                        {title}
                    </h3>
                </div>
            )}
            {children}
            <style>{`
                .admin-form-card input[type="text"],
                .admin-form-card input[type="email"],
                .admin-form-card input[type="password"],
                .admin-form-card input[type="number"],
                .admin-form-card input[type="date"],
                .admin-form-card input[type="url"],
                .admin-form-card input:not([type]),
                .admin-form-card select,
                .admin-form-card textarea {
                    width: 100%;
                    padding: 11px 14px;
                    background: #f8fafc;
                    border: 1px solid rgba(10,23,51,0.1);
                    border-radius: 10px;
                    color: #0A1733;
                    font-size: 0.92rem;
                    font-family: 'Inter', sans-serif;
                    transition: all 0.2s ease;
                    outline: none;
                }
                .admin-form-card input:focus,
                .admin-form-card select:focus,
                .admin-form-card textarea:focus {
                    border-color: #0ea5a4;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(20,184,166,0.12);
                }
                .admin-form-card label {
                    display: block;
                    margin-bottom: 6px;
                    font-size: 0.85rem;
                    color: #475569;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}

export function AdminItemCard({ title, subtitle, badges = [], onEdit, onDelete, image, icon, color = 'linear-gradient(135deg, #14B8A6, #0EA5A4)' }) {
    return (
        <div
            className="admin-item-card"
            style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(10,23,51,0.08)',
                border: '1px solid rgba(10,23,51,0.06)',
                transition: 'all 0.3s ease',
                position: 'relative',
            }}
        >
            {(image || icon) && (
                <div
                    style={{
                        height: 80,
                        background: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            style={{
                                fontSize: '2rem',
                                color: '#fff',
                                fontWeight: 800,
                                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            }}
                        >
                            {icon}
                        </div>
                    )}
                </div>
            )}
            <div style={{ padding: 18 }}>
                <div
                    style={{
                        display: 'flex',
                        gap: 6,
                        flexWrap: 'wrap',
                        marginBottom: 8,
                    }}
                >
                    {badges.map((b, i) => (
                        <span
                            key={i}
                            style={{
                                padding: '3px 10px',
                                borderRadius: 999,
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                background: 'rgba(20,184,166,0.12)',
                                color: '#0ea5a4',
                            }}
                        >
                            {b}
                        </span>
                    ))}
                </div>
                <h4
                    style={{
                        fontSize: '1.05rem',
                        margin: 0,
                        fontWeight: 800,
                        color: '#0A1733',
                    }}
                >
                    {title}
                </h4>
                {subtitle && (
                    <p
                        style={{
                            color: '#64748b',
                            fontSize: '0.85rem',
                            margin: '4px 0 0',
                        }}
                    >
                        {subtitle}
                    </p>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            style={{
                                padding: '7px 14px',
                                borderRadius: 8,
                                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(20,184,166,0.3)',
                            }}
                        >
                            ✎ Edit
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            style={{
                                padding: '7px 14px',
                                borderRadius: 8,
                                background: 'rgba(239,68,68,0.1)',
                                color: '#ef4444',
                                border: '1px solid rgba(239,68,68,0.2)',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            🗑 Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function AdminSubmitButton({ editing, label = 'Save' }) {
    return (
        <button
            type="submit"
            className="btn-glow"
            style={{
                padding: '12px 28px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #14B8A6, #0EA5A4)',
                color: '#fff',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(20,184,166,0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
            }}
        >
            {editing ? `✓ Update ${label}` : `+ Create ${label}`}
        </button>
    );
}

export function AdminCancelButton({ onClick, label = 'Reset' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                padding: '12px 24px',
                borderRadius: 10,
                background: 'transparent',
                color: '#64748b',
                border: '1px solid rgba(10,23,51,0.15)',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
            }}
        >
            {label}
        </button>
    );
}

export function AdminToast({ msg, type = 'success' }) {
    if (!msg) return null;
    const isError = type === 'error';
    return (
        <div
            style={{
                background: isError ? 'rgba(239,68,68,0.12)' : 'rgba(20,184,166,0.15)',
                color: isError ? '#dc2626' : '#0ea5a4',
                padding: '12px 20px',
                borderRadius: 10,
                marginBottom: 20,
                fontSize: '0.9rem',
                fontWeight: 600,
                border: isError ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(20,184,166,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
            }}
        >
            {isError ? '⚠' : '✓'} {msg}
        </div>
    );
}

export function AdminToggle({ checked, onChange, label }) {
    return (
        <label
            style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                padding: '10px 14px',
                background: '#f8fafc',
                borderRadius: 10,
                cursor: 'pointer',
                border: '1px solid rgba(10,23,51,0.08)',
            }}
        >
            <div
                onClick={() => onChange(!checked)}
                style={{
                    position: 'relative',
                    width: 40,
                    height: 22,
                    borderRadius: 999,
                    background: checked ? 'linear-gradient(135deg, #14B8A6, #0EA5A4)' : '#cbd5e1',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 2,
                        left: checked ? 20 : 2,
                        width: 18,
                        height: 18,
                        background: '#fff',
                        borderRadius: '50%',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                />
            </div>
            <span style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 600 }}>{label}</span>
        </label>
    );
}

export function AdminImageUpload({ value, onUpload, onChange }) {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    marginBottom: 6,
                }}
            >
                <label
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(14,165,164,0.12))',
                        color: '#0ea5a4',
                        borderRadius: 8,
                        cursor: 'pointer',
                        border: '1px solid rgba(20,184,166,0.3)',
                    }}
                >
                    📷 Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        style={{ display: 'none' }}
                    />
                </label>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>or paste URL below</span>
            </div>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
            />
            {value && (
                <img
                    src={value}
                    alt="preview"
                    style={{
                        width: '100%',
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 8,
                        marginTop: 8,
                        border: '1px solid rgba(10,23,51,0.1)',
                    }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}
        </div>
    );
}

export function AdminIconPicker({ value, onChange, onUpload }) {
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
    const [showFileUpload, setShowFileUpload] = React.useState(false);

    // Common emoji icons for contact items
    const emojiIcons = [
        '🏢', '📍', '📞', '✉️', '💬', '🌐', '🎯', '🚀', '💡', '🤝',
        '⭐', '📈', '🛡️', '👥', '🎓', '👁️', '🏆', '💼', '📚', '🔧',
        '⚙️', '🔒', '📄', '📝', '📊', '📱', '💻', '☁️', '🔍', '🎨'
    ];

    // Available PNG icons in public folder
    const pngIcons = [
        'icon-globe.png', 'icon-target.png', 'icon-rocket.png', 'icon-lightbulb.png',
        'icon-handshake.png', 'icon-star.png', 'icon-growth.png', 'icon-team.png',
        'icon-graduation.png', 'icon-briefcase.png', 'icon-eye.png', 'icon-shield.png',
        'icon-teacher.png'
    ];

    const handleEmojiSelect = (emoji) => {
        onChange(emoji);
        setShowEmojiPicker(false);
    };

    const handlePngSelect = (png) => {
        onChange(png);
        setShowFileUpload(false);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && onUpload) {
            onUpload(file);
        }
        setShowFileUpload(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                {/* Current value display */}
                <div
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(14,165,164,0.12))',
                        border: '2px solid rgba(20,184,166,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        position: 'relative',
                    }}
                >
                    {value && (value.startsWith('icon-') && value.endsWith('.png') ? (
                        <img src={`/${value}`} alt="icon" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                    ) : (
                        <span>{value || '📍'}</span>
                    ))}
                </div>

                {/* Emoji picker button */}
                <button
                    type="button"
                    onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowFileUpload(false); }}
                    style={{
                        padding: '8px 14px',
                        borderRadius: 8,
                        border: '1px solid rgba(10,23,51,0.15)',
                        background: showEmojiPicker ? 'linear-gradient(135deg, #14B8A6, #0EA5A4)' : '#fff',
                        color: showEmojiPicker ? '#fff' : '#0A1733',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    😀 Emoji
                </button>

                {/* PNG icons button */}
                <button
                    type="button"
                    onClick={() => { setShowFileUpload(!showFileUpload); setShowEmojiPicker(false); }}
                    style={{
                        padding: '8px 14px',
                        borderRadius: 8,
                        border: '1px solid rgba(10,23,51,0.15)',
                        background: showFileUpload ? 'linear-gradient(135deg, #14B8A6, #0EA5A4)' : '#fff',
                        color: showFileUpload ? '#fff' : '#0A1733',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    🖼️ PNG Icons
                </button>

                {/* Upload custom button */}
                <label
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(14,165,164,0.12))',
                        color: '#0ea5a4',
                        borderRadius: 8,
                        cursor: 'pointer',
                        border: '1px solid rgba(20,184,166,0.3)',
                    }}
                >
                    ☁️ Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                </label>

                {/* Clear button */}
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        style={{
                            padding: '8px 14px',
                            borderRadius: 8,
                            border: '1px solid rgba(239,68,68,0.2)',
                            background: 'rgba(239,68,68,0.1)',
                            color: '#ef4444',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                        }}
                    >
                        ✕ Clear
                    </button>
                )}
            </div>

            {/* Emoji picker dropdown */}
            {showEmojiPicker && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        background: '#fff',
                        border: '1px solid rgba(10,23,51,0.15)',
                        borderRadius: 12,
                        padding: 12,
                        boxShadow: '0 10px 40px rgba(10,23,51,0.15)',
                        marginTop: 4,
                        maxWidth: 320,
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
                        {emojiIcons.map((emoji) => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => handleEmojiSelect(emoji)}
                                style={{
                                    padding: '10px',
                                    borderRadius: 8,
                                    border: '1px solid rgba(10,23,51,0.08)',
                                    background: '#fafbfc',
                                    fontSize: '1.3rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* PNG icons dropdown */}
            {showFileUpload && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        background: '#fff',
                        border: '1px solid rgba(10,23,51,0.15)',
                        borderRadius: 12,
                        padding: 12,
                        boxShadow: '0 10px 40px rgba(10,23,51,0.15)',
                        marginTop: 4,
                        maxWidth: 320,
                    }}
                >
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
                        Available PNG Icons
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                        {pngIcons.map((png) => (
                            <button
                                key={png}
                                type="button"
                                onClick={() => handlePngSelect(png)}
                                style={{
                                    padding: '10px',
                                    borderRadius: 8,
                                    border: '1px solid rgba(10,23,51,0.08)',
                                    background: '#fafbfc',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 4,
                                }}
                            >
                                <img src={`/${png}`} alt={png} style={{ width: 32, height: 32, objectFit: 'contain' }} />
                                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{png.replace('icon-', '').replace('.png', '')}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                .admin-icon-picker-wrapper {
                    position: relative;
                }
            `}</style>
        </div>
    );
}
