// models/Solution.js
const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  problemId: {
    type: String,  // Changed from ObjectId to String
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Solution = mongoose.model('Solution', SolutionSchema);
module.exports = Solution;