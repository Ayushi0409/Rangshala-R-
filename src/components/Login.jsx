import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (res.data.success) {
        alert(res.data.message);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed. Please check your credentials or try again.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>Welcome to RangShala</h3>
        <p>Log in to your account</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
