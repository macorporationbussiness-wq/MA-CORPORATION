const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Setting = require('../models/Setting');
const auth = require('../middleware/auth');
const { settings: fallbackSettings } = require('../data/fallback');

// @route   GET api/settings
// @desc    Get all public settings
router.get('/', async (req, res) => {
    try {
        const settings = await Setting.find();
        const obj = {};
        settings.forEach((s) => (obj[s.key] = s.value));
        res.json(obj);
    } catch (err) {
        console.error('DB unavailable, serving fallback settings:', err.message);
        res.json(fallbackSettings);
    }
});

// @route   PUT api/settings
// @desc    Bulk update settings
// @access  Private
router.put('/', auth, async (req, res) => {
    try {
        const updates = req.body;
        const isDbConnected = mongoose.connection.readyState === 1;

        if (isDbConnected) {
            for (const [key, value] of Object.entries(updates)) {
                await Setting.findOneAndUpdate(
                    { key },
                    { key, value, updatedAt: Date.now() },
                    { upsert: true, new: true }
                );
            }
        } else {
            // DB unavailable — update in-memory fallback
            for (const [key, value] of Object.entries(updates)) {
                if (key === 'stats' && typeof value === 'object') {
                    fallbackSettings.stats = { ...fallbackSettings.stats, ...value };
                } else {
                    fallbackSettings[key] = value;
                }
            }
            console.log('DB unavailable, updated fallback settings');
        }
        res.json({ msg: 'Settings updated' });
    } catch (err) {
        console.error('Settings update error:', err.message);
        // If DB error, still try to update fallback
        const updates = req.body;
        for (const [key, value] of Object.entries(updates)) {
            if (key === 'stats' && typeof value === 'object') {
                fallbackSettings.stats = { ...fallbackSettings.stats, ...value };
            } else {
                fallbackSettings[key] = value;
            }
        }
        res.json({ msg: 'Settings updated (fallback)' });
    }
});

module.exports = router;
