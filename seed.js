require('dotenv').config();
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Service = require('./models/Service');
const TeamMember = require('./models/TeamMember');
const Portfolio = require('./models/Portfolio');
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
            {
                name: 'Data Science & Analytics',
                slug: slugify('Data Science & Analytics'),
                category: 'Professional Courses',
                shortDescription:
                    'Master data analysis, visualization, and machine learning with Python and modern tools.',
                introduction:
                    'A comprehensive program covering statistics, data visualization, and machine learning for business insights.',
                whatYouWillLearn: [
                    'Python for Data Science',
                    'Data Visualization with Matplotlib & Seaborn',
                    'Statistical Analysis & Hypothesis Testing',
                    'Machine Learning with Scikit-Learn',
                    'Real-world Data Projects',
                ],
                courseOutline: [
                    'Python Fundamentals for Data Science',
                    'Data Cleaning & Preprocessing',
                    'Exploratory Data Analysis',
                    'Statistical Methods',
                    'Supervised & Unsupervised Learning',
                    'Model Evaluation & Deployment',
                ],
                finalAssessment: 'Complete an end-to-end data science project.',
                durationWeeks: 12,
                classesPerWeek: 3,
                level: 'Intermediate',
                mode: 'Online',
                fee: 28000,
                featured: true,
            },
            {
                name: 'Cybersecurity Fundamentals',
                slug: slugify('Cybersecurity Fundamentals'),
                category: 'Professional Courses',
                shortDescription:
                    'Learn essential cybersecurity concepts, threat detection, and security best practices.',
                introduction:
                    'Build a strong foundation in cybersecurity to protect systems, networks, and data from modern threats.',
                whatYouWillLearn: [
                    'Network Security Basics',
                    'Threat Modeling & Risk Assessment',
                    'Vulnerability Assessment & Penetration Testing',
                    'Security Operations & Incident Response',
                    'Compliance & Governance',
                ],
                courseOutline: [
                    'Cybersecurity Principles & Concepts',
                    'Network & Infrastructure Security',
                    'Application Security',
                    'Identity & Access Management',
                    'Security Monitoring & SIEM',
                    'Ethical Hacking Basics',
                ],
                finalAssessment: 'Perform a vulnerability assessment and create a remediation plan.',
                durationWeeks: 10,
                classesPerWeek: 2,
                level: 'Beginner',
                mode: 'Online',
                fee: 22000,
                featured: true,
            },
            {
                name: 'Cloud Computing with AWS',
                slug: slugify('Cloud Computing with AWS'),
                category: 'Professional Courses',
                shortDescription:
                    'Master Amazon Web Services for scalable, reliable cloud infrastructure and deployment.',
                introduction:
                    'Hands-on training in AWS core services, architecture patterns, and cloud-native application deployment.',
                whatYouWillLearn: [
                    'AWS Core Services (EC2, S3, RDS, Lambda)',
                    'Infrastructure as Code with CloudFormation',
                    'Container Orchestration with ECS/EKS',
                    'Serverless Architecture Patterns',
                    'Monitoring, Security & Cost Optimization',
                ],
                courseOutline: [
                    'Cloud Concepts & AWS Global Infrastructure',
                    'Compute & Storage Services',
                    'Networking & Security (VPC, IAM)',
                    'Database & Analytics Services',
                    'DevOps & CI/CD on AWS',
                    'Architecture Best Practices',
                ],
                finalAssessment: 'Design and deploy a scalable cloud architecture.',
                durationWeeks: 10,
                classesPerWeek: 2,
                level: 'Intermediate',
                mode: 'Online',
                fee: 30000,
                featured: true,
            },
            {
                name: 'Mobile App Development with React Native',
                slug: slugify('Mobile App Development with React Native'),
                category: 'Professional Courses',
                shortDescription:
                    'Build cross-platform mobile applications for iOS and Android using React Native.',
                introduction:
                    'Learn to create performant, native-feeling mobile apps with a single JavaScript codebase.',
                whatYouWillLearn: [
                    'React Native Fundamentals & Components',
                    'Navigation & State Management',
                    'Native Device Features (Camera, GPS, Push)',
                    'App Store Deployment (iOS & Android)',
                    'Performance Optimization',
                ],
                courseOutline: [
                    'React Native Setup & Core Concepts',
                    'UI Components & Styling',
                    'Navigation (React Navigation)',
                    'State Management (Redux/Context)',
                    'Native Modules & Device APIs',
                    'Testing, Debugging & Publishing',
                ],
                finalAssessment: 'Build and publish a complete mobile app to app stores.',
                durationWeeks: 10,
                classesPerWeek: 2,
                level: 'Intermediate',
                mode: 'Online',
                fee: 25000,
                featured: true,
            },
            {
                name: 'DevOps & CI/CD Engineering',
                slug: slugify('DevOps & CI/CD Engineering'),
                category: 'Professional Courses',
                shortDescription:
                    'Automate software delivery pipelines with Docker, Kubernetes, and modern DevOps tools.',
                introduction:
                    'Master the practices and tools that enable fast, reliable software delivery at scale.',
                whatYouWillLearn: [
                    'Containerization with Docker',
                    'Orchestration with Kubernetes',
                    'CI/CD Pipelines (GitHub Actions, GitLab CI)',
                    'Infrastructure as Code (Terraform)',
                    'Monitoring, Logging & Observability',
                ],
                courseOutline: [
                    'DevOps Culture & Principles',
                    'Container Fundamentals',
                    'Kubernetes Architecture & Workloads',
                    'Pipeline Design & Implementation',
                    'GitOps & ArgoCD',
                    'Site Reliability Engineering Basics',
                ],
                finalAssessment: 'Build a complete CI/CD pipeline for a microservices application.',
                durationWeeks: 10,
                classesPerWeek: 2,
                level: 'Intermediate',
                mode: 'Online',
                fee: 28000,
                featured: true,
            },
            {
                name: 'UI/UX Design for Digital Products',
                slug: slugify('UI/UX Design for Digital Products'),
                category: 'Professional Courses',
                shortDescription:
                    'Design user-centered digital experiences with modern design tools and methodologies.',
                introduction:
                    'Learn the complete design process from research to prototyping, creating intuitive and beautiful interfaces.',
                whatYouWillLearn: [
                    'User Research & Persona Development',
                    'Wireframing & Prototyping (Figma)',
                    'Design Systems & Component Libraries',
                    'Usability Testing & Iteration',
                    'Handoff to Development',
                ],
                courseOutline: [
                    'Design Thinking & UX Fundamentals',
                    'User Research Methods',
                    'Information Architecture & Wireframing',
                    'Visual Design & Design Systems',
                    'Interactive Prototyping',
                    'Design Handoff & Collaboration',
                ],
                finalAssessment: 'Create a complete design system and high-fidelity prototype.',
                durationWeeks: 8,
                classesPerWeek: 2,
                level: 'Beginner',
                mode: 'Online',
                fee: 20000,
                featured: true,
            },
            {
                name: 'Python Programming for Automation',
                slug: slugify('Python Programming for Automation'),
                category: 'Professional Courses',
                shortDescription:
                    'Automate repetitive tasks, web scraping, and workflow automation with Python.',
                introduction:
                    'Practical Python programming focused on automation, scripting, and productivity for professionals.',
                whatYouWillLearn: [
                    'Python Syntax & Data Structures',
                    'File Processing & Data Manipulation',
                    'Web Scraping with BeautifulSoup & Selenium',
                    'API Integration & Automation',
                    'Task Scheduling & Scripting',
                ],
                courseOutline: [
                    'Python Basics for Automation',
                    'Working with Files & Data (CSV, JSON, Excel)',
                    'Web Scraping & Browser Automation',
                    'APIs & Web Services Integration',
                    'Email, SMS & Notification Automation',
                    'Building Automation Workflows',
                ],
                finalAssessment: 'Build an automated workflow that solves a real business problem.',
                durationWeeks: 8,
                classesPerWeek: 2,
                level: 'Beginner',
                mode: 'Online',
                fee: 18000,
                featured: true,
            },
            {
                name: 'Blockchain & Smart Contract Development',
                slug: slugify('Blockchain & Smart Contract Development'),
                category: 'Professional Courses',
                shortDescription:
                    'Develop decentralized applications and smart contracts on Ethereum and EVM-compatible chains.',
                introduction:
                    'Learn blockchain fundamentals and build production-ready smart contracts with Solidity and modern tooling.',
                whatYouWillLearn: [
                    'Blockchain & Ethereum Fundamentals',
                    'Solidity Programming Language',
                    'Smart Contract Development & Testing',
                    'DeFi Protocols & Token Standards (ERC-20, ERC-721)',
                    'Web3 Integration with Frontend',
                ],
                courseOutline: [
                    'Blockchain Basics & Cryptography',
                    'Ethereum Architecture & EVM',
                    'Solidity Syntax & Patterns',
                    'Testing with Hardhat/Foundry',
                    'DeFi & Token Standards',
                    'Full-Stack dApp Development',
                ],
                finalAssessment: 'Deploy a complete dApp with smart contracts and frontend.',
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
                portfolioSlug: 'https://muhammadawaisportfolio.pythonanywhere.com/',
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
                portfolioSlug: 'career-ready-curriculum',
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
                portfolioSlug: 'ai-rag-chatbot-platform',
                order: 3,
            },
        ];
        const createdTeam = await TeamMember.insertMany(team);
        const teamMap = {};
        createdTeam.forEach((m) => { teamMap[m.name] = m._id; });
        console.log('Team seeded');

        // Portfolios
        if ((await Portfolio.countDocuments()) === 0) {
            const portfolios = [
                {
                    teamMember: teamMap['M. Ali Khan'],
                    title: 'Enterprise SaaS Dashboard',
                    slug: 'enterprise-saas-dashboard',
                    description:
                        'A multi-tenant analytics dashboard built with React, Node.js, and MongoDB, serving 5,000+ daily users.',
                    projectImage: 'https://images.pexels.com/photos/3182809/pexels-photo-3182809.jpeg',
                    projectImages: [
                        'https://images.pexels.com/photos/3182809/pexels-photo-3182809.jpeg',
                        'https://images.pexels.com/photos/2366833/pexels-photo-2366833.jpeg',
                        'https://images.pexels.com/photos/590224/pexels-photo-590224.jpeg',
                    ],
                    projectUrl: 'https://github.com/macorporation/enterprise-dashboard',
                    projectUrls: [
                        { label: 'GitHub', url: 'https://github.com/macorporation/enterprise-dashboard' },
                        { label: 'Live Demo', url: 'https://dashboard.macorporation.com' },
                    ],
                    projectType: 'Web App',
                    role: 'Lead Full-Stack Developer',
                    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
                    challenges: 'Scaling the dashboard to handle 5,000+ concurrent users while maintaining sub-200ms response times.',
                    results: 'Achieved 99.9% uptime with 40% faster load times after migration to a microservices architecture.',
                    startDate: '2024-03-01T00:00:00.000Z',
                    endDate: '2024-09-15T00:00:00.000Z',
                    featured: true,
                    isActive: true,
                    order: 1,
                },
                {
                    teamMember: teamMap['Sara Ahmed'],
                    title: 'Career-Ready Curriculum Framework',
                    slug: 'career-ready-curriculum',
                    description:
                        'A modular curriculum framework adopted across all M.A. Corporation professional courses.',
                    projectImage: 'https://images.pexels.com/photos/4092656/pexels-photo-4092656.jpeg',
                    projectImages: [
                        'https://images.pexels.com/photos/4092656/pexels-photo-4092656.jpeg',
                        'https://images.pexels.com/photos/4592538/pexels-photo-4592538.jpeg',
                        'https://images.pexels.com/photos/5902221/pexels-photo-5902221.jpeg',
                    ],
                    projectUrl: '',
                    projectUrls: [
                        { label: 'Case Study', url: 'https://macorporation.com/case-studies/curriculum-framework' },
                        { label: 'LinkedIn Article', url: 'https://linkedin.com/pulse/curriculum-framework' },
                    ],
                    projectType: 'UI/UX Design',
                    role: 'Curriculum Lead',
                    skills: ['Curriculum Design', 'Assessment', 'Training', 'Figma'],
                    challenges: 'Designing a unified framework that scales across 25+ courses and 1,000+ students.',
                    results: 'Increased student placement rate by 35% and reduced course handoff time by 50%.',
                    startDate: '2024-01-10T00:00:00.000Z',
                    endDate: '2024-06-30T00:00:00.000Z',
                    featured: true,
                    isActive: true,
                    order: 2,
                },
                {
                    teamMember: teamMap['Bilal Sheikh'],
                    title: 'AI-RAG Chatbot Platform',
                    slug: 'ai-rag-chatbot-platform',
                    description:
                        'An intelligent chatbot platform leveraging RAG systems for real-time Q&A across documentation, courses, and support.',
                    projectImage: 'https://images.pexels.com/photos/8092633/pexels-photo-8092633.jpeg',
                    projectImages: [
                        'https://images.pexels.com/photos/8092633/pexels-photo-8092633.jpeg',
                        'https://images.pexels.com/photos/210987/pexels-photo-210987.jpeg',
                        'https://images.pexels.com/photos/3855399/pexels-photo-3855399.jpeg',
                    ],
                    projectUrl: '',
                    projectUrls: [
                        { label: 'GitHub', url: 'https://github.com/macorporation/ai-rag-chatbot' },
                        { label: 'Live Demo', url: 'https://chat.macorporation.com' },
                    ],
                    projectType: 'AI/ML',
                    role: 'AI/ML Engineer',
                    skills: ['Python', 'LangChain', 'Vector DB', 'FastAPI', 'Docker'],
                    challenges: 'Building a cost-effective RAG pipeline that ingests 10GB+ of documentation with sub-2s response.',
                    results: 'Improved support ticket volume by 60% and reduced average resolution time from 4h to 30min.',
                    startDate: '2025-01-15T00:00:00.000Z',
                    endDate: '2025-08-01T00:00:00.000Z',
                    featured: false,
                    isActive: true,
                    order: 4,
                },
            ];
            await Portfolio.insertMany(portfolios);
            console.log('Portfolios seeded');
        }
    }

    console.log('Seed complete.');
    process.exit(0);
};

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
