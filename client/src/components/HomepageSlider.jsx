import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", // Deep SACCO Green
  light: "#F4F4F4",
};

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

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
  };

  if (loading) return (
    <Box sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', bgcolor: BRAND.dark, overflow: 'hidden' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                minHeight: { xs: '500px', md: '700px' }, 
                /* 1. REMOVED DARK GRADIENT: Only the image is used now */
                backgroundImage: `url(${slide.ImagePath})`,
                /* 2. FIX CROPPING: Use 'contain' to see the whole photo, or '100% 100%' to force fill */
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center right', // Keeps the people on the right visible
                bgcolor: BRAND.dark, // Fills any gaps with brand color
                display: 'flex',
                alignItems: 'center',
                pt: { xs: '140px', md: '180px' } 
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6 }, mx: 0 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* 3. FURTHER REDUCED TITLE FONT SIZE */}
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "500px" },
                    mb: 1,
                    lineHeight: 1.1,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Softened shadow
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.4rem' },
                  }}>
                    {slide.Title}
                  </Typography>

                  {/* 4. FURTHER REDUCED DESCRIPTION FONT SIZE */}
                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "400px",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    mb: 4,
                    opacity: 0.9
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <Button 
                      component={RouterLink} to="/membership" 
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
                        '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark }
                      }}
                    >
                      Products
                    </Button>
                  </Stack>
                </motion.div>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const ButtonStyle = {
  fontWeight: 800,
  px: 2,
  py: 0.8,
  borderRadius: '4px',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
};

export default HomepageSlider;