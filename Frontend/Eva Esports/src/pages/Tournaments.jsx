// src/pages/Tournaments.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data } = await API.get('/tournaments');
      setTournaments(data);
    };
    fetchTournaments();
  }, []);

  return (
    <div>
      <h1>Tournaments</h1>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament._id}>{tournament.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tournaments;
