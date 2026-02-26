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
  // Pivot at 'md' to protect the initial Laptop (Lg/Xl) layout
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
              // Laptop: 85vh height (Initial Logic) | Mobile: auto (No-crop Logic)
              height: isMobile ? "auto" : "85vh", 
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
                  height: isMobile ? "auto" : "100%",
                  objectFit: isMobile ? "contain" : "cover",
                  display: "block",
                  zIndex: 1,
                  animation: currentSlide === index ? `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                }}
              />

              {/* CONTENT LAYER - THE CONTROLLER */}
              <Box sx={{
                // Absolute overlay for Laptop | Relative stack for Mobile
                position: isMobile ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: isMobile ? "auto" : "100%",
                display: "flex",
                alignItems: isMobile ? "flex-start" : "flex-end", 
                justifyContent: "center",
                // Gradient only for Laptop (Initial Logic)
                background: isMobile ? "none" : "linear-gradient(to top, rgba(2,21,15,0.6) 0%, rgba(2,21,15,0.2) 20%, transparent 40%)",
                zIndex: 4,
                pb: isMobile ? 6 : { md: 8, lg: 10 },
                px: isMobile ? 2 : 0,
                bgcolor: isMobile ? BRAND.dark : "transparent",
                // FIX: Applying fadeUp to the mobile container to use the variable
                animation: (isMobile && currentSlide === index) ? `${fadeUp} 0.8s ease-out forwards` : "none",
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
                          mb: 2,
                          lineHeight: 1.1,
                          fontSize: isMobile ? '1.5rem' : { md: '2.6rem', lg: '3.5rem' },
                          letterSpacing: '2px',
                          textShadow: isMobile ? "none" : "1px 1px 2px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,0.8)"
                        }}>
                          {slide.Title}
                        </Typography>

                        {/* Description Box - Initial Laptop Blur vs Mobile Plain */}
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
                            fontSize: isMobile ? '0.85rem' : '1.1rem',
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
  width: isMobile ? '85%' : 'auto',
  px: { xs: 3, md: 4 },
  py: { xs: 1.1, md: 1.2 },
  borderRadius: '4px',
  fontSize: isMobile ? '0.8rem' : '0.85rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  bgcolor: isPrimary ? BRAND.gold : "transparent",
  color: isPrimary ? BRAND.dark : BRAND.gold,
  border: isPrimary ? "none" : `1.5px solid ${BRAND.gold}`,
  '&:hover': {
    bgcolor: isPrimary ? BRAND.light : BRAND.gold,
    color: BRAND.dark,
    transform: 'translateY(-2px)',
    boxShadow: isPrimary ? `0 4px 20px ${BRAND.gold}44` : 'none'
  }
});

export default HomepageSlider;