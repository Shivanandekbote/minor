import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, CircularProgress, Alert } from '@mui/material';

const UserCrops = () => {
  const [userCrops, setUserCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetchUserCrops(user.email);
    }
  }, [user]);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="setup-container" sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Crops
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
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
                <Button size="small">Add to Cart</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserCrops;
