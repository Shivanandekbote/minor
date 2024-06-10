import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/home';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/login';
import SignUp from './components/signup';
import UserDetails from './components/userDetails';
import ImageUpload from './components/imageUpload';
import Shop from './components/shop'; // Correct import
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin'; // Import the AdminLogin component
import AdminProfile from './components/AdminProfile'; // Import the AdminProfile component
import RegisterCrop from './components/RegisterCrop'; // Import the RegisterCrop component
import './App.css';

function App() {
  const [crops, setCrops] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const addCrop = (cropDetails) => {
    setCrops([...crops, cropDetails]);
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
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/imageupload" element={<ImageUpload />} />
          <Route path="/shop" element={<Shop addCrop={addCrop} />} />
          <Route path="/registercrop" element={<RegisterCrop addCrop={addCrop} />} /> {/* Corrected path and component */}
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Add route for admin login */}
          <Route path="/admin/profile" element={<AdminProfile />} /> {/* Add route for admin profile */}
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
