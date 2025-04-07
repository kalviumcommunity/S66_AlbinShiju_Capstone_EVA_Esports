// src/pages/Teams.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await API.get('/teams');
      setTeams(data);
    };
    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team._id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
