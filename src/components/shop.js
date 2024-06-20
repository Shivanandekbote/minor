import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, FormControl, FormHelperText, InputLabel, Input } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../contexts/AuthContext';
import '../css/RegisterCrop.css';

const RegisterCrop = ({ addCrop }) => {
    const { user } = useContext(AuthContext);
    const [cropDetails, setCropDetails] = useState({
        name: '',
        quantity: '',
        price: '',
        image: null,
    });

    const navigate = useNavigate();

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
            
            const savedCrop = await response.json();
            addCrop(savedCrop);

            setCropDetails({
                name: '',
                quantity: '',
                price: '',
                image: null,
            });

            navigate('/shop');
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
                        label="Crop Name"
                        id="name"
                        name="name"
                        value={cropDetails.name}
                        onChange={handleChange}
                        required
                        helperText="Enter the name of the crop."
                        InputProps={{
                            startAdornment: <FontAwesomeIcon icon="leaf" />
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField 
                        label="Quantity (kg)"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={cropDetails.quantity}
                        onChange={handleChange}
                        required
                        helperText="Enter the quantity in kilograms."
                        InputProps={{
                            startAdornment: <FontAwesomeIcon icon="weight-hanging" />
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField 
                        label="Price per kg"
                        type="number"
                        id="price"
                        name="price"
                        value={cropDetails.price}
                        onChange={handleChange}
                        required
                        helperText="Enter the price per kilogram."
                        InputProps={{
                            startAdornment: <FontAwesomeIcon icon="dollar-sign" />
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="image">
                        Crop Image <FontAwesomeIcon icon="image" />
                    </InputLabel>
                    <Input type="file" id="image" name="image" onChange={handleImageChange} />
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
