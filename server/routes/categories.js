// categories.js - Category routes

const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');
const { validateCategory } = require('../utils/validators');

// @route   GET /api/categories
router.get('/', getCategories);

// @route   GET /api/categories/:id
router.get('/:id', getCategory);

// @route   POST /api/categories
router.post('/', protect, admin, validateCategory, createCategory);

// @route   PUT /api/categories/:id
router.put('/:id', protect, admin, updateCategory);

// @route   DELETE /api/categories/:id
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;

