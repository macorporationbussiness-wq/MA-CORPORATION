const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    bio: { type: String },
    photo: { type: String, default: '' },
    skills: [{ type: String }],
    education: [{ type: String }],
    experience: [{ type: String }],
    projects: [{ type: String }],
    social: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        twitter: { type: String, default: '' },
    },
    hasPortfolio: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
