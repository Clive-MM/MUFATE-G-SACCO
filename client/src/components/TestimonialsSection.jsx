import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
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
        {testimonials.map((client, index) => (
          <motion.div
            key={client.ClientID}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
          >
            <Typography className="testimonial-quote">
              {client.ClientStatistic}
            </Typography>
            <Typography className="testimonial-name">
              {client.ClientName}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
