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
  // Using 'md' as the pivot point to ensure laptop (Lg/Xl) remains unchanged
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
              display: "flex",
              flexDirection: "column",
              // Navbar safety padding only on mobile
              pt: { xs: "65px", md: "0px" },
              // Laptop maintains a fixed high-impact height
              height: { xs: "auto", md: "85vh" },
              minHeight: { md: "600px" }
            }}>
              
              {/* IMAGE LAYER */}
              <Box sx={{ 
                position: isMobile ? "relative" : "absolute", 
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 1
              }}>
                <Box
                  component="img"
                  src={slide.ImagePath}
                  alt={slide.Title}
                  sx={{
                    width: "100%",
                    height: { xs: "auto", md: "100%" },
                    objectFit: "cover",
                    display: "block",
                    animation: currentSlide === index ? `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                  }}
                />

                {/* BOTTOM BLEND - Only high visibility on mobile to transition to dark BG */}
                <Box sx={{
                  position: "absolute",
                  bottom: -1,
                  left: 0,
                  width: "100%",
                  height: { xs: "25%", md: "40%" },
                  background: isMobile 
                    ? "linear-gradient(to top, #02150F 15%, transparent 100%)"
                    : "linear-gradient(to top, rgba(2,21,15,0.7) 0%, transparent 100%)",
                  zIndex: 2,
                  pointerEvents: "none",
                  animation: currentSlide === index ? `${fadeUp} 1s ease-out forwards` : "none",
                }} />
                
                {/* TOP PROTECTION - Only on mobile for Navbar readability */}
                {isMobile && (
                  <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "80px",
                    background: "linear-gradient(to bottom, rgba(2,21,15,1) 0%, transparent 100%)",
                    zIndex: 2
                  }} />
                )}
              </Box>

              {/* CONTENT LAYER */}
              <Box sx={{
                // Absolute overlay for Laptop, Relative flow for Mobile
                position: { xs: "relative", md: "absolute" },
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                // Laptop content sits at the bottom overlay, Mobile starts after image
                alignItems: { xs: "flex-start", md: "flex-end" },
                justifyContent: "center",
                zIndex: 4,
                pb: { xs: 6, md: 12 }, // More padding on laptop for cleaner look
                px: 2,
                bgcolor: { xs: BRAND.dark, md: "transparent" }
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
                        <Typography variant="h1" sx={{
                          color: BRAND.gold,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          mb: { xs: 1.5, md: 2.5 },
                          lineHeight: 1.1,
                          fontSize: { xs: '1.6rem', sm: '2rem', md: '3.2rem', lg: '4rem' },
                          letterSpacing: { xs: '1px', md: '3px' },
                          // Shadow restored for laptop readability over image
                          textShadow: isMobile ? 'none' : '2px 4px 15px rgba(0,0,0,0.8)'
                        }}>
                          {slide.Title}
                        </Typography>

                        {/* Description Box - Backdrop blur restored for Laptop only */}
                        <Box sx={{
                          mx: "auto",
                          mb: 4,
                          maxWidth: "850px",
                          p: isMobile ? 0 : { md: 2, lg: 3 },
                          borderRadius: '12px',
                          backdropFilter: isMobile ? 'none' : 'blur(8px)',
                          backgroundColor: isMobile ? 'transparent' : 'rgba(2, 21, 15, 0.4)',
                          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        }}>
                          <Typography sx={{
                            color: BRAND.light,
                            fontWeight: { xs: 400, md: 500 },
                            lineHeight: 1.6,
                            fontSize: { xs: '0.95rem', md: '1.1rem', lg: '1.25rem' },
                            textShadow: isMobile ? "none" : "1px 1px 4px rgba(0,0,0,0.8)"
                          }}>
                            {slide.Description?.replace(/<[^>]*>/g, '')}
                          </Typography>
                        </Box>

                        <Stack 
                          direction={{ xs: "column", sm: "row" }} 
                          spacing={3} 
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
  width: isMobile ? '85%' : 'auto',
  minWidth: { md: '200px' },
  px: { xs: 3, md: 5 },
  py: { xs: 1.2, md: 1.8 },
  borderRadius: '4px',
  fontSize: { xs: '0.85rem', md: '0.9rem' },
  textTransform: 'uppercase',
  transition: '0.4s all ease',
  bgcolor: isPrimary ? BRAND.gold : "transparent",
  color: isPrimary ? BRAND.dark : BRAND.gold,
  border: `2px solid ${BRAND.gold}`,
  '&:hover': {
    bgcolor: isPrimary ? BRAND.light : BRAND.gold,
    color: BRAND.dark,
    transform: 'translateY(-3px)',
    boxShadow: isPrimary ? `0 8px 25px ${BRAND.gold}66` : `0 8px 25px ${BRAND.gold}22`
  }
});

export default HomepageSlider;