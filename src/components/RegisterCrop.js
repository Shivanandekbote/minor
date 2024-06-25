import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, FormControl, FormHelperText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/RegisterCrop.css'; // Ensure correct path to CSS file

const RegisterCrop = () => {
    const [cropDetails, setCropDetails] = useState({
        name: '',
        quantity: '',
        price: '',
        image: null,
    });
    const navigate = useNavigate(); // Navigation hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCropDetails({
            ...cropDetails,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCropDetails({
                ...cropDetails,
                image: file,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', cropDetails.name);
            formData.append('quantity', cropDetails.quantity);
            formData.append('price', cropDetails.price);
            formData.append('image', cropDetails.image);

            const response = await fetch('http://localhost:5000/api/crops/register', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Include credentials to send cookies
            });
            
            if (!response.ok) {
                throw new Error('Failed to add crop');
            }
            
            setCropDetails({
                name: '',
                quantity: '',
                price: '',
                image: null,
            });

            navigate('/shop'); // Navigate to shop page after successful registration
        } catch (error) {
            console.error('Error adding crop:', error.message);
        }
    };

    return (
        <Box className="register-crop-container" sx={{ maxWidth: 600, mx: 'auto', p: 3, boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom>
                Register Your Crop <FontAwesomeIcon icon="seedling" />
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="name"
                        name="name"
                        label="Crop Name"
                        value={cropDetails.name}
                        onChange={handleChange}
                        required
                    />
                    <FormHelperText>Enter the name of the crop.</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        type="number"
                        id="quantity"
                        name="quantity"
                        label="Quantity (kg)"
                        value={cropDetails.quantity}
                        onChange={handleChange}
                        required
                    />
                    <FormHelperText>Enter the quantity in kilograms.</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        type="number"
                        id="price"
                        name="price"
                        label="Price per kg"
                        value={cropDetails.price}
                        onChange={handleChange}
                        required
                    />
                    <FormHelperText>Enter the price per kilogram.</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>Upload an image of the crop.</FormHelperText>
                </FormControl>
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        <FontAwesomeIcon icon="plus-circle" /> Register Crop
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default RegisterCrop;
