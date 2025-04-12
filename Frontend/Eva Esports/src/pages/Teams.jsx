// src/pages/Teams.jsx
import React, { useEffect, useState } from 'react';
import { fetchTeams, deleteTeam } from '../utils/api';
import TeamCard from '../components/TeamCard';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTeams = async () => {
    try {
      const teamsData = await fetchTeams();
      setTeams(teamsData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleDelete = async (teamId) => {
    try {
      await deleteTeam(teamId);
      setTeams(teams.filter(team => team._id !== teamId));
    } catch (err) {
      setError(err.message || 'Failed to delete team');
    }
  };

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teams-page">
      <h1>Teams</h1>
      <div className="teams-grid">
        {teams.map(team => (
          <TeamCard 
            key={team._id} 
            team={team} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;
