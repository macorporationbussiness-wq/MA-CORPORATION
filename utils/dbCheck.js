// Quick DB connection check — returns true if MongoDB is connected
const mongoose = require('mongoose');

const isDbConnected = () => mongoose.connection.readyState === 1;

module.exports = { isDbConnected };
