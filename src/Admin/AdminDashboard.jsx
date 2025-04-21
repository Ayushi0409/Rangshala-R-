import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPaintBrush, FaUsers, FaBox, FaMoneyBillWave, FaEnvelope, FaPalette } from "react-icons/fa";
import ViewEnquiries from './ViewEnquiries';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  const dashboardData = {
    artworks: 25,
    customers: 150,
    categories: 5,
    orders: 10,
  };

  const artworkList = [
    {
      id: 1,
      name: "Sunset Bliss",
      image: "https://via.placeholder.com/50",
      price: 5000,
      artist: "Ayushi",
      category: "Acrylic",
    },
    {
      id: 2,
      name: "Mandala Dream",
      image: "https://via.placeholder.com/50",
      price: 3000,
      artist: "Niyati",
      category: "Mandala",
    },
  ];

  useEffect(() => {
    if (activeSection === "customers") {
      axios
        .get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        })
        .then((res) => {
          setCustomers(res.data);
          setError("");
        })
        .catch((err) => {
          setError("Failed to fetch customers. Check token/server.");
          console.error("Customers fetch error:", err.response?.data || err.message);
        });
    } else if (activeSection === "orders") {
      axios
        .get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
          setError("");
          console.log("Orders fetched:", res.data);
        })
        .catch((err) => {
          setError("Failed to fetch orders. Check token/server.");
          console.error("Orders fetch error:", err.response?.data || err.message);
        });
    } else if (activeSection === "payments") {
      axios
        .get("http://localhost:5000/api/payments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        })
        .then((res) => {
          setPayments(res.data);
          setError("");
          console.log("Payments fetched:", res.data);
        })
        .catch((err) => {
          setError("Failed to fetch payments. Check token/server.");
          console.error("Payments fetch error:", err.response?.data || err.message);
        });
    }
  }, [activeSection]);

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#1A2552",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    link: {
      color: "white",
      marginBottom: "20px",
      fontSize: "16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    main: {
      flex: 1,
      padding: "40px",
      overflowY: "auto",
      backgroundColor: "#f4f4f4",
    },
    cardContainer: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },
    card: {
      flex: "1 1 180px",
      padding: "20px",
      borderRadius: "10px",
      color: "white",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
    blue: { backgroundColor: "#007BFF" },
    green: { backgroundColor: "#28A745" },
    orange: { backgroundColor: "#FD7E14" },
    red: { backgroundColor: "#DC3545" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
    },
    th: {
      backgroundColor: "#1A2552",
      color: "white",
      padding: "10px",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.header}>🎨 Rang Shala</div>
        <div style={styles.link} onClick={() => setActiveSection("dashboard")}>
          Dashboard
        </div>
        <div style={styles.link} onClick={() => setActiveSection("artworks")}>
          <FaPaintBrush /> View Artworks
        </div>
        <div style={styles.link} onClick={() => setActiveSection("customers")}>
          <FaUsers /> View Customers
        </div>
        <div style={styles.link} onClick={() => setActiveSection("orders")}>
          <FaBox /> View Orders
        </div>
        <div style={styles.link} onClick={() => setActiveSection("payments")}>
          <FaMoneyBillWave /> View Payments
        </div>
        <div style={styles.link} onClick={() => setActiveSection("enquiries")}>
          <FaEnvelope /> View Enquiries
        </div>
      </div>
      <div style={styles.main}>
        {activeSection === "dashboard" && (
          <>
            <h1>Welcome to the Admin Dashboard</h1>
            <div style={styles.cardContainer}>
              <div style={{ ...styles.card, ...styles.blue }}>
                <FaPaintBrush size={30} />
                <h2>{dashboardData.artworks}</h2>
                <p>Artworks</p>
              </div>
              <div style={{ ...styles.card, ...styles.green }}>
                <FaUsers size={30} />
                <h2>{dashboardData.customers}</h2>
                <p>Customers</p>
              </div>
              <div style={{ ...styles.card, ...styles.orange }}>
                <FaPalette size={30} />
                <h2>{dashboardData.categories}</h2>
                <p>Categories</p>
              </div>
              <div style={{ ...styles.card, ...styles.red }}>
                <FaBox size={30} />
                <h2>{dashboardData.orders}</h2>
                <p>Orders</p>
              </div>
            </div>
          </>
        )}
        {activeSection === "artworks" && (
          <>
            <h2>All Artworks</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Artist</th>
                  <th style={styles.th}>Category</th>
                </tr>
              </thead>
              <tbody>
                {artworkList.map((art) => (
                  <tr key={art.id}>
                    <td style={styles.td}>{art.name}</td>
                    <td style={styles.td}>
                      <img src={art.image} alt={art.name} width={50} />
                    </td>
                    <td style={styles.td}>₹{art.price}</td>
                    <td style={styles.td}>{art.artist}</td>
                    <td style={styles.td}>{art.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {activeSection === "customers" && (
          <>
            <h2>Customer List</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {customers.length === 0 ? (
              <p>No customers found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>First Name</th>
                    <th style={styles.th}>Last Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Mobile</th>
                    <th style={styles.th}>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((cust) => (
                    <tr key={cust._id}>
                      <td style={styles.td}>{cust.title}</td>
                      <td style={styles.td}>{cust.firstName}</td>
                      <td style={styles.td}>{cust.lastName}</td>
                      <td style={styles.td}>{cust.email}</td>
                      <td style={styles.td}>{cust.mobile}</td>
                      <td style={styles.td}>
                        {new Date(cust.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        {activeSection === "orders" && (
          <>
            <h2>Order List</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Country</th>
                    <th style={styles.th}>Address</th>
                    <th style={styles.th}>City</th>
                    <th style={styles.th}>State</th>
                    <th style={styles.th}>Pin Code</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Payment ID</th>
                    <th style={styles.th}>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td style={styles.td}>{order.country}</td>
                      <td style={styles.td}>{order.address}</td>
                      <td style={styles.td}>{order.city}</td>
                      <td style={styles.td}>{order.state}</td>
                      <td style={styles.td}>{order.pinCode}</td>
                      <td style={styles.td}>{order.email}</td>
                      <td style={styles.td}>{order.phone}</td>
                      <td style={styles.td}>{order.paymentDetails?.razorpay_payment_id || 'N/A'}</td>
                      <td style={styles.td}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        {activeSection === "payments" && (
          <>
            <h2>Payment List</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {payments.length === 0 ? (
              <p>No payments found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Payment ID</th>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Amount (₹)</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td style={styles.td}>{payment.paymentId}</td>
                      <td style={styles.td}>{payment.orderId}</td>
                      <td style={styles.td}>{payment.email}</td>
                      <td style={styles.td}>₹{payment.amount}</td>
                      <td style={styles.td}>{payment.status}</td>
                      <td style={styles.td}>
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        {activeSection === "enquiries" && <ViewEnquiries />}
      </div>
    </div>
  );
};

export default AdminDashboard;