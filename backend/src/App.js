import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route (Jab app khulegi toh yahan jayegi) */}
        <Route path="/" element={<Login />} />
        
        {/* Map route */}
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;