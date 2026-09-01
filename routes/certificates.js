const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const auth = require('../middleware/auth');
const { certificates: fallbackCertificates } = require('../data/fallback');

// @route   GET api/certificates
router.get('/', async (req, res) => {
    try {
        const certs = await Certificate.find({ isActive: true }).sort({ issueDate: -1 });
        res.json(certs);
    } catch (err) {
        console.error('DB unavailable, serving fallback certificates:', err.message);
        res.json(fallbackCertificates.filter((c) => c.isActive));
    }
});

// @route   GET api/certificates/all
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        const certs = await Certificate.find().sort({ issueDate: -1 });
        res.json(certs);
    } catch (err) {
        console.error('DB unavailable, serving fallback certificates:', err.message);
        res.json(fallbackCertificates);
    }
});

// @route   POST api/certificates
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        let cert = new Certificate(req.body);
        await cert.save();
        res.json(cert);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/certificates/:id
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const cert = await Certificate.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!cert) return res.status(404).json({ msg: 'Certificate not found' });
        res.json(cert);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/certificates/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const cert = await Certificate.findById(req.params.id);
        if (!cert) return res.status(404).json({ msg: 'Certificate not found' });
        await Certificate.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Certificate removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
