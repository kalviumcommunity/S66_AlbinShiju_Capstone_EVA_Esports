// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import TournamentCard from '../components/TournamentCard';
import { fetchTournaments } from '../utils/api';

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTournaments = async () => {
      try {
        const tournamentsData = await fetchTournaments();
        setTournaments(tournamentsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch tournaments');
      } finally {
        setLoading(false);
      }
    };
    getTournaments();
  }, []);

  if (loading) return <div>Loading tournaments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to EVA Esports!</h1>
      {tournaments.map(tournament => (
        <TournamentCard key={tournament._id} {...tournament} />
      ))}
    </div>
  );
};

export default Home;
