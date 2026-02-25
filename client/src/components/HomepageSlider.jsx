import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Keyframes for a smoother "Ken Burns" effect on the image
const zoomEffect = keyframes`
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
};

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // AbortController prevents memory leaks if component unmounts
    const controller = new AbortController();
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/slider/view`, { signal: controller.signal })
      .then((res) => {
        setSlides(res.data.sliders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,         // Slightly faster transition (1s)
    autoplay: true,
    autoplaySpeed: 6500,  // MUCH longer stay (6.5s) to allow reading
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,           // Fade is better for performance than sliding
    arrows: false,
    pauseOnHover: true,   // Let the user pause to read by hovering
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: dots => (
      <Box sx={{ position: 'absolute', bottom: 30, width: '100%' }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </Box>
    ),
  };

  if (loading) return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', bgcolor: BRAND.dark, overflow: 'hidden' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '100svh', md: '100vh' }, // Mobile-friendly height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* IMAGE SECTION - High Performance approach */}
              <Box
                component="img"
                src={slide.ImagePath}
                alt={slide.Title}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Fills the screen properly
                  objectPosition: 'center',
                  zIndex: 1,
                  filter: 'brightness(0.6)', // Darken image to make text pop
                  animation: currentSlide === index ? `${zoomEffect} 7s ease-out forwards` : 'none',
                }}
              />

              {/* OVERLAY GRADIENT for Text Legibility */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(2,21,15,0.9) 0%, rgba(2,21,15,0.4) 100%)',
                zIndex: 2
              }} />

              {/* CONTENT SECTION */}
              <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, px: { xs: 3, md: 8 } }}>
                <Stack spacing={2} sx={{ maxWidth: { xs: '100%', md: '600px' } }}>
                  
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Typography variant="h1" sx={{
                          color: BRAND.gold,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          lineHeight: 1.1,
                          fontSize: { 
                            xs: 'clamp(1.8rem, 8vw, 2.5rem)', 
                            md: 'clamp(2.5rem, 5vw, 4rem)' 
                          },
                          mb: 1
                        }}>
                          {slide.Title}
                        </Typography>

                        <Typography sx={{
                          color: BRAND.light,
                          fontWeight: 400,
                          lineHeight: 1.6,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          mb: 4,
                          opacity: 0.9,
                          maxWidth: '500px'
                        }}>
                          {slide.Description?.replace(/<[^>]*>/g, '')}
                        </Typography>

                        <Stack direction="row" spacing={2}>
                          <Button
                            component={RouterLink} to="/customer_registration"
                            variant="contained"
                            sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark, '&:hover': { bgcolor: '#fff' } }}
                          >
                            Join Us Now
                          </Button>
                          <Button
                            component={RouterLink} to="/products/bosa"
                            variant="outlined"
                            sx={{
                              ...ButtonStyle,
                              borderColor: BRAND.gold,
                              color: BRAND.gold,
                              '&:hover': { borderColor: '#fff', color: '#fff' }
                            }}
                          >
                            Our Products
                          </Button>
                        </Stack>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </Stack>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const ButtonStyle = {
  fontWeight: 800,
  px: { xs: 3, md: 4 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px',
  fontSize: { xs: '0.8rem', md: '0.9rem' },
  textTransform: 'uppercase',
  transition: '0.3s all ease'
};

export default HomepageSlider;