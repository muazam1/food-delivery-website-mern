const express = require('express');
const router = express.Router();
const { getRecipes, createRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipe');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getRecipes).post(protect, admin, upload.single('image'), createRecipe);
router.route('/:id').delete(protect, admin, deleteRecipe).put(protect, admin, upload.single('image'), updateRecipe);

module.exports = router;
