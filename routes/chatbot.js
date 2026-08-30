const express = require('express');
const router = express.Router();

// System context describing the company for the chatbot
const SYSTEM_PROMPT = `You are the official AI assistant for M.A. Corporation, a professional organization providing quality education, practical learning, and reliable business services. 
The company offers professional courses (online), business services (SEO, Web Development, RAG systems, etc.), an expert team, and career development support.
Be helpful, professional, and concise. Guide visitors about courses, services, enrollment (which redirects to WhatsApp), contact details, and the company's vision, mission, and core values (Integrity, Excellence, Innovation, Customer Focus, Growth).
If asked about enrollment, tell them to use the Enroll Now button which opens WhatsApp to submit their details.`;

// @route   POST api/chatbot
// @desc    Chat with the AI assistant (OpenCode API with fallback)
// @access  Public
router.post('/', async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ msg: 'Messages array required' });
    }

    const apiKey = process.env.OPENCODE_API_KEY;
    const apiUrl = process.env.OPENCODE_API_URL;

    // If no API key configured, use fallback responses
    if (!apiKey) {
        return res.json({ reply: fallbackReply(messages) });
    }

    try {
        const payload = {
            model: process.env.OPENCODE_MODEL || 'DeepSeek V4 Flash Free',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
            temperature: 0.7,
            max_tokens: 500,
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            return res.json({ reply: fallbackReply(messages) });
        }

        const data = await response.json();
        const reply =
            data.choices?.[0]?.message?.content ||
            'Sorry, I could not process that request.';
        res.json({ reply });
    } catch (err) {
        console.error('Chatbot error:', err.message);
        res.json({ reply: fallbackReply(messages) });
    }
});

// Simple keyword-based fallback when no API key is set
function fallbackReply(messages) {
    const last = messages[messages.length - 1]?.content?.toLowerCase() || '';
    if (last.includes('course')) {
        return 'M.A. Corporation offers professional online courses focused on practical, career-ready skills. You can browse them on our Courses page and use "Enroll Now" to apply via WhatsApp.';
    }
    if (last.includes('service')) {
        return 'We provide professional services including SEO, Web Development, RAG systems, and more. Visit our Services page for full details.';
    }
    if (last.includes('enroll') || last.includes('admission') || last.includes('apply')) {
        return 'You can enroll by visiting the Admissions page or clicking "Enroll Now" on any course. This opens WhatsApp with your details pre-filled for our team to review.';
    }
    if (last.includes('contact') || last.includes('whatsapp')) {
        return 'You can reach us via the Contact page or directly on WhatsApp using the floating button. We typically respond within a few hours.';
    }
    if (last.includes('team') || last.includes('staff')) {
        return 'Our expert team includes experienced professionals across education and business services. Meet them on our Team page.';
    }
    return 'Thank you for contacting M.A. Corporation! I can help with courses, services, enrollment, and company information. How can I assist you today?';
}

module.exports = router;
