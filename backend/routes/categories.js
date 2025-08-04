const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth');

// Create category
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const category = new Category({
      userId: req.user.userId,
      name,
    });
    await category.save();

    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category already exists for this user' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// List categories
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.userId }).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single category
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findOne({ id: parseInt(req.params.id), userId: req.user.userId });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update category
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const category = await Category.findOneAndUpdate(
      { id: parseInt(req.params.id), userId: req.user.userId },
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category updated', category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category name already exists for this user' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete category
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findOne({ id: parseInt(req.params.id), userId: req.user.userId });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category is used by any expenses
    const expense = await Expense.findOne({ userId: req.user.userId, categoryId: category._id });
    if (expense) {
      return res.status(400).json({ message: 'Cannot delete category; it is used by expenses' });
    }

    await Category.findOneAndDelete({ id: parseInt(req.params.id), userId: req.user.userId });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;