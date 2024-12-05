import axios from 'axios';

// Base Axios instance for API calls
const api = axios.create({
  baseURL: 'https://codeforge-h7gg.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



//new function to check if a problem has a solution
export const checkSolutionStatus = async (problemId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/solutions/${problemId}`);
      return response.data.solution !== null;
    } catch (error) {
      console.error('Error checking solution status:', error);
      return false;
    }
  };

export const getAllProblems = async () => {
  try {
    const response = await api.get('/problems');
    return response.data.problems || [];
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
};

export const createProblem = async (problemData) => {
    try {
      console.log('Sending problem data:', problemData);
      const response = await api.post('/problems', problemData);
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating problem:', error);
      console.error('Error details:', error.response?.data);
      throw error;
    }
  };


export const getProblemById = async (id) => {
  try {
    const response = await api.get(`/problems/${id}`);
    return response.data.problem;
  } catch (error) {
    console.error(`Error fetching problem with id ${id}:`, error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Remove duplicate getProblems since it's the same as getAllProblems
