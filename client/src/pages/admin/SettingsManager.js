import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useSettings } from '../../context/SettingsContext';

export default function SettingsManager() {
    const { settings, fetchSettings } = useSettings();
    const [form, setForm] = useState({
        companyName: '', address: '', phone: '', email: '', whatsapp: '',
        facebook: '', instagram: '', linkedin: '', youtube: '', mapsEmbed: '',
        stats: { students: '', courses: '', services: '', team: '', years: '' },
    });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setForm({
            companyName: settings.companyName || '',
            address: settings.address || '',
            phone: settings.phone || '',
            email: settings.email || '',
            whatsapp: settings.whatsapp || '',
            facebook: settings.facebook || '',
            instagram: settings.instagram || '',
            linkedin: settings.linkedin || '',
            youtube: settings.youtube || '',
            mapsEmbed: settings.mapsEmbed || '',
            stats: settings.stats || { students: '', courses: '', services: '', team: '', years: '' },
        });
    }, [settings]);

    const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const updateStat = (k) => (e) => setForm({ ...form, stats: { ...form.stats, [k]: e.target.value } });

    const submit = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            const res = await API.put('/settings', form);
            console.log('Settings save response:', res.data);
            fetchSettings();
            setMsg('Settings saved successfully');
        } catch (err) {
            console.error('Settings save error:', err.response?.data || err.message);
            setMsg('Error saving settings: ' + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Site Settings</h1>
            <p className="muted" style={{ marginBottom: 24 }}>Manage company info, contact details, social links, and statistics.</p>
            {msg && <div className="badge" style={{ marginBottom: 16 }}>{msg}</div>}

            <form className="card" onSubmit={submit}>
                <h3 style={{ marginBottom: 16 }}>Company & Contact</h3>
                <div className="grid grid-2">
                    <div className="field"><label>Company Name</label><input value={form.companyName} onChange={update('companyName')} /></div>
                    <div className="field"><label>WhatsApp Number</label><input value={form.whatsapp} onChange={update('whatsapp')} placeholder="923001234567" /></div>
                    <div className="field"><label>Phone</label><input value={form.phone} onChange={update('phone')} /></div>
                    <div className="field"><label>Email</label><input value={form.email} onChange={update('email')} /></div>
                </div>
                <div className="field"><label>Address</label><input value={form.address} onChange={update('address')} /></div>

                <h3 style={{ margin: '24px 0 16px' }}>Social Media</h3>
                <div className="grid grid-2">
                    <div className="field"><label>Facebook</label><input value={form.facebook} onChange={update('facebook')} /></div>
                    <div className="field"><label>Instagram</label><input value={form.instagram} onChange={update('instagram')} /></div>
                    <div className="field"><label>LinkedIn</label><input value={form.linkedin} onChange={update('linkedin')} /></div>
                    <div className="field"><label>YouTube</label><input value={form.youtube} onChange={update('youtube')} /></div>
                </div>

                <h3 style={{ margin: '24px 0 16px' }}>Statistics</h3>
                <div className="grid grid-5">
                    <div className="field"><label>Students</label><input value={form.stats.students} onChange={updateStat('students')} /></div>
                    <div className="field"><label>Courses</label><input value={form.stats.courses} onChange={updateStat('courses')} /></div>
                    <div className="field"><label>Services</label><input value={form.stats.services} onChange={updateStat('services')} /></div>
                    <div className="field"><label>Team</label><input value={form.stats.team} onChange={updateStat('team')} /></div>
                    <div className="field"><label>Years</label><input value={form.stats.years} onChange={updateStat('years')} /></div>
                </div>

                <h3 style={{ margin: '24px 0 16px' }}>Google Maps Embed</h3>
                <div className="field">
                    <label>Embed iframe HTML</label>
                    <textarea value={form.mapsEmbed} onChange={update('mapsEmbed')} placeholder="<iframe src='...' ...></iframe>" />
                </div>

                <button type="submit" className="btn btn-primary">Save Settings</button>
            </form>
        </div>
    );
}
