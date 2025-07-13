const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  text: String,
  score: Number,
  suggestions: String,
  rewrite: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prompt', promptSchema);
