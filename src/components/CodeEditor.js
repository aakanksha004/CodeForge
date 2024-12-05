import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = ({ problemId, testCases }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [testResults, setTestResults] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stdin, setStdin] = useState(testCases[0]?.input || '');
  const [editorHeight, setEditorHeight] = useState(300);
  const [outputHeight, setOutputHeight] = useState(200);

  // Load saved solution when component mounts
  useEffect(() => {
    const loadSavedSolution = async () => {
      console.log('problemId type:', typeof problemId);
      console.log('problemId value:', problemId);
      
      if (!problemId) {
        console.log('No problemId provided');
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:5000/api/solutions/${problemId}`);
        console.log('Response:', response.data);
        if (response.data.solution) {
          setCode(response.data.solution.code);
          setLanguage(response.data.solution.language);
        }
      } catch (error) {
        console.error('Error loading saved solution:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      }
    };
  
    loadSavedSolution();
  }, [problemId]);
  
  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleCompileAndRun = async () => {
    setIsCompiling(true);
    
    try {
      const response = await axios.post('https://codeforgeapp.onrender.com/api/execute-code', {
        code,
        language: language.toLowerCase(),
        stdin: stdin,
        problemId: problemId,
        testCases: testCases,
      });

      setTestResults(response.data);
    } catch (error) {
      setTestResults({
        error: error.response?.data?.error || 'Error executing code',
        details: error.response?.data?.details || []
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // First, run the tests
      const testResponse = await axios.post('https://codeforgeapp.onrender.com//api/execute-code', {
        code,
        language: language.toLowerCase(),
        stdin: stdin,
        problemId: problemId,
        testCases: testCases,
      });

      // If all tests pass, save the solution
      if (testResponse.data.details?.every(result => result.passed)) {
        // Save the solution
        await axios.post('http://localhost:5000/api/save-solution', {
          problemId,
          code,
          language: language.toLowerCase(),
        });

        // Update the problem status in localStorage
        const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '{}');
        solvedProblems[problemId] = true;
        localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));

        // Show success message in test results
        setTestResults({
          ...testResponse.data,
          success: true,
          message: 'Solution submitted successfully! Problem marked as solved.'
        });
      } else {
        // Show failure message if not all tests pass
        setTestResults({
          ...testResponse.data,
          error: 'All test cases must pass before submitting the solution.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setTestResults({
        error: error.response?.data?.error || 'Error submitting solution',
        details: error.response?.data?.details || []
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleResize = (e) => {
    const newEditorHeight = e.clientY;
    const newOutputHeight = window.innerHeight - newEditorHeight - 50;
    setEditorHeight(newEditorHeight);
    setOutputHeight(newOutputHeight);
  };

  return (
    <div className="flex-grow">
      <div className="flex justify-end items-center mb-2 mt-2">
        <h4 className="text-lg text-gray-200 mr-4">Choose Language:</h4>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="focus:outline-none bg-teal-900 text-white mr-4 py-1 px-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="ruby">Ruby</option>
        </select>
      </div>

      <div className="flex flex-col" style={{ height: '100vh' }}>
        <div className="flex-grow" style={{ height: `${editorHeight}px`, overflow: 'hidden' }}>
          <MonacoEditor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>

        <div
          className="h-1 bg-gray-600 cursor-ns-resize"
          onMouseDown={(e) => {
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', handleResize);
            });
          }}
        ></div>

        <div className="overflow-auto bg-gray-900" style={{ height: `${outputHeight}px` }}>
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={handleCompileAndRun}
              disabled={isCompiling || isSubmitting || !code.trim()}
              className={`${
                isCompiling || isSubmitting || !code.trim()
                  ? 'bg-gray-500'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white px-4 py-2 rounded-lg shadow-md transition duration-200`}
            >
              {isCompiling ? 'Compiling...' : 'Compile & Run'}
            </button>

            <button
              onClick={handleSubmit}
              disabled={isCompiling || isSubmitting || !code.trim()}
              className={`${
                isCompiling || isSubmitting || !code.trim()
                  ? 'bg-gray-500'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white px-4 py-2 rounded-lg shadow-md transition duration-200`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Code'}
            </button>
          </div>

          {/* Rest of the component remains the same */}
          {testResults && (
            <div className="mt-4 p-4 rounded-lg bg-gray-800 ">
              {testResults.error ? (
                <div className="text-red-400 break-words whitespace-normal overflow-wrap-break-word">
                  Error: {testResults.error}
                  {testResults.details && (
                    <pre className="mt-2 text-sm overflow-x-auto whitespace-pre-wrap break-words">{JSON.stringify(testResults.details, null, 2)}</pre>
                  )}
                </div>
              ) : (
                <div className="text-white">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">
                      Test Results: {testResults.details.filter(r => r.passed).length} / {testResults.details.length} Passed
                    </h3>
                    {testResults.success && (
                      <div className="text-green-400 mt-2">{testResults.message}</div>
                    )}
                  </div>
                  {Array.isArray(testResults.details) && testResults.details.length > 0 ? (
                    testResults.details.map((result, index) => (
                      <div key={index} className="my-4 p-4 bg-gray-700 rounded whitespace-pre-wrap break-words">
                        <div className={`font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                          Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                        </div>
                        <div className="mt-2">
                          <div className="text-gray-300">Input:</div>
                          <pre className="bg-gray-800 p-2 mt-1">{testCases[index]?.input || 'N/A'}</pre>
                        </div>
                        <div className="mt-2">
                          <div className="text-gray-300">Expected Output:</div>
                          <pre className="bg-gray-800 p-2 mt-1">{result.expectedOutput}</pre>
                        </div>
                        <div className="mt-2">
                          <div className="text-gray-300">Your Output:</div>
                          <pre className="bg-gray-800 p-2 mt-1">{result.output}</pre>
                        </div>
                        {!result.passed && result.error && (
                          <div className="text-red-500 mt-2 whitespace-pre-wrap break-words">Error: {result.error}</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No test results to display.</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
