import React, { useEffect, useState } from 'react';
import '../css/Profile.css';
import { fetchUserProfile } from '../utils/api';
import { useAuth } from '../utils/auth';
import { FaTrophy, FaMedal, FaCrown, FaUser, FaSignInAlt, FaUserPlus, FaUsersCog, FaWrench, FaClock, FaStar } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const getProfile = async () => {
        try {
          const profileData = await fetchUserProfile();
          setProfile(profileData);
        } catch (err) {
          setError(err.message || 'Failed to fetch profile');
        } finally {
          setLoading(false);
        }
      };
      getProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar">
          <div className="avatar-icon">
            <FaUser size={60} />
          </div>
          <div className='user'>
            <h2>Guest User</h2>
            <p>Complete your profile to join tournaments</p>
          </div>
        </div>
        
        <div className="guest-buttons">
          <button className="primary-btn" aria-label="Sign in to your account">
            <FaSignInAlt /> Sign In
          </button>
          <button className="secondary-btn" aria-label="Create a new account">
            <FaUserPlus /> Sign Up
          </button>
        </div>
        <div className="stats-row">
          <div className="stat-card">
            <FaTrophy className="icon gold" />
            <p className="value">0</p>
            <p className="label">Tournaments</p>
          </div>
          <div className="stat-card">
            <FaMedal className="icon purple" />
            <p className="value">0</p>
            <p className="label">Achievements</p>
          </div>
          <div className="stat-card">
            <FaCrown className="icon yellow" />
            <p className="value">0</p>
            <p className="label">Victories</p>
          </div>
        </div>
      </div>

      <div className="side-panel">
        <div className="card quick-actions">
          <h3><FaStar /> Quick Actions</h3>
          <button disabled title="Sign in to join tournaments">
            <FaTrophy /> Join Tournament
          </button>
          <button disabled title="Sign in to find a team">
            <FaUsersCog /> Find Team
          </button>
          <button disabled title="Sign in to access settings">
            <FaWrench /> Settings
          </button>
        </div>

        <div className="card recent-activity">
          <h3><FaClock /> Recent Activity</h3>
          <p>Sign in to track your gaming activity.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;