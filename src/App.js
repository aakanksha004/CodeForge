import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProblemDetails from './components/ProblemDetails';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import DesignQuestion from './components/DesignQuestion';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
        <Route path="/design-question" element={<DesignQuestion/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
