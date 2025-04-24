import React, { useEffect, useState } from 'react';
import { fetchTournaments, fetchTournamentById } from '../utils/api';
import TournamentCard from '../components/TournamentCard';
import TeamCard from '../components/TeamCard';
import '../css/Brackets.css';

const Brackets = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoading(true);
        const response = await fetchTournaments();
        setTournaments(response.data);
      } catch {
        setError('Failed to load tournaments');
      } finally {
        setLoading(false);
      }
    };
    loadTournaments();
  }, []);

  const handleViewDetails = async (tournamentId) => {
    try {
      setLoading(true);
      const response = await fetchTournamentById(tournamentId);
      setSelectedTournament(response.data);
    } catch {
      setError('Failed to load tournament details');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedTournament(null);
    setError(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (selectedTournament) {
    const teams = selectedTournament.teams || [];
    return (
      <div className="brackets-page">
        <button className="back-button" onClick={handleBackToList}>Back to Tournaments</button>
        <h1>{selectedTournament.title} - Brackets</h1>
        <div className="brackets-container">
          {teams.length === 0 && <p>No teams registered for this tournament.</p>}
          {teams.length > 0 && (
            <div className="bracket">
              {teams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="brackets-page">
      <h1>All Tournaments</h1>
      <div className="tournament-list">
        {tournaments.map((tournament) => (
          <div key={tournament._id} className="tournament-card-wrapper">
            <TournamentCard tournament={tournament} />
            <button className="view-details-button" onClick={() => handleViewDetails(tournament._id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brackets;
