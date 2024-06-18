import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const SignUp = () => {
  const initialFormData = {
    userType: "User",
    secretKey: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showAdminFields, setShowAdminFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserTypeChange = () => {
    const newUserType = formData.userType === "User" ? "Admin" : "User";
    setFormData({ ...formData, userType: newUserType });
    setShowAdminFields(newUserType === "Admin");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupData = {
        ...formData,
        secretKey: formData.userType === "Admin" ? formData.secretKey : null,
      };

      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log("Sign up successful:", data);
      // Optionally, you can redirect or show a success message here

    } catch (error) {
      console.error("Sign up error:", error.message);
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Sign Up as {formData.userType}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={formData.userType === "Admin"}
                onChange={handleUserTypeChange}
              />
            }
            label={
              formData.userType === "User"
                ? "Switch to Admin"
                : "Switch to User"
            }
          />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {showAdminFields && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Secret Key"
                name="secretKey"
                value={formData.secretKey}
                onChange={handleInputChange}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
            <Typography align="center">
              Already registered?{" "}
              <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
