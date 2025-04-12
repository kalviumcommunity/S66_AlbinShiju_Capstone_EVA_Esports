// src/pages/Games.jsx
import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import { fetchGames } from '../utils/api';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGames = async () => {
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (err) {
        setError(err.message || 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };
    getGames();
  }, []);

  if (loading) return <div>Loading games...</div>;
  if (error) return <div>Error: {error}</div>;

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
