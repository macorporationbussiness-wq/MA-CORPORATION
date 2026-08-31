const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const { portfolios: fallbackPortfolios } = require('../data/fallback');

// @route   GET api/portfolios
// @desc    Get all portfolios (optionally by teamMember)
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.teamMember) filter.teamMember = req.query.teamMember;
        const portfolios = await Portfolio.find(filter)
            .populate('teamMember', 'name position photo')
            .sort({ createdAt: -1 });
        res.json(portfolios);
    } catch (err) {
        console.error('DB unavailable, serving fallback portfolios:', err.message);
        let list = fallbackPortfolios;
        if (req.query.teamMember)
            list = list.filter((p) => p.teamMember && p.teamMember.name === req.query.teamMember);
        res.json(list);
    }
});

// @route   POST api/portfolios
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        let portfolio = new Portfolio(req.body);
        await portfolio.save();
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/portfolios/:id
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/portfolios/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ msg: 'Portfolio not found' });
        await Portfolio.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Portfolio removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
