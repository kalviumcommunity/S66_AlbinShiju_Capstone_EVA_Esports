// src/pages/Teams.jsx
import React, { useEffect, useState } from 'react';
import { fetchTeams } from '../utils/api';
import TeamCard from '../components/TeamCard';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teams-page">
      <h1>Teams</h1>
      <div className="teams-grid">
        {teams.map(team => (
          <TeamCard key={team._id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
