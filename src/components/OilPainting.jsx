import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oil1 from '../Images/oil1.jpg';
import oil2 from '../Images/oil2.jpg';
import oil3 from '../Images/oil3.jpg';
import oil4 from '../Images/oil4.jpg';
import oil5 from '../Images/oil5.jpg';
import oil6 from '../Images/oil6.jpg';
import oil7 from '../Images/oil7.jpg';
import oil8 from '../Images/oil8.jpg';
import oil9 from '../Images/oil9.jpg';
import oil10 from '../Images/oil10.jpg';

const OilPainting = () => {
  const [cartPendingItem, setCartPendingItem] = useState(null);
  const navigate = useNavigate();

  const artworks = [
    { name: 'Ganpati Bappa', artist: 'Ayushi Babariya', price: 'INR 4500', image: oil1 },
    { name: 'Window Painting', artist: 'Ayushi Babariya', price: 'INR 1000', image: oil2 },
    { name: 'Lady', artist: 'Ayushi Babariya', price: 'INR 700', image: oil3 },
    { name: 'Lazy Girl', artist: 'Ayushi Babariya', price: 'INR 1', image: oil4 },
    { name: 'Nature', artist: 'Niyati Agravat', price: 'INR 700', image: oil5 },
    { name: 'Fruits', artist: 'Ayushi Babariya', price: 'INR 1000', image: oil6 },
    { name: 'Rose', artist: 'Niyati Agravat', price: 'INR 700', image: oil7 },
    { name: 'Love Birds', artist: 'Ayushi Babariya', price: 'INR 300', image: oil8 },
    { name: 'Bird', artist: 'Niyati Agravat', price: 'INR 700', image: oil9 },
    { name: 'House', artist: 'Ayushi Babariya', price: 'INR 300', image: oil10 },
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
        <h2>Oil Painting</h2>
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

export default OilPainting;