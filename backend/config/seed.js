const User = require('../models/user.model');

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME });
        if (!adminExists) {
            await User.create({
                username: process.env.ADMIN_USERNAME,
                password: process.env.ADMIN_PASSWORD,
                fullName: 'System Administrator',
                role: 'admin',
                // Admin has all permissions
                permissions: { marketing: true, accounts: true, projects: true, tasks: true },
            });
            console.log('Admin user created!');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

module.exports = { seedAdmin };