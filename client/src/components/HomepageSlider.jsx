import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const revealImage = keyframes`
  0% { transform: scale(1.08); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(15px); }
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
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
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
            <Box sx={{ 
              position: "relative", 
              width: "100%",
              // Mobile uses auto height to avoid cropping; Laptop uses your initial height logic
              height: isMobile ? "auto" : { md: "85vh", lg: "90vh" }, 
              display: "flex",
              flexDirection: "column",
              pt: isMobile ? "65px" : 0
            }}>
              
              {/* IMAGE LAYER */}
              <Box
                component="img"
                src={slide.ImagePath}
                alt={slide.Title}
                sx={{
                  width: "100%",
                  // Restore initial laptop "auto" or "100%" height while keeping mobile auto
                  height: isMobile ? "auto" : "100%",
                  objectFit: isMobile ? "contain" : "cover",
                  display: "block",
                  zIndex: 1,
                  animation: currentSlide === index ? `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                }}
              />

              {/* OVERLAY / CONTENT LAYER */}
              <Box sx={{
                // THE KEY FIX: Absolute for Laptop (Overlay), Relative for Mobile (Stacked)
                position: isMobile ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: isMobile ? "auto" : "100%",
                display: "flex",
                // Initial laptop alignment: flex-end
                alignItems: isMobile ? "flex-start" : "flex-end", 
                justifyContent: "center",
                // Initial laptop gradient
                background: isMobile ? "none" : "linear-gradient(to top, rgba(2,21,15,0.7) 0%, rgba(2,21,15,0.2) 20%, transparent 40%)",
                zIndex: 4,
                pb: isMobile ? 6 : { md: 8, lg: 10 },
                px: isMobile ? 2 : 0,
                bgcolor: isMobile ? BRAND.dark : "transparent"
              }}>
                <Container maxWidth="lg">
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                      >
                        {/* Title: Mobile-First typography vs Initial Laptop typography */}
                        <Typography variant="h1" sx={{
                          color: BRAND.gold,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          mb: 2,
                          lineHeight: 1.1,
                          fontSize: isMobile ? '1.6rem' : { md: '2.6rem', lg: '3.5rem' },
                          letterSpacing: '2px',
                          textShadow: isMobile ? "none" : "2px 2px 10px rgba(0,0,0,0.8)"
                        }}>
                          {slide.Title}
                        </Typography>

                        {/* Description Box: Backdrop blur only on Laptop */}
                        <Box sx={{
                          mx: "auto",
                          mb: 4,
                          maxWidth: "800px",
                          p: isMobile ? 0 : 2,
                          borderRadius: '12px',
                          backdropFilter: isMobile ? 'none' : 'blur(6px)',
                          backgroundColor: isMobile ? 'transparent' : 'rgba(2, 21, 15, 0.25)',
                          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                        }}>
                          <Typography sx={{
                            color: BRAND.light,
                            fontWeight: 600,
                            lineHeight: 1.5,
                            fontSize: isMobile ? '0.9rem' : '1.1rem',
                            textShadow: "1px 1px 4px rgba(0,0,0,0.8)"
                          }}>
                            {slide.Description?.replace(/<[^>]*>/g, '')}
                          </Typography>
                        </Box>

                        <Stack 
                          direction={isMobile ? "column" : "row"} 
                          spacing={2} 
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Button
                            component={RouterLink} to="/customer_registration"
                            sx={ButtonStyle(true, isMobile)}
                          >
                            Join Us Now
                          </Button>
                          <Button
                            component={RouterLink} to="/products/bosa"
                            sx={ButtonStyle(false, isMobile)}
                          >
                            Explore Products
                          </Button>
                        </Stack>
                      </motion.div>
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

const ButtonStyle = (isPrimary, isMobile) => ({
  fontWeight: 800,
  width: isMobile ? '80%' : 'auto',
  px: { xs: 3, md: 4 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px',
  fontSize: isMobile ? '0.85rem' : '0.9rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  bgcolor: isPrimary ? BRAND.gold : "transparent",
  color: isPrimary ? BRAND.dark : BRAND.gold,
  border: `2.2px solid ${BRAND.gold}`,
  '&:hover': {
    bgcolor: isPrimary ? BRAND.light : BRAND.gold,
    color: BRAND.dark,
    transform: 'translateY(-2px)',
    boxShadow: isPrimary ? `0 4px 20px ${BRAND.gold}44` : 'none'
  }
});

export default HomepageSlider;