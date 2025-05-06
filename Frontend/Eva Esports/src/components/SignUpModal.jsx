import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, fetchUserProfile } from '../utils/api';
import { useAuth } from '../utils/auth';

const SignUpModal = ({ onClose }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate(); // <-- for redirect
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register({ email, password, username });
      const profile = await fetchUserProfile();
      setUser(profile);
      onClose(); // close modal
      navigate('/profile'); // 🚀 redirect to profile page
    } catch (err) {
      console.error('Registration Error:', err.response?.data);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
