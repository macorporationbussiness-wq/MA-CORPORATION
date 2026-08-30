const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const auth = require('../middleware/auth');
const { team: fallbackTeam } = require('../data/fallback');

// @route   GET api/team
// @desc    Get all active team members
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
        res.json(members);
    } catch (err) {
        console.error('DB unavailable, serving fallback team:', err.message);
        res.json(fallbackTeam.filter((m) => m.isActive).sort((a, b) => a.order - b.order));
    }
});

// @route   GET api/team/all
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1 });
        res.json(members);
    } catch (err) {
        console.error('DB unavailable, serving fallback team:', err.message);
        res.json(fallbackTeam.sort((a, b) => a.order - b.order));
    }
});

// @route   GET api/team/:id
router.get('/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ msg: 'Member not found' });
        res.json(member);
    } catch (err) {
        console.error('DB unavailable, serving fallback member:', err.message);
        const member = fallbackTeam.find((m) => m._id === req.params.id);
        if (!member) return res.status(404).json({ msg: 'Member not found' });
        res.json(member);
    }
});

// @route   POST api/team
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        let member = new TeamMember(req.body);
        await member.save();
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/team/:id
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let member = await TeamMember.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!member) return res.status(404).json({ msg: 'Member not found' });
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/team/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ msg: 'Member not found' });
        await TeamMember.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Member removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
