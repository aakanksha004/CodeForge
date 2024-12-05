import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Assuming you've defined loginUser in your API calls
import backgroundImage from '../bg5.jpg';
import WelcomeSection from './WelcomeSection';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        navigate('/'); // Redirect to the dashboard or home page after successful login
      } else {
        setError('Invalid credentials');
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
        <WelcomeSection/>
    <div className="container mx-auto mt-10 max-w-md bg-black p-14 rounded-3xl ">

      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
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
            placeholder='Enter your E-mail'
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
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
            placeholder='Enter your password'
            className="w-full p-2 border border-gray-300 rounded-md mb-10 focus:outline-none bg-gray-100"
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#007bff] via-[#00d4ff] to-[#00ffbc] hover: text-white p-2 rounded-md mt-8">Login</button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
      </p>
    </div>
   
    </div>
  );
};

export default LoginForm;
