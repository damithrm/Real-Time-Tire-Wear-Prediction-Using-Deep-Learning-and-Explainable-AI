import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold">Tire Wear Detection System</span>
        </div>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/details">Details</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
