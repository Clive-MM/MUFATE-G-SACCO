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
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 7000,
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
    <Box sx={{ 
      width: '100%', 
      bgcolor: BRAND.dark, 
      overflow: 'hidden',
      pt: 0 
    }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ outline: 'none', position: "relative" }}>
            
            <Box sx={{ 
              position: "relative", 
              width: "100%", 
              height: "auto", 
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              
              {/* IMAGE: Full clarity brightness 1 */}
              <Box
                component="img"
                src={slide.ImagePath}
                alt={slide.Title}
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  zIndex: 1,
                  filter: "brightness(1)", 
                  animation: currentSlide === index ? `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                }}
              />

              {/* OVERLAY: Bottom-aligned and Centralized */}
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end", // Positions text at the bottom
                justifyContent: "center",
                // Subtle gradient only at the bottom to protect text visibility
                background: "linear-gradient(to top, rgba(2,21,15,0.7) 0%, rgba(2,21,15,0.3) 25%, transparent 50%)",
                zIndex: 4,
                pb: { xs: 4, md: 8 } // Space from bottom edge
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
                          mb: 1,
                          lineHeight: 1.1,
                          // Reduced font sizes
                          fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.8rem' },
                          maxWidth: "900px",
                          mx: "auto",
                          textShadow: "2px 2px 10px rgba(0,0,0,0.7)"
                        }}>
                          {slide.Title}
                        </Typography>

                        <Typography sx={{
                          color: BRAND.light,
                          fontWeight: 500,
                          lineHeight: 1.4,
                          // Reduced font sizes
                          fontSize: { xs: '0.8rem', md: '0.95rem' },
                          mb: { xs: 3, md: 4 },
                          maxWidth: "750px",
                          mx: "auto",
                          textShadow: "1px 1px 8px rgba(0,0,0,0.7)"
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
                            Products
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

const ButtonStyle = (isPrimary) => ({
  fontWeight: 800,
  px: { xs: 2.5, md: 4 },
  py: { xs: 0.8, md: 1.2 },
  borderRadius: '4px',
  fontSize: { xs: '0.65rem', md: '0.75rem' },
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