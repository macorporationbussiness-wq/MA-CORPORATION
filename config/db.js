const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1']);

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        // Disable buffering to fail fast when DB is unavailable
        mongoose.set('bufferCommands', false);

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            maxPoolSize: 10,
        });
        console.log('MongoDB Connected successfully to', process.env.MONGO_URI.replace(/\/\/.*@/, '//***@'));
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        console.error('Server will continue running. Database features require a MongoDB connection (local or Atlas).');
        // Do not exit — allow server to boot for static serving / when DB is temporarily unavailable
    }
};

module.exports = connectDB;
