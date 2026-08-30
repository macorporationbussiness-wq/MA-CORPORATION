const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    teamMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember',
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: '' },
    projectUrl: { type: String, default: '' },
    skills: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
