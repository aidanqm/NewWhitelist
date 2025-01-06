import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Casino from './pages/Casino';
import Services from './pages/Services';
import Stickers from './pages/Stickers';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-purple-400">TAD Casino</Link>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/casino" className="hover:text-purple-400 transition-colors">Casino</Link>
            <Link to="/services" className="hover:text-purple-400 transition-colors">Services</Link>
            <Link to="/stickers" className="hover:text-purple-400 transition-colors">Stickers</Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stickers" element={<Stickers />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
