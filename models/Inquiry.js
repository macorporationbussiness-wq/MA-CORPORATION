const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['contact', 'course-application', 'admission', 'career'],
        default: 'contact',
    },
    // Contact fields
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    subject: { type: String },
    message: { type: String },
    // Course application / admission fields
    fatherName: { type: String },
    cnic: { type: String },
    city: { type: String },
    course: { type: String },
    education: { type: String },
    preferredMode: { type: String },
    // Status tracking
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'contacted', 'enrolled', 'rejected'],
        default: 'pending',
    },
    adminNotes: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inquiry', InquirySchema);
