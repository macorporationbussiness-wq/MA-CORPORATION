const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    teamMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember',
    },
    teamMemberName: {
        type: String,
        default: '',
    },
    title: { type: String, required: true },
    slug: { type: String, default: '', unique: true },
    description: { type: String },
    image: { type: String, default: '' },
    projectImage: { type: String, default: '' },
    projectImages: [{ type: String, default: '' }],
    projectUrl: { type: String, default: '' },
    projectUrls: [{
        label: { type: String, default: '' },
        url: { type: String, default: '' },
    }],
    projectType: { type: String, enum: ['Web App', 'Mobile App', 'Branding', 'UI/UX Design', 'AI/ML', 'Other'], default: 'Web App' },
    role: { type: String, default: '' },
    skills: [{ type: String }],
    challenges: { type: String, default: '' },
    results: { type: String, default: '' },
    startDate: { type: Date },
    endDate: { type: Date },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    icon: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
