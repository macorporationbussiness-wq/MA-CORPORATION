import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
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
        homeHero: {
            badge: '✨ Professional Education & Services',
            title: 'Empowering People. Building Skills. Creating Opportunities.',
            subtitle: 'M.A. Corporation provides professional courses and quality business services designed to help individuals, students, and organizations achieve their goals.',
            primaryBtnText: 'Explore Courses',
            secondaryBtnText: 'Our Services',
        },
        homeIntro: {
            badge: 'Who We Are',
            title: 'Welcome to M.A. Corporation',
            description: 'M.A. Corporation is a professional organization committed to providing quality education, practical learning opportunities, and reliable professional services. Our goal is to connect knowledge with real-world skills and provide individuals and businesses with solutions that create meaningful and sustainable results.',
            readMoreText: 'Read More',
        },
        homeKeyAreas: [
            { title: 'Professional Courses', desc: 'Practical and career-focused courses designed to develop valuable professional skills.', icon: 'icon-graduation.png' },
            { title: 'Business Services', desc: 'Reliable professional services tailored to meet individual and business requirements.', icon: 'icon-briefcase.png' },
            { title: 'Expert Team', desc: 'Experienced professionals committed to providing quality guidance and support.', icon: 'icon-team.png' },
            { title: 'Career Development', desc: 'Helping students and professionals develop skills for better career opportunities.', icon: 'icon-rocket.png' },
        ],
        homeCoreValues: [
            { title: 'Integrity', desc: 'We believe in honesty and transparency.', icon: 'icon-handshake.png' },
            { title: 'Excellence', desc: 'We continuously work to improve the quality of our services.', icon: 'icon-star.png' },
            { title: 'Customer Focus', desc: 'Our clients and students remain at the center of our work.', icon: 'icon-target.png' },
            { title: 'Growth', desc: 'We believe in continuous personal, professional, and organizational development.', icon: 'icon-growth.png' },
            { title: 'Innovation', desc: 'We encourage modern ideas, technology, and new approaches.', icon: 'icon-lightbulb.png' },
        ],
        homeServices: {
            eyebrow: 'Services',
            title: 'Our Professional Services',
            subtitle: 'Reliable, customized services designed to meet the needs of individuals, professionals, and businesses.',
            viewAllText: 'View All Services',
        },
        homeValues: {
            eyebrow: 'Why Choose Us',
            title: 'Our Core Values',
        },
        homeCta: {
            title: 'Ready to Start Your Journey?',
            description: 'Join thousands of students and professionals building their future with M.A. Corporation.',
            primaryBtnText: 'Get Started',
            whatsappBtnText: 'Chat on WhatsApp',
            whatsappMessage: 'Hello! I want to enroll in a course.',
        },
        aboutPage: {
            eyebrow: 'About Us',
            title: 'About M.A. Corporation',
            subtitle: 'Quality education, professional services, and practical learning under one platform.',
            introEyebrow: 'Our Story',
            introTitle: 'Building Skills. Creating Opportunities.',
            introDesc1: 'M.A. Corporation was established with the vision of providing reliable professional services and practical learning opportunities under one platform. We believe that knowledge becomes valuable when it can be applied in the real world.',
            introDesc2: 'Our approach focuses on practical learning, professional guidance, customer satisfaction, and continuous improvement. Our team works to understand the needs of every client and student and provide solutions that are practical, accessible, and results-oriented.',
            introBadge: 'Since 2019',
            introBadgeDesc: 'Empowering learners and businesses',
            logoImage: '/logo.png',
            visionTitle: 'Our Vision',
            visionDesc: 'To become a trusted and recognized organization known for quality education, professional services, innovation, and customer satisfaction.',
            missionTitle: 'Our Mission',
            missionDesc: 'Our mission is to empower individuals and organizations through practical knowledge, professional services, and opportunities that contribute to personal and business growth.',
            valuesEyebrow: 'What Drives Us',
            valuesTitle: 'Our Core Values',
            valuesDesc: 'The principles that guide everything we do at M.A. Corporation.',
            journeyEyebrow: 'Our Journey',
            journeyTitle: 'Milestones That Shaped Us',
            journeyDesc: 'A timeline of growth, learning, and impact.',
            ctaTitle: 'Want to Work With Us?',
            ctaDesc: 'Join our team or partner with us to create meaningful impact through education and services.',
            ctaTeamBtn: 'Meet Our Team',
            ctaContactBtn: 'Contact Us',
        },
        contactPage: {
            eyebrow: 'Contact',
            title: 'Get In Touch',
            subtitle: 'We typically respond within a few hours. You can also reach us directly on WhatsApp.',
            infoEyebrow: 'Reach Us',
            infoTitle: "Let's start a conversation",
            formTitle: 'Send us a message',
            formDesc: "Fill out the form and we'll respond within hours.",
            formSuccessTitle: 'Message Sent!',
            formSuccessDesc: 'Thank you for reaching out. Our team will get back to you shortly.',
            formSuccessBtn: 'Send Another',
            submitBtn: 'Send Message',
            contactItems: [
                { icon: 'icon-globe.png', label: 'Company', valueKey: 'companyName', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
                { icon: 'icon-target.png', label: 'Address', valueKey: 'address', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
                { icon: 'icon-rocket.png', label: 'Phone', valueKey: 'phone', linkKey: 'phone', linkPrefix: 'tel:', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                { icon: 'icon-lightbulb.png', label: 'Email', valueKey: 'email', linkKey: 'email', linkPrefix: 'mailto:', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
                { icon: 'icon-handshake.png', label: 'WhatsApp', valueKey: 'whatsappText', linkKey: 'whatsapp', linkPrefix: 'https://wa.me/', external: true, color: 'linear-gradient(135deg, #25D366, #128C7E)' },
            ],
        },
        admissionsPage: {
            eyebrow: 'Admissions',
            title: 'Start Your Learning Journey',
            subtitle: 'Complete the application below. On submit, your details open in WhatsApp for our team to review.',
            formTitle: 'Application Form',
            formDesc: 'Fields marked with * are required',
            submitBtn: 'Submit Application',
            successTitle: 'Application Submitted!',
            successDesc: 'Thank you for your application. Our admissions team will contact you shortly to confirm your enrollment.',
            submitAnotherBtn: 'Submit Another',
            whatsappMessage: 'Hello M.A. Corporation! I would like to submit my admission application.',
        },
        privacyPage: {
            eyebrow: 'Legal',
            title: 'Privacy Policy',
            subtitle: 'How M.A. Corporation collects, uses, and protects your information.',
            sections: [
                { title: '1. Information We Collect', desc: 'We collect information you provide through inquiry forms, admission applications, and course enrollments, including your name, email, phone, city, and course preferences.' },
                { title: '2. How We Use Information', desc: 'Information is used to respond to inquiries, process admissions, deliver courses, and improve our services. We do not sell your data to third parties.' },
                { title: '3. Data Security', desc: 'We implement reasonable security measures including HTTPS encryption and access-controlled admin systems to protect your data.' },
                { title: '4. WhatsApp Communication', desc: 'When you use Enroll Now or contact forms, your details may be shared via WhatsApp with our official number for follow-up.' },
                { title: '5. Your Rights', desc: 'You may request access to or deletion of your personal data by contacting us through the Contact page.' },
                { title: '6. Updates', desc: 'This policy may be updated periodically. Continued use of the site constitutes acceptance of the current policy.' },
            ],
        },
        termsPage: {
            eyebrow: 'Legal',
            title: 'Terms & Conditions',
            subtitle: 'The terms governing your use of the M.A. Corporation website and services.',
            sections: [
                { title: '1. Acceptance of Terms', desc: 'By accessing this website, you agree to be bound by these Terms & Conditions and all applicable laws.' },
                { title: '2. Use of Services', desc: 'Courses and services are provided for educational and professional purposes. Enrollment is subject to availability and review by our admissions team.' },
                { title: '3. Payments & Fees', desc: 'Course fees are as listed. Online payments and a student portal are planned for future release. Current enrollments are confirmed via WhatsApp.' },
                { title: '4. Intellectual Property', desc: 'All content, branding, and materials are the property of M.A. Corporation and may not be reproduced without permission.' },
                { title: '5. Limitation of Liability', desc: 'M.A. Corporation is not liable for any indirect damages arising from the use of this website or its services.' },
                { title: '6. Changes', desc: 'We reserve the right to modify these terms at any time. Changes take effect upon posting.' },
            ],
        },
    });

    const fetchSettings = async () => {
        try {
            const res = await API.get('/settings');
            setSettings((prev) => ({ ...prev, ...res.data }));
        } catch (err) {
            console.error('Failed to load settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings, fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
