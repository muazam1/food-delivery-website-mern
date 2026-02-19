const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const verifyAdmin = async () => {
    try {
        const email = 'csmuazam@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log(`User: ${user.email}`);
            console.log(`isAdmin: ${user.isAdmin}`);
        } else {
            console.log('User not found');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyAdmin();
