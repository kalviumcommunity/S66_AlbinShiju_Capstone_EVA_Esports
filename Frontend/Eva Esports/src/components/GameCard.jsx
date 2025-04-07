
import React from 'react';

const GameCard = ({ name, players }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Players: {players}</p>
    </div>
  );
};

export default GameCard;
