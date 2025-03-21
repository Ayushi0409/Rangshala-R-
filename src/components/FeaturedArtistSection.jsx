import React from 'react';
import { Link } from 'react-router-dom';
import niyatiImage from '../Images/NiyatiAgravat.jpeg';
import ayushiImage from '../Images/AyushiBabariya.jpeg';

const FeaturedArtistSection = () => {
  return (
    <div style={styles.featuredArtistSection}>
      <div style={styles.decorativeLine}></div>
      <h1>Featured Artist</h1>
      <div style={styles.artistGrid}>
        <div style={styles.artistCard}>
          <img src={niyatiImage} alt="Niyati Agravat" style={styles.artistPhoto} />
          <h3>Niyati Agravat</h3>
          <Link to="/niyati" style={styles.exploreButton}>Explore</Link>
        </div>
        <div style={styles.artistCard}>
          <img src={ayushiImage} alt="Ayushi Babariya" style={styles.artistPhoto} />
          <h3>Ayushi Babariya</h3>
          <Link to="/ayushi" style={styles.exploreButton}>Explore</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  featuredArtistSection: {
    textAlign: 'left',
    padding: '40px 50px',
    backgroundColor: '#f8f9fa',
    margin: '40px 0',
  },
  decorativeLine: {
    width: '100px',
    height: '4px',
    backgroundColor: '#153448',
    borderRadius: '2px',
    marginBottom: '5px',
  },
  artistGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '200px',
    marginTop: '20px',
  },
  artistCard: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '20px',
    width: '250px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  artistPhoto: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    marginBottom: '15px',
    border: '3px solid #ccc',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  exploreButton: {
    backgroundColor: '#153448',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
};

export default FeaturedArtistSection;