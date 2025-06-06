import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomepageSlider.css';

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/slider/view`)
      .then((response) => setSlides(response.data.sliders))
      .catch((error) => console.error('Error fetching sliders:', error));
  }, []);

  const settings = {
    dots: true,
    dotsClass: 'slick-dots custom-dots',
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box sx={{ mt: 0 }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height: { xs: '60vh', md: '70vh' },
              width: '100%',
              overflow: 'hidden',
            }}
          >
           
            <img
              src={slide.ImagePath}
              alt={slide.Title}
              loading="lazy"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />

          
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            />

            
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#fff',
                zIndex: 2,
                maxWidth: '90%',
                px: 2,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    textShadow: '1px 1px 6px rgba(0,0,0,0.8)',
                    letterSpacing: '1px',
                  }}
                >
                  {slide.Title}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  {slide.Description}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Button
                  component={RouterLink}
                  to="/membership"
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: '#64dd17',
                    color: '#fff',
                    fontWeight: 'bold',
                    px: 3,
                    py: 1,
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    transition: 'all 0.4s ease-in-out',
                    boxShadow: '0 0 6px #64dd17',
                    '&:hover': {
                      backgroundColor: '#76ff03',
                      transform: 'scale(1.08)',
                      boxShadow: '0 0 20px #76ff03',
                    },
                    '&:focus': {
                      outline: 'none',
                      boxShadow: '0 0 15px #76ff03',
                    },
                  }}
                >
                  Register Here
                </Button>
              </motion.div>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HomepageSlider;
