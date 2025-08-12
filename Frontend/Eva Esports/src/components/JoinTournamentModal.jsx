import React, { useState, useEffect } from 'react';
import { fetchTeams } from '../utils/api';
import { joinTournament } from '../utils/api';
import '../css/TournamentCard.css';

const JoinTournamentModal = ({ isOpen, onClose, tournament, onSuccess }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadUserTeams();
    }
  }, [isOpen]);

  const loadUserTeams = async () => {
    try {
      const response = await fetchTeams();
      setTeams(response.data.data || []);
    } catch (err) {
      setError('Failed to load teams');
    }
  };

  const handleJoinTournament = async () => {
    if (!selectedTeam) {
      setError('Please select a team');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await joinTournament(tournament._id, selectedTeam);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join tournament');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Join Tournament: {tournament?.title}</h2>
        
        <div className="tournament-info">
          <p><strong>Game:</strong> {tournament?.game}</p>
          <p><strong>Prize Pool:</strong> ${tournament?.prizePool?.toLocaleString()}</p>
          <p><strong>Max Teams:</strong> {tournament?.registeredTeams?.length || 0} / {tournament?.maxTeams || 16}</p>
          <p><strong>Registration Deadline:</strong> {new Date(tournament?.registrationDeadline).toLocaleDateString()}</p>
        </div>

        <div className="form-group">
          <label>Select Your Team:</label>
          <select 
            value={selectedTeam} 
            onChange={(e) => setSelectedTeam(e.target.value)}
            disabled={loading}
          >
            <option value="">Choose a team...</option>
            {teams.map(team => (
              <option key={team._id} value={team._id}>{team.name}</option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-actions">
          <button 
            onClick={handleJoinTournament} 
            disabled={loading || !selectedTeam}
            className="join-button"
          >
            {loading ? 'Joining...' : 'Join Tournament'}
          </button>
          <button onClick={onClose} disabled={loading} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinTournamentModal;
