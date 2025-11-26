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

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 },
  },
};

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
          background: DARK_BG_GRADIENT,
        }}
      >
        <CircularProgress sx={{ color: PRIMARY_GOLD }} />
      </Box>
    );
  }

  if (!slides.length) return null;

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
                  boxShadow: '0 0 28px rgba(0,0,0,0.7)',
                }}
              />
            </Box>

            {/* Text Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '5%', sm: '6%', md: '8%' },
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                width: { xs: '95%', sm: '85%', md: '75%' },
                px: 2,
              }}
            >
              <Box
                sx={{
                  background:
                    'linear-gradient(135deg, rgba(0,0,0,0.78), rgba(0,0,0,0.6))',
                  borderRadius: '20px',
                  px: { xs: 2, sm: 3.5, md: 4 },
                  py: { xs: 2, sm: 2.5, md: 3 },
                  boxShadow: '0 18px 40px rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  color: '#fff',
                }}
              >
                {/* Title */}
                <motion.div
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 1.5,
                      color: PRIMARY_GOLD,
                      textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                      fontSize: {
                        xs: '1.8rem',
                        sm: '2.3rem',
                        md: '2.7rem',
                      },
                      letterSpacing: '0.03em',
                      maxWidth: { xs: '100%', md: '80%' },
                      mx: 'auto',
                      lineHeight: 1.15,
                    }}
                  >
                    {slide.Title}
                  </Typography>
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Typography
                    variant="h5"
                    sx={{
                      maxWidth: 900,
                      mx: 'auto',
                      mb: 3,
                      fontWeight: 600,
                      color: PRIMARY_GOLD,
                      textShadow: '1px 1px 5px rgba(0,0,0,0.85)',
                      fontSize: {
                        xs: '1rem',
                        sm: '1.15rem',
                        md: '1.3rem',
                      },
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {slide.Description}
                  </Typography>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
                >
                  <Button
                    component={RouterLink}
                    to="/membership"
                    variant="contained"
                    size="medium"
                    sx={{
                      backgroundColor: PRIMARY_GOLD,
                      color: '#111',
                      fontWeight: 800,
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.2 },
                      borderRadius: '999px',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      boxShadow: '0 0 18px rgba(255,215,0,0.8)',
                      '&:hover': {
                        backgroundImage: `linear-gradient(135deg, ${DEEP_GREEN}, ${PRIMARY_GOLD})`,
                        backgroundColor: 'transparent',
                        color: '#fff',
                        transform: 'scale(1.07)',
                        boxShadow:
                          '0 0 32px rgba(255,215,0,0.95), 0 0 16px rgba(0,0,0,0.6)',
                      },
                    }}
                  >
                    Register Here
                  </Button>
                </motion.div>
              </Box>
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
