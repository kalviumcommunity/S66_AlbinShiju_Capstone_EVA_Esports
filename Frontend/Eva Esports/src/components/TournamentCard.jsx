import React from 'react';
import { FaBolt, FaUsers, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { PiShieldCheckBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import '../css/TournamentCard.css';

const TournamentCard = ({ tournament }) => {
  const { 
    title, 
    prizePool, 
    game, 
    date, 
    maxTeams, 
    registrationDeadline, 
    isRegistrationOpen, 
    registeredTeams = [] 
  } = tournament;
  
  const navigate = useNavigate();

  const handleViewBrackets = () => {
    navigate(`/brackets/${tournament._id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const registeredCount = registeredTeams?.length || 0;
  const registrationStatus = isRegistrationOpen ? 'Open' : 'Closed';
  const statusClass = isRegistrationOpen ? 'status-open' : 'status-closed';

  return (
    <div className="tournament-card">
      <div className="card-header">
        <span className="game-name">{game}</span>
        <PiShieldCheckBold className="shield-icon" />
      </div>
      
      <div className="card-body">
        <h3 className="tournament-title">{title}</h3>
        
        <div className="tournament-details">
          <div className="detail-item">
            <FaBolt className="icon" />
            <span>Prize Pool: ${prizePool?.toLocaleString()}</span>
          </div>
          
          <div className="detail-item">
            <FaUsers className="icon" />
            <span>{registeredCount}/{maxTeams} Teams Registered</span>
          </div>
          
          <div className="detail-item">
            <FaCalendarAlt className="icon" />
            <span>Tournament: {formatDate(date)}</span>
          </div>
          
          <div className="detail-item">
            <FaClock className="icon" />
            <span>Registration Deadline: {formatDateTime(registrationDeadline)}</span>
          </div>
        </div>
        
        <div className={`registration-status ${statusClass}`}>
          <span>Registration: {registrationStatus}</span>
        </div>
        
        <div className="card-actions">
          <button 
            className="view-button" 
            onClick={handleViewBrackets}
            disabled={!isRegistrationOpen && registeredCount === 0}
          >
            {isRegistrationOpen ? 'View Details' : 'View Brackets'}
          </button>
          
          {isRegistrationOpen && (
            <button className="register-button">
              Register Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
