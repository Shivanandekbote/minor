import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, CircularProgress, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../contexts/AuthContext';
import '../css/shop.css';

const Shop = ({ addToCart }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [allCrops, setAllCrops] = useState([]);
    const [userCrops, setUserCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllCrops();
        if (isAuthenticated) {
            fetchUserCrops();
        }
    }, [isAuthenticated, user]);

    const fetchAllCrops = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/crops', {
                credentials: 'include', // Include credentials to send cookies
            });
            if (!response.ok) {
                throw new Error('Failed to fetch crops');
            }
            const data = await response.json();
            setAllCrops(data);
        } catch (error) {
            console.error('Error fetching crops:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserCrops = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/crops/owner/${user.email}`, {
                credentials: 'include', // Include credentials to send cookies
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user crops');
            }
            const data = await response.json();
            setUserCrops(data);
        } catch (error) {
            console.error('Error fetching user crops:', error.message);
            setError(error.message);
        }
    };

    const handleAddToCart = (crop) => {
        addToCart(crop);
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
                    {isAuthenticated && userCrops.length > 0 && (
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
                                    <Button size="small" onClick={() => handleAddToCart(crop)}>Add to Cart</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </>
            )}
            <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/register-crop" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary">
                        Register Your Crop <FontAwesomeIcon icon="plus-circle" />
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Shop;
