import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const revealImage = keyframes`
  0% { transform: scale(1.08); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
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
    speed: 1500,         // Smooth transition time
    autoplay: true,
    autoplaySpeed: 7500,  // Optimized for readability (7.5 seconds)
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    pauseOnHover: true,   // UX: Let them stop the slide to read by touching/hovering
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
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
          <Box key={index} sx={{ position: 'relative', width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                // Fix: svh ensures mobile buttons stay above browser UI bars
                height: { xs: '100svh', md: '100vh' }, 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                bgcolor: BRAND.dark,
                position: 'relative'
              }}
            >
              {/* IMAGE SECTION - Performance Optimized while keeping your exact layout */}
              <Box
                component="img"
                src={slide.ImagePath}
                alt={slide.Title}
                sx={{
                  width: '100%',
                  height: { xs: '60%', md: '100%' },
                  objectFit: 'cover', // Exactly like background-size: cover
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 1,
                  opacity: 0.6, // Ensures text pops
                  animation: currentSlide === index ? `${revealImage} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards` : 'none',
                }}
              />

              {/* CONTENT SECTION */}
              <Box sx={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                pt: { xs: '65%', md: 0 } // Positions text below the image on mobile
              }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, mx: 0 }}>
                  
                  <motion.div
                    key={`content-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={currentSlide === index ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Typography variant="h1" sx={{
                      color: BRAND.gold,
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      maxWidth: { xs: "100%", md: "600px" },
                      mb: { xs: 1, md: 2 },
                      lineHeight: 1.1,
                      // Fix: Fluid Typography (clamp)
                      fontSize: { 
                        xs: 'clamp(1.4rem, 6vw, 2rem)', 
                        md: 'clamp(2rem, 4vw, 3.5rem)' 
                      },
                    }}>
                      {slide.Title}
                    </Typography>

                    <Typography sx={{
                      color: BRAND.light,
                      maxWidth: { xs: "100%", md: "500px" },
                      fontWeight: 400,
                      lineHeight: 1.5,
                      // Fix: Readable Body Text for mobile
                      fontSize: { xs: '0.95rem', md: '1.1rem' },
                      mb: { xs: 3, md: 5 },
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
                        }}
                      >
                        Products
                      </Button>
                    </Stack>
                  </motion.div>
                </Container>
              </Box>
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
  py: { xs: 1, md: 1.5 },
  borderRadius: '4px',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }
};

export default HomepageSlider;