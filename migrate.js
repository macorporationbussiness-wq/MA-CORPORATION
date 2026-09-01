require('dotenv').config();
const connectDB = require('./config/db');
const Portfolio = require('./models/Portfolio');
const Certificate = require('./models/Certificate');
const TeamMember = require('./models/TeamMember');
const Course = require('./models/Course');
const Service = require('./models/Service');
const Inquiry = require('./models/Inquiry');
const {
    courses,
    services,
    team,
    portfolios,
    certificates,
} = require('./data/fallback');

const migrate = async () => {
    await connectDB();

    // Migrate / Update Team Members first (so portfolios can reference them)
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
        console.log('Migrating team members...');

        for (const fbMember of team) {
            await TeamMember.create({
                name: fbMember.name,
                position: fbMember.position,
                email: fbMember.email,
                phone: fbMember.phone || '',
                bio: fbMember.bio,
                photo: fbMember.photo || '',
                skills: fbMember.skills,
                education: fbMember.education,
                experience: fbMember.experience,
                projects: fbMember.projects,
                social: fbMember.social || { linkedin: '', github: '', twitter: '' },
                hasPortfolio: fbMember.hasPortfolio ?? true,
                portfolioSlug: fbMember.portfolioSlug || '',
                order: fbMember.order,
                isActive: fbMember.isActive,
            });
        }
        console.log(`Team members migrated: ${team.length} items`);
    } else {
        console.log(`Team members already exist (${teamCount}), updating portfolioSlug...`);

        // Update existing team members with portfolioSlug from fallback data
        for (const fbMember of team) {
            await TeamMember.updateOne(
                { name: fbMember.name },
                {
                    $set: {
                        portfolioSlug: fbMember.portfolioSlug || '',
                        hasPortfolio: fbMember.hasPortfolio ?? true,
                        phone: fbMember.phone || '',
                        social: fbMember.social || { linkedin: '', github: '', twitter: '' },
                    },
                }
            );
        }
        console.log('Team members portfolioSlug updated.');
    }

    // Migrate Portfolios (after team members are ensured)
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
        console.log('Migrating portfolios...');

        for (const fbPortfolio of portfolios) {
            // Resolve teamMember reference from DB by name
            let teamMemberId = null;
            if (fbPortfolio.teamMember && fbPortfolio.teamMember.name) {
                const existingMember = await TeamMember.findOne({
                    name: fbPortfolio.teamMember.name,
                });
                if (existingMember) {
                    teamMemberId = existingMember._id;
                } else {
                    // Create team member from fallback data if not in DB
                    const teamFbMember = team.find(
                        (t) => t.name === fbPortfolio.teamMember.name
                    );
                    if (teamFbMember) {
                        const newMember = await TeamMember.create({
                            name: teamFbMember.name,
                            position: teamFbMember.position,
                            email: teamFbMember.email,
                            phone: teamFbMember.phone || '',
                            bio: teamFbMember.bio,
                            photo: teamFbMember.photo || '',
                            skills: teamFbMember.skills,
                            education: teamFbMember.education,
                            experience: teamFbMember.experience,
                            projects: teamFbMember.projects,
                            social: teamFbMember.social || { linkedin: '', github: '', twitter: '' },
                            hasPortfolio: teamFbMember.hasPortfolio ?? true,
                            portfolioSlug: teamFbMember.portfolioSlug || '',
                            order: teamFbMember.order,
                            isActive: teamFbMember.isActive,
                        });
                        teamMemberId = newMember._id;
                    } else {
                        // Create a minimal entry
                        const newMember = await TeamMember.create({
                            name: fbPortfolio.teamMember.name,
                            position: fbPortfolio.teamMember.position || '—',
                            email: 'unknown@macorporation.com',
                            bio: '',
                            skills: [],
                            education: [],
                            experience: [],
                            projects: [],
                            order: 999,
                            isActive: true,
                        });
                        teamMemberId = newMember._id;
                    }
                }
            }

            await Portfolio.create({
                teamMember: teamMemberId,
                title: fbPortfolio.title,
                slug: fbPortfolio.slug,
                description: fbPortfolio.description,
                image: fbPortfolio.image || '',
                projectImage: fbPortfolio.projectImage || '',
                projectImages: fbPortfolio.projectImages || [],
                projectUrl: fbPortfolio.projectUrl || '',
                projectUrls: fbPortfolio.projectUrls || [],
                projectType: fbPortfolio.projectType || 'Web App',
                role: fbPortfolio.role || '',
                skills: fbPortfolio.skills || [],
                challenges: fbPortfolio.challenges || '',
                results: fbPortfolio.results || '',
                startDate: fbPortfolio.startDate,
                endDate: fbPortfolio.endDate,
                featured: fbPortfolio.featured,
                isActive: fbPortfolio.isActive,
                order: fbPortfolio.order,
            });
        }
        console.log(`Portfolios migrated: ${portfolios.length} items`);
    } else {
        console.log(`Portfolios already exist (${portfolioCount}), skipping migration.`);
    }

    // Migrate Certificates
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
        console.log('Migrating certificates...');

        for (const fbCert of certificates) {
            await Certificate.create({
                title: fbCert.title,
                issuedTo: fbCert.issuedTo,
                course: fbCert.course,
                issueDate: fbCert.issueDate,
                certificateUrl: fbCert.certificateUrl,
                isActive: fbCert.isActive,
            });
        }
        console.log(`Certificates migrated: ${certificates.length} items`);
    } else {
        console.log(`Certificates already exist (${certCount}), skipping migration.`);
    }

    // Migrate Services if DB is empty
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
        console.log('Migrating services...');

        for (const fbService of services) {
            await Service.create({
                title: fbService.title,
                slug: fbService.slug,
                category: fbService.category || '',
                shortDescription: fbService.shortDescription || '',
                description: fbService.description,
                icon: fbService.icon,
                isActive: fbService.isActive,
            });
        }
        console.log(`Services migrated: ${services.length} items`);
    } else {
        console.log(`Services already exist (${serviceCount}), skipping migration.`);
    }

    // Migrate Courses if DB is empty
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
        console.log('Migrating courses...');

        for (const fbCourse of courses) {
            await Course.create({
                name: fbCourse.name,
                slug: fbCourse.slug,
                category: fbCourse.category,
                shortDescription: fbCourse.shortDescription,
                introduction: fbCourse.introduction,
                whatYouWillLearn: fbCourse.whatYouLearn,
                courseOutline: fbCourse.courseOutline,
                finalAssessment: fbCourse.finalAssessment,
                durationWeeks: fbCourse.durationWeeks,
                classesPerWeek: fbCourse.classesPerWeek,
                level: fbCourse.level,
                mode: fbCourse.mode,
                fee: fbCourse.fee,
                image: fbCourse.image || '',
                featured: fbCourse.featured,
                isActive: fbCourse.isActive,
            });
        }
        console.log(`Courses migrated: ${courses.length} items`);
    } else {
        console.log(`Courses already exist (${courseCount}), skipping migration.`);
    }

    console.log('Migration complete.');
    process.exit(0);
}

migrate().catch((err) => {
    console.error('Migration error:', err);
    process.exit(1);
});
