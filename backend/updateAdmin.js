const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const updateAdmin = async () => {
    try {
        const email = 'csmuazam@gmail.com'; // The email to update
        const user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`User ${user.name} (${user.email}) is now an admin.`);
        } else {
            console.log(`User with email ${email} not found.`);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateAdmin();
