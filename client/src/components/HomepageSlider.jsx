import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const revealImage = keyframes`
  0% { transform: scale(1.1); opacity: 0; }
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
      // FIX: Pushes the hero below the fixed navbar
      pt: { xs: "80px", md: "100px" } 
    }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ outline: 'none', position: "relative" }}>
            
            <Box sx={{ 
              position: "relative", 
              width: "100%", 
              height: { xs: "70vh", md: "85vh" }, // Defined height for full-view feel
              overflow: "hidden" 
            }}>
              
              {/* THE IMAGE (Now a full Background) */}
              <Box
                component="img"
                src={slide.ImagePath}
                alt={slide.Title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.55)", // Darkens image so text is readable
                  animation: currentSlide === index ? `${revealImage} 1.5s ease-out forwards` : "none",
                }}
              />

              {/* OVERLAY CONTENT (Text OVER the image) */}
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(to right, rgba(2,21,15,0.7) 0%, transparent 100%)",
                zIndex: 4
              }}>
                <Container maxWidth="lg">
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Typography variant="h1" sx={{
                          color: BRAND.gold,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          mb: 1.5,
                          lineHeight: 1.1,
                          // Slightly smaller font for overlay balance
                          fontSize: { xs: '1.6rem', sm: '2.2rem', md: '3.2rem' },
                          maxWidth: { xs: "100%", md: "700px" }
                        }}>
                          {slide.Title}
                        </Typography>

                        <Typography sx={{
                          color: BRAND.light,
                          fontWeight: 500,
                          lineHeight: 1.5,
                          fontSize: { xs: '0.9rem', md: '1.05rem' },
                          mb: 4,
                          maxWidth: "600px",
                          textShadow: "1px 1px 4px rgba(0,0,0,0.8)" // Ensures text visibility
                        }}>
                          {slide.Description?.replace(/<[^>]*>/g, '')}
                        </Typography>

                        <Stack direction="row" spacing={2}>
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
  py: { xs: 1, md: 1.5 },
  borderRadius: '4px',
  fontSize: '0.8rem',
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