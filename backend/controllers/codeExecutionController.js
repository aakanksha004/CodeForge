const axios = require('axios');

const executeCode = async (req, res) => {
  const { code, language, testCases } = req.body;
  try {
    const results = [];
    for (const testCase of testCases) {
      const response = await axios.post('https://api.judge0.com/submissions', {
        source_code: code,
        language_id: language, // Map language to Judge0's IDs
        stdin: testCase.input,
      });
      const { stdout } = response.data;
      results.push({ input: testCase.input, expected: testCase.output, actual: stdout });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { executeCode };
