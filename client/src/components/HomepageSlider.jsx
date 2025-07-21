import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
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
    dots: false,
    infinite: true,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '80vh',
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
    <Box sx={{ width: '100%' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            {/* Blurred Background */}
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
                filter: 'blur(16px) brightness(0.5)',
                transform: 'scale(1.1)',
                zIndex: 1,
              }}
            />

            {/* Clear Centered Image */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
              }}
            >
              <img
                src={slide.ImagePath}
                alt={slide.Title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(0,0,0,0.4)',
                }}
              />
            </Box>

            {/* Text Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '4%', sm: '6%', md: '8%' },
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                textAlign: 'center',
                color: '#fff',
                px: 2,
                width: '90%',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '1.4rem', sm: '2rem', md: '2.5rem' },
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
                    mx: 'auto',
                    mb: 3,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
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
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
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

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 4,
      backgroundColor: '#64dd17',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#FFD700',
        color: '#000',
      },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 4,
      backgroundColor: '#64dd17',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#FFD700',
        color: '#000',
      },
    }}
  >
    <ArrowBackIosNew />
  </IconButton>
);

export default HomepageSlider;
