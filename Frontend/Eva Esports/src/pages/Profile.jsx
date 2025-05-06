import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { fetchUserProfile } from "../utils/api"; // this calls your Node.js backend
import {
  FaTrophy,
  FaUsersCog,
  FaWrench,
  FaClock,
  FaStar,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import "../css/Profile.css";

const Profile = () => {
  const { user: firebaseUser, setUser, loading } = useAuth();
  const [profile, setProfile] = useState(null); // <-- your own backend profile
  const [error, setError] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const isGuest = !firebaseUser;

  useEffect(() => {
    const loadProfile = async () => {
      if (firebaseUser && localStorage.getItem("token")) {
        try {
          const profileData = await fetchUserProfile();
          console.log(profileData);
          // call your backend
          setProfile(profileData);
        } catch (err) {
          console.error(err);
          setError("Failed to load profile info.");
        }
      }
    };
    loadProfile();
  }, [firebaseUser]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const displayName =
    profile?.data.username || firebaseUser?.data.displayName || "Player";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar">
          <div className="avatar-icon-wrapper">
            <div className="avatar-icon">
              <FaUser size={50} />
              <div className="edit-icon">
                <FaWrench size={16} />
              </div>
              <div className="hover-message">Edit your profile</div>
            </div>
          </div>
          <div className="user">
            <h2>{isGuest ? "Guest User" : displayName}</h2>
            <p>
              {isGuest
                ? "Complete your profile to join tournaments"
                : firebaseUser.email}
            </p>
          </div>
        </div>

        {isGuest && (
          <div className="guest-buttons">
            <button className="primary-btn" onClick={() => setShowSignIn(true)}>
              <FaSignInAlt /> Sign In
            </button>
            <button
              className="secondary-btn"
              onClick={() => setShowSignUp(true)}
            >
              <FaUserPlus /> Sign Up
            </button>
          </div>
        )}
      </div>

      <div className="side-panel">
        <div className="card quick-actions">
          <h3>
            <FaStar /> Quick Actions
          </h3>
          <button disabled={isGuest}>
            <FaTrophy /> Join Tournament
          </button>
          <button disabled={isGuest}>
            <FaUsersCog /> Find Team
          </button>
          <button disabled={isGuest}>
            <FaWrench /> Settings
          </button>
        </div>

        <div className="card recent-activity">
          <h3>
            <FaClock /> Recent Activity
          </h3>
          {isGuest ? (
            <p>Sign in to track your gaming activity.</p>
          ) : (
            <p>
              Welcome back {displayName}! Start joining tournaments to track
              your activity.
            </p>
          )}
        </div>
      </div>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
};

export default Profile;
