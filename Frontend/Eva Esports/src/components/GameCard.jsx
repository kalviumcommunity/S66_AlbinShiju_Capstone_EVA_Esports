// src/components/GameCard.jsx
import React from 'react';
import '../css/GameCard.css';

const GameCard = ({ title, year, banner, players, tournaments }) => {
  return (
    <div className="game-card">
      <img src={banner} alt={`${title} banner`} className="game-banner" />
      <div className="card-overlay">
        <h3 className="game-title">{title}</h3>
        <div className="game-meta">
          <p>👥 {players} Players</p>
          <p>🏆 {tournaments} Active Tournaments</p>
        </div>
        <button className="tournament-button">View Tournaments</button>
      </div>
    </div>
  );
};

export default GameCard;
