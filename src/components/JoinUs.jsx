import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import amplifyImage from '../Images/Amplify.jpeg';
import protectImage from '../Images/Protect.jpeg';
import rewardImage from '../Images/Reward.jpeg';
import joinUsImage from '../Images/Joinus.png';

const JoinUs = () => {
  const whyItems = [
    {
      image: amplifyImage,
      title: 'Amplify',
      description: 'Artists who showcase their work with RangShala have access to a global platform of art enthusiasts and collectors.',
    },
    {
      image: protectImage,
      title: 'Protect',
      description: 'RangShala works with an in-house curator who will help artists value their work accurately.',
    },
    {
      image: rewardImage,
      title: 'Reward',
      description: 'Join a team of artists that believe in fair treatment. RangShala ensures artists get the compensation they deserve.',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    address2: '',
    email: '',
    phone: '',
    occupation: '',
    artwork: null,
    terms: false,
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      // Validate inputs
      if (!formData.name || !formData.dob || !formData.address || !formData.email || !formData.phone || !formData.artwork || !formData.terms) {
        setStatus('Please fill out all required fields and agree to terms.');
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setStatus('Please enter a valid email address.');
        return;
      }
      if (!/^\+\d{1,3}\d{6,14}$/.test(formData.phone)) {
        setStatus('Please enter a valid phone number (e.g., +911234567890).');
        return;
      }

      // Convert artwork to base64 for EmailJS
      let artworkBase64 = '';
      if (formData.artwork) {
        artworkBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(formData.artwork);
        });
      }

      // Send to EmailJS
      await emailjs.send(
        'service_awk8faa',
        'template_b57xies', // Reuse or create new template
        {
          name: formData.name,
          dob: formData.dob,
          address: formData.address,
          address2: formData.address2 || 'N/A',
          email: formData.email,
          phone: formData.phone,
          occupation: formData.occupation || 'N/A',
          artwork: artworkBase64, // Base64 image
          terms: formData.terms ? 'Agreed' : 'Not Agreed',
        },
        'A4u9NLi3GmTFMIL0Q'
      ).catch((err) => {
        throw new Error(`EmailJS failed: ${err.text || err.message}`);
      });

      // Send to Backend
      // eslint-disable-next-line no-undef
      await axios.post(`${process.env.REACT_APP_API_URL}/api/join`, {
        name: formData.name,
        dob: formData.dob,
        address: formData.address,
        address2: formData.address2,
        email: formData.email,
        phone: formData.phone,
        occupation: formData.occupation,
        artwork: formData.artwork ? formData.artwork.name : '', // Store filename
        terms: formData.terms,
      }).catch((err) => {
        throw new Error(`Backend failed: ${err.response?.status} ${err.response?.data?.message || err.message}`);
      });

      setStatus('Application submitted successfully!');
      setFormData({
        name: '',
        dob: '',
        address: '',
        address2: '',
        email: '',
        phone: '',
        occupation: '',
        artwork: null,
        terms: false,
      });
    } catch (error) {
      setStatus(`Failed to submit application: ${error.message}`);
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="bespoke-container mx-auto px-4 py-8 max-w-7xl">
      <div className="why-rangshala-section mb-12">
        <h1 className="section-title text-3xl font-bold text-center mb-6">Your art on a global platform</h1>
        <div className="why-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyItems.map((item, index) => (
            <div key={index} className="why-item text-center p-4 bg-white shadow-md rounded-lg">
              <img src={item.image} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="art-advisory-section grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="form-container">
          <h1 className="section-title text-3xl font-bold mb-4">Join Us</h1>
          <p className="text-gray-600 mb-6">
            The RangShala welcomes artists to join us. Upload your artwork, and our team will evaluate it.
          </p>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="form flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address2"
              placeholder="Address Line 2"
              value={formData.address2}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (e.g., +911234567890)"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="occupation"
              placeholder="Primary Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="artwork" className="text-gray-600">Upload Artwork</label>
            <input
              type="file"
              id="artwork"
              name="artwork"
              accept="image/*"
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
                className="h-4 w-4"
              />
              <label htmlFor="terms" className="text-gray-600">
                I agree to the <a href="#" className="text-blue-600">Terms & Conditions</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition"
            >
              Apply
            </button>
            {status && <p className="text-center text-sm mt-2">{status}</p>}
          </form>
        </div>
        <div className="image-container">
          <img src={joinUsImage} alt="Artwork Preview" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;