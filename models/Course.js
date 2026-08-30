const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: 'General' },
    shortDescription: { type: String, required: true },
    introduction: { type: String },
    whatYouWillLearn: [{ type: String }],
    courseOutline: [{ type: String }],
    finalAssessment: { type: String },
    durationWeeks: { type: Number, required: true },
    classesPerWeek: { type: Number, default: 1 },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    mode: { type: String, default: 'Online' },
    fee: { type: Number, required: true },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
