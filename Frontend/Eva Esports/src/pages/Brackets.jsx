import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTournaments, fetchTournamentById } from '../utils/api';
import TournamentCard from '../components/TournamentCard';
import TeamCard from '../components/TeamCard';
import { Trophy } from 'lucide-react';
import '../css/Brackets.css';

const Brackets = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
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

    if (!tournamentId) {
      loadTournaments();
      setSelectedTournament(null);
    }
  }, [tournamentId]);

  useEffect(() => {
    const loadTournamentById = async (id) => {
      try {
        setLoading(true);
        const response = await fetchTournamentById(id);
        setSelectedTournament(response.data);
      } catch {
        setError('Failed to load tournament details');
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      loadTournamentById(tournamentId);
    }
  }, [tournamentId]);

  const handleBackToList = () => {
    setSelectedTournament(null);
    setError(null);
    navigate('/brackets');
  };

  if (loading) return <div className="brackets-loading">Loading...</div>;
  if (error) return <div className="brackets-error">{error}</div>;

  if (selectedTournament) {
    const teams = selectedTournament.teams || [];
    return (
      <div className="brackets-page">
        <button className="back-button" onClick={handleBackToList}>
          ← Back to Tournaments
        </button>
        <h1 className="brackets-title">
          <Trophy size={28} style={{ marginRight: '10px' }} />
          {selectedTournament.title} - Brackets
        </h1>
        <div className="brackets-container">
          {teams.length === 0 ? (
            <p className="brackets-empty-message">No teams registered for this tournament.</p>
          ) : (
            <div className="bracket-grid">
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
      <h1 className="brackets-title">
        <Trophy size={28} style={{ marginRight: '10px' ,color: 'purple'}} />
        Tournament Brackets
      </h1>
      <div className="brackets-section">
        <h2 className="brackets-subtitle">Active Tournament Brackets</h2>
        <div className="tournament-list">
          {tournaments.map((tournament) => (
            <div key={tournament._id} className="tournament-card-wrapper">
              <TournamentCard tournament={tournament} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brackets;
