import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mandala1 from '../Images/mandala1.jpg';
import mandala2 from '../Images/mandala2.jpg';
import mandala3 from '../Images/mandala3.jpg';
import mandala4 from '../Images/mandala4.jpg';
import mandala5 from '../Images/mandala5.jpg';
import mandala6 from '../Images/mandala6.jpg';
import mandala7 from '../Images/mandala7.jpg';
import mandala8 from '../Images/mandala8.jpg';
import mandala9 from '../Images/mandala9.jpg';

const MandalaArt = () => {
  const [cartPendingItem, setCartPendingItem] = useState(null);
  const navigate = useNavigate();

  const artworks = [
    { name: 'Mandala Bhat', artist: 'Ayushi Babariya', price: 'INR 200', image: mandala1 },
    { name: 'Wall Decor', artist: 'Ayushi Babariya', price: 'INR 0', image: mandala2 },
    { name: 'Shiv', artist: 'Ayushi Babariya', price: 'INR 700', image: mandala3 },
    { name: 'Eye', artist: 'Ayushi Babariya', price: 'INR 500', image: mandala4 },
    { name: 'Beautiful Design', artist: 'Ayushi Babariya', price: 'INR 100', image: mandala5 },
    { name: 'TajMahal', artist: 'Ayushi Babariya', price: 'INR 1000', image: mandala6 },
    { name: 'Mandala Bhat', artist: 'Ayushi Babariya', price: 'INR 700', image: mandala7 },
    { name: 'Owl', artist: 'Ayushi Babariya', price: 'INR 300', image: mandala8 },
    { name: 'Hanuman Dada', artist: 'Ayushi Babariya', price: 'INR 700', image: mandala9 },
  ];

  const isLoggedIn = () => !!localStorage.getItem('token');

  const addToCart = (name, price, image) => {
    if (!isLoggedIn()) {
      const itemData = { name, price: parseFloat(price.replace('INR ', '')), image };
      setCartPendingItem(itemData);
      localStorage.setItem('pendingCartItem', JSON.stringify(itemData));
      navigate('/login');
      return;
    }

    const itemData = { id: Date.now(), title: name, artist: artworks.find(a => a.name === name).artist, price: parseFloat(price.replace('INR ', '')), image, quantity: 1 };
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(itemData);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart successfully!');
  };

  useEffect(() => {
    const handleAddToCartAfterLogin = () => {
      if (cartPendingItem && isLoggedIn()) {
        addToCart(cartPendingItem.name, `INR ${cartPendingItem.price}`, cartPendingItem.image);
        setCartPendingItem(null);
        localStorage.removeItem('pendingCartItem');
      }
    };
    window.addEventListener('addToCartAfterLogin', handleAddToCartAfterLogin);
    return () => window.removeEventListener('addToCartAfterLogin', handleAddToCartAfterLogin);
  }, [cartPendingItem, isLoggedIn]);

  return (
    <div className="acrylic-painting-section">
      <div className="section-header">
        <div className="line"></div>
        <h2>Mandala Art</h2>
      </div>
      <div className="artwork-container">
        {artworks.map((artwork, index) => (
          <div key={index} className="artwork-card">
            <img src={artwork.image} alt={artwork.name} />
            <div className="overlay">
              <button className="view-btn">View</button>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(artwork.name, artwork.price, artwork.image)}
              >
                Add to Cart
              </button>
            </div>
            <h3>{artwork.name}</h3>
            <p className="artist-name">{artwork.artist}</p>
            <p>{artwork.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandalaArt;