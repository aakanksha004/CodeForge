import React, { useState } from 'react';
import Header from './Header';
import backgroundImage from '../bg4.jpg';
import { createProblem } from '../api';
import BackButton from './BackButton';

const DesignQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    input: '',
    output: '',
    constraints: '',
    tags: '',
    difficulty: 'Easy',
    testCases: [{ input: '', expectedOutput: '' }],
    solutions: {
      youtube: [''],
      resources: [''],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.map((testCase, i) => 
        i === index ? { ...testCase, [name]: value } : testCase
      ),
    }));
  };

  const addTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: '', expectedOutput: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      // Format the data before sending
      const formattedData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        input: formData.input.trim(),
        output: formData.output.trim(),
        constraints: formData.constraints.trim(),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        difficulty: formData.difficulty,
        testCases: formData.testCases.filter(tc => tc.input.trim() && tc.expectedOutput.trim()),
        solutions: {
          youtube: formData.solutions.youtube.filter(Boolean),
          resources: formData.solutions.resources.filter(Boolean),
        },
      };

      console.log('Submitting data:', formattedData);
      
      const response = await createProblem(formattedData);
      console.log('Server response:', response);
      
      alert('Problem created successfully!');
      
      // Clear the form
      setFormData({
        title: '',
        description: '',
        input: '',
        output: '',
        constraints: '',
        tags: '',
        difficulty: 'Easy',
        testCases: [{ input: '', expectedOutput: '' }],
        solutions: {
          youtube: [''],
          resources: [''],
        },
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error creating problem: ${error.message || 'Unknown error occurred'}`);
    }
  };

  return (
    <>
      <Header/>
      <div 
        className="min-h-screen text-white p-8 z-9"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <BackButton className="z-10"/>
        <div className="max-w-2xl mx-auto p-5 bg-gray-900">
          <h2 className="text-2xl font-semibold mb-5">Design a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border-none rounded bg-gray-700 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border-none rounded bg-gray-700 focus:outline-none"
              required
            />
            <textarea
              name="input"
              placeholder="Input"
              value={formData.input}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
              required
            />
            <textarea
              name="output"
              placeholder="Output"
              value={formData.output}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
              required
            />
            <input
              type="text"
              name="constraints"
              placeholder="Constraints"
              value={formData.constraints}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
            />
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <div>
              <h3 className="text-xl font-semibold mb-3">Test Cases</h3>
              {formData.testCases.map((testCase, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    name="input"
                    placeholder={`Input for Test Case ${index + 1}`}
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(index, e)}
                    className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
                    required
                  />
                  <input
                    type="text"
                    name="expectedOutput"
                    placeholder={`Expected Output for Test Case ${index + 1}`}
                    value={testCase.expectedOutput}
                    onChange={(e) => handleTestCaseChange(index, e)}
                    className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTestCase}
                className="bg-green-500 text-white p-2 rounded mt-3"
              >
                + Add Test Case
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Solutions</h3>
              <input
                type="text"
                name="youtube"
                placeholder="Youtube Video URL"
                value={formData.solutions.youtube[0]}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    solutions: {
                      ...prev.solutions,
                      youtube: [e.target.value],
                    },
                  }))
                }
                className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded"
              />
              <input
                type="text"
                name="resources"
                placeholder="Additional Resources Link"
                value={formData.solutions.resources[0]}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    solutions: {
                      ...prev.solutions,
                      resources: [e.target.value],
                    },
                  }))
                }
                className="w-full p-3 border-none bg-gray-700 focus:outline-none rounded mt-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white p-3 rounded-lg w-full"
            >
              Submit Problem
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DesignQuestion;