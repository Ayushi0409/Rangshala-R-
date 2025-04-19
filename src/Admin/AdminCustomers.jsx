import React, { useEffect, useState } from "react";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users"); // Changed to port 5000
      const data = await res.json();
      // Transform data to match AdminCustomers structure
      const transformedCustomers = data.map(user => ({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.mobile,
        createdAt: user.createdAt,
      }));
      setCustomers(transformedCustomers);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, { // Changed to port 5000
          method: "DELETE",
        });
        fetchCustomers(); // refresh the list
      } catch (err) {
        console.error("Failed to delete customer", err);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Registered Customers</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Registered At</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, i) => (
            <tr key={i}>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>{c.email}</td>
              <td style={tdStyle}>{c.phone}</td>
              <td style={tdStyle}>{new Date(c.createdAt).toLocaleString()}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(c._id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f4f4f4",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default AdminCustomers;