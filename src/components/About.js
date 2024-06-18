// About.js
import React from "react";
import { Container, Typography, Box } from '@mui/material';
import '../css/about.css';

function About() {
  return (
    <Container id="about" sx={{ padding: '2rem 0' }}>
    <Box>
      <Typography variant="h2" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
        aliquet orci. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia Curae; Sed posuere consectetur est at
        lobortis. Aenean eu tellus fermentum, consectetur tortor nec, feugiat
        dolor. Aliquam erat volutpat. Integer condimentum aliquet semper.
      </Typography>
    </Box>
  </Container>
  
  );
}

export default About;
