import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Alert from './components/Alert';
import WelcomeSection from './components/WelcomeSection';
import FeaturedArtistSection from './components/FeaturedArtistSection';
import WhyRangShalaSection from './components/WhyRangShalaSection';
import Artwork from './components/Artwork';
import AcrylicPaintings from './components/AcrylicPaintings';
import MandalaArt from './components/MandalaArt';
import Anime from './components/Anime';
import Drawings from './components/Drawings';
import OilPainting from './components/OilPainting';
import ArtworkGallery from './components/ArtworkGallery';
import ArtworkDetail from './components/ArtworkDetail';
import Ayushi from './components/Ayushi';
import Niyati from './components/Niyati';
import Bespoke from './components/Bespoke';
import Artist from './components/Artist';
import JoinUs from './components/JoinUs';
import CuratorConsult from './components/CuratorConsult';
import Footer from './components/Footer';
import './App.css';

const Home = () => (
  <>
    <WelcomeSection />
    <FeaturedArtistSection />
    <WhyRangShalaSection />
    <Artwork />
  </>
);

// Placeholder components for routes that are not yet implemented
const About = () => <h2>About Us Page</h2>;
<Route path="/artist" element={<Artist />} />
const Search = () => <h2>Search Page</h2>;
const Profile = () => <h2>Profile Page</h2>;
const Login = () => <h2>Login Page</h2>;
const Cart = () => <h2>Cart Page</h2>;
const Admin = () => <h2>Admin Panel</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ margin: '20px' }}>
          <Alert
            successMessage={null}
            errorMessage={null}
            message={null}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/bespoke" element={<Bespoke />} />
            <Route path="/join" element={<JoinUs />} />
            <Route path="/consult" element={<CuratorConsult />} />
            <Route path="/niyati" element={<Niyati />} />
            <Route path="/ayushi" element={<Ayushi />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/acrylic-paintings" element={<AcrylicPaintings />} />
            <Route path="/mandala-art" element={<MandalaArt />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/drawings" element={<Drawings />} />
            <Route path="/oil-painting" element={<OilPainting />} />
            <Route path="/artwork-gallery" element={<ArtworkGallery />} />
            <Route path="/artwork-detail" element={<ArtworkDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;