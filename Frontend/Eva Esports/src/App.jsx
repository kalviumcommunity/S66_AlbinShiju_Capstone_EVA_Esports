// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import Teams from './pages/Teams';
import Tournaments from './pages/Tournaments';
import Profile from './pages/Profile';
import Brackets from './pages/Brackets';
// import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/brackets" element={<Brackets />} />
        <Route path="/brackets/:tournamentId" element={<Brackets />} />
      </Routes>
    </Router>
  );
};

export default App;
