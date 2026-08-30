const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

// Fallback admin for when MongoDB is unavailable
// Password is 'admin123' - bcrypt hash generated with cost factor 10
const FALLBACK_ADMIN = {
    _id: 'fallback_admin',
    name: 'Admin',
    email: 'admin@macorporation.com',
    password: '$2a$10$NNONrS0Qh0z8LLR0mL.tcemRKI/ZJ3z9hcCERQryXA7Rws8GNr7nq', // bcrypt hash of 'admin123'
};

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if MongoDB is connected
        const isDbConnected = mongoose.connection.readyState === 1;

        let admin;
        if (isDbConnected) {
            admin = await Admin.findOne({ email });
        }

        // Use fallback admin if DB not connected or admin not found
        if (!admin) {
            if (email === FALLBACK_ADMIN.email) {
                admin = FALLBACK_ADMIN;
            } else {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            admin: {
                id: admin._id || admin.id,
                name: admin.name,
                email: admin.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, admin: payload.admin });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth
// @desc    Get logged in admin
// @access  Private
router.get('/', require('../middleware/auth'), async (req, res) => {
    try {
        // Check if MongoDB is connected
        const isDbConnected = mongoose.connection.readyState === 1;

        if (isDbConnected) {
            const admin = await Admin.findById(req.admin.id).select('-password');
            if (admin) {
                return res.json(admin);
            }
        }

        // Fallback for when DB is not connected or admin not found
        if (req.admin.email === FALLBACK_ADMIN.email) {
            return res.json({
                _id: FALLBACK_ADMIN._id,
                name: FALLBACK_ADMIN.name,
                email: FALLBACK_ADMIN.email,
            });
        }

        return res.status(404).json({ msg: 'Admin not found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/setup
// @desc    Create initial admin (run once)
// @access  Public (should be disabled after setup)
router.post('/setup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }
        admin = new Admin({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);
        await admin.save();
        res.json({ msg: 'Admin created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
