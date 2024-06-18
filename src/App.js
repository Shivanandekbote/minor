import React, { useState } from 'react';
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

// Separate context for authentication
export const AuthContext = React.createContext();

// Separate context for cart management
export const CartContext = React.createContext();

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
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user'); // Optional: remove user data from localStorage
  };

  return (
    <Router>
      <div className="App">
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
          <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-profile" element={isAuthenticated ? <AdminProfile /> : <Navigate to="/admin-login" />} />
              <Route path="/register-crop" element={isAuthenticated ? <RegisterCrop addCrop={addCrop} /> : <Navigate to="/login" />} />
            </Routes>
            <Footer />
          </CartContext.Provider>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
