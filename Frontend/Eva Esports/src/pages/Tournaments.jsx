// src/pages/Tournaments.jsx
import React, { useEffect, useState } from 'react';
import { fetchTournaments } from '../utils/api';
import TournamentCard from '../components/TournamentCard';

const Tournaments = () => {
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
      <h1>Tournaments</h1>
      <div>
        {tournaments.map(tournament => (
          <TournamentCard key={tournament._id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
