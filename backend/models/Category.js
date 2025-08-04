const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const categorySchema = new Schema({
  id: { type: Number, unique: true },
  userId: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
}, { timestamps: true });

// Generate sequential ID
categorySchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { collectionName: 'Category' },
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

// Ensure unique category names per user
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);