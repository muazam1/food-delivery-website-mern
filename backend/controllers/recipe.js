const Recipe = require('../models/Recipe');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res) => {
    console.log("GET /api/recipes HIT");
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = async (req, res) => {
    try {
        const recipeData = {
            ...req.body,
            id: Date.now(), // Generate a unique numeric ID
            image: req.file ? `/uploads/${req.file.filename}` : req.body.image
        };

        const recipe = await Recipe.create(recipeData);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private/Admin
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            await recipe.deleteOne();
            res.json({ message: 'Recipe removed' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private/Admin
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (recipe) {
            recipe.name = req.body.name || recipe.name;
            recipe.price = req.body.price || recipe.price;

            if (req.file) {
                recipe.image = `/uploads/${req.file.filename}`;
            } else if (req.body.image) {
                recipe.image = req.body.image || recipe.image;
            }

            if (req.body.available !== undefined) {
                recipe.available = req.body.available;
            }

            const updatedRecipe = await recipe.save();
            res.json(updatedRecipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe,
};
