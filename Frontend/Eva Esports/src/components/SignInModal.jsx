import React, { useState } from 'react';
import { login, fetchUserProfile } from '../utils/api';
import { useAuth } from '../utils/auth';

const SignInModal = ({ onClose }) => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      const profile = await fetchUserProfile();
      setUser(profile);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="primary-btn">Sign In</button>
          <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
