import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, CircularProgress, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/shop.css';

const Shop = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userCrops, setUserCrops] = useState([]);

  const isAuthenticated = !!localStorage.getItem('user');
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCrops();
    if (isAuthenticated && user) {
      fetchUserCrops(user.email);
    }
  }, [isAuthenticated, user]);

  const fetchAllCrops = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/crops');
      if (!response.ok) {
        throw new Error('Failed to fetch crops');
      }
      const data = await response.json();
      setAllCrops(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCrops = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/crops/owner/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user crops');
      }
      const data = await response.json();
      setUserCrops(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const addToCart = (crop) => {
    console.log(`Adding ${crop.name} to cart`);
    // Implement your cart adding logic here
  };

  return (
    <Box className="setup-container" sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Explore Crops <FontAwesomeIcon icon="shopping-basket" />
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {isAuthenticated && user && (
            <>
              <Typography variant="h5" gutterBottom>
                Your Registered Crops
              </Typography>
              <Box className="crop-grid" sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                {userCrops.map((crop) => (
                  <Card key={crop.id} sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={crop.image}
                      alt={crop.name}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {crop.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {crop.quantity} kg
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${crop.price} per kg
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => addToCart(crop)}>Add to Cart</Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate('/user-crops')}
              >
                View My Crops
              </Button>
            </>
          )}

          <Typography variant="h5" gutterBottom>
            All Crops
          </Typography>
          <Box className="crop-grid" sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {allCrops.map((crop) => (
              <Card key={crop.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={crop.image}
                  alt={crop.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {crop.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {crop.quantity} kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${crop.price} per kg
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => addToCart(crop)}>Add to Cart</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Shop;
