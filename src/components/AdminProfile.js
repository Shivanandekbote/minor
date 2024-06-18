import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AdminProfile = ({ user, handleLogout }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    password: user.password,
    userType: user.userType,
    secretKey: user.secretKey,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User updated successfully');
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Admin Profile</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="First Name"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Last Name"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="User Type"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          disabled
        />
        <TextField
          variant="outlined"
          label="Secret Key"
          name="secretKey"
          value={formData.secretKey}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default AdminProfile;
