require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Lazy DB connection (connect on first API request)
let dbConnected = false;
const ensureDB = async () => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
        } catch (err) {
            console.error('DB connection failed:', err.message);
        }
    }
};

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Ensure DB is connected before API routes
app.use('/api', async (req, res, next) => {
    await ensureDB();
    next();
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/services', require('./routes/services'));
app.use('/api/team', require('./routes/team'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/portfolios', require('./routes/portfolios'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/upload', require('./routes/upload'));

// Serve uploaded files statically (available in both dev and production)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static assets (React build)
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
