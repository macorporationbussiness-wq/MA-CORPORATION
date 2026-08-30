// Local fallback data used when MongoDB Atlas is unreachable (e.g. in sandboxed
// environments). The real database is always preferred; this only kicks in when
// a DB query fails, so the site stays fully viewable offline.

const id = (s) => 'fb_' + s;

const courses = [
    {
        _id: id('fswd'),
        name: 'Full Stack Web Development',
        slug: 'full-stack-web-development',
        category: 'Professional Courses',
        shortDescription:
            'Master MERN stack development with hands-on projects and real-world applications.',
        introduction:
            'A comprehensive program covering frontend and backend development using modern JavaScript technologies.',
        whatYouWillLearn: [
            'Build responsive UIs with React',
            'Create REST APIs with Node & Express',
            'Work with MongoDB databases',
            'Deploy full-stack applications',
        ],
        courseOutline: [
            'HTML, CSS & JavaScript Fundamentals',
            'React.js Core Concepts',
            'Node.js & Express.js',
            'MongoDB & Mongoose',
            'Authentication & Deployment',
        ],
        finalAssessment: 'Build and deploy a full-stack project.',
        durationWeeks: 12,
        classesPerWeek: 3,
        level: 'Intermediate',
        mode: 'Online',
        fee: 25000,
        featured: true,
        isActive: true,
    },
    {
        _id: id('dmseo'),
        name: 'Digital Marketing & SEO',
        slug: 'digital-marketing-seo',
        category: 'Professional Courses',
        shortDescription:
            'Learn to grow businesses online through SEO, social media, and paid campaigns.',
        introduction:
            'Practical training in modern digital marketing strategies for career and business growth.',
        whatYouWillLearn: [
            'Search Engine Optimization',
            'Social Media Marketing',
            'Google Ads & Analytics',
            'Content Strategy',
        ],
        courseOutline: [
            'SEO Fundamentals',
            'On-Page & Off-Page SEO',
            'Social Media Strategy',
            'Paid Advertising',
            'Analytics & Reporting',
        ],
        finalAssessment: 'Run a live campaign and present results.',
        durationWeeks: 8,
        classesPerWeek: 2,
        level: 'Beginner',
        mode: 'Online',
        fee: 18000,
        featured: true,
        isActive: true,
    },
    {
        _id: id('airg'),
        name: 'AI & RAG Systems',
        slug: 'ai-rag-systems',
        category: 'Professional Courses',
        shortDescription:
            'Build Retrieval-Augmented Generation applications using LLMs and vector databases.',
        introduction:
            'An advanced course on building AI-powered applications with modern LLM tooling.',
        whatYouWillLearn: [
            'Understand LLM fundamentals',
            'Build RAG pipelines',
            'Use vector databases',
            'Deploy AI applications',
        ],
        courseOutline: [
            'LLM Basics',
            'Embeddings & Vector Stores',
            'RAG Architecture',
            'Building Chatbots',
            'Deployment',
        ],
        finalAssessment: 'Develop a RAG-based assistant.',
        durationWeeks: 10,
        classesPerWeek: 2,
        level: 'Advanced',
        mode: 'Online',
        fee: 35000,
        featured: true,
        isActive: true,
    },
];

const services = [
    {
        _id: id('web'),
        title: 'Web Development',
        slug: 'web-development',
        category: 'Technology',
        description:
            'Custom, responsive websites and web applications built with modern frameworks for performance and scalability.',
        icon: 'code',
        isActive: true,
    },
    {
        _id: id('seo'),
        title: 'SEO Optimization',
        slug: 'seo-optimization',
        category: 'Marketing',
        description:
            'Data-driven search engine optimization to improve visibility, rankings, and organic traffic.',
        icon: 'search',
        isActive: true,
    },
    {
        _id: id('rag'),
        title: 'RAG Systems',
        slug: 'rag-systems',
        category: 'AI',
        description:
            'Retrieval-Augmented Generation solutions that connect your data with powerful language models.',
        icon: 'cpu',
        isActive: true,
    },
    {
        _id: id('biz'),
        title: 'Business Consulting',
        slug: 'business-consulting',
        category: 'Consulting',
        description:
            'Strategic guidance to help businesses grow, optimize operations, and adopt new technologies.',
        icon: 'briefcase',
        isActive: true,
    },
];

