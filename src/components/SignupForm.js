// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../api'; // Assuming you've defined registerUser in your API calls
// import backgroundImage from '../bg5.jpg';
// import WelcomeSection from './WelcomeSection';


// const SignupForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }
//     try {
//       const response = await registerUser({ email, password });
//       if (response.success) {
//         navigate('/login'); // Redirect to login page after successful signup
//       } else {
//         setError('Something went wrong');
//       }
//     } catch (err) {
//       setError('Something went wrong');
//     }
//   };

//   return (
//     <div 
//     className="min-h-screen text-white p-8"
//     style={{
//       backgroundImage: `url(${backgroundImage})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}
//   >
//     <WelcomeSection/>
//     <div className="container mx-auto mt-10 max-w-md bg-black p-14">
//       <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder='Enter your email'
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder='Enter password'
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             placeholder='Enter Password again'
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md mb-10 focus:outline-none bg-gray-100"
//           />
//         </div>
//         <button type="submit" className="w-full bg-gradient-to-r from-[#007bff] via-[#00d4ff] to-[#00ffbc] text-white p-2 rounded-md">Sign Up</button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account? <a href="/login" className="text-blue-500">Login</a>
//       </p>
//     </div>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

// Lazy load the heavy components
const backgroundImage = new URL('../bg5.jpg', import.meta.url).href;
const WelcomeSection = React.lazy(() => import('./WelcomeSection'));

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      setImageLoaded(true);
      setIsLoading(false);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await registerUser({ 
        email: formData.email, 
        password: formData.password 
      });
      
      if (response.success) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen text-white p-8 transition-opacity duration-500 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000', // Fallback while image loads
      }}
    >
      <Suspense fallback={
        <div className="animate-pulse bg-gray-800 h-32 rounded-lg mb-4"></div>
      }>
        <WelcomeSection />
      </Suspense>

      <div className="container mx-auto mt-10 max-w-md bg-black p-14 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        
        {error && (
          <div className="text-red-500 text-center bg-red-500/10 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='Enter your email'
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='Enter password'
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Enter Password again'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md mb-10 focus:outline-none bg-gray-100 text-black"
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={`w-full bg-gradient-to-r from-[#007bff] via-[#00d4ff] to-[#00ffbc] text-white p-2 rounded-md transition-opacity duration-200 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-400 transition-colors">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
