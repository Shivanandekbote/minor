import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Shop from './components/Shop';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import RegisterCrop from './components/RegisterCrop';
import Cart from './components/Cart';
import Prices from './components/Prices';
import SignUp from './components/SignUp';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/register-crop" element={<RegisterCrop />} />
            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
