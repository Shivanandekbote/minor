import React from 'react';
import { Typography, Link } from '@mui/material';

function Contact() {
  return (
    <section id="contact">
      <Typography variant="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can contact us at <Link href="mailto:info@example.com">info@example.com</Link>
      </Typography>
    </section>
  );
}

export default Contact;
