import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Fixed import path

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setStatus(response.data.message);
      if (response.data.message === 'OTP sent to your email') {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setStatus(`Failed to send OTP. Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <h3>Reset Password</h3>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
        {status && <p className={status.includes('success') ? 'text-green-500 text-center mt-2' : 'text-red-500 text-center mt-2'}>{status}</p>}
        <p className="login-link">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;