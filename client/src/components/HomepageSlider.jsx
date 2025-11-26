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

const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
const DEEP_GREEN = '#006400';
const BG_GRADIENT =
  'linear-gradient(135deg, #060606 0%, #12001A 45%, #002010 100%)';

// Simple fade/slide-in for card + text
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const titleVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const descVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const buttonVariants = {
  initial: { opacity: 0, y: 8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/slider/view`)
      .then((res) => {
        setSlides(res.data.sliders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching sliders:', err);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 750,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '75vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: BG_GRADIENT,
        }}
      >
        <CircularProgress sx={{ color: GOLD }} />
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
              height: '82vh',
              background: BG_GRADIENT,
              overflow: 'hidden',
            }}
          >
            {/* Blurred background */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.ImagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(14px) brightness(0.45)',
                transform: 'scale(1.08)',
                zIndex: 1,
              }}
            />

            {/* Centered flat card (no 3D) */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, md: 4 },
                zIndex: 2,
              }}
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: 1150,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 24px 50px rgba(0,0,0,0.75)',
                    backgroundColor: '#000',
                  }}
                >
                  {/* main image */}
                  <img
                    src={slide.ImagePath}
                    alt={slide.Title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />

                  {/* glass text panel (wider, shorter) */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      bottom: { xs: '5%', md: '7%' },
                      transform: 'translateX(-50%)',
                      width: { xs: '96%', sm: '90%', md: '84%' }, // wider
                    }}
                  >
                    <Box
                      sx={{
                        background: 'rgba(0,0,0,0.72)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        px: { xs: 1.8, md: 2.2 },
                        py: { xs: 0.9, md: 1.2 }, // reduced height via padding
                        textAlign: 'center',
                      }}
                    >
                      {/* Title */}
                      <motion.div
                        variants={titleVariants}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: GOLD,
                            textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                            fontSize: {
                              xs: '1.25rem',
                              sm: '1.7rem',
                              md: '1.9rem',
                            },
                            mb: 0.4,
                            lineHeight: 1.1,
                          }}
                        >
                          {slide.Title}
                        </Typography>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        variants={descVariants}
                        transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
                      >
                        <Typography
                          sx={{
                            color: LIGHT_GOLD,
                            fontWeight: 500,
                            fontSize: {
                              xs: '0.88rem',
                              sm: '0.96rem',
                              md: '1rem',
                            },
                            maxWidth: 720,
                            mx: 'auto',
                            lineHeight: 1.28,
                            mb: 0.9, // less bottom margin
                          }}
                        >
                          {slide.Description}
                        </Typography>
                      </motion.div>

                      {/* Button */}
                      <motion.div
                        variants={buttonVariants}
                        transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
                      >
                        <Button
                          component={RouterLink}
                          to="/membership"
                          sx={{
                            backgroundColor: GOLD,
                            color: '#111',
                            fontWeight: 800,
                            px: { xs: 3, md: 3.5 },
                            py: 0.55,
                            borderRadius: '999px',
                            fontSize: {
                              xs: '0.8rem',
                              md: '0.9rem',
                            },
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            boxShadow: '0 7px 16px rgba(0,0,0,0.85)',
                            '&:hover': {
                              backgroundImage: `linear-gradient(135deg, ${DEEP_GREEN}, ${GOLD})`,
                              color: '#fff',
                              transform: 'translateY(-1px)',
                              boxShadow:
                                '0 12px 26px rgba(0,0,0,0.9), 0 0 16px rgba(255,215,0,0.85)',
                            },
                          }}
                        >
                          Register Here
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                </Box>
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
      right: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 4,
      background: 'rgba(0,0,0,0.6)',
      border: `1px solid ${GOLD}`,
      color: GOLD,
      '&:hover': {
        background: GOLD,
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
      left: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 4,
      background: 'rgba(0,0,0,0.6)',
      border: `1px solid ${GOLD}`,
      color: GOLD,
      '&:hover': {
        background: GOLD,
        color: '#111',
      },
    }}
  >
    <ArrowBackIosNew fontSize="small" />
  </IconButton>
);

export default HomepageSlider;
