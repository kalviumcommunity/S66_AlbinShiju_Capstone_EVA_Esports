import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeams } from '../utils/api';
import '../css/Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetchTeams();
        setTeams(response.data);
      } catch {
        setError('Error: Network Error');
      }
    };
    getTeams();
  }, []);

  return (
    <div className="teams-container">
      <h1 className="teams-title">Team Management</h1>

      <div className="team-panels">
        <div className="team-panel">
          <h2>Create New Team</h2>
          <div className="panel-content">
            <Link to="/teams/create" className="btn btn-primary">
              <i className="fa-solid fa-user-plus"></i>
              <span>Create Team</span>
            </Link>
          </div>
        </div>

        <div className="team-panel">
          <h2>Join Existing Team</h2>
          <div className="panel-content">
            <Link to="/teams/browse" className="btn btn-secondary">
              <i className="fa-solid fa-users"></i>
              <span>Browse Teams</span>
            </Link>
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
    </div>
  );
};

export default Teams;
