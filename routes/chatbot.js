const express = require('express');
const router = express.Router();
const { courses, services, team, portfolios, certificates, settings } = require('../data/fallback');

// System context describing the company for the chatbot
const SYSTEM_PROMPT = `You are the official AI assistant for M.A. Corporation, a professional organization providing quality education, practical learning, and reliable business services. The company offers professional courses (online), business services (SEO, Web Development, RAG systems, etc.), an expert team, and career development support. Be helpful, professional, and concise. Guide visitors about courses, services, enrollment (which redirects to WhatsApp), contact details, and the company's vision, mission, and core values (Integrity, Excellence, Innovation, Customer Focus, Growth). If asked about enrollment, tell them to use the Enroll Now button which opens WhatsApp to submit their details.`;

// @route   POST api/chatbot
// @desc    Chat with the AI assistant (OpenCode API with intelligent local fallback)
// @access  Public
router.post('/', async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ msg: 'Messages array required' });
    }

    const apiKey = process.env.OPENCODE_API_KEY;
    const apiUrl = process.env.OPENCODE_API_URL;

    // If no API key configured, use intelligent local fallback
    if (!apiKey) {
        return res.json({ reply: localReply(messages) });
    }

    try {
        const payload = {
            model: process.env.OPENCODE_MODEL || 'gpt-4o-mini',
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
            console.error(`OpenCode API error: ${response.status} ${response.statusText}`);
            return res.json({ reply: localReply(messages) });
        }

        const data = await response.json();

        // Handle API-level error responses (e.g., model unavailable)
        if (data.error || !data.choices?.[0]?.message?.content) {
            console.error(`OpenCode API returned error: ${JSON.stringify(data.error || data)}`);
            return res.json({ reply: localReply(messages) });
        }

        const reply = data.choices[0].message.content ||
            'Sorry, I could not process that request. Please try asking about our courses, services, or team.';
        res.json({ reply });
    } catch (err) {
        console.error('Chatbot error:', err.message);
        res.json({ reply: localReply(messages) });
    }
});

