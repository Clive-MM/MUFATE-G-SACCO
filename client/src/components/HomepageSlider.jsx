import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Your preferred Reveal Animation
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
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 7500, // 7.5 seconds for better readability
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
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
          <Box key={index} sx={{ outline: 'none' }}>
            {/* 1. TOP IMAGE LAYER (Styled like your AboutHero) */}
            <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
              <Box
                component="img"
                src={slide.ImagePath}
                alt={slide.Title}
                sx={{
                  width: "100%",
                  height: { xs: "auto", md: "75vh" }, // Natural height on mobile, cinematic on desktop
                  objectFit: "cover",
                  display: "block",
                  animation: currentSlide === index ? `${revealImage} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                }}
              />
              
              {/* TOP GRADIENT (Navbar Protector) */}
              <Box sx={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "120px",
                background: "linear-gradient(to bottom, rgba(2,21,15,0.8) 0%, transparent 100%)",
                zIndex: 2
              }} />

              {/* BOTTOM BLEND (Smooth transition to text) */}
              <Box sx={{
                position: "absolute", bottom: -1, left: 0, width: "100%", height: "30%",
                background: "linear-gradient(to top, #02150F 15%, transparent 100%)",
                zIndex: 3
              }} />
            </Box>

            {/* 2. CENTERED CONTENT SECTION (Below the Image) */}
            <Box sx={{ 
              bgcolor: BRAND.dark, 
              pt: { xs: 2, md: 4 }, 
              pb: { xs: 8, md: 10 }, 
              textAlign: "center" 
            }}>
              <Container maxWidth="md">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Typography variant="h1" sx={{
                        color: BRAND.gold,
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        mb: 2,
                        lineHeight: 1.2,
                        // Fluid Typography for better visibility
                        fontSize: { xs: 'clamp(1.5rem, 5vw, 2.2rem)', md: 'clamp(2.2rem, 4vw, 3.5rem)' },
                      }}>
                        {slide.Title}
                      </Typography>

                      <Typography sx={{
                        color: BRAND.light,
                        fontWeight: 400,
                        lineHeight: 1.7,
                        fontSize: { xs: '0.95rem', md: '1.1rem' },
                        mb: 4,
                        opacity: 0.85,
                        maxWidth: "800px",
                        mx: "auto"
                      }}>
                        {slide.Description?.replace(/<[^>]*>/g, '')}
                      </Typography>

                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                          component={RouterLink} to="/customer_registration"
                          sx={ButtonStyle(true)}
                        >
                          Join Us Now
                        </Button>
                        <Button
                          component={RouterLink} to="/products/bosa"
                          sx={ButtonStyle(false)}
                        >
                          Our Products
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

// Reusable Button Logic to keep code clean
const ButtonStyle = (isPrimary) => ({
  fontWeight: 800,
  px: { xs: 3, md: 5 },
  py: { xs: 1.2, md: 1.8 },
  borderRadius: '4px',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  bgcolor: isPrimary ? BRAND.gold : "transparent",
  color: isPrimary ? BRAND.dark : BRAND.gold,
  border: isPrimary ? "none" : `1.5px solid ${BRAND.gold}`,
  '&:hover': {
    bgcolor: isPrimary ? BRAND.light : BRAND.gold,
    color: BRAND.dark,
    transform: 'translateY(-3px)'
  }
});

export default HomepageSlider;