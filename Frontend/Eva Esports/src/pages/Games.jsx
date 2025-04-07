// src/pages/Games.jsx
import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import API from '../utils/api';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await API.get('/games');
      setGames(data);
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Games</h1>
      {games.map(game => (
        <GameCard key={game._id} {...game} />
      ))}
    </div>
  );
};

export default Games;
