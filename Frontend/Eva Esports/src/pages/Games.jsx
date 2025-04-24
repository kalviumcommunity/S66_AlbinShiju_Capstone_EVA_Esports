// src/pages/Games.jsx
import React from 'react';
import gamesData from '../utils/games.json';
import GameCard from '../components/GameCard';
import '../css/Games.css';

const Games = () => {
  return (
    <div className="games-page">
      <h2 className="section-title">
        <span className="icon">🎮</span> Popular Games
      </h2>
      <div className="games-grid">
        {gamesData.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            year={game.year}
            banner={game.banner}
            players={`${(10 + index * 5)}M+`} // Example mock player count
            tournaments={Math.floor(Math.random() * 100)} // Example mock tournament count
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
