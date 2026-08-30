const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const { services: fallbackServices } = require('../data/fallback');
const { isDbConnected } = require('../utils/dbCheck');

const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

// @route   GET api/services
// @desc    Get all active services
router.get('/', async (req, res) => {
    if (!isDbConnected()) {
        let list = fallbackServices.filter((s) => s.isActive);
        if (req.query.category) list = list.filter((s) => s.category === req.query.category);
        return res.json(list);
    }
    try {
        const filter = { isActive: true };
        if (req.query.category) filter.category = req.query.category;
        const services = await Service.find(filter).sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/services/all
// @access  Private
router.get('/all', auth, async (req, res) => {
    if (!isDbConnected()) return res.json(fallbackServices);
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/services/:slug
router.get('/:slug', async (req, res) => {
    if (!isDbConnected()) {
        const service = fallbackServices.find((s) => s.slug === req.params.slug);
        if (!service) return res.status(404).json({ msg: 'Service not found' });
        return res.json(service);
    }
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) return res.status(404).json({ msg: 'Service not found' });
        res.json(service);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/services
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const body = { ...req.body };
        if (!body.slug && body.title) body.slug = slugify(body.title);
        let service = new Service(body);
        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/services/:id
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const body = { ...req.body };
        if (body.title && !body.slug) body.slug = slugify(body.title);
        let service = await Service.findByIdAndUpdate(
            req.params.id,
            { $set: body },
            { new: true }
        );
        if (!service) return res.status(404).json({ msg: 'Service not found' });
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/services/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ msg: 'Service not found' });
        await Service.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Service removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
