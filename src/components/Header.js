import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-800 to-neutral-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-5">CodeForge</h1>
        <nav>
          <ul className="flex space-x-4 mr-20 gap-4">
            <li>
              <Link to="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-500">Signup</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

