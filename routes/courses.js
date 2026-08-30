const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const { courses: fallbackCourses } = require('../data/fallback');
const { isDbConnected } = require('../utils/dbCheck');

// Helper to create slug
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

// @route   GET api/courses
// @desc    Get all courses (public: only active)
router.get('/', async (req, res) => {
    if (!isDbConnected()) {
        let list = fallbackCourses.filter((c) => c.isActive);
        if (req.query.category) list = list.filter((c) => c.category === req.query.category);
        if (req.query.featured) list = list.filter((c) => c.featured);
        return res.json(list);
    }
    try {
        const filter = { isActive: true };
        if (req.query.category) filter.category = req.query.category;
        if (req.query.featured) filter.featured = req.query.featured === 'true';
        const courses = await Course.find(filter).sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/courses/all
// @desc    Get all courses including inactive (admin)
// @access  Private
router.get('/all', auth, async (req, res) => {
    if (!isDbConnected()) return res.json(fallbackCourses);
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/courses/:slug
// @desc    Get course by slug
router.get('/:slug', async (req, res) => {
    if (!isDbConnected()) {
        const course = fallbackCourses.find((c) => c.slug === req.params.slug);
        if (!course) return res.status(404).json({ msg: 'Course not found' });
        return res.json(course);
    }
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        if (!course) return res.status(404).json({ msg: 'Course not found' });
        res.json(course);
    } catch (err) {
        console.error('DB error:', err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const body = { ...req.body };
        if (!body.slug && body.name) body.slug = slugify(body.name);
        let course = new Course(body);
        await course.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const body = { ...req.body };
        if (body.name && !body.slug) body.slug = slugify(body.name);
        let course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: body },
            { new: true }
        );
        if (!course) return res.status(404).json({ msg: 'Course not found' });
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });
        await Course.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Course removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
