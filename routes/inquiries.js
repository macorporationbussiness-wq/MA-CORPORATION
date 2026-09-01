const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const auth = require('../middleware/auth');

// @route   POST api/inquiries
// @desc    Submit an inquiry (contact / course-application / admission / career)
// @access  Public
router.post('/', async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.json({ msg: 'Inquiry submitted successfully', id: inquiry._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/inquiries
// @desc    Get all inquiries (admin)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const filter = {};
        if (req.query.type) filter.type = req.query.type;
        if (req.query.status) filter.status = req.query.status;
        const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/inquiries/stats
// @access  Private
router.get('/stats', auth, async (req, res) => {
    try {
        const total = await Inquiry.countDocuments();
        const contact = await Inquiry.countDocuments({ type: 'contact' });
        const course = await Inquiry.countDocuments({ type: 'course-application' });
        const admission = await Inquiry.countDocuments({ type: 'admission' });
        const career = await Inquiry.countDocuments({ type: 'career' });
        const pending = await Inquiry.countDocuments({ status: 'pending' });
        res.json({ total, contact, course, admission, career, pending });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/inquiries/:id
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!inquiry) return res.status(404).json({ msg: 'Inquiry not found' });
        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/inquiries/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ msg: 'Inquiry not found' });
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Inquiry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
