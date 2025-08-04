const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const expenseSchema = new Schema({
  id: { type: Number, unique: true },
  userId: { type: Number, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

// Generate sequential ID
expenseSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'Expense' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);