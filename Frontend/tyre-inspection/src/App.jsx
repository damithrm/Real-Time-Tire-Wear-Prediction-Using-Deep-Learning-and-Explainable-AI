import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Issues from './pages/Issues';
import logo from './assets/logo.png';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
            <h1 className="text-white text-2xl">Tire Wear Detection System</h1>
          </div>
          <div className="text-white">
            <a href="/" className="px-4">Home</a>
            <a href="/issues" className="px-4">Issues</a>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<Issues />} />
        </Routes>
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          &copy; 2024 Tire Wear Detection System. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
