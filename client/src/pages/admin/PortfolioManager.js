import React, { useEffect, useState } from 'react';
import API from '../../api';

const empty = {
    teamMember: '',
    title: '',
    slug: '',
    description: '',
    image: '',
    projectImage: '',
    projectImages: [],
    projectUrl: '',
    projectUrls: [],
    projectType: 'Web App',
    role: '',
    skills: '',
    challenges: '',
    results: '',
    startDate: '',
    endDate: '',
    featured: false,
    isActive: true,
    order: 0,
};

const projectTypes = ['Web App', 'Mobile App', 'Branding', 'UI/UX Design', 'AI/ML', 'Other'];

export default function PortfolioManager() {
    const [items, setItems] = useState([]);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => {
        API.get('/portfolios').then((r) => setItems(r.data)).catch(() => { });
        API.get('/team/all').then((r) => setMembers(r.data)).catch(() => { });
    };
    useEffect(() => { load(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Project images management
    const addProjectImage = () => {
        setForm((prev) => ({
            ...prev,
            projectImages: [...(prev.projectImages || []), ''],
        }));
    };
    const removeProjectImage = (idx) => {
        setForm((prev) => ({
            ...prev,
            projectImages: prev.projectImages.filter((_, i) => i !== idx),
        }));
    };
    const updateProjectImage = (idx, value) => {
        setForm((prev) => {
            const imgs = [...(prev.projectImages || [])];
            imgs[idx] = value;
            return { ...prev, projectImages: imgs };
        });
    };

    // Project URLs management
    const addProjectUrl = () => {
        setForm((prev) => ({
            ...prev,
            projectUrls: [...(prev.projectUrls || []), { label: '', url: '' }],
        }));
    };
    const removeProjectUrl = (idx) => {
        setForm((prev) => ({
            ...prev,
            projectUrls: prev.projectUrls.filter((_, i) => i !== idx),
        }));
    };
    const updateProjectUrl = (idx, field, value) => {
        setForm((prev) => {
            const urls = [...(prev.projectUrls || [])];
            urls[idx] = { ...urls[idx], [field]: value };
            return { ...prev, projectUrls: urls };
        });
    };

    // File upload helper — uploads a file via multipart/form-data
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const resp = await fetch('http://localhost:5000/api/upload/single', {
            method: 'POST',
            body: formData,
        });
        const data = await resp.json();
        return data.url;
    };

    // Upload thumbnail image file
    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, image: url, projectImage: url }));
        } catch (err) {
            setMsg('Error uploading image');
        }
    };

    // Upload gallery image file and add to projectImages array
    const handleGalleryUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            addProjectImage();
            updateProjectImage((form.projectImages || []).length, url);
        } catch (err) {
            setMsg('Error uploading image');
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg('');
        const payload = {
            ...form,
            skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
            projectImages: form.projectImages.filter((u) => u && u.trim()),
            projectUrls: form.projectUrls.filter((u) => u && u.url && u.url.trim()),
            order: Number(form.order) || 0,
            startDate: form.startDate || undefined,
            endDate: form.endDate || undefined,
        };
        try {
            if (editingId) {
                await API.put(`/portfolios/${editingId}`, payload);
                setMsg('Portfolio updated');
            } else {
                await API.post('/portfolios', payload);
                setMsg('Portfolio created');
            }
            setForm(empty);
            setEditingId(null);
            load();
        } catch (err) {
            setMsg('Error saving portfolio');
        }
    };

    const edit = (p) => {
        setForm({
            ...p,
            skills: (p.skills || []).join(', '),
            teamMember: p.teamMember?._id || p.teamMember || '',
            projectImages: p.projectImages && p.projectImages.length > 0 ? p.projectImages : (p.projectImage ? [p.projectImage] : []),
            projectUrls: p.projectUrls && p.projectUrls.length > 0 ? p.projectUrls : (p.projectUrl ? [{ label: 'Live Demo', url: p.projectUrl }] : []),
            startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : '',
            endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : '',
        });
        setEditingId(p._id);
        window.scrollTo(0, 0);
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this portfolio?')) return;
        await API.delete(`/portfolios/${id}`);
        load();
        setMsg('Portfolio deleted');
    };
    const resetForm = () => {
        setForm(empty);
        setEditingId(null);
        setMsg('');
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Portfolio Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Manage portfolio projects, skills, roles, and project details.</p>
            {msg && <div className="badge" style={{ marginBottom: 16, background: 'rgba(20,184,166,0.15)', color: '#14B8A6' }}>{msg}</div>}

            <form className="card" onSubmit={submit} style={{ marginBottom: 30 }}>
                <h3 style={{ marginBottom: 20, fontSize: '1.25rem' }}>{editingId ? 'Edit Portfolio' : 'Add Portfolio'}</h3>

                {/* Row 1: Team Member + Title + Type */}
                <div className="grid grid-3">
                    <div className="field">
                        <label>Team Member</label>
                        <select
                            name="teamMember"
                            value={form.teamMember}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select member</option>
                            {members.map((m) => (
                                <option key={m._id} value={m._id}>{m.name} — {m.position}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label>Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Enterprise SaaS Dashboard"
                            required
                        />
                    </div>
                    <div className="field">
                        <label>Project Type</label>
                        <select name="projectType" value={form.projectType} onChange={handleChange}>
                            {projectTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 2: Slug + Role + Dates */}
                <div className="grid grid-3">
                    <div className="field">
                        <label>Slug (URL)</label>
                        <input
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            placeholder="e.g. enterprise-saas-dashboard"
                        />
                    </div>
                    <div className="field">
                        <label>Your Role</label>
                        <input
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            placeholder="e.g. Lead Full-Stack Developer"
                        />
                    </div>
                    <div className="field">
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label>End Date</label>
                    <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                </div>

                {/* Primary Thumbnail Image */}
                <div className="field">
                    <label>
                        Thumbnail Image URL
                        <button
                            type="button"
                            className="btn btn-ghost"
                            style={{ padding: '4px 10px', fontSize: '0.75rem', marginLeft: 8 }}
                            onClick={() => {
                                if (form.image && form.image.trim()) {
                                    addProjectImage();
                                    updateProjectImage((form.projectImages || []).length, form.image);
                                }
                            }}
                        >
                            + Add Photo
                        </button>
                        <label
                            style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                fontSize: '0.75rem',
                                marginLeft: 8,
                                background: 'var(--surface)',
                                border: '1px solid var(--border-dark)',
                                borderRadius: 4,
                                color: 'var(--text-light)',
                                cursor: 'pointer',
                            }}
                        >
                            📷 Upload
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </label>
                    <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Or paste image URL (https://example.com/thumb.jpg)"
                    />
                    {form.image && (
                        <img
                            src={form.image}
                            alt="thumbnail preview"
                            style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    )}
                </div>

                {/* Primary Project Image (for backward compatibility) */}
                <div className="field">
                    <label>Primary Project Image URL</label>
                    <input
                        name="projectImage"
                        value={form.projectImage}
                        onChange={handleChange}
                        placeholder="https://example.com/project-image.jpg"
                    />
                    {form.projectImage && (
                        <img
                            src={form.projectImage}
                            alt="preview"
                            style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    )}
                </div>

                {/* Multiple Project Images */}
                <div className="field">
                    <label>
                        Project Image Gallery
                        <button type="button" className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem', marginLeft: 8 }} onClick={addProjectImage}>
                            + Add Image
                        </button>
                        <label
                            style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                fontSize: '0.75rem',
                                marginLeft: 8,
                                background: 'var(--surface)',
                                border: '1px solid var(--border-dark)',
                                borderRadius: 4,
                                color: 'var(--text-light)',
                                cursor: 'pointer',
                            }}
                        >
                            📷 Upload
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleGalleryUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </label>
                    {(form.projectImages || []).map((imgUrl, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 8 }}>
                            <input
                                name={`projectImage_${idx}`}
                                value={imgUrl}
                                onChange={(e) => updateProjectImage(idx, e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                style={{ flex: 1 }}
                            />
                            {imgUrl && (
                                <img
                                    src={imgUrl}
                                    alt="preview"
                                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <button type="button" className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444' }} onClick={() => removeProjectImage(idx)}>
                                ✕
                            </button>
                        </div>
                    ))}
                    {(form.projectImages || []).length === 0 && (
                        <p className="muted" style={{ fontSize: '0.8rem' }}>No gallery images added yet.</p>
                    )}
                </div>

                {/* Primary Project URL */}
                <div className="field">
                    <label>Main Project URL</label>
                    <input
                        name="projectUrl"
                        value={form.projectUrl}
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                    />
                </div>

                {/* Multiple Project URLs */}
                <div className="field">
                    <label>
                        Project Links (URLs)
                        <button type="button" className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem', marginLeft: 8 }} onClick={addProjectUrl}>
                            + Add Link
                        </button>
                    </label>
                    {(form.projectUrls || []).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 8 }}>
                            <input
                                name={`projectUrlLabel_${idx}`}
                                value={item.label || ''}
                                onChange={(e) => updateProjectUrl(idx, 'label', e.target.value)}
                                placeholder="Label (e.g. GitHub, Live Demo)"
                                style={{ flex: 1, minWidth: 120 }}
                            />
                            <input
                                name={`projectUrl_${idx}`}
                                value={item.url || ''}
                                onChange={(e) => updateProjectUrl(idx, 'url', e.target.value)}
                                placeholder="https://..."
                                style={{ flex: 2 }}
                            />
                            <button type="button" className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444' }} onClick={() => removeProjectUrl(idx)}>
                                ✕
                            </button>
                        </div>
                    ))}
                    {(form.projectUrls || []).length === 0 && (
                        <p className="muted" style={{ fontSize: '0.8rem' }}>No project links added yet.</p>
                    )}
                </div>

                {/* Skills */}
                <div className="field">
                    <label>Skills (comma separated)</label>
                    <input
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="React, Node.js, MongoDB, AWS"
                    />
                </div>

                {/* Description */}
                <div className="field">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Brief overview of the project..."
                    />
                </div>

                {/* Challenges */}
                <div className="field">
                    <label>Challenges</label>
                    <textarea
                        name="challenges"
                        value={form.challenges}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What problems did you face and how did you solve them?"
                    />
                </div>

                {/* Results */}
                <div className="field">
                    <label>Results</label>
                    <textarea
                        name="results"
                        value={form.results}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What was the outcome? Quantify the impact if possible."
                    />
                </div>

                {/* Toggles + Order */}
                <div className="grid grid-3" style={{ alignItems: 'end' }}>
                    <div className="field" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                        <input
                            type="checkbox"
                            name="featured"
                            id="featured"
                            checked={form.featured}
                            onChange={handleChange}
                        />
                        <label htmlFor="featured" style={{ marginBottom: 0 }}>Featured</label>
                    </div>
                    <div className="field" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                        <input
                            type="checkbox"
                            name="isActive"
                            id="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                        />
                        <label htmlFor="isActive" style={{ marginBottom: 0 }}>Active</label>
                    </div>
                    <div className="field">
                        <label>Order (lower = first)</label>
                        <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
                    </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update Portfolio' : 'Create Portfolio'}</button>
                    <button type="button" className="btn btn-outline" onClick={resetForm}>Reset</button>
                </div>
            </form>

            {/* Portfolio List */}
            <div className="grid grid-2">
                {items.map((p) => (
                    <div key={p._id} className="card">
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            {(() => {
                                const primaryImage = (p.projectImages && p.projectImages.length > 0)
                                    ? p.projectImages[0]
                                    : p.projectImage;
                                return primaryImage ? (
                                    <img
                                        src={primaryImage}
                                        alt={p.title}
                                        style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: 80, height: 80, borderRadius: 10, flexShrink: 0,
                                            background: 'linear-gradient(135deg, #14B8A6, #0EA5E4)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: 700, fontSize: '1.2rem',
                                        }}
                                    >
                                        {p.teamMember?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2) || '📁'}
                                    </div>
                                );
                            })()}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                                    <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{p.title}</h4>
                                    {p.featured && <span className="badge" style={{ fontSize: '0.65rem' }}>Featured</span>}
                                </div>
                                <p className="muted" style={{ fontSize: '0.82rem', marginBottom: 6 }}>{p.teamMember?.name} — {p.teamMember?.position}</p>
                                <p className="muted" style={{ fontSize: '0.8rem', marginBottom: 8 }}>{p.role || '—'}</p>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {(p.skills || []).slice(0, 4).map((s) => (
                                        <span key={s} className="badge" style={{ fontSize: '0.68rem' }}>{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => edit(p)}>Edit</button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => remove(p._id)}>Delete</button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="muted" style={{ textAlign: 'center', padding: '40px' }}>No portfolios yet. Create one using the form above.</p>
                )}
            </div>
        </div>
    );
}
