import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import AdminProfile from './AdminProfile';
import { Typography } from '@material-ui/core';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>; // You can add a loading indicator here
  }

  return user.userType === 'Admin' ? (
    <AdminProfile user={user} handleLogout={handleLogout} />
  ) : (
    <UserProfile user={user} handleLogout={handleLogout} />
  );
};

export default Profile;
