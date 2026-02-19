const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');
const connectDB = require('./config/db');

dotenv.config();

const verifyRecipes = async () => {
    try {
        await connectDB();
        console.log("Connected to DB");

        const recipes = await Recipe.find({});
        console.log(`Found ${recipes.length} recipes`);
        console.log("Sample recipe:", recipes[0]);

        process.exit();
    } catch (error) {
        console.error("Error fetching recipes:", error);
        process.exit(1);
    }
};

verifyRecipes();
