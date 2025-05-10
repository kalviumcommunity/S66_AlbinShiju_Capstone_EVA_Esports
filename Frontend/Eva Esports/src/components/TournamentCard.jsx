import React from 'react';
import { FaBolt, FaUsers } from 'react-icons/fa';
import { PiShieldCheckBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import '../css/TournamentCard.css';

const TournamentCard = ({ tournament }) => {
  const { title, prizePool, teams, date, game, _id } = tournament;
  const navigate = useNavigate();

  const handleViewBrackets = () => {
    navigate(`/brackets/${_id}`);
  };

  return (
    <div className="tournament-card">
      <div className="card-header">
        <span className="game-name">{game}</span>
        <PiShieldCheckBold className="shield-icon" />
      </div>
      <h3 className="tournament-title">{title}</h3>
      <p className="prize">
        <FaBolt className="icon" /> Prize Pool: ${prizePool.toLocaleString()}
      </p>
      <p className="teams">
        <FaUsers className="icon" /> {teams} Teams
      </p>
      <p className="date">{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <button className="view-button" onClick={handleViewBrackets}>View Brackets</button>
    </div>
  );
};

export default TournamentCard;