// ──────────────────────────────────────────────────────────────
// Intelligent local fallback (no AI model needed).
// Parses the user's question, extracts intent + entities from the
// company knowledge base, and generates a contextual reply.
// Works for ANY question about the company.
// ──────────────────────────────────────────────────────────────
function localReply(messages) {
    const last = messages[messages.length - 1]?.content || '';
    const q = last.toLowerCase().trim();

    // Build a comprehensive answer
    let answer = '';

    // --- Greetings ---
    if (/\b(hi|hello|hey|good morning|good afternoon|good evening|whats up)\b/.test(q)) {
        return "Hello! I'm the M.A. Corporation assistant. I can tell you about our courses, services, team, projects, pricing, company info, and more. What would you like to know?";
    }

    // --- Thanks / Goodbye ---
    if (/\b(thanks|thank you|thx|bye|goodbye|see you)\b/.test(q)) {
        return "You're welcome! Feel free to ask anytime if you need more info about M.A. Corporation.";
    }

    // Collect topic answers — first match wins for primary topics to avoid verbose combos
    const topics = [];
    const primaryTopics = ['courses', 'services', 'projects', 'team', 'company', 'contact', 'location', 'stats', 'enrollment', 'skills', 'certificates'];

    // --- Greetings already handled above ---
    // --- Working hours / timing ---
    if (/\b(hours|timing|open|close|schedule|available|when are you)\b/.test(q)) {
        return "M.A. Corporation operates **Monday to Saturday, 9 AM – 6 PM (PKT)**. Our online courses have flexible scheduling with classes held multiple times per week. For urgent inquiries, reach us via WhatsApp: " + settings.phone;
    }

    // --- Course-specific questions (check BEFORE generic course) ---
    if (/\b(duration|how long|weeks)\b/.test(q)) {
        const durs = courses.map(c => `• **${c.name}**: ${c.durationWeeks} weeks (${c.classesPerWeek} classes/week)`).join('\n');
        topics.push(`**Course Durations:**\n${durs}\nAll courses are online with flexible scheduling.`);
    }
    if (/\b(fee|cost|price|pricing|tuition|how much|expensive)\b/.test(q)) {
        const fees = courses.map(c => `• **${c.name}**: Rs. ${c.fee.toLocaleString()}`).join('\n');
        topics.push(`**Course Fees:**\n${fees}\nPayment plans may be available — contact us via WhatsApp.`);
    }
    if (/\b(level|beginner|intermediate|advanced)\b/.test(q)) {
        const lvls = courses.map(c => `• **${c.name}**: ${c.level}`).join('\n');
        topics.push(`**Course Levels:**\n${lvls}`);
    }
    if (/\b(mode|online|offline|in-person|virtual|class)\b/.test(q) && topics.length === 0) {
        const modes = courses.map(c => `• **${c.name}**: ${c.mode}`).join('\n');
        topics.push(`**Course Modes:**\n${modes}`);
    }

    // --- Skills / Technologies (check BEFORE generic courses to catch "what skills do you teach") ---
    if (/\b(skills?|tech|technology|programming|language|python|react|node|mongodb)\b/.test(q) && topics.length === 0) {
        const allSkills = [...new Set(courses.flatMap(c => c.whatYouWillLearn))];
        topics.push(`**Skills You'll Learn:** ${allSkills.join(', ')}.`);
    }

    // --- Courses (generic) ---
    if (/\b(course|courses|curriculum|study|learn|education|training|teach)\b/.test(q) && topics.length === 0) {
        const courseInfo = courses.map(c =>
            `• **${c.name}** — ${c.shortDescription} | Level: ${c.level} | Duration: ${c.durationWeeks} weeks | Fee: Rs. ${c.fee.toLocaleString()} | Mode: ${c.mode}`
        ).join('\n');
        topics.push(`**Our Courses:**\n${courseInfo}`);
    }

    // --- Certificates ---
    if (/certif/.test(q)) {
        const certInfo = certificates.slice(0, 3).map(c => `• ${c.title} (issued to ${c.issuedTo})`).join('\n');
        topics.push(`**Certificates:** All courses include a certificate of completion. Sample certificates:\n${certInfo}\nView more on our Certificates page.`);
    }

    // --- Projects / Portfolio (check BEFORE services to catch "AI RAG project" etc.) ---
    if (/\b(project|projects|portfolio|work|built|developed)\b/.test(q) && topics.length === 0) {
        const projInfo = portfolios.map(p => `• **${p.title}** — ${p.description} (Type: ${p.projectType}, Role: ${p.role})`).join('\n');
        topics.push(`**Featured Projects:**\n${projInfo}`);
    }

    // --- Services ---
    if (/\b(service|services|seo|digital marketing|web development|rag|ai|design|consulting)\b/.test(q) && topics.length === 0) {
        const svcInfo = services.map(s => `• **${s.title}** — ${s.shortDescription}`).join('\n');
        topics.push(`**Our Services:**\n${svcInfo}`);
    }

    // --- Team ---
    if (/\b(team|staff|who|founder|ceo|leader|developer|teacher|instructor|expert)\b/.test(q) && topics.length === 0) {
        const teamInfo = team.map(t => `• **${t.name}** — ${t.position} | ${t.bio}`).join('\n');
        topics.push(`**Our Team:**\n${teamInfo}`);
    }

    // --- Company / Vision / Mission / Values ---
    if (/\b(vision|mission|value|about|company|who are you|what is this)\b/.test(q) && topics.length === 0) {
        topics.push(`**About M.A. Corporation:**\n• **Vision:** To deliver practical, career-ready education and reliable business services worldwide.\n• **Mission:** To bridge the gap between learning and real-world application.\n• **Core Values:** Integrity, Excellence, Innovation, Customer Focus, Growth.\nWe have served ${settings.stats.students} students across ${settings.stats.courses} courses.`);
    }

    // --- Contact ---
    if (/\b(contact|reach|whatsapp|phone|email|call|touch)\b/.test(q) && topics.length === 0) {
        topics.push(`**Contact Us:**\n📞 Phone/WhatsApp: ${settings.phone}\n📧 Email: ${settings.email}\n📍 Address: ${settings.address}\nYou can also use the floating WhatsApp button on any page.`);
    }

    // --- Location ---
    if (/\b(where|location|address|office|based|situated|karachi)\b/.test(q) && topics.length === 0) {
        topics.push(`**Location:** ${settings.address}`);
    }

    // --- Stats ---
    if (/\b(how many|stat|number|size|students|people|scale)\b/.test(q) && topics.length === 0) {
        const s = settings.stats;
        topics.push(`**Company Stats:** ${s.students} students | ${s.courses} courses | ${s.services} services | ${s.team} team members | ${s.years} years experience.`);
    }

    // --- Enrollment ---
    if (/\b(enroll|register|sign up|apply|admission|join)\b/.test(q) && topics.length === 0) {
        topics.push(`**Enrollment:** Click "Enroll Now" on any course page — it opens WhatsApp with your details pre-filled. Our team will respond promptly.`);
    }

    // --- Policies (terms, privacy) ---
    if (/\b(term|policy|privacy|refund|cancellation)\b/.test(q) && topics.length === 0) {
        topics.push("We have **Terms & Conditions** and **Privacy Policy** pages on our website. Please visit those pages for detailed information. If you have specific concerns, contact us via WhatsApp: " + settings.phone);
    }

    // --- Pricing (general) ---
    if (/\b(pricing|packages|plans|afford|cheap|budget)\b/.test(q) && topics.length === 0) {
        const fees = courses.map(c => `• **${c.name}**: Rs. ${c.fee.toLocaleString()} (${c.durationWeeks} weeks)`).join('\n');
        topics.push(`**Our Pricing:**\n${fees}\nWe aim to make quality education affordable. Contact us for payment plans.`);
    }

    // --- What they can ask ---
    if (/\b(help|can you|what can|what do you|tell me|explain|describe)\b/.test(q) && topics.length === 0) {
        topics.push("I can help with: **courses & pricing**, **services**, **projects**, **team**, **company info**, **contact**, **enrollment**, and **certificates**. What would you like to know?");
    }

    // --- Build response ---
    if (topics.length > 0) {
        answer = topics.join('\n\n');
    } else {
        // Ultra-flexible fallback: try to extract any meaningful keywords and match
        const keywordMatches = extractKeywordAnswers(q);
        if (keywordMatches.length > 0) {
            answer = keywordMatches.join('\n\n');
        } else {
            answer = "I'm here to help with information about M.A. Corporation — our courses, services, team, projects, pricing, and more. Could you rephrase or ask specifically about something? For example: 'What courses do you offer?', 'How much does enrollment cost?', 'Where is your office?'";
        }
    }

    return answer;
}

