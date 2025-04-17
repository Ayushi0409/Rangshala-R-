import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      alert('You must accept the terms and conditions');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        title,
        firstName,
        lastName,
        email,
        mobile,
        password,
      });

      if (res.status === 201) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h3>New to RangShala</h3>
        <p>Create your own account in a minute!</p>
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>
              <input type="radio" name="title" value="Mr" onChange={(e) => setTitle(e.target.value)} /> Mr
            </label>
            <label>
              <input type="radio" name="title" value="Ms" onChange={(e) => setTitle(e.target.value)} /> Ms
            </label>
            <label>
              <input type="radio" name="title" value="Mrs" onChange={(e) => setTitle(e.target.value)} /> Mrs
            </label>
          </div>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="input-group">
            <span className="input-group-text">+91</span>
            <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <div className="form-check">
            <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
            <label>
              Yes, I agree to the <a href="#">Terms & Conditions</a>.
            </label>
          </div>
          <button type="submit">Sign up & Continue</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
