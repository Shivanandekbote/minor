import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import About from './components/About';
import Contact from './components/Contact';
import login from './components/Login';
import signup from './components/SignUp';
import userDetails from './components/UserDetails';
import imageupload from './components/ImageUpload';
import shop from './components/Shop';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import RegisterCrop from './components/RegisterCrop';
import Cart from './components/Cart';
import Prices from './components/Prices'; // Import Prices component
import './App.css';

function App() {
  const [crops, setCrops] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addCrop = (cropDetails) => {
    setCrops([...crops, cropDetails]);
  };

  const addToCart = (crop) => {
    setCartItems([...cartItems, crop]);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.slice();
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<signUp />} />
          <Route path="/userdetails" element={<userDetails />} />
          <Route path="/imageupload" element={<imageUpload />} />
          <Route path="/shop" element={<shop addCrop={addCrop} addToCart={addToCart} />} />
          <Route path="/registercrop" element={<RegisterCrop addCrop={addCrop} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/prices" element={<Prices />} /> {/* Add route for Prices */}
          {isAuthenticated && (
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
            />
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
