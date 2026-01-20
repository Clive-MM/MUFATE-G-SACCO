import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  light: "#F4F4F4",
};

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/slider/view`)
      .then((res) => {
        setSlides(res.data.sliders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600, // Faster transition animation
    autoplay: true,
    autoplaySpeed: 4000, // Balanced interchange time
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  if (loading) return (
    <Box sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', bgcolor: BRAND.dark, overflow: 'hidden' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ outline: 'none' }}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '80vh', md: '100vh' },
                minHeight: { xs: '500px', md: '600px' }, 
                backgroundImage: `linear-gradient(to right, ${BRAND.dark} 0%, rgba(2, 21, 15, 0.4) 100%), url(${slide.ImagePath})`,
                backgroundSize: 'cover', // Changed to cover for better filling on all screens
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center', 
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10 } }}>
                <AnimatePresence mode="wait">
                  {activeSlide === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }} // Snappier motion
                    >
                      <Typography 
                        variant="h1" 
                        sx={{
                          color: BRAND.gold,
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          maxWidth: { xs: "100%", md: "600px", lg: "800px" },
                          mb: 1,
                          lineHeight: 1.1,
                          letterSpacing: '0.02em',
                          // Responsive Font Sizes for any laptop/screen size
                          fontSize: { 
                            xs: '1.5rem', 
                            sm: '2rem', 
                            md: '2.5rem', 
                            lg: '3.5rem', 
                            xl: '4rem' 
                          },
                        }}
                      >
                        {slide.Title}
                      </Typography>

                      <Typography sx={{
                        color: BRAND.light,
                        maxWidth: { xs: "100%", sm: "450px", md: "500px" },
                        fontWeight: 400,
                        lineHeight: 1.6,
                        // Responsive description size
                        fontSize: { xs: '0.85rem', md: '1rem' },
                        mb: 4,
                        opacity: 0.9,
                      }}>
                        {slide.Description?.replace(/<[^>]*>/g, '')}
                      </Typography>

                      <Stack direction="row" spacing={2}>
                        <Button 
                          component={RouterLink} to="/customer_registration" 
                          sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark }}
                        >
                          Join Us
                        </Button>
                        <Button 
                          component={RouterLink} to="/products/bosa" 
                          sx={{ 
                            ...ButtonStyle, 
                            border: `1.5px solid ${BRAND.gold}`, 
                            color: BRAND.gold,
                            '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark }
                          }}
                        >
                          Products
                        </Button>
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

// Enhanced Button for all screen sizes
const ButtonStyle = {
  fontWeight: 700,
  px: { xs: 2, md: 4 },
  py: { xs: 1, md: 1.5 },
  borderRadius: '4px',
  fontSize: { xs: '0.7rem', md: '0.85rem' },
  textTransform: 'uppercase',
  transition: '0.4s all ease',
  boxShadow: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 4px 15px rgba(236, 155, 20, 0.3)',
  }
};

export default HomepageSlider;