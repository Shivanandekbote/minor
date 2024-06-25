import React from 'react';
import About from './About';
import Shop from './Shop';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../css/home.css';

const Home = ({ crops, addCrop, addToCart }) => {
  return (
    <Container className="home-page" sx={{ padding: '2rem 0' }}>
      <Box className="welcome-section" sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to Our Website!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          consectetur accumsan tortor, et suscipit nulla fermentum id.
        </Typography>
        <Typography variant="body1">
          Integer sed odio justo. Curabitur nec dictum justo. Fusce ultricies
          erat at ligula consequat, et rutrum justo vehicula.
        </Typography>
      </Box>

      <Box className="button-container" sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <About />
        <Link to="/about" className="about-link" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" endIcon={<FontAwesomeIcon icon={faAngleRight} />}>
            View More
          </Button>
        </Link>
      </Box>

      <Box className="shop-preview" sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Shop addCrop={addCrop} addToCart={addToCart} limit={3} />
        <Link to="/shop" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" endIcon={<FontAwesomeIcon icon={faAngleRight} />}>
            View More Products
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
