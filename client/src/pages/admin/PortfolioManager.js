import React, { useEffect, useState } from 'react';
import API from '../../api';
import AdminPageHeader from '../../components/AdminPageHeader';
import {
    AdminFormCard,
    AdminItemCard,
    AdminSubmitButton,
    AdminCancelButton,
    AdminToast,
    AdminToggle,
    AdminImageUpload,
    AdminIconPicker,
} from '../../components/AdminUI';

const empty = {
    teamMember: '',
    teamMemberName: '',
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
    icon: '',
};

const projectTypes = ['Web App', 'Mobile App', 'Branding', 'UI/UX Design', 'AI/ML', 'Other'];

const colorPalette = [
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #8E2DE2, #4A00E0)',
];

export default function PortfolioManager() {
    const [items, setItems] = useState([]);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: 'success' });

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

    // Searchable combo: if the typed text matches an existing member, store the ObjectId;
    // otherwise keep the typed name so submit() can create the new member.
    const handleTeamMemberChange = (e) => {
        const value = e.target.value;
        setForm((prev) => {
            // Try to match by name
            const match = members.find(
                (m) => m.name.toLowerCase() === value.toLowerCase()
            );
            if (match) {
                return { ...prev, teamMember: match._id, teamMemberName: match.name };
            }
            // Typed a new name not in the list
            return { ...prev, teamMember: '', teamMemberName: value };
        });
    };

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

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, image: url, projectImage: url }));
        } catch (err) {
            setMsg({ text: 'Error uploading image', type: 'error' });
        }
    };

    const handleGalleryUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            const nextIdx = (form.projectImages || []).length;
            setForm((prev) => ({
                ...prev,
                projectImages: [...(prev.projectImages || []), url],
            }));
            void nextIdx;
        } catch (err) {
            setMsg({ text: 'Error uploading image', type: 'error' });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: 'success' });
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
                setMsg({ text: 'Project updated', type: 'success' });
            } else {
                await API.post('/portfolios', payload);
                setMsg({ text: 'Project created', type: 'success' });
            }
            setForm(empty);
            setEditingId(null);
            load();
            setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
        } catch (err) {
            setMsg({ text: 'Error saving portfolio', type: 'error' });
        }
    };

    const edit = (p) => {
        setForm({
            ...p,
            skills: (p.skills || []).join(', '),
            teamMember: p.teamMember?._id || p.teamMember || '',
            teamMemberName: p.teamMember?.name || '',
            projectImages: p.projectImages && p.projectImages.length > 0 ? p.projectImages : (p.projectImage ? [p.projectImage] : []),
            projectUrls: p.projectUrls && p.projectUrls.length > 0 ? p.projectUrls : (p.projectUrl ? [{ label: 'Live Demo', url: p.projectUrl }] : []),
            startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : '',
            endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : '',
            icon: p.icon || '',
        });
        setEditingId(p._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this portfolio?')) return;
        await API.delete(`/portfolios/${id}`);
        load();
    };
    const resetForm = () => {
        setForm(empty);
        setEditingId(null);
        setMsg({ text: '', type: 'success' });
    };

    return (
        <div>
            <AdminPageHeader
                title="Project Management"
                subtitle="Manage projects, skills, roles, and project details."
                icon="📁"
                color="linear-gradient(135deg, #fa709a, #fee140)"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <div className="admin-form-card">
                <AdminFormCard
                    title={editingId ? 'Edit Project' : 'Add New Project'}
                    icon={editingId ? '✎' : '+'}
                    color="linear-gradient(135deg, #fa709a, #fee140)"
                >
                    <form onSubmit={submit}>
                        <div className="grid grid-3" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Team Member *</label>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                    <input
                                        name="teamMemberName"
                                        value={form.teamMemberName || ''}
                                        onChange={handleTeamMemberChange}
                                        placeholder="Type or select a team member..."
                                        list="team-member-options"
                                        required
                                    />
                                    <datalist id="team-member-options">
                                        {members.map((m) => (
                                            <option key={m._id} value={m.name} />
                                        ))}
                                    </datalist>
                                    <button
                                        type="button"
                                        onClick={() => window.location.assign('/admin/team')}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: 8,
                                            background: 'rgba(20,184,166,0.1)',
                                            color: '#0ea5a4',
                                            border: '1px solid rgba(20,184,166,0.3)',
                                            fontSize: '0.78rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                        }}
                                        title="Add a new team member"
                                    >
                                        + Add New
                                    </button>
                                </div>
                            </div>
                            <div className="field">
                                <label>Title *</label>
                                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Enterprise SaaS Dashboard" required />
                            </div>
                            <div className="field">
                                <label>Project Type</label>
                                <select name="projectType" value={form.projectType} onChange={handleChange}>
                                    {projectTypes.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label>Slug (URL)</label>
                                <input name="slug" value={form.slug} onChange={handleChange} placeholder="e.g. enterprise-saas-dashboard" />
                            </div>
                            <div className="field">
                                <label>Your Role</label>
                                <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Lead Full-Stack Developer" />
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

                        <div className="field">
                            <label>Thumbnail Image</label>
                            <AdminImageUpload
                                value={form.image}
                                onChange={(v) => setForm({ ...form, image: v, projectImage: v })}
                                onUpload={handleThumbnailUpload}
                            />
                        </div>

                        <div className="field">
                            <label>Icon</label>
                            <AdminIconPicker
                                value={form.icon}
                                onChange={(v) => setForm({ ...form, icon: v })}
                                onUpload={handleThumbnailUpload}
                            />
                        </div>

                        <div className="field">
                            <label>Project Image Gallery</label>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 8,
                                    alignItems: 'center',
                                    marginBottom: 8,
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={addProjectImage}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: 8,
                                        background: 'rgba(20,184,166,0.1)',
                                        color: '#0ea5a4',
                                        border: '1px solid rgba(20,184,166,0.3)',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    + Add Image
                                </button>
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
                                        onChange={handleGalleryUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            {(form.projectImages || []).map((imgUrl, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        gap: 8,
                                        alignItems: 'center',
                                        marginBottom: 8,
                                    }}
                                >
                                    <input
                                        value={imgUrl}
                                        onChange={(e) => updateProjectImage(idx, e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        style={{ flex: 1 }}
                                    />
                                    {imgUrl && (
                                        <img
                                            src={imgUrl}
                                            alt="preview"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                objectFit: 'cover',
                                                borderRadius: 6,
                                            }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeProjectImage(idx)}
                                        style={{
                                            padding: '6px 10px',
                                            borderRadius: 8,
                                            background: 'rgba(239,68,68,0.1)',
                                            color: '#dc2626',
                                            border: '1px solid rgba(239,68,68,0.2)',
                                            fontSize: '0.78rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            {(form.projectImages || []).length === 0 && (
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No gallery images added yet.</p>
                            )}
                        </div>

                        <div className="field">
                            <label>Main Project URL</label>
                            <input name="projectUrl" value={form.projectUrl} onChange={handleChange} placeholder="https://github.com/..." />
                        </div>

                        <div className="field">
                            <label>
                                Project Links{' '}
                                <button
                                    type="button"
                                    onClick={addProjectUrl}
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: 8,
                                        background: 'rgba(20,184,166,0.1)',
                                        color: '#0ea5a4',
                                        border: '1px solid rgba(20,184,166,0.3)',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        marginLeft: 8,
                                    }}
                                >
                                    + Add Link
                                </button>
                            </label>
                            {(form.projectUrls || []).map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        gap: 8,
                                        alignItems: 'center',
                                        marginBottom: 8,
                                    }}
                                >
                                    <input
                                        value={item.label || ''}
                                        onChange={(e) => updateProjectUrl(idx, 'label', e.target.value)}
                                        placeholder="Label (e.g. GitHub)"
                                        style={{ flex: 1, minWidth: 120 }}
                                    />
                                    <input
                                        value={item.url || ''}
                                        onChange={(e) => updateProjectUrl(idx, 'url', e.target.value)}
                                        placeholder="https://..."
                                        style={{ flex: 2 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeProjectUrl(idx)}
                                        style={{
                                            padding: '6px 10px',
                                            borderRadius: 8,
                                            background: 'rgba(239,68,68,0.1)',
                                            color: '#dc2626',
                                            border: '1px solid rgba(239,68,68,0.2)',
                                            fontSize: '0.78rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            {(form.projectUrls || []).length === 0 && (
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No project links added yet.</p>
                            )}
                        </div>

                        <div className="field">
                            <label>Skills (comma separated)</label>
                            <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB, AWS" />
                        </div>

                        <div className="grid grid-3" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
                            </div>
                            <div className="field">
                                <label>Challenges</label>
                                <textarea name="challenges" value={form.challenges} onChange={handleChange} rows={4} />
                            </div>
                            <div className="field">
                                <label>Results</label>
                                <textarea name="results" value={form.results} onChange={handleChange} rows={4} />
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                gap: 12,
                                marginBottom: 18,
                                flexWrap: 'wrap',
                            }}
                        >
                            <AdminToggle
                                checked={form.featured}
                                onChange={(v) => setForm({ ...form, featured: v })}
                                label="Featured"
                            />
                            <AdminToggle
                                checked={form.isActive}
                                onChange={(v) => setForm({ ...form, isActive: v })}
                                label="Active"
                            />
                            <div className="field" style={{ flex: 1, minWidth: 120, marginBottom: 0 }}>
                                <input
                                    type="number"
                                    name="order"
                                    value={form.order}
                                    onChange={handleChange}
                                    min={0}
                                    placeholder="Order"
                                    style={{ width: 120 }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <AdminSubmitButton editing={!!editingId} label="Project" />
                            {editingId && <AdminCancelButton onClick={resetForm} />}
                        </div>
                    </form>
                </AdminFormCard>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 18,
                }}
            >
                {items.map((p, i) => {
                    const primaryImage = (p.projectImages && p.projectImages.length > 0)
                        ? p.projectImages[0]
                        : p.projectImage;
                    return (
                        <AdminItemCard
                            key={p._id}
                            title={p.title}
                            subtitle={`${p.teamMember?.name || p.teamMemberName || 'Unassigned'} • ${p.role || p.projectType}`}
                            badges={[p.projectType, p.featured && '⭐ Featured', p.isActive ? 'Active' : 'Inactive'].filter(Boolean)}
                            image={primaryImage}
                            icon={(p.teamMember?.name || p.teamMemberName || '').split(' ').map((n) => n[0]).join('').slice(0, 2) || '📁'}
                            color={colorPalette[i % colorPalette.length]}
                            onEdit={() => edit(p)}
                            onDelete={() => remove(p._id)}
                        />
                    );
                })}
            </div>
            {items.length === 0 && (
                <div
                    style={{
                        background: '#fff',
                        borderRadius: 16,
                        padding: 48,
                        textAlign: 'center',
                        color: '#94a3b8',
                        boxShadow: '0 4px 18px rgba(10,23,51,0.06)',
                    }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📁</div>
                    No projects yet. Create one using the form above.
                </div>
            )}
        </div>
    );
}
