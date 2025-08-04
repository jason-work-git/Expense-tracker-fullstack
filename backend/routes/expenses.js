const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/auth');

// Create expense
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, description, date, categoryId } = req.body;
    if (!amount || !description || !date || !categoryId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify category exists for the user
    const categoryExists = await Category.findOne({ _id: categoryId, userId: req.user.userId });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const expense = new Expense({
      userId: req.user.userId,
      amount,
      description,
      date: new Date(date),
      categoryId,
    });
    await expense.save();

    res.status(201).json({ message: 'Expense created', expense });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// List expenses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId })
      .populate('categoryId', 'name')
      .sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single expense
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOne({ id: parseInt(req.params.id), userId: req.user.userId })
      .populate('categoryId', 'name');
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update expense
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { amount, description, date, categoryId } = req.body;
    if (!amount || !description || !date || !categoryId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify category exists for the user
    const categoryExists = await Category.findOne({ _id: categoryId, userId: req.user.userId });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const expense = await Expense.findOneAndUpdate(
      { id: parseInt(req.params.id), userId: req.user.userId },
      { amount, description, date: new Date(date), categoryId },
      { new: true }
    ).populate('categoryId', 'name');
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense updated', expense });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete expense
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ id: parseInt(req.params.id), userId: req.user.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;