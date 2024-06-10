// Homepage.js

import React from "react";
import About from "./About";
import Setup from "./shop"; // Make sure to import the Setup component
import "./home.css";
import { Link } from "react-router-dom";

const Homepage = ({ crops }) => {
  const handleViewMore = () => {
    // Handle the action when the button is clicked
    // For example, navigate to another page
    // window.location.href = '/shop'; // Example navigation
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Our Website!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          consectetur accumsan tortor, et suscipit nulla fermentum id.
        </p>
        <p>
          Integer sed odio justo. Curabitur nec dictum justo. Fusce ultricies
          erat at ligula consequat, et rutrum justo vehicula.
        </p>
      </div>

      <div className="button-container">
        <About />
        <Link to="/about" className="about-link">
          <button className="view-more-button">View More</button>
        </Link>
      </div>

      <Setup /> {/* Render the Setup component here */}
    </div>
  );
};

export default Homepage;
