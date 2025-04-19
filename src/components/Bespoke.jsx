import React, { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import expertAdviceImage from '../Images/Expert Advise.png';
import ideaImage from '../Images/Idea.png';
import choiceImage from '../Images/choice.png';
import implementationImage from '../Images/Implementation.png';
import artworkImage from '../Images/artwork-image.jpg';

const Bespoke = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    designation: '',
    email: '',
    countryCode: '+91',
    mobileNo: '',
    enquiry: '',
  });
  const [status, setStatus] = useState('');

  const whyItems = [
    {
      image: expertAdviceImage,
      title: 'Expert Advice',
      description: 'We work to understand your requirements and how best to cater to them.',
    },
    {
      image: ideaImage,
      title: 'Idea',
      description: 'We present a variety of tailor-made concepts for you to choose from.',
    },
    {
      image: choiceImage,
      title: 'Choice',
      description: 'Pick the artwork that matches the feel of your space.',
    },
    {
      image: implementationImage,
      title: 'Implementation',
      description: 'We ensure that you receive authentic, professionally created artwork.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const currentDate = new Date().toLocaleString();
      const phone = `${formData.countryCode}${formData.mobileNo}`;

      // Send data to backend
      const apiResponse = await axios.post('http://localhost:5000/api/enquiries', {
        name: formData.name,
        companyName: formData.companyName,
        designation: formData.designation,
        email: formData.email,
        countryCode: formData.countryCode,
        mobileNo: formData.mobileNo,
        enquiry: formData.enquiry,
      });
      console.log('Backend response:', apiResponse.data);

      // Send email to submitter
      const emailResponse = await emailjs.send(
        'service_awk8faa',
        'template_b57xies',
        {
          name: formData.name,
          company_name: formData.companyName,
          designation: formData.designation,
          email: formData.email,
          phone: phone,
          enquiry: formData.enquiry,
          date: currentDate,
        },
        'A4u9NLi3GmTFMIL0Q'
      );
      console.log('EmailJS response to submitter:', emailResponse);

      // Send email to admin
      await emailjs.send(
        'service_awk8faa',
        'template_b57xies',
        {
          name: formData.name,
          company_name: formData.companyName,
          designation: formData.designation,
          email: 'ayushibabariya4@gmail.com',
          phone: phone,
          enquiry: formData.enquiry,
          date: currentDate,
        },
        'A4u9NLi3GmTFMIL0Q'
      );
      console.log('EmailJS response to admin:', emailResponse);

      setStatus('Enquiry sent successfully and email notifications sent to you and the admin!');
      setFormData({
        name: '',
        companyName: '',
        designation: '',
        email: '',
        countryCode: '+91',
        mobileNo: '',
        enquiry: '',
      });
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response',
        stack: error.stack,
      });
      setStatus(`Failed to send enquiry. Please try again. Error: ${error.message}`);
    }
  };

  return (
    <div className="bespoke-container mx-auto px-4 py-8 max-w-7xl">
      <div className="why-rangshala-section mb-12">
        <h1 className="section-title text-3xl font-bold text-center mb-6">Why RangShala?</h1>
        <div className="why-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h1 className="section-title text-3xl font-bold mb-4">Art Advisory Services</h1>
          <p className="text-gray-600 mb-4">
            Connect with our curators and team of experts to help you acquire the right artwork based on your needs or client's requirements.
          </p>
          <p className="text-gray-600 mb-6">
            If you are an interior designer or architect looking to purchase works for offices, homes, cafes, or large projects, please fill out the form below and we will get back to you.
          </p>
          <div className="form flex flex-col gap-4">
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
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
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
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                name="mobileNo"
                placeholder="Mobile No"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              name="enquiry"
              placeholder="Enquiry"
              rows="4"
              value={formData.enquiry}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition"
            >
              Send Enquiry
            </button>
            {status && <p className={status.includes('success') ? 'text-green-500 text-center text-sm mt-2' : 'text-red-500 text-center text-sm mt-2'}>{status}</p>}
          </div>
        </div>
        <div className="image-container">
          <img src={artworkImage} alt="Art Advisory" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default Bespoke;