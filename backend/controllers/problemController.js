const axios = require('axios');
const Problem = require('../models/Problem');

// Fetch problems from Codeforces API and store in the database
const fetchAndStoreProblems = async (req, res) => {
  try {
    // Fetch problems from the Codeforces API
    const response = await axios.get('https://leetcode.com/api/problems/all/');
    const problems = response.data.result.problems;

    // Map Codeforces problems to our Problem model
    const formattedProblems = problems.map(problem => ({
      title: problem.name,
      description: problem.name,  // You can fetch the problem description if needed
      input: problem.input,        // Placeholder for input (adjust as needed)
      output: problem.output,      // Placeholder for output (adjust as needed)
      testCases: []                // You might want to add test cases dynamically
    }));

    // Save the problems to the database
    await Problem.insertMany(formattedProblems);

    res.status(200).json({ message: 'Problems fetched and stored successfully' });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ message: 'Error fetching problems' });
  }
};

// Controller to get problem by ID
const getProblemById = async (req, res) => {
    try {
      const problemId = req.params.id; // Extract the ID from the URL params
      const problem = await Problem.findById(problemId); // Fetch the problem from the database
  
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
  
      res.json(problem); // Send the problem data back as JSON
    } catch (error) {
      console.error('Error fetching problem:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };



// Get All Problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add New Problem
const addProblem = async (req, res) => {
  const { title, description, input, output } = req.body;

  try {
    const newProblem = new Problem({ title, description, input, output });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProblems, addProblem,fetchAndStoreProblems ,getProblemById};

