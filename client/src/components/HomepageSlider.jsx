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
              display: "flex",
              flexDirection: "column",
              // Mobile: padding top for navbar safety like AboutHero
              pt: { xs: "65px", md: "0px" } 
            }}>
              
              {/* IMAGE LAYER - Responsive Height */}
              <Box sx={{ position: "relative", width: "100%" }}>
                <Box
                  component="img"
                  src={slide.ImagePath}
                  alt={slide.Title}
                  sx={{
                    width: "100%",
                    height: { xs: "auto", md: "85vh" }, // Keeps full image on mobile, fixed height on laptop
                    objectFit: "cover",
                    display: "block",
                    zIndex: 1,
                    animation: currentSlide === index ? `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                  }}
                />

                {/* BOTTOM BLEND - Inspired by AboutHero */}
                <Box sx={{
                  position: "absolute",
                  bottom: -1,
                  left: 0,
                  width: "100%",
                  height: { xs: "25%", md: "40%" },
                  background: "linear-gradient(to top, #02150F 15%, transparent 100%)",
                  zIndex: 2,
                  pointerEvents: "none",
                }} />
                
                {/* NAVBAR PROTECTOR - Inspired by AboutHero */}
                <Box sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: { xs: "80px", md: "160px" },
                  background: "linear-gradient(to bottom, rgba(2,21,15,1) 0%, transparent 100%)",
                  zIndex: 2,
                  display: { xs: 'block', md: 'none' } // Only show on mobile to protect logo/menu
                }} />
              </Box>

              {/* CONTENT LAYER */}
              <Box sx={{
                // SWITCH POSITIONING: Absolute for laptop overlay, Relative for mobile stack
                position: { xs: "relative", md: "absolute" },
                top: 0,
                left: 0,
                width: "100%",
                height: { xs: "auto", md: "100%" },
                display: "flex",
                alignItems: { xs: "flex-start", md: "flex-end" },
                justifyContent: "center",
                zIndex: 4,
                mt: { xs: -2, md: 0 }, // Pull text up slightly to meet the gradient
                pb: { xs: 6, md: 10 },
                px: 2,
                bgcolor: { xs: BRAND.dark, md: "transparent" }
              }}>
                <Container maxWidth="lg">
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                      >
                        <Typography variant="h1" sx={{
                          color: BRAND.gold,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          mb: { xs: 1.5, md: 2 },
                          lineHeight: 1.1,
                          fontSize: { xs: '1.6rem', sm: '2rem', md: '3.5rem' },
                          letterSpacing: '1px',
                          textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
                        }}>
                          {slide.Title}
                        </Typography>

                        <Typography sx={{
                          color: BRAND.light,
                          fontWeight: 400,
                          lineHeight: 1.6,
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                          maxWidth: "750px",
                          mx: "auto",
                          mb: 4,
                          opacity: 0.9
                        }}>
                          {slide.Description?.replace(/<[^>]*>/g, '')}
                        </Typography>

                        <Stack 
                          direction={{ xs: "column", sm: "row" }} 
                          spacing={2} 
                          justifyContent="center"
                          alignItems="center"
                        >
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

const ButtonStyle = (isPrimary) => ({
  fontWeight: 800,
  width: { xs: '85%', sm: 'auto' },
  minWidth: { md: '180px' },
  px: { xs: 3, md: 4 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px',
  fontSize: { xs: '0.8rem', md: '0.85rem' },
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  bgcolor: isPrimary ? BRAND.gold : "transparent",
  color: isPrimary ? BRAND.dark : BRAND.gold,
  border: `2px solid ${BRAND.gold}`,
  '&:hover': {
    bgcolor: isPrimary ? BRAND.light : BRAND.gold,
    color: BRAND.dark,
    transform: 'translateY(-2px)',
    boxShadow: isPrimary ? `0 6px 20px ${BRAND.gold}44` : 'none'
  }
});

export default HomepageSlider;