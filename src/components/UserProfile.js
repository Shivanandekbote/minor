import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(4),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

const UserProfile = ({ user, handleLogout }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        password: user.password,
        userType: user.userType,
        address: user.address,
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
            <Typography variant="h4">User Profile</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    label="First Name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    variant="outlined"
                    label="Last Name"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={formData.email}
                    disabled
                    fullWidth
                    margin="normal"
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    variant="outlined"
                    label="User Type"
                    name="userType"
                    value={formData.userType}
                    disabled
                    fullWidth
                    margin="normal"
                />
                {user.userType === 'User' && (
                    <TextField
                        variant="outlined"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                    />
                )}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitButton}
                >
                    Save
                </Button>
            </form>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                className={classes.submitButton}
            >
                Logout
            </Button>
        </div>
    );
};

export default UserProfile;
