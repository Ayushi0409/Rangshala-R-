import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../Images/logo.png'; // Adjusted path
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password123') {
        navigate('/admin/dashboard'); // Changed to match the route in App.jsx
      } else {
        setErrorMessage('Invalid email or password');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <img src={logo} alt="Rang Shala Logo" className="logo" />
        <h3 className="heading">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
              className="input"
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
              className="input"
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="forgot-password">
          <a href="/forgot-password" className="link">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;