import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './setup.css';

const Shop = ({ addCrop }) => {
  const [allCrops, setAllCrops] = useState([]);

  useEffect(() => {
    // Fetch all crops from the backend when the component mounts
    fetchAllCrops();
  }, []);

  const fetchAllCrops = async () => {
    try {
      // Dummy data for demonstration
      const dummyCrops = [
        {
          name: 'Tomatoes',
          quantity: '5',
          price: '2.50',
          image: 'https://via.placeholder.com/200',
        },
        {
          name: 'Potatoes',
          quantity: '10',
          price: '1.20',
          image: 'https://via.placeholder.com/200',
        },
        {
          name: 'Carrots',
          quantity: '7',
          price: '1.80',
          image: 'https://via.placeholder.com/200',
        },
      ];
      setAllCrops(dummyCrops);
    } catch (error) {
      console.error('Error fetching crops:', error.message);
    }
  };

  return (
    <div className="setup-container">
      <h2>Explore Crops</h2>
      <div className="crop-grid">
        {allCrops.map((crop, index) => (
          <div key={index} className="crop-card">
            <img src={crop.image} alt={crop.name} className="crop-image" />
            <div className="crop-details">
              <h3 className="crop-name">{crop.name}</h3>
              <p className="crop-quantity">Quantity: {crop.quantity} kg</p>
              <p className="crop-price">Price: ${crop.price} per kg</p>
              <button className="add-to-cart-button" onClick={() => addCrop(crop)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/RegisterCrop" className="register-crop-button">
        Register Your Crop
      </Link>
    </div>
  );
};

export default Shop;
