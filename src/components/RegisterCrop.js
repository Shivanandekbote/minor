import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterCrop.css';

const RegisterCrop = () => {
    const [cropDetails, setCropDetails] = useState({
        name: '',
        quantity: '',
        price: '',
        image: '',
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setCropDetails({
                    ...cropDetails,
                    image: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/crops', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cropDetails),
            });
            if (!response.ok) {
                throw new Error('Failed to add crop');
            }
            setCropDetails({
                name: '',
                quantity: '',
                price: '',
                image: '',
            });
            navigate('/shop');
        } catch (error) {
            console.error('Error adding crop:', error.message);
        }
    };

    return (
        <div className="register-crop-container">
            <h2>Register Your Crop</h2>
            <form onSubmit={handleSubmit} className="register-crop-form">
                <div className="form-group">
                    <label htmlFor="name">Crop Name:</label>
                    <input type="text" id="name" name="name" value={cropDetails.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity (kg):</label>
                    <input type="number" id="quantity" name="quantity" value={cropDetails.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price per kg:</label>
                    <input type="number" id="price" name="price" value={cropDetails.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Crop Image:</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit" className="submit-button">Register Crop</button>
            </form>
        </div>
    );
};

export default RegisterCrop;
