import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUser } from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  useEffect(() => {
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
  }, []);

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
    <div>
      <h1>{`Welcome, ${profile.name || 'Guest'}!`}</h1>
      <p>Tournaments: {profile.tournaments || 0}</p>
      <p>Achievements: {profile.achievements || 0}</p>
      <p>Victories: {profile.victories || 0}</p>

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
