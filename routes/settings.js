const express = require('express');
const router = express.Router();
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
        for (const [key, value] of Object.entries(updates)) {
            await Setting.findOneAndUpdate(
                { key },
                { key, value, updatedAt: Date.now() },
                { upsert: true, new: true }
            );
        }
        res.json({ msg: 'Settings updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
