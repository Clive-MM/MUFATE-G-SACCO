import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/clients')
      .then((res) => {
        setTestimonials(res.data.clients);
      })
      .catch((err) => {
        console.error('Error loading testimonials:', err);
      });
  }, []);

  return (
    <Box className="testimonials-section">
      <Typography className="testimonial-title">REVIEWS</Typography>
      <Box className="testimonials-grid">
        {testimonials.map((client) => (
          <Box className="testimonial-card" key={client.ClientID}>
            <Typography className="testimonial-quote">
              {client.ClientStatistic}
            </Typography>
            <Typography className="testimonial-name">
              {client.ClientName}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
