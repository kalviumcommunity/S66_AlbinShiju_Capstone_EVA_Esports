// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import TournamentCard from '../components/TournamentCard';
import API from '../utils/api';

const Home = () => {
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
      <h1>Welcome to EVA Esports!</h1>
      {tournaments.map(tournament => (
        <TournamentCard key={tournament._id} {...tournament} />
      ))}
    </div>
  );
};

export default Home;
