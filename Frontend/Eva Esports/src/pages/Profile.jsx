// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get('/users/me');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>{`Welcome, ${profile.name || 'Guest'}!`}</h1>
      <p>Tournaments: {profile.tournaments || 0}</p>
      <p>Achievements: {profile.achievements || 0}</p>
      <p>Victories: {profile.victories || 0}</p>
    </div>
  );
};

export default Profile;
