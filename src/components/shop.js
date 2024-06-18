import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, CircularProgress, Alert } from '@mui/material';
import '../css/shop.css';

const Shop = ({ addToCart, isLoggedIn }) => {
    const [allCrops, setAllCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userCrops, setUserCrops] = useState([]);
    const [userMap, setUserMap] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCrops();
    }, []);

    const fetchAllCrops = async () => {
        try {
            const token = localStorage.getItem('accessToken'); // Example: Retrieve token from localStorage
            const response = await fetch('http://localhost:5000/api/crops', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in Authorization header
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch crops');
            }
            const data = await response.json();
            setAllCrops(data);

            // Create a map of userId to user names
            const users = {};
            data.forEach(crop => {
                users[crop.owner] = crop.ownerName; // Assuming crop.ownerName exists
            });
            setUserMap(users);

            // Filter user's own crops (assuming there's a field like owner in each crop)
            const currentUserCrops = data.filter(crop => crop.owner === isLoggedIn); // Replace isLoggedIn with actual userId
            setUserCrops(currentUserCrops);

        } catch (error) {
            console.error('Error fetching crops:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (crop) => {
        addToCart(crop);
    };

    return (
        <Box className="setup-container" sx={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Explore Crops
            </Typography>
            {isLoggedIn && userCrops.length > 0 && (
                <Box>
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
                                    <Typography variant="body2" color="text.secondary">
                                        Registered by: {userMap[crop.owner]}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleAddToCart(crop)}>Add to Cart</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}

            <Typography variant="h5" gutterBottom>
                Other Users' Crops
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
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
                                <Typography variant="body2" color="text.secondary">
                                    Registered by: {userMap[crop.owner]}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleAddToCart(crop)}>Add to Cart</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
            <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/register-crop" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary">
                        Register Your Crop
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Shop;
