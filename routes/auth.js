const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// Fallback admin for when MongoDB is unavailable
// Password is 'admin123' - bcrypt hash generated with cost factor 10
const FALLBACK_ADMIN = {
    _id: 'fallback_admin',
    name: 'Admin',
    email: 'admin@macorporation.com',
    password: '$2a$10$NNONrS0Qh0z8LLR0mL.tcemRKI/ZJ3z9hcCERQryXA7Rws8GNr7nq', // bcrypt hash of 'admin123'
};

// Use env JWT_SECRET or fallback (set JWT_SECRET in Vercel env vars for production)
const JWT_SECRET = process.env.JWT_SECRET || 'macorporation_default_secret_change_me';

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
            JWT_SECRET,
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
router.get('/', auth, async (req, res) => {
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

// @route   GET api/auth/admins
// @desc    List all admins
// @access  Private
router.get('/admins', auth, async (req, res) => {
    try {
        const isDbConnected = mongoose.connection.readyState === 1;
        if (!isDbConnected) {
            return res.json([{ ...FALLBACK_ADMIN, username: 'admin' }]);
        }
        const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
        res.json(admins);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/admins
// @desc    Create new admin
// @access  Private
router.post('/admins', auth, async (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try {
        const isDbConnected = mongoose.connection.readyState === 1;
        if (!isDbConnected) {
            return res.status(503).json({ msg: 'Database not connected' });
        }
        const existing = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(400).json({ msg: 'Admin with this email or username already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const admin = new Admin({ name, username, email, password: hashed });
        await admin.save();
        res.json({ msg: 'Admin created', admin: { _id: admin._id, name, username, email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/auth/admins/:id
// @desc    Delete an admin
// @access  Private
router.delete('/admins/:id', auth, async (req, res) => {
    try {
        const isDbConnected = mongoose.connection.readyState === 1;
        if (!isDbConnected) {
            return res.status(503).json({ msg: 'Database not connected' });
        }
        if (req.admin.id === req.params.id || req.admin.email === FALLBACK_ADMIN.email && req.params.id === FALLBACK_ADMIN._id) {
            return res.status(400).json({ msg: 'Cannot delete your own account' });
        }
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }
        await Admin.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Admin deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/auth/password
// @desc    Change current admin password
// @access  Private
router.put('/password', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ msg: 'Current and new password required' });
    }
    try {
        const isDbConnected = mongoose.connection.readyState === 1;

        // Fallback admin password change
        if (!isDbConnected && req.admin.email === FALLBACK_ADMIN.email) {
            const isMatch = await bcrypt.compare(currentPassword, FALLBACK_ADMIN.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Current password is incorrect' });
            }
            return res.json({ msg: 'Password changed (fallback mode - not persisted)' });
        }

        const admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
        await admin.save();
        res.json({ msg: 'Password changed successfully' });
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
