import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const revealImage = keyframes`
  0% { transform: scale(1.05); opacity: 0; }
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
    // Using the environment variable for the Golden Generation API
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
    speed: 1500, // Smooth transition speed
    autoplay: true,
    /* SPEED ADJUSTMENT: Changed from 3500 to 6000 (6 seconds). 
       This allows users on mobile and desktop enough time to read the text.
    */
    autoplaySpeed: 6000, 
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Ensures "Fade" transition so images don't slide awkwardly
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
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
          <Box key={index}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 'auto', md: '100vh' },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                bgcolor: BRAND.dark,
              }}
            >
              {/* TEXT CONTENT SECTION:
                Reduced from 45% width to ~33% width (3/4 of previous) on desktop.
              */}
              <Box sx={{ 
                order: { xs: 2, md: 1 },
                width: { xs: '100%', md: '33.3%' }, 
                height: { xs: 'auto', md: '100vh' },
                display: 'flex',
                alignItems: 'center',
                py: { xs: 6, md: 0 },
                zIndex: 2,
                background: BRAND.dark
              }}>
                <Container sx={{ px: { xs: 3, md: 5 } }}>
                  <motion.div
                    key={`content-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={currentSlide === index ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography variant="h1" sx={{
                      color: BRAND.gold,
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      mb: 2,
                      lineHeight: 1.1,
                      fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' },
                    }}>
                      {slide.Title}
                    </Typography>
                    
                    <Typography sx={{
                      color: BRAND.light,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      mb: 4,
                      opacity: 0.85,
                    }}>
                      {slide.Description?.replace(/<[^>]*>/g, '')}
                    </Typography>

                    <Stack direction="row" spacing={2}>
                      <Button component={RouterLink} to="/customer_registration" sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark }}>
                        Join Us
                      </Button>
                      <Button component={RouterLink} to="/products/bosa" sx={{ ...ButtonStyle, border: `1.5px solid ${BRAND.gold}`, color: BRAND.gold }}>
                        Products
                      </Button>
                    </Stack>
                  </motion.div>
                </Container>
              </Box>

              {/* IMAGE SECTION:
                Expanded to fill the remaining 66.7% of the screen on desktop.
              */}
              <Box
                sx={{
                  order: { xs: 1, md: 2 },
                  width: { xs: '100%', md: '66.7%' },
                  height: { xs: '380px', sm: '480px', md: '100vh' },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src={slide.ImagePath}
                  alt={slide.Title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    /* The animation now triggers every time the slide changes */
                    animation: currentSlide === index ? `${revealImage} 1.8s ease-out forwards` : 'none',
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const ButtonStyle = {
  fontWeight: 700,
  px: { xs: 2.5, md: 3.5 },
  py: { xs: 1, md: 1.2 },
  borderRadius: '4px',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
};

export default HomepageSlider;