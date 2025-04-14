import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUser } from '../utils/api';
import { useAuth } from '../utils/auth';

const Profile = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // After successful login, fetch profile
      const profileData = await fetchUserProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfile({});
    } catch (err) {
      setError(err.message || 'Logout failed');
    }
  };

  // Fetch user profile when authenticated
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const updatedUser = await updateUser(profile._id, formData);
      setProfile(updatedUser);
      alert('Avatar updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update avatar');
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="profile-header">
            <h1>{`Welcome, ${profile.name || user.email}!`}</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="profile-stats">
            <p>Tournaments: {profile.tournaments || 0}</p>
            <p>Achievements: {profile.achievements || 0}</p>
            <p>Victories: {profile.victories || 0}</p>
          </div>
        </>
      ) : (
        <div className="login-form">
          <h1>Login to Your Profile</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Avatar upload section */}
      <div>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleAvatarUpload}>Upload Avatar</button>
        {preview && <img src={preview} alt="Preview" style={{width: '100px'}} />}
      </div>

      {/* Show existing avatar */}
      {profile.avatar && (
        <img 
          src={profile.avatar} 
          alt="Profile" 
          style={{width: '200px'}}
        />
      )}
    </div>
  );
};

export default Profile;
