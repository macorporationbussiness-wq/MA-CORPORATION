require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
