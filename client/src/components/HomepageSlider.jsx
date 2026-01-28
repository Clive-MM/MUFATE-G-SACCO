import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// 1. ANIMATIONS (Ported from AboutHero)
const revealImage = keyframes`
  0% { transform: scale(1.15); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

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
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
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
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100vh', 
              position: 'relative' 
            }}>
              
              {/* --- IMAGE SECTION (Upper 70%) --- */}
              <Box sx={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
                {/* 2. THE IMAGE LAYER */}
                {activeSlide === index && (
                  <Box
                    component="img"
                    src={slide.ImagePath}
                    alt={slide.Title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      zIndex: 1,
                      animation: `${revealImage} 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                    }}
                  />
                )}

                {/* 3. NAVBAR PROTECTOR (Gradient Top) */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "160px",
                    background: "linear-gradient(to bottom, rgba(2,21,15,0.9) 0%, transparent 100%)",
                    zIndex: 2,
                    pointerEvents: "none",
                }} />

                {/* 4. BOTTOM BLEND (Gradient Bottom) */}
                <Box sx={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    width: "100%",
                    height: "30%",
                    background: `linear-gradient(to top, ${BRAND.dark} 20%, transparent 100%)`,
                    zIndex: 3,
                    pointerEvents: "none",
                    animation: `${fadeUp} 1.2s ease-out forwards`,
                }} />
              </Box>

              {/* --- CONTENT SECTION (Bottom 30% + Centered) --- */}
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                bgcolor: BRAND.dark,
                pb: 6,
                px: 3
              }}>
                <Container maxWidth="md">
                  <AnimatePresence mode="wait">
                    {activeSlide === index && (
                      <Box component={motion.div}>
                        
                        {/* Title: Stagger 1 */}
                        <Typography
                          component={motion.h1}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          variant="h1"
                          sx={{
                            color: BRAND.gold,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            fontSize: { xs: '1.8rem', md: '2.8rem' },
                            mb: 1,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1
                          }}
                        >
                          {slide.Title}
                        </Typography>

                        {/* Description: Stagger 2 */}
                        <Typography
                          component={motion.p}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.5 }}
                          sx={{
                            color: BRAND.light,
                            maxWidth: '600px',
                            mx: 'auto',
                            fontWeight: 300,
                            fontSize: { xs: '0.9rem', md: '1.05rem' },
                            mb: 4,
                            opacity: 0.85,
                            lineHeight: 1.6
                          }}
                        >
                          {slide.Description?.replace(/<[^>]*>/g, '')}
                        </Typography>

                        {/* Buttons: Stagger 3 */}
                        <Stack 
                          component={motion.div}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          direction="row" 
                          spacing={2} 
                          justifyContent="center"
                        >
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
                              border: `2px solid ${BRAND.gold}`, 
                              color: BRAND.gold,
                              '&:hover': { bgcolor: 'rgba(236, 155, 20, 0.1)' }
                            }}
                          >
                            Explore Products
                          </Button>
                        </Stack>
                      </Box>
                    )}
                  </AnimatePresence>
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
  px: { xs: 4, md: 5 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }
};

export default HomepageSlider;