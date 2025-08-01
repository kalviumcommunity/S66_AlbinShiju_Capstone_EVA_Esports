import React, { useEffect, useState } from 'react';
import { fetchTeams, createTeam, fetchTournaments } from '../utils/api';
import { useAuth } from '../utils/auth';
import TeamCard from '../components/TeamCard';
import '../css/Teams.css';

const Teams = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [tournaments, setTournaments] = useState([]);
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

  const getTournaments = async () => {
    try {
      const response = await fetchTournaments();
      setTournaments(response.data);
    } catch {
      // Handle error silently or set error state if needed
    }
  };

  useEffect(() => {
    getTeams();
    getTournaments();
  }, []);

  const openPopup = () => {
    setNewTeamName('');
    setSelectedTournament('');
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
    if (!selectedTournament) {
      setFormError('Please select a tournament');
      return;
    }
    setLoading(true);
    setFormError(null);
    try {
      await createTeam({ name: newTeamName.trim(), tournamentId: selectedTournament });
      setLoading(false);
      setShowCreatePopup(false);
      getTeams();
    } catch {
      setLoading(false);
      setFormError('Failed to create team. Please try again.');
    }
  };

  const handleDelete = (deletedTeamId) => {
    setTeams((prevTeams) => prevTeams.filter(team => team._id !== deletedTeamId));
  };

  // Filter teams where logged-in user is a member
  const userTeams = teams.filter(team => user && team.members.includes(user.uid));

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
        {!error && userTeams.length === 0 && <p>No teams yet.</p>}
        {!error && userTeams.length > 0 && (
          <ul>
            {userTeams.map(team => (
              <li key={team._id}>
                <TeamCard team={team} onDelete={handleDelete} />
              </li>
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
              <label htmlFor="tournamentSelect">Select Tournament</label>
              <select
                id="tournamentSelect"
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                disabled={loading}
                required
              >
                <option value="">-- Select a tournament --</option>
                {tournaments.map(tournament => (
                  <option key={tournament._id} value={tournament._id}>
                    {tournament.name}
                  </option>
                ))}
              </select>
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
