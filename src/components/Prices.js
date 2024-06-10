import React, { useState, useEffect } from 'react';
import '../css/prices.css';

const Prices = () => {
  const [cropPrices, setCropPrices] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [registeredCrops, setRegisteredCrops] = useState([]);

  useEffect(() => {
    fetchCropPrices();
    fetchRegisteredCrops();
  }, []);

  const fetchCropPrices = async () => {
    try {
      // Fetch crop prices from an external API (replace with actual API call)
      const response = await fetch('https://api.marketdata.com/prices');
      const data = await response.json();
      setCropPrices(data.prices);
    } catch (error) {
      console.error('Error fetching crop prices:', error.message);
    }
  };

  const fetchRegisteredCrops = async () => {
    try {
      // Fetch registered crops from your backend (replace with actual API call)
      const response = await fetch('https://api.yourbackend.com/registered-crops');
      const data = await response.json();
      setRegisteredCrops(data.crops);
    } catch (error) {
      console.error('Error fetching registered crops:', error.message);
    }
  };

  const calculatePriceStatistics = (cropName) => {
    // Filter crop prices by crop name
    const filteredPrices = cropPrices.filter((crop) => crop.name === cropName);

    // Calculate statistics (average, all-time high, all-time low)
    let totalPrice = 0;
    let allTimeHigh = -Infinity;
    let allTimeLow = Infinity;

    filteredPrices.forEach((crop) => {
      totalPrice += crop.price;
      if (crop.price > allTimeHigh) {
        allTimeHigh = crop.price;
      }
      if (crop.price < allTimeLow) {
        allTimeLow = crop.price;
      }
    });

    const averagePrice = totalPrice / filteredPrices.length;

    return {
      averagePrice,
      allTimeHigh,
      allTimeLow,
    };
  };

  const handleCropClick = (cropName) => {
    // Filter registered crops by crop name
    const filteredCrops = registeredCrops.filter((crop) => crop.name === cropName);
    setSelectedCrop(filteredCrops);
  };

  return (
    <div className="prices-container">
      <h2>Real-Time Crop Prices</h2>
      <ul className="prices-list">
        {cropPrices.map((crop, index) => {
          const { averagePrice, allTimeHigh, allTimeLow } = calculatePriceStatistics(crop.name);
          return (
            <li key={index} className="price-item">
              <span className="crop-name" onClick={() => handleCropClick(crop.name)}>
                {crop.name}
              </span>
              <span className="crop-price">${crop.price.toFixed(2)} per kg</span>
              <span className="price-statistics">
                Average Price: ${averagePrice.toFixed(2)} | All-Time High: ${allTimeHigh.toFixed(2)} | All-Time Low: ${allTimeLow.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
      {selectedCrop && (
        <div className="selected-crop-container">
          <h3>Registered Crops</h3>
          <ul className="registered-crops-list">
            {selectedCrop.map((crop, index) => (
              <li key={index} className="registered-crop-item">
                <span className="crop-name">{crop.name}</span>
                <span className="crop-quantity">{crop.quantity} kg</span>
                <span className="crop-price">${crop.price.toFixed(2)} per kg</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Prices;
