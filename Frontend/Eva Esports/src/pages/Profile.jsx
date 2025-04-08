import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch user profile8\=-
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/me');
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
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

      const { data } = await API.put(`/users/${profile._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(data.message);
      setProfile(data.user);
    } catch (err) {
      console.error('Error uploading avatar:', err);
    }
  };

  return (
    <div>
      <h1>{`Welcome, ${profile.name || 'Guest'}!`}</h1>
      <p>Tournaments: {profile.tournaments || 0}</p>
      <p>Achievements: {profile.achievements || 0}</p>
      <p>Victories: {profile.victories || 0}</p>

      {/* Show existing avatar */}
      {profile.avatar && (
        <img