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
              height: '80vh', // a little shorter to avoid cropping
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

            {/* Centered main image */}
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
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 1150,
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 50px rgba(0,0,0,0.75)',
                  backgroundColor: '#000',
                  position: 'relative',
                }}
              >
                <img
                  src={slide.ImagePath}
                  alt={slide.Title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Text panel */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: { xs: '10%', md: '12%' }, // moved a bit higher
                    transform: 'translateX(-50%)',
                    width: { xs: '96%', sm: '88%', md: '82%' }, // wider
                  }}
                >
                  <Box
                    sx={{
                      background: 'rgba(0,0,0,0.78)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '18px',
                      px: { xs: 2, md: 3 },
                      py: { xs: 1, md: 1.4 }, // less vertical padding
                      textAlign: 'center',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: GOLD,
                          textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                          fontSize: {
                            xs: '1.3rem',
                            sm: '1.8rem',
                            md: '2rem',
                          },
                          mb: 0.5,
                          lineHeight: 1.1,
                        }}
                      >
                        {slide.Title}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                    >
                      <Typography
                        sx={{
                          color: LIGHT_GOLD,
                          fontWeight: 600,
                          fontSize: {
                            xs: '0.9rem',
                            sm: '0.98rem',
                            md: '1.02rem',
                          },
                          maxWidth: 760,
                          mx: 'auto',
                          lineHeight: 1.3,
                          mb: 1, // smaller bottom margin
                        }}
                      >
                        {slide.Description}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    >
                      <Button
                        component={RouterLink}
                        to="/membership"
                        sx={{
                          backgroundColor: GOLD,
                          color: '#111',
                          fontWeight: 800,
                          px: { xs: 3, md: 4 },
                          py: 0.6,
                          borderRadius: '999px',
                          fontSize: {
                            xs: '0.82rem',
                            md: '0.9rem',
                          },
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          boxShadow: '0 8px 18px rgba(0,0,0,0.8)',
                          '&:hover': {
                            backgroundImage: `linear-gradient(135deg, ${DEEP_GREEN}, ${GOLD})`,
                            color: '#fff',
                            transform: 'translateY(-2px)',
                            boxShadow:
                              '0 14px 30px rgba(0,0,0,0.9), 0 0 18px rgba(255,215,0,0.9)',
                          },
                        }}
                      >
                        Register Here
                      </Button>
                    </motion.div>
                  </Box>
                </Box>
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
