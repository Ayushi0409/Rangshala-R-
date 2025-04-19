import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewEnquiries = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/enquiries', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        setEnquiries(response.data);
        setError('');
      } catch (err) {
        setError(`Failed to fetch enquiries: ${err.response?.status} ${err.response?.data?.message || err.message}`);
        console.error('Error fetching enquiries:', err);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="view-enquiries p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enquiry List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {enquiries.length === 0 ? (
        <p>No enquiries received.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Company Name</th>
                <th className="border p-3 text-left">Designation</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Phone</th>
                <th className="border p-3 text-left">Enquiry</th>
                <th className="border p-3 text-left">Received On</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
                  <td className="border p-3">{enquiry.name}</td>
                  <td className="border p-3">{enquiry.company_name}</td>
                  <td className="border p-3">{enquiry.designation}</td>
                  <td className="border p-3">{enquiry.email}</td>
                  <td className="border p-3">{enquiry.phone}</td>
                  <td className="border p-3">{enquiry.enquiry}</td>
                  <td className="border p-3">{new Date(enquiry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => navigate('/admin/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ViewEnquiries;