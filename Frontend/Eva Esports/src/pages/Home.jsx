import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTournaments } from '../utils/api';
import TournamentCard from '../components/TournamentCard';
import { Trophy, Users, Gamepad2 } from 'lucide-react';
import '../css/Home.css';

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTournaments = async () => {
      try {
        const tournamentsData = await fetchTournaments();
        setTournaments(tournamentsData.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch tournaments');
      } finally {
        setLoading(false);
      }
    };
    getTournaments();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to the Future of Esports</h1>
        <p className="hero-subtitle">
          Join the elite gaming community. Compete in tournaments, form teams, and rise to glory.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate('/tournaments')} aria-label="Browse Tournaments">
            <Trophy className="icon" size={18} />
            Browse Tournaments
          </button>
          <button className="outline-btn" onClick={() => navigate('/create-team')} aria-label="Create Team">
            <Users className="icon" size={18} />
            Create Team
          </button>
        </div>
      </div>

      {/* Featured Tournaments */}
      <div className="featured-section">
        <h2 className="featured-title">Featured Tournaments</h2>
        <p className="featured-subtitle">Don't miss out on these exciting competitions</p>

        {loading && (
          <div className="tournament-grid">
            {[1, 2, 3 , 4].map((i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="error">Unable to load tournaments at the moment. Please try again later.</p>
        )}

        {!loading && !error && tournaments.length === 0 && (
          <p className="info">No tournaments available right now.</p>
        )}

        {!loading && !error && tournaments.length > 0 && (
          <div className="tournament-grid">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament._id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Boxes */}
      <div className="cta-section">
        <div className="cta-card">
          <Gamepad2 className="cta-icon green" size={32} />
          <h3 className="cta-title">Join Tournaments</h3>
          <p className="cta-text">Compete in various games and win prizes</p>
          <button className="cta-button" onClick={() => navigate('/games')} aria-label="Browse Games">
            Browse Games
          </button>
        </div>
        <div className="cta-card">
          <Users className="cta-icon blue" size={32} />
          <h3 className="cta-title">Form Your Team</h3>
          <p className="cta-text">Create or join competitive teams</p>
          <button className="cta-button" onClick={() => navigate('/teams')} aria-label="Team Management">
            Team Management
          </button>
        </div>
        <div className="cta-card">
          <Users className="cta-icon purple" size={32} />
          <h3 className="cta-title">Player Profile</h3>
          <p className="cta-text">Track your progress and achievements</p>
          <button className="cta-button" onClick={() => navigate('/profile')} aria-label="View Profile">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
