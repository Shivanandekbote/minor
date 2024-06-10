import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Navigation.css';

function Navigation({ isAuthenticated, handleLogout, user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You can add code here to handle search functionality
  };

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span> 
          </button>
          <Link className="navbar-brand" to="/">SDG 2- ZERO HUNGER</Link>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav pull-right">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/shop">SHOP</Link></li>
            {isAuthenticated ? (
              <li className="profile-dropdown">
                <button onClick={toggleDropdown} className="profile-button">
                  <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                  {user.username} <span className="caret"></span>
                </button>
                {dropdownVisible && (
                  <ul className="dropdown-menu">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button onClick={logout} className="logout-button">Logout</button></li>
                  </ul>
                )}
              </li>
            ) : (
              <li><Link to="/login">LOGIN</Link></li>
            )}
          </ul>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* You can add a search button or additional search functionality here */}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
