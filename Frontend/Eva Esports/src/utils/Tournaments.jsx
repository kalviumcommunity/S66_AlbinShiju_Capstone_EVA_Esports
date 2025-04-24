import React, { useEffect, useState } from 'react';
import '../css/Tournaments.css';
import { fetchTournaments } from './api';

import TournamentCard from '../components/TournamentCard';
import { FaTrophy } from 'react-icons/fa';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTournaments = async () => {
      try {
        const tournamentsData = await fetchTournaments();
        setTournaments(tournamentsData.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch tournaments');
      } finally {
        setLoading(false);
      }
    };
    getTournaments();
  }, []);

  if (loading) return <div className="loading-message">Loading tournaments...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="tournaments-page">
      <h1 className="tournaments-heading">
        <FaTrophy className="heading-icon" /> All Tournaments
      </h1>
      <div className="tournament-list">
        {tournaments.map(tournament => (
          <TournamentCard key={tournament._id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
