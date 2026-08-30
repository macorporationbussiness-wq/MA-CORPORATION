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
        console.error('DB unavailable, adding portfolio to fallback:', err.message);
        // Fallback: add to in-memory array with a temporary ID
        const newPortfolio = { ...req.body, _id: 'fb_' + Date.now(), teamMember: req.body.teamMember || { name: 'Unknown', position: '—' } };
        fallbackPortfolios.unshift(newPortfolio);
        res.json(newPortfolio);
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
        console.error('DB unavailable, updating fallback portfolio:', err.message);
        // Fallback: update in-memory array
        const idx = fallbackPortfolios.findIndex((p) => p._id === req.params.id);
        if (idx === -1) return res.status(404).json({ msg: 'Portfolio not found' });
        const updated = { ...fallbackPortfolios[idx], ...req.body, _id: req.params.id };
        fallbackPortfolios[idx] = updated;
        res.json(updated);
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
        console.error('DB unavailable, deleting fallback portfolio:', err.message);
        const idx = fallbackPortfolios.findIndex((p) => p._id === req.params.id);
        if (idx === -1) return res.status(404).json({ msg: 'Portfolio not found' });
        fallbackPortfolios.splice(idx, 1);
        res.json({ msg: 'Portfolio removed' });
    }
});

module.exports = router;
