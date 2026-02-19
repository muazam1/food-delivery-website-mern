const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const checkUsers = async () => {
    try {
        const users = await User.find({});
        console.log('--- USER LIST ---');
        users.forEach(user => {
            console.log(`Email: ${user.email}, Name: ${user.name}, isAdmin: ${user.isAdmin}`);
        });
        console.log('-----------------');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