const team = [
    {
        _id: id('ali'),
        name: 'M. Ali Khan',
        position: 'Chief Executive Officer',
        email: 'ali@macorporation.com',
        bio: 'Visionary leader with 10+ years in education and technology.',
        skills: ['Leadership', 'Strategy', 'Education'],
        education: ['MBA, Business Administration'],
        experience: ['10+ years in EdTech'],
        projects: ['M.A. Corporation Platform'],
        order: 1,
        isActive: true,
    },
    {
        _id: id('sara'),
        name: 'Sara Ahmed',
        position: 'Head of Academics',
        email: 'sara@macorporation.com',
        bio: 'Dedicated educator focused on practical, career-ready learning.',
        skills: ['Curriculum Design', 'Training', 'Assessment'],
        education: ['MSc, Computer Science'],
        experience: ['8 years in education'],
        projects: ['Course Development Framework'],
        order: 2,
        isActive: true,
    },
    {
        _id: id('bilal'),
        name: 'Bilal Sheikh',
        position: 'Lead Developer',
        email: 'bilal@macorporation.com',
        bio: 'Full-stack engineer specializing in MERN and AI systems.',
        skills: ['React', 'Node.js', 'MongoDB', 'RAG'],
        education: ['BSc, Software Engineering'],
        experience: ['6 years in software development'],
        projects: ['Multiple SaaS Products'],
        order: 3,
        isActive: true,
    },
];

const portfolios = [
    {
        _id: id('p1'),
        teamMember: { name: 'Bilal Sheikh', position: 'Lead Developer' },
        title: 'Enterprise SaaS Dashboard',
        description:
            'A multi-tenant analytics dashboard built with React, Node.js, and MongoDB, serving 5,000+ daily users.',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        projectUrl: 'https://example.com/project-1',
    },
    {
        _id: id('p2'),
        teamMember: { name: 'Sara Ahmed', position: 'Head of Academics' },
        title: 'Career-Ready Curriculum Framework',
        description:
            'A modular curriculum framework adopted across all M.A. Corporation professional courses.',
        skills: ['Curriculum Design', 'Assessment', 'Training'],
        projectUrl: 'https://example.com/project-2',
    },
    {
        _id: id('p3'),
        teamMember: { name: 'M. Ali Khan', position: 'Chief Executive Officer' },
        title: 'EdTech Growth Strategy',
        description:
            'A 3-year growth strategy that expanded the company from a local academy to a national platform.',
        skills: ['Strategy', 'Leadership', 'Operations'],
        projectUrl: 'https://example.com/project-3',
    },
];

const certificates = [
    {
        _id: id('c1'),
        title: 'Full Stack Web Development — Completion',
        issuedTo: 'Ayesha Tariq',
        course: 'Full Stack Web Development',
        issueDate: '2025-06-15T00:00:00.000Z',
        certificateUrl: 'https://example.com/cert-1',
        isActive: true,
    },
    {
        _id: id('c2'),
        title: 'Digital Marketing & SEO — Completion',
        issuedTo: 'Usman Riaz',
        course: 'Digital Marketing & SEO',
        issueDate: '2025-07-02T00:00:00.000Z',
        certificateUrl: 'https://example.com/cert-2',
        isActive: true,
    },
    {
        _id: id('c3'),
        title: 'AI & RAG Systems — Completion',
        issuedTo: 'Fatima Noor',
        course: 'AI & RAG Systems',
        issueDate: '2025-08-10T00:00:00.000Z',
        certificateUrl: 'https://example.com/cert-3',
        isActive: true,
    },
];

const settings = {
    companyName: 'M.A. Corporation',
    address: '123 Business Avenue, Karachi, Pakistan',
    phone: '+92 300 1234567',
    email: 'info@macorporation.com',
    whatsapp: '923001234567',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    mapsEmbed: '',
    stats: {
        students: '1,000+',
        courses: '25+',
        services: '15+',
        team: '10+',
        years: '5+',
    },
};

module.exports = { courses, services, team, portfolios, certificates, settings };
