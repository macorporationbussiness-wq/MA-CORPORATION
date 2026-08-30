require('dotenv').config();
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Service = require('./models/Service');
const TeamMember = require('./models/TeamMember');
const Setting = require('./models/Setting');
const bcrypt = require('bcryptjs');

const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const seed = async () => {
    await connectDB();

    // Admin
    const adminExists = await Admin.findOne({ email: 'admin@macorporation.com' });
    if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('admin123', salt);
        await Admin.create({
            name: 'M.A. Corporation Admin',
            email: 'admin@macorporation.com',
            password,
        });
        console.log('Admin created: admin@macorporation.com / admin123');
    }

    // Settings
    const defaults = {
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
    for (const [key, value] of Object.entries(defaults)) {
        await Setting.findOneAndUpdate(
            { key },
            { key, value, updatedAt: Date.now() },
            { upsert: true, new: true }
        );
    }
    console.log('Settings seeded');

    // Courses
    if ((await Course.countDocuments()) === 0) {
        const courses = [
            {
                name: 'Full Stack Web Development',
                slug: slugify('Full Stack Web Development'),
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
            },
            {
                name: 'Digital Marketing & SEO',
                slug: slugify('Digital Marketing & SEO'),
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
            },
            {
                name: 'AI & RAG Systems',
                slug: slugify('AI & RAG Systems'),
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
            },
        ];
        await Course.insertMany(courses);
        console.log('Courses seeded');
    }

    // Services
    if ((await Service.countDocuments()) === 0) {
        const services = [
            {
                title: 'Web Development',
                slug: slugify('Web Development'),
                category: 'Technology',
                description:
                    'Custom, responsive websites and web applications built with modern frameworks for performance and scalability.',
                icon: 'code',
            },
            {
                title: 'SEO Optimization',
                slug: slugify('SEO Optimization'),
                category: 'Marketing',
                description:
                    'Data-driven search engine optimization to improve visibility, rankings, and organic traffic.',
                icon: 'search',
            },
            {
                title: 'RAG Systems',
                slug: slugify('RAG Systems'),
                category: 'AI',
                description:
                    'Retrieval-Augmented Generation solutions that connect your data with powerful language models.',
                icon: 'cpu',
            },
            {
                title: 'Business Consulting',
                slug: slugify('Business Consulting'),
                category: 'Consulting',
                description:
                    'Strategic guidance to help businesses grow, optimize operations, and adopt new technologies.',
                icon: 'briefcase',
            },
        ];
        await Service.insertMany(services);
        console.log('Services seeded');
    }

    // Team
    if ((await TeamMember.countDocuments()) === 0) {
        const team = [
            {
                name: 'M. Ali Khan',
                position: 'Chief Executive Officer',
                email: 'ali@macorporation.com',
                bio: 'Visionary leader with 10+ years in education and technology.',
                skills: ['Leadership', 'Strategy', 'Education'],
                education: ['MBA, Business Administration'],
                experience: ['10+ years in EdTech'],
                projects: ['M.A. Corporation Platform'],
                order: 1,
            },
            {
                name: 'Sara Ahmed',
                position: 'Head of Academics',
                email: 'sara@macorporation.com',
                bio: 'Dedicated educator focused on practical, career-ready learning.',
                skills: ['Curriculum Design', 'Training', 'Assessment'],
                education: ['MSc, Computer Science'],
                experience: ['8 years in education'],
                projects: ['Course Development Framework'],
                order: 2,
            },
            {
                name: 'Bilal Sheikh',
                position: 'Lead Developer',
                email: 'bilal@macorporation.com',
                bio: 'Full-stack engineer specializing in MERN and AI systems.',
                skills: ['React', 'Node.js', 'MongoDB', 'RAG'],
                education: ['BSc, Software Engineering'],
                experience: ['6 years in software development'],
                projects: ['Multiple SaaS Products'],
                order: 3,
            },
        ];
        await TeamMember.insertMany(team);
        console.log('Team seeded');
    }

    console.log('Seed complete.');
    process.exit(0);
};

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
