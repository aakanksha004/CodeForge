// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Your global styles (e.g., Tailwind or custom styles)
import App from './App'; // Main component of your application
import { BrowserRouter as Router } from 'react-router-dom'; // For routing

// This is where you can wrap your app in any global context providers if needed (e.g., AuthProvider, etc.)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root') // The element where your app will be mounted
);

