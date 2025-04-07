
import React from 'react';

const TournamentCard = ({ title, prizePool, teams }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>Prize Pool: ${prizePool}</p>
      <p>Teams: {teams}</p>
    </div>
  );
};

export default TournamentCard;
