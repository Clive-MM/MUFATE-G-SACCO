import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomepageSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/slider/view`)
      .then((response) => {
        setSlides(response.data.sliders);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sliders:', error);
        setLoading(false);
      });
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
    autoplaySpeed: 4000,
    arrows: true,
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <CircularProgress sx={{ color: '#64dd17' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 0, width: '100%' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            {/* Image as background using absolute fill */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${slide.ImagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
              }}
            />

            {/* Dark overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 2,
              }}
            />

            {/* Centered content */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#fff',
                px: 2,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                  }}
                >
                  {slide.Title}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 600,
                    mb: 3,
                    textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                  }}
                >
                  {slide.Description}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
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
                    boxShadow: '0 0 6px #64dd17',
                    '&:hover': {
                      backgroundColor: '#76ff03',
                      transform: 'scale(1.08)',
                      boxShadow: '0 0 20px #76ff03',
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
