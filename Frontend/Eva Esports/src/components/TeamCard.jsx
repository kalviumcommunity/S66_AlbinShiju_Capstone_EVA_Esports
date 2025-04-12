import React from 'react';
import { deleteTeam } from '../utils/api';

const TeamCard = ({ team, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this team?');
    if (confirmDelete) {
      try {
        await deleteTeam(team._id);
        onDelete(team._id); // Call the onDelete prop to update the parent component
      } catch (error) {
        console.error('Failed to delete team:', error);
      }
    }
  };

  return (
    <div className="team-card">
      <h2>{team.name}</h2>
      <button onClick={handleDelete}>Delete Team</button>
    </div>
  );
};

export default TeamCard;
