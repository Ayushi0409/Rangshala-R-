import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Assuming your CSS is in App.css

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email'); // Get email from query params

  const handleVerify = async (e) => {
    e.preventDefault();
    setStatus('Verifying...');
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      setStatus(response.data.message);
      if (response.data.message === 'OTP verified successfully') {
        // Proceed to password reset
        setStatus('OTP verified. Enter your new password.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setStatus(`Failed to verify OTP. Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setStatus('Please enter a new password.');
      return;
    }
    setStatus('Resetting...');
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { email, newPassword });
      setStatus(response.data.message);
      if (response.data.message === 'Password reset successfully') {
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setStatus(`Failed to reset password. Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <h3>Verify OTP</h3>
        <p>Enter the OTP sent to {email} to reset your password</p>
        {!newPassword && (
          <form onSubmit={handleVerify}>
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                maxLength={6}
              />
            </div>
            <button type="submit">Verify OTP</button>
          </form>
        )}
        {status.includes('OTP verified') && (
          <form onSubmit={handleResetPassword}>
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        )}
        {status && <p className={status.includes('success') || status.includes('verified') ? 'text-green-500 text-center mt-2' : 'text-red-500 text-center mt-2'}>{status}</p>}
        <p className="login-link">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;