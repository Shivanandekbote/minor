import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import styled from '@mui/material/styles/styled'; // Add this import
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
import UserCrops from './components/UserCrops';
import GlobalStyle from './globalStyles';
import { AuthProvider } from './contexts/AuthContext';

export const CartContext = React.createContext();

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
    background: {
      default: '#f8f9fa',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <AppContainer>
            <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} user={user} />
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={isAuthenticated ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-profile" element={isAuthenticated ? <AdminProfile /> : <Navigate to="/admin-login" />} />
                <Route path="/register-crop" element={isAuthenticated ? <RegisterCrop addCrop={addCrop} /> : <Navigate to="/login" />} />
                <Route path="/user-crops" element={isAuthenticated ? <UserCrops /> : <Navigate to="/login" />} />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled('main')`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export default App;
