const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  solutions: {
    youtube: [{
      type: String,
    }],
    resources: [{
      type: String,
    
    }]
  },
  testCases: [{
    input: {
      type: String,
      required: true
    },
    expectedOutput: {
      type: String,
      required: true
    }
  }],
  constraints: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  solved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Problem = mongoose.model('Problem', ProblemSchema);
module.exports = Problem;

// // models/Solution.js
// const mongoose = require('mongoose');

// const SolutionSchema = new mongoose.Schema({
//   problemId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Problem',
//     required: true
//   },
//   code: {
//     type: String,
//     required: true
//   },
//   language: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const Solution = mongoose.model('Solution', SolutionSchema);
// module.exports = Solution;