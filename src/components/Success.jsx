import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Adjust CSS to match .NET styles

const Success = () => {
  const orderId = Math.random().toString(36).substr(2, 8).toUpperCase(); // Simulate order ID

  return (
    <div className="confirmation-container">
      <h2>Order Confirmation</h2>
      <p className="success-message">Thank you for your order! We’ll send you a confirmation email shortly.</p>
      <div className="offline-note">
        <p><strong>Offline Payment Instructions:</strong></p>
        <p>Order ID: {orderId}</p>
        <p>Please complete your payment via cash on delivery or bank transfer within 3 days. Use the Order ID above as a reference. Contact us at support@rangshala.com for bank details or assistance.</p>
      </div>
      <Link to="/" className="back-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default Success;