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

const PRIMARY_GOLD = '#FFD700';
const DEEP_GREEN = '#006400';
const DARK_BG_GRADIENT =
  'linear-gradient(135deg, #050509 0%, #160019 40%, #001a0f 100%)';

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/slider/view`)
      .then((response) => {
        setSlides(response.data.sliders || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sliders:', error);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false, // dots are styled in CSS if you later choose to enable them
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
          background: DARK_BG_GRADIENT,
        }}
      >
        <CircularProgress sx={{ color: PRIMARY_GOLD }} />
      </Box>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              background: DARK_BG_GRADIENT,
            }}
          >
            {/* Blurred Background */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.ImagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(16px) brightness(0.4)',
                transform: 'scale(1.08)',
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
                px: { xs: 1.5, sm: 3, md: 5 },
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
                  borderRadius: '16px',
                  border: `2px solid rgba(255, 215, 0, 0.8)`,
                  boxShadow: '0 0 28px rgba(0,0,0,0.7)',
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
                color: '#ffffff',
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
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.5rem', sm: '2.1rem', md: '2.7rem' },
                    textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                    letterSpacing: '0.04em',
                    color: PRIMARY_GOLD,
                  }}
                >
                  {slide.Title}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 700,
                    mx: 'auto',
                    mb: 3,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
                    color: '#f5f5f5',
                  }}
                >
                  {slide.Description}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.55 }}
              >
                <Button
                  component={RouterLink}
                  to="/membership"
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: PRIMARY_GOLD,
                    color: '#111',
                    fontWeight: 700,
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.2 },
                    borderRadius: '999px',
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    letterSpacing: '0.06em',
                    boxShadow: '0 0 16px rgba(255,215,0,0.75)',
                    textTransform: 'uppercase',
                    '&:hover': {
                      backgroundColor: '#ffeb7a',
                      transform: 'scale(1.06)',
                      boxShadow: '0 0 26px rgba(255,215,0,0.95)',
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
      backgroundColor: 'rgba(0,0,0,0.55)',
      border: `1px solid rgba(255,215,0,0.85)`,
      backdropFilter: 'blur(4px)',
      color: PRIMARY_GOLD,
      '&:hover': {
        backgroundColor: PRIMARY_GOLD,
        color: '#111',
      },
    }}
  >
    <ArrowForwardIos fontSize="small" />
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
      backgroundColor: 'rgba(0,0,0,0.55)',
      border: `1px solid rgba(255,215,0,0.85)`,
      backdropFilter: 'blur(4px)',
      color: PRIMARY_GOLD,
      '&:hover': {
        backgroundColor: PRIMARY_GOLD,
        color: '#111',
      },
    }}
  >
    <ArrowBackIosNew fontSize="small" />
  </IconButton>
);

export default HomepageSlider;
