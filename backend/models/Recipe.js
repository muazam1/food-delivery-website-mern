const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
