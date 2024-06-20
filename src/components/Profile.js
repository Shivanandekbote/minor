import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fname: user?.fname || '',
    lname: user?.lname || '',
    password: '',
    address: user?.address || '',
    image: user?.image || '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email: user.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      {editMode ? (
        <>
          <TextField
            margin="normal"
            fullWidth
            label="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Profile Picture URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            disabled={loading}
            sx={{ mt: 2, mr: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setEditMode(false)}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            First Name: {user.fname}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Last Name: {user.lname}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Address: {user.address}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Profile Picture URL: {user.image}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleEdit}
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        </>
      )}
    </Box>
  );
};

export default Profile;
