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
              height: '90vh',
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

            {/* 3D Card Container */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, md: 4 },
                zIndex: 2,
                perspective: '1300px',
              }}
            >
              <motion.div
                className="ggdtsacco-3d-card"
                initial={{ opacity: 0, rotateY: -8, translateY: 20 }}
                animate={{ opacity: 1, rotateY: 0, translateY: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                whileHover={{
                  rotateX: 4,
                  rotateY: -4,
                  scale: 1.01,
                  transition: { duration: 0.35 },
                }}
                style={{
                  width: '100%',
                  maxWidth: 1150,
                  transformStyle: 'preserve-3d',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 28px 60px rgba(0,0,0,0.75)',
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
                      maxHeight: '70vh',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* glass text panel attached to same card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      bottom: { xs: '4%', md: '6%' },
                      transform: 'translateX(-50%) translateZ(30px)',
                      width: { xs: '94%', sm: '88%', md: '80%' },
                    }}
                  >
                    <Box
                      sx={{
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '18px',
                        px: { xs: 2, md: 3 },
                        py: { xs: 1.6, md: 2 },
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: GOLD,
                          textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                          fontSize: {
                            xs: '1.5rem',
                            sm: '2rem',
                            md: '2.3rem',
                          },
                          mb: 0.8,
                          lineHeight: 1.15,
                        }}
                      >
                        {slide.Title}
                      </Typography>

                      <Typography
                        sx={{
                          color: LIGHT_GOLD,
                          fontWeight: 600,
                          fontSize: {
                            xs: '0.95rem',
                            sm: '1.05rem',
                            md: '1.15rem',
                          },
                          maxWidth: 750,
                          mx: 'auto',
                          lineHeight: 1.35,
                          mb: 1.5,
                        }}
                      >
                        {slide.Description}
                      </Typography>

                      <Button
                        component={RouterLink}
                        to="/membership"
                        sx={{
                          backgroundColor: GOLD,
                          color: '#111',
                          fontWeight: 800,
                          px: { xs: 3, md: 4 },
                          py: 0.8,
                          borderRadius: '999px',
                          fontSize: {
                            xs: '0.85rem',
                            md: '0.95rem',
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
