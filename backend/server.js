// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

// Load models
const Problem = require('./models/Problem');
const Solution = require('./models/Solution');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: 'https://codeforgeapp.onrender.com',
  methods: ['GET', 'POST'],
  
}));

// Language ID mapping for Judge0 (unchanged)
const languageIdMap = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  ruby: 72,
};

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';

// Updated route to save solutions
app.get('/api/solutions/:problemId', async (req, res) => {
    try {
      console.log('Fetching solution for problemId:', req.params.problemId);
      const solution = await Solution.findOne({ problemId: req.params.problemId });
    //   console.log('Found solution:', solution);
      res.json({ solution: solution || null });
    } catch (error) {
      console.error('Error fetching solution:', error);
      res.status(500).json({
        error: 'Failed to fetch solution',
        details: error.message
      });
    }
  });
  
  app.post('/api/save-solution', async (req, res) => {
    const { problemId, code, language } = req.body;
    console.log('Saving solution with problemId:', problemId);
  
    if (!problemId || !code || !language) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'problemId, code, and language are required'
      });
    }
  
    try {
      const solution = await Solution.findOneAndUpdate(
        { problemId },
        { code, language },
        { upsert: true, new: true }
      );
    //   console.log('Saved solution:', solution);
  
      // Also update this line since we're using string IDs now
      await Problem.findOneAndUpdate({ problemId }, { solved: true });
  
      res.json({
        status: 'OK',
        message: 'Solution saved successfully',
        solution
      });
  
    } catch (error) {
      console.error('Error saving solution:', error);
      res.status(500).json({
        error: 'Failed to save solution',
        details: error.message
      });
    }
  });
// Updated route to get all problems
app.get('/api/problems', async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json({ status: 'OK', problems });
  } catch (error) {
    console.error('Error reading problems:', error);
    res.status(500).json({ error: 'Failed to load problems' });
  }
});


//api to submit a new designed question
// Updated POST endpoint
app.post('/api/problems', async (req, res) => {
    try {
      const {
        title,
        description,
        input,
        output,
        constraints,
        tags,
        difficulty,
        testCases,
        solutions
      } = req.body;
  
      // Validate required fields
      if (!title || !description || !input || !output || !constraints || !difficulty) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          details: 'All fields marked as required must be provided'
        });
      }
  
      // Process tags if they come as a string
      const processedTags = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : tags || [];
  
      // Create the new problem
      const newProblem = new Problem({
        title: title.trim(),
        description: description.trim(),
        input: input.trim(),
        output: output.trim(),
        constraints: constraints.trim(),
        tags: processedTags,
        difficulty,
        testCases: testCases.filter(tc => tc.input.trim() && tc.expectedOutput.trim()),
        solutions: {
          youtube: solutions?.youtube?.filter(Boolean) || [],
          resources: solutions?.resources?.filter(Boolean) || []
        }
      });
  
      // Save to database
      const savedProblem = await newProblem.save();
  
      res.status(201).json({
        status: 'success',
        message: 'Problem created successfully',
        problem: savedProblem
      });
  
    } catch (error) {
      console.error('Error creating problem:', error);
      res.status(500).json({
        error: 'Failed to create problem',
        details: error.message
      });
    }
  });


  

// Updated route to get a problem by ID
app.get('/api/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem) {
      res.json({ status: 'OK', problem });
    } else {
      res.status(404).json({ error: 'Problem not found' });
    }
  } catch (error) {
    console.error('Error reading problem:', error);
    res.status(500).json({ error: 'Failed to load problem' });
  }
});

app.post('/api/execute-code', async (req, res) => {
    if (!process.env.JUDGE0_API_KEY) {
      console.error('JUDGE0_API_KEY is not configured in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error', 
        details: 'Judge0 API key is not configured' 
      });
    }
  
    const { code, language, problemId, testCases } = req.body;
    
    if (!code || !code.trim()) {
      return res.status(400).json({ error: 'Code is required' });
    }
    
    if (!language || !languageIdMap[language]) {
      return res.status(400).json({ 
        error: 'Invalid language',
        details: `Supported languages: ${Object.keys(languageIdMap).join(', ')}`
      });
    }
  
    try {
      const testResults = [];
      
      for (const testCase of testCases) {
        const submissionData = {
          source_code: Buffer.from(code).toString('base64'),
          language_id: languageIdMap[language],
          stdin: testCase.input ? Buffer.from(testCase.input).toString('base64') : '',
          expected_output: testCase.expectedOutput ? Buffer.from(testCase.expectedOutput).toString('base64') : '',
        };
  
        // Create submission with base64_encoded=true
        const createSubmissionResponse = await axios.post(
          `${JUDGE0_API_URL}/submissions?base64_encoded=true&fields=*`,
          submissionData,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          }
        );
  
        const { token } = createSubmissionResponse.data;
        
        // Poll for results with base64_encoded=true
        let result;
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
          const resultResponse = await axios.get(
            `${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true&fields=*`,
            {
              headers: {
                'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
              }
            }
          );
  
          if (resultResponse.data.status.id <= 2) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
            continue;
          }
  
          result = resultResponse.data;
          break;
        }
  
        if (!result) {
          throw new Error('Code execution timed out');
        }
  
        // Decode base64 outputs
        const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '';
        const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '';
        const compile_output = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '';
  
        // Process the result for this test case
        const outputMatches = stdout.trim() === testCase.expectedOutput?.trim();
        
        testResults.push({
          passed: outputMatches && result.status.id === 3,
          output: stdout,
          expectedOutput: testCase.expectedOutput,
          error: stderr || compile_output,
          status: result.status.description,
          time: result.time,
          memory: result.memory
        });
      }
  
      // Send back all test results
      res.json({
        passed: testResults.every(result => result.passed),
        total: testResults.length,
        details: testResults,
      });
  
    } catch (error) {
      console.error('Error executing code:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      res.status(500).json({
        error: 'Error executing code',
        details: error.response?.data || error.message
      });
    }
  });

// // Route to get all DSA questions
// app.get('/api/problems', (req, res) => {
//   try {
//     const data = fs.readFileSync(path.join(__dirname, 'data', 'dsa_questions.json'), 'utf-8');
//     const problems = JSON.parse(data);
//     res.json({ status: 'OK', problems });
//   } catch (error) {
//     console.error('Error reading questions:', error);
//     res.status(500).json({ error: 'Failed to load problems' });
//   }
// });

// // Route to get a problem by index
// app.get('/api/problems/:id', (req, res) => {
//   try {
//     const data = fs.readFileSync(path.join(__dirname, 'data', 'dsa_questions.json'), 'utf-8');
//     const problems = JSON.parse(data);

//     const problem = problems.find((p, index) => index.toString() === req.params.id);
//     if (problem) {
//       res.json({ status: 'OK', problem });
//     } else {
//       res.status(404).json({ error: 'Problem not found' });
//     }
//   } catch (error) {
//     console.error('Error reading question:', error);
//     res.status(500).json({ error: 'Failed to load problem' });
//   }
// });


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Environment check:');
    console.log('- JUDGE0_API_KEY:', process.env.JUDGE0_API_KEY ? '✓ Configured' : '✗ Missing');
    console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✓ Configured' : '✗ Missing');
  });
