import React, { useEffect, useState } from 'react';
import API from '../../api';

const empty = {
    name: '', category: 'Professional Courses', shortDescription: '', introduction: '',
    whatYouWillLearn: '', courseOutline: '', finalAssessment: '',
    durationWeeks: 8, classesPerWeek: 2, level: 'Beginner', mode: 'Online',
    fee: 0, image: '', featured: false, isActive: true,
};

export default function CourseManager() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => API.get('/courses/all').then((r) => setCourses(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    // File upload helper
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

    // Upload course image file
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, image: url }));
        } catch (err) {
            setMsg('Error uploading image');
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            whatYouWillLearn: form.whatYouWillLearn.split('\n').filter(Boolean),
            courseOutline: form.courseOutline.split('\n').filter(Boolean),
            fee: Number(form.fee),
            durationWeeks: Number(form.durationWeeks),
            classesPerWeek: Number(form.classesPerWeek),
        };
        try {
            if (editingId) {
                await API.put(`/courses/${editingId}`, payload);
                setMsg('Course updated');
            } else {
                await API.post('/courses', payload);
                setMsg('Course created');
            }
            setForm(empty);
            setEditingId(null);
            load();
        } catch (err) {
            setMsg('Error saving course');
        }
    };

    const edit = (c) => {
        setForm({
            ...c,
            whatYouWillLearn: (c.whatYouWillLearn || []).join('\n'),
            courseOutline: (c.courseOutline || []).join('\n'),
        });
        setEditingId(c._id);
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this course?')) return;
        await API.delete(`/courses/${id}`);
        load();
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Course Management</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Add, edit, and manage your courses.</p>

            {msg && <div className="badge" style={{ marginBottom: 16 }}>{msg}</div>}

            <form className="card" onSubmit={submit} style={{ marginBottom: 30 }}>
                <h3 style={{ marginBottom: 16 }}>{editingId ? 'Edit Course' : 'Add Course'}</h3>
                <div className="grid grid-2">
                    <div className="field"><label>Course Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                    <div className="field"><label>Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                    <div className="field"><label>Duration (Weeks)</label><input type="number" value={form.durationWeeks} onChange={(e) => setForm({ ...form, durationWeeks: e.target.value })} /></div>
                    <div className="field"><label>Classes / Week</label><input type="number" value={form.classesPerWeek} onChange={(e) => setForm({ ...form, classesPerWeek: e.target.value })} /></div>
                    <div className="field"><label>Level</label>
                        <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                        </select>
                    </div>
                    <div className="field"><label>Mode</label><input value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} /></div>
                    <div className="field"><label>Fee (PKR)</label><input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} /></div>
                    <div className="field">
                        <label>
                            Image URL
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
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </label>
                        <input
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            placeholder="Or paste image URL (https://example.com/image.jpg)"
                        />
                        {form.image && (
                            <img
                                src={form.image}
                                alt="preview"
                                style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        )}
                    </div>
                </div>
                <div className="field"><label>Short Description</label><textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></div>
                <div className="field"><label>Introduction</label><textarea value={form.introduction} onChange={(e) => setForm({ ...form, introduction: e.target.value })} /></div>
                <div className="field"><label>What You Will Learn (one per line)</label><textarea value={form.whatYouWillLearn} onChange={(e) => setForm({ ...form, whatYouWillLearn: e.target.value })} /></div>
                <div className="field"><label>Course Outline (one per line)</label><textarea value={form.courseOutline} onChange={(e) => setForm({ ...form, courseOutline: e.target.value })} /></div>
                <div className="field"><label>Final Assessment</label><textarea value={form.finalAssessment} onChange={(e) => setForm({ ...form, finalAssessment: e.target.value })} /></div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
                    <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                    {editingId && <button type="button" className="btn btn-outline" onClick={() => { setForm(empty); setEditingId(null); }}>Cancel</button>}
                </div>
            </form>

            <div className="grid grid-3">
                {courses.map((c) => (
                    <div key={c._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4 style={{ fontSize: '1.05rem' }}>{c.name}</h4>
                            <span className="badge">{c.level}</span>
                        </div>
                        <p className="muted" style={{ fontSize: '0.82rem', margin: '8px 0' }}>{c.category} • PKR {c.fee?.toLocaleString()}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => edit(c)}>Edit</button>
                            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#F87171' }} onClick={() => remove(c._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
