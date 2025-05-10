// src/pages/Games.jsx
import React from 'react';
import gamesData from '../utils/games.json';
import GameCard from '../components/GameCard';
import { Gamepad2 } from 'lucide-react';
import '../css/Games.css';

const Games = () => {
  return (
    <div className="games-page">
      <h2 className="section-title">
        <span className="icon"><Gamepad2 size={45} style={{ paddingTop: "6px" , marginRight: '5px' ,color: 'purple'}}/></span> Popular Games
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
