const Submission = require('../models/Submission');

// Submit Code
const submitCode = async (req, res) => {
  const { userId, problemId, code, language } = req.body;

  try {
    const submission = new Submission({ userId, problemId, code, language });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Submissions
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate('userId problemId');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitCode, getSubmissions };
