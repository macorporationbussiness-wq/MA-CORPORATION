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
} from '../../components/AdminUI';

const empty = {
    name: '', category: 'Professional Courses', shortDescription: '', introduction: '',
    whatYouWillLearn: '', courseOutline: '', finalAssessment: '',
    durationWeeks: 8, classesPerWeek: 2, level: 'Beginner', mode: 'Online',
    fee: 0, image: '', featured: false, isActive: true,
};

const colorPalette = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #14B8A6, #0EA5A4)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
];

export default function CourseManager() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [msg, setMsg] = useState('');

    const load = () => API.get('/courses/all').then((r) => setCourses(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            setForm((prev) => ({ ...prev, image: url }));
        } catch (err) {
            setMsg({ text: 'Error uploading image', type: 'error' });
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
                setMsg({ text: 'Course updated successfully', type: 'success' });
            } else {
                await API.post('/courses', payload);
                setMsg({ text: 'Course created successfully', type: 'success' });
            }
            setForm(empty);
            setEditingId(null);
            load();
            setTimeout(() => setMsg(''), 3000);
        } catch (err) {
            setMsg({ text: 'Error saving course', type: 'error' });
        }
    };

    const edit = (c) => {
        setForm({
            ...c,
            whatYouWillLearn: (c.whatYouWillLearn || []).join('\n'),
            courseOutline: (c.courseOutline || []).join('\n'),
        });
        setEditingId(c._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this course?')) return;
        await API.delete(`/courses/${id}`);
        load();
    };

    return (
        <div>
            <AdminPageHeader
                title="Course Management"
                subtitle="Add, edit, and manage your professional courses."
                icon="🎓"
            />

            <AdminToast msg={msg.text} type={msg.type} />

            <div className="admin-form-card">
                <AdminFormCard
                    title={editingId ? 'Edit Course' : 'Add New Course'}
                    icon={editingId ? '✎' : '+'}
                >
                    <form onSubmit={submit}>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>Course Name *</label>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div className="field">
                                <label>Category</label>
                                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Duration (Weeks)</label>
                                <input type="number" value={form.durationWeeks} onChange={(e) => setForm({ ...form, durationWeeks: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Classes / Week</label>
                                <input type="number" value={form.classesPerWeek} onChange={(e) => setForm({ ...form, classesPerWeek: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Level</label>
                                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Mode</label>
                                <input value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Fee (PKR)</label>
                                <input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Image</label>
                                <AdminImageUpload
                                    value={form.image}
                                    onChange={(v) => setForm({ ...form, image: v })}
                                    onUpload={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Short Description</label>
                            <textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} rows={2} />
                        </div>
                        <div className="field">
                            <label>Introduction</label>
                            <textarea value={form.introduction} onChange={(e) => setForm({ ...form, introduction: e.target.value })} rows={3} />
                        </div>
                        <div className="grid grid-2" style={{ gap: 14 }}>
                            <div className="field">
                                <label>What You Will Learn (one per line)</label>
                                <textarea value={form.whatYouWillLearn} onChange={(e) => setForm({ ...form, whatYouWillLearn: e.target.value })} rows={5} />
                            </div>
                            <div className="field">
                                <label>Course Outline (one per line)</label>
                                <textarea value={form.courseOutline} onChange={(e) => setForm({ ...form, courseOutline: e.target.value })} rows={5} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Final Assessment</label>
                            <textarea value={form.finalAssessment} onChange={(e) => setForm({ ...form, finalAssessment: e.target.value })} rows={2} />
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
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
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <AdminSubmitButton editing={!!editingId} label="Course" />
                            {editingId && <AdminCancelButton onClick={() => { setForm(empty); setEditingId(null); }} />}
                        </div>
                    </form>
                </AdminFormCard>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 18,
                }}
            >
                {courses.map((c, i) => (
                    <AdminItemCard
                        key={c._id}
                        title={c.name}
                        subtitle={`${c.category} • ${c.durationWeeks} weeks • PKR ${c.fee?.toLocaleString()}`}
                        badges={[c.level, c.mode, c.featured && '⭐ Featured'].filter(Boolean)}
                        image={c.image}
                        icon={c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        color={colorPalette[i % colorPalette.length]}
                        onEdit={() => edit(c)}
                        onDelete={() => remove(c._id)}
                    />
                ))}
            </div>
            {courses.length === 0 && (
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
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🎓</div>
                    No courses yet. Create one using the form above.
                </div>
            )}
        </div>
    );
}
