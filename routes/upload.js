const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'oys8qaz9',
    api_key: process.env.CLOUDINARY_API_KEY || '573161163464697',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'Db5b0f2bF9SgS5H07j06-LC36RE',
});

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ma-corporation',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
            { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' },
            { fetch_format: 'auto' },
        ],
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: (req, file, cb) => {
        // Only allow images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

// @route   POST api/upload
// @desc    Upload a single image file to Cloudinary and return its URL
router.post('/single', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    // Cloudinary returns the URL in req.file.path
    res.json({ url: req.file.path, publicId: req.file.filename });
});

// @route   POST api/upload/multiple
// @desc    Upload multiple image files to Cloudinary and return their URLs
router.post('/multiple', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msg: 'No files uploaded' });
    }
    const urls = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
    res.json({ urls });
});

// @route   DELETE api/upload/:publicId
// @desc    Delete an image from Cloudinary by public ID
router.delete('/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        const result = await cloudinary.uploader.destroy(`ma-corporation/${publicId}`);
        res.json({ result });
    } catch (err) {
        console.error('Cloudinary delete error:', err);
        res.status(500).json({ msg: 'Error deleting image' });
    }
});

module.exports = router;
