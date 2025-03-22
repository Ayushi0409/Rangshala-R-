// src/components/Cart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shreenathji from '../Images/Shreenathji.jpg'; // Import the image to fix display issue

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'ILLUMINATION',
      artist: 'Ayushi Babariya',
      dimensions: '24in x 24in',
      price: 105000,
      image: shreenathji, // Use imported image
      quantity: 1,
    },
  ]);

  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <Link to="/" className="close-button">X</Link>
        <h2 className="cart-title">YOUR CART</h2>
      </div>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-artist">{item.artist}</p>
                  <p className="item-dimensions">{item.dimensions}</p>
                  <p className="item-price">INR {item.price.toLocaleString()}</p>
                </div>
                <div className="item-actions">
                  <button className="edit-button">EDIT</button>
                  <div className="quantity-selector">
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-text">QUANTITY: {item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="delete-button" onClick={() => removeItem(item.id)}>
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <p className="total">TOTAL: INR {total.toLocaleString()}</p>
            <div className="action-buttons">
              <button className="view-more-button" onClick={() => navigate('/artwork-gallery')}>
                VIEW MORE
              </button>
              <button className="checkout-button" onClick={() => navigate('/checkout')}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;