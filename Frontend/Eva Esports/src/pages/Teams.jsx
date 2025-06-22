import React, { useEffect, useState } from 'react';
import { fetchTeams, createTeam } from '../utils/api';
import '../css/Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const getTeams = async () => {
    try {
      const response = await fetchTeams();
      setTeams(response.data);
      setError(null);
    } catch {
      setError('Error: Network Error');
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const openPopup = () => {
    setNewTeamName('');
    setFormError(null);
    setShowCreatePopup(true);
  };

  const closePopup = () => {
    setShowCreatePopup(false);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      setFormError('Team name is required');
      return;
    }
    setLoading(true);
    setFormError(null);
    try {
      await createTeam({ name: newTeamName.trim() });
      setLoading(false);
      setShowCreatePopup(false);
      getTeams();
    } catch{
      setLoading(false);
      setFormError('Failed to create team. Please try again.');
    }
  };

  return (
    <div className="teams-container">
      <h1 className="teams-title">Team Management</h1>

      <div className="team-panels">
        <div className="team-panel">
          <h2>Create New Team</h2>
          <div className="panel-content">
            <button className="btn btn-primary" onClick={openPopup}>
              <i className="fa-solid fa-user-plus"></i>
              <span>Create Team</span>
            </button>
          </div>
        </div>

        <div className="team-panel">
          <h2>Join Existing Team</h2>
          <div className="panel-content">
            <a href="/teams/browse" className="btn btn-secondary">
              <i className="fa-solid fa-users"></i>
              <span>Browse Teams</span>
            </a>
          </div>
        </div>
      </div>

      <div className="teams-list">
        <h2>Your Teams</h2>
        {error && <p className="error">{error}</p>}
        {!error && teams.length === 0 && <p>No teams yet.</p>}
        {!error && teams.length > 0 && (
          <ul>
            {teams.map(team => (
              <li key={team._id}>{team.name}</li>
            ))}
          </ul>
        )}
      </div>

      {showCreatePopup && (
        <div className="popup-overlay">
        <div className="team-panel popup-content team-popup">
            <h3>Create New Team</h3>
            <form onSubmit={handleCreateTeam}>
              <label htmlFor="teamName">Team Name</label>
              <input
                id="teamName"
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                disabled={loading}
                required
              />
              {formError && <p className="error">{formError}</p>}
              <div className="popup-buttons">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={closePopup} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
