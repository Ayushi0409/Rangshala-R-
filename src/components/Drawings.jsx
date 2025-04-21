import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shreenathji from '../Images/shreenathjii.jpg';
import tiger from '../Images/tiger.jpg';
import bappa from '../Images/bappa.jpg';
import wolf from '../Images/cat.jpg';
import buddha from '../Images/buddha.jpg';
import eye from '../Images/eye.jpg';
import ostrich from '../Images/bird.jpg';
import deer from '../Images/deer.jpg';
import ink from '../Images/ink.jpg';
import nature from '../Images/naturee.jpg';
import ganpati from '../Images/Ganpati.jpg';
import cuteGirl from '../Images/girl.jpg';
import panihari from '../Images/Panihari.jpg';

const Drawings = () => {
  const [cartPendingItem, setCartPendingItem] = useState(null);
  const navigate = useNavigate();

  const artworks = [
    { name: 'Shree Nathji', artist: 'Ayushi Babariya', price: 'INR 500', image: shreenathji },
    { name: 'Tiger', artist: 'Niyati Agravat', price: 'INR 1000', image: tiger },
    { name: 'Ganpati Bappa', artist: 'Niyati Agravat', price: 'INR 700', image: bappa },
    { name: 'Wolf', artist: 'Niyati Agravat', price: 'INR 500', image: wolf },
    { name: 'Buddha', artist: 'Ayushi Babariya', price: 'INR 700', image: buddha },
    { name: 'Eye', artist: 'Ayushi Babariya', price: 'INR 1000', image: eye },
    { name: 'Ostrich', artist: 'Niyati Agravat', price: 'INR 700', image: ostrich },
    { name: 'Deer', artist: 'Niyati Agravat', price: 'INR 300', image: deer },
    { name: 'INK', artist: 'Niyati Agravat', price: 'INR 700', image: ink },
    { name: 'Nature', artist: 'Niyati Agravat', price: 'INR 700', image: nature },
    { name: 'Ganpati', artist: 'Ayushi Babariya', price: 'INR 700', image: ganpati },
    { name: 'Cute Girl', artist: 'Niyati Agravat', price: 'INR 700', image: cuteGirl },
    { name: 'Panihari', artist: 'Ayushi Babariya', price: 'INR 700', image: panihari },
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
        <h2>Drawings</h2>
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

export default Drawings;