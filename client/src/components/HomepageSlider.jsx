import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, keyframes, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Animations from AboutHero
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
            {/* 1. MAIN CONTAINER 
               Switches to flex-column to ensure the image determines the height (No Cropping)
            */}
            <Box sx={{ 
              position: "relative", 
              width: "100%",
              backgroundColor: BRAND.dark,
              display: "flex",
              flexDirection: "column",
              // Navbar padding matches AboutHero
              pt: { xs: "65px", sm: "80px", md: "0px" }, 
            }}>
              
              {/* 2. IMAGE LAYER - height: auto ensures no cropping */}
              <Box sx={{ position: "relative", width: "100%", zIndex: 1 }}>
                <Box
                  component="img"
                  src={slide.ImagePath}
                  alt={slide.Title}
                  sx={{
                    width: "100%",
                    height: "auto", 
                    display: "block",
                    animation: currentSlide === index ? `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                  }}
                />

                {/* 3. RESPONSIVE NAVBAR PROTECTOR (From AboutHero) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: { xs: "80px", md: "160px" },
                    background: {
                      xs: "linear-gradient(to bottom, rgba(2,21,15,1) 0%, transparent 100%)",
                      md: "linear-gradient(to bottom, rgba(2,21,15,0.8) 0%, transparent 100%)"
                    },
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />

                {/* 4. BOTTOM BLEND (From AboutHero) */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    width: "100%",
                    height: { xs: "15%", md: "35%" },
                    background: `linear-gradient(to top, ${BRAND.dark} 15%, transparent 100%)`,
                    zIndex: 3,
                    pointerEvents: "none",
                    animation: currentSlide === index ? `${fadeUp} 1s ease-out forwards` : "none",
                  }}
                />
              </Box>

              {/* 5. CONTENT LAYER 
                 On Laptop, we use Absolute positioning to overlay the bottom blend.
                 On Mobile, it stays Relative to flow below the image.
              */}
              <Box sx={{
                position: { xs: "relative", md: "absolute" },
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 4,
                pb: { xs: 6, md: 8 },
                mt: { xs: -2, md: 0 }, // Slight pull-up for mobile flow
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
                          fontSize: { xs: '1.4rem', sm: '1.8rem', md: '3rem', lg: '3.8rem' },
                          letterSpacing: '2px',
                          textShadow: "2px 2px 10px rgba(0,0,0,0.8)"
                        }}>
                          {slide.Title}
                        </Typography>

                        <Box sx={{
                          mx: "auto",
                          mb: 4,
                          maxWidth: "850px",
                          p: isMobile ? 0 : 2,
                          // Only apply glass effect on laptop for cleaner mobile UI
                          backdropFilter: isMobile ? 'none' : 'blur(6px)',
                          backgroundColor: isMobile ? 'transparent' : 'rgba(2, 21, 15, 0.25)',
                          borderRadius: '12px',
                        }}>
                          <Typography sx={{
                            color: BRAND.light,
                            fontWeight: 500,
                            lineHeight: 1.6,
                            fontSize: { xs: '0.9rem', md: '1.1rem' },
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
  minWidth: { md: '180px' },
  px: { xs: 3, md: 5 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px',
  fontSize: { xs: '0.8rem', md: '0.9rem' },
  textTransform: 'uppercase',
  transition: '0.3s all ease',
  bgcolor: isPrimary ? BRAND.gold : "transparent",
  color: isPrimary ? BRAND.dark : BRAND.gold,
  border: `2px solid ${BRAND.gold}`,
  '&:hover': {
    bgcolor: isPrimary ? BRAND.light : BRAND.gold,
    color: BRAND.dark,
    transform: 'translateY(-2px)',
    boxShadow: isPrimary ? `0 4px 20px ${BRAND.gold}44` : 'none'
  }
});

export default HomepageSlider;