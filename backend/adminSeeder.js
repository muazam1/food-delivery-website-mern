const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true,
        });

        await adminUser.save();

        console.log('Admin User Created!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importAdmin();
