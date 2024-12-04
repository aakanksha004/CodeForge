import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
   
      <button
        onClick={() => navigate('/')}
        className="relative group overflow-hidden text-white p-3 rounded-3xl flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-900"
      >
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-900 via-purple-600 to-indigo-700 transition-all duration-500 ease-out group-hover:w-full" />
        <span className="flex items-center gap-2 relative z-10">
          <ArrowBack className="w-5 h-5" />
          <span className="font-medium">Go Back to Dashboard</span>
        </span>
      </button>

  );
};

export default BackButton;
