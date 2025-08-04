const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  collectionName: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1 },
});

module.exports = mongoose.model('Counter', counterSchema);