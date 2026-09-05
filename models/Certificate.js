const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuedTo: { type: String, required: true },
    course: { type: String, required: true },
    issueDate: { type: Date, default: Date.now },
    certificateUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    icon: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certificate', CertificateSchema);
