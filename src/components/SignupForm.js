import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api'; // Assuming you've defined registerUser in your API calls
import backgroundImage from '../bg5.jpg';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await registerUser({ email, password });
      if (response.success) {
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div 
    className="min-h-screen text-white p-8"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="container mx-auto mt-10 max-w-md bg-black p-14">
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-10"
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-900 text-white p-2 rounded-md">Sign Up</button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
    </div>
  );
};

export default SignupForm;
