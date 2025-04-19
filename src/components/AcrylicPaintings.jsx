import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import shreenathji from '../Images/Shreenathji.jpg';
import gouachePainting from '../Images/gouachepainting.jpg';
import ganpatiBappa from '../Images/Ganpatibappa.jpg';
import housePainting from '../Images/HousePainting.jpg';
import sunrisePainting from '../Images/SunrisePainting.jpg';
import rainyDay from '../Images/RainyDay.jpg';
import acraylic from '../Images/Acraylic Painting.jpeg';

const AcrylicPaintings = () => {
  const [cartPendingItem, setCartPendingItem] = useState(null);
  const navigate = useNavigate();

  const artworks = [
    { name: 'Shree Nathji', artist: 'Ayushi Babariya', price: 'INR 4500', image: shreenathji },
    { name: 'Gouache Painting', artist: 'Ayushi Babariya', price: 'INR 1000', image: gouachePainting },
    { name: 'Ganpati Bappa', artist: 'Niyati Agravat', price: 'INR 700', image: ganpatiBappa },
    { name: 'House Painting', artist: 'Niyati Agravat', price: 'INR 700', image: housePainting },
    { name: 'Sunrise Painting', artist: 'Niyati Agravat', price: 'INR 700', image: sunrisePainting },
    { name: 'Rainy Day', artist: 'Niyati Agravat', price: 'INR 700', image: rainyDay },
    { name: 'Acraylic', artist: 'Niyati Agravat', price: 'INR 700', image: acraylic },
  ];

  const isLoggedIn = () => !!localStorage.getItem('token'); // Use token from login

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
        <h2>Acrylic Paintings</h2>
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

export default AcrylicPaintings;