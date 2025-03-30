import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login logic (replace with actual API call if needed)
    if (email === 'admin@example.com' && password === 'password123') {
      // Successful login, redirect to admin dashboard or another page
      navigate('/admin-dashboard'); // Adjust the route as needed
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <img src={logo} alt="Rang Shala Logo" className="logo" />
        <h3>Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
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
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;