// Dynamic keyword extraction — builds answers on the fly for ANY question
function extractKeywordAnswers(q) {
    const results = [];
    const seen = new Set(); // track matched items to prevent duplicates
    const tokens = q.replace(/[.,?!;]/g, ' ').split(/\s+/).filter(t => t.length > 2);

    // Search courses
    for (const token of tokens) {
        const match = courses.find(c =>
            (c.name.toLowerCase().includes(token) ||
                c.shortDescription.toLowerCase().includes(token) ||
                c.skills?.some(s => s.toLowerCase() === token) ||
                c.whatYouWillLearn?.some(s => s.toLowerCase().includes(token)) ||
                c.courseOutline?.some(s => s.toLowerCase().includes(token)) ||
                c.slug?.toLowerCase().includes(token)) && !seen.has('course-' + c._id)
        );
        if (match) {
            seen.add('course-' + match._id);
            results.push(`**${match.name}**: ${match.shortDescription} | Duration: ${match.durationWeeks} weeks | Fee: Rs. ${match.fee.toLocaleString()} | Level: ${match.level} | Skills: ${match.whatYouWillLearn?.join(', ')}.`);
        }
    }

    // Search services
    for (const token of tokens) {
        const match = services.find(s =>
            (s.title.toLowerCase().includes(token) ||
                s.shortDescription.toLowerCase().includes(token) ||
                s.description?.toLowerCase().includes(token)) && !seen.has('svc-' + s._id)
        );
        if (match) {
            seen.add('svc-' + match._id);
            results.push(`**${match.title}**: ${match.shortDescription} — ${match.description}`);
        }
    }

    // Search team
    for (const token of tokens) {
        const match = team.find(t =>
            (t.name.toLowerCase().includes(token) ||
                t.position.toLowerCase().includes(token) ||
                t.skills?.some(s => s.toLowerCase().includes(token))) && !seen.has('team-' + t._id)
        );
        if (match) {
            seen.add('team-' + match._id);
            results.push(`**${match.name}** — ${match.position}. ${match.bio} Skills: ${match.skills?.join(', ') || 'N/A'}.`);
        }
    }

    // Search portfolios
    for (const token of tokens) {
        const match = portfolios.find(p =>
            (p.title.toLowerCase().includes(token) ||
                p.description?.toLowerCase().includes(token) ||
                p.skills?.some(s => s.toLowerCase().includes(token)) ||
                p.slug?.toLowerCase().includes(token)) && !seen.has('port-' + p._id)
        );
        if (match) {
            seen.add('port-' + match._id);
            results.push(`**${match.title}**: ${match.description} | Type: ${match.projectType} | Skills: ${match.skills?.join(', ') || 'N/A'} | Results: ${match.results}`);
        }
    }

    // Search certificates
    for (const token of tokens) {
        const match = certificates.find(c =>
            (c.title.toLowerCase().includes(token) ||
                c.course?.toLowerCase().includes(token) ||
                c.issuedTo?.toLowerCase().includes(token)) && !seen.has('cert-' + c._id)
        );
        if (match) {
            seen.add('cert-' + match._id);
            results.push(`**${match.title}**: Issued to ${match.issuedTo} for the ${match.course} course on ${match.issueDate?.split('T')[0]}.`);
        }
    }

    // Limit to top 3 results to keep responses concise
    return results.slice(0, 3);
}

module.exports = router;
