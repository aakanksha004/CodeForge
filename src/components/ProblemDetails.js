import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProblemById } from '../api';
import CodeEditor from './CodeEditor';

const ProblemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        // If we have state from the navigation, use that instead of fetching
        if (location.state?.problem) {
          setProblem(location.state.problem);
          setLoading(false);
          return;
        }

        const data = await getProblemById(id);
        setProblem(data);
      } catch (error) {
        console.error('Error fetching problem details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id, location.state]);

  if (loading) {
    return <div className="text-white">Loading problem details...</div>;
  }

  if (!problem) {
    return <div className="text-white">Problem not found.</div>;
  }

  const difficultyClass = {
    easy: 'bg-green-500 text-white',
    medium: 'bg-yellow-500 text-white',
    hard: 'bg-red-500 text-white',
  }[problem.difficulty.toLowerCase()] || 'bg-gray-500 text-white';

  return (
    <div className="bg-gray-900 text-white h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left side - Problem Details */}
        <div className="relative overflow-y-auto px-6 py-4 custom-scrollbar">
          {/* Difficulty Tag on Top-Right of the Left Side */}
          <div className="absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-semibold flex items-center justify-center space-x-2">
            <span className={`px-4 py-1 rounded-full text-white font-semibold ${difficultyClass}`}>
              {problem.difficulty}
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{problem.title}</h2>
            <p className="text-gray-300">{problem.description}</p>

            <div>
              <h3 className="text-xl font-semibold">Input:</h3>
              <pre className="bg-gray-800 text-white p-4 rounded whitespace-pre-wrap break-">{problem.input}</pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Output:</h3>
              <pre className="bg-gray-800 text-white p-4 rounded whitespace-pre-wrap break-words">{problem.output}</pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Tags:</h3>
              <div className="mt-2">
                {problem.tags && problem.tags.map((tag, index) => (
                  <span key={index} className="tag bg-gray-700 text-white py-1 px-2 rounded mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Examples:</h3>
              {problem.testCases.map((testCase, index) => (
                <div key={index} className="mt-2">
                  <div className="font-semibold">Example {index + 1}:</div>
                  <div className="bg-gray-800 text-white p-4 rounded">
                    <div>
                      <span className="font-bold">Input: </span>
                      <pre className="whitespace-pre-wrap break-words">{testCase.input}</pre>
                    </div>
                    <div>
                      <span className="font-bold">Output: </span>
                      <pre className="whitespace-pre-wrap break-words">{testCase.expectedOutput}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold">Constraints:</h3>
              <pre className="bg-gray-800 text-white p-4 rounded whitespace-pre-wrap break-words">{problem.constraints}</pre>
            </div>
          </div>
        </div>

        {/* Right side - Code Editor */}
        <div className="h-screen bg-neutral-800">
          <CodeEditor problemId={id} testCases={problem.testCases}  />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
