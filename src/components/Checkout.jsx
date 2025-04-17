// src/components/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);

  // Load Razorpay checkout script
  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadScript().then((loaded) => {
      if (!loaded) {
        setError('Failed to load Razorpay SDK');
      }
    });

    // Cleanup script on component unmount
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ['country', 'address', 'city', 'state', 'pinCode', 'email', 'phone'];
    const missingField = requiredFields.find((field) => !formData[field]);

    if (missingField) {
      setError(`Please fill in the ${missingField.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
      return;
    }

    try {
      // Call backend to create Razorpay order
      const response = await axios.post('http://localhost:5000/create-order', {
        amount: 500, // Replace with dynamic amount (in INR)
      });

      const { id: order_id, amount, currency } = response.data;

      // Razorpay options
      const options = {
        // eslint-disable-next-line no-undef
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // rzp_test_jVqdtFwidymhM3 (from .env)
        amount: amount,
        currency: currency,
        name: 'Your Company Name',
        description: 'Payment for your order',
        order_id: order_id,
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post('http://localhost:5000/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.status === 'success') {
              // Save formData and payment details to your database (via backend API)
              console.log('Payment successful:', response);
              navigate('/success'); // Redirect to success page
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification failed: ' + err.message);
          }
        },
        prefill: {
          name: formData.name || 'Customer Name',
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.pinCode}`,
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Open Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', (response) => {
        setError('Payment failed: ' + response.error.description);
      });
      rzp1.open();
    } catch (err) {
      setError('Error creating order: ' + err.message);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Billing Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h2>Contact Information</h2>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="continue-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;