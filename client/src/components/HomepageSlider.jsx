import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, IconButton, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// UNIFIED BRAND COLORS (Adapted from News.jsx)
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  deepGreen: "#006400",
  overlay: "rgba(2, 21, 15, 0.85)",
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
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <Box sx={{ position: 'absolute', bottom: 30, width: '100%' }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "center" }}> {dots} </ul>
      </Box>
    ),
    customPaging: i => (
      <Box sx={{
        width: 12, height: 12, bgcolor: "rgba(236, 155, 20, 0.3)",
        borderRadius: "50%", mx: 0.5, transition: '0.3s',
        '&:hover': { bgcolor: BRAND.gold }
      }} />
    )
  };

  if (loading) {
    return (
      <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: BRAND.dark, width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', height: { xs: '70vh', md: '85vh' } }}>
            
            {/* 1. BLURRED DYNAMIC BACKGROUND */}
            <Box sx={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${slide.ImagePath})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(20px) brightness(0.3)',
              transform: 'scale(1.1)',
            }} />

            {/* 2. CENTERED HERO CONTENT */}
            <Container maxWidth="lg" sx={{
              height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 2, px: { xs: 2, md: 4 }
            }}>
              <Box sx={{
                width: '100%', maxWidth: 1100, borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)', bgcolor: '#000', position: 'relative'
              }}>
                {/* Main Hero Image */}
                <Box component="img" src={slide.ImagePath} alt={slide.Title}
                  sx={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />

                {/* 3. OVERLAY TEXT PANEL (Styling borrowed from Newsroom) */}
                <Box sx={{
                  position: 'absolute', bottom: 0, left: 0, width: '100%',
                  background: `linear-gradient(to top, ${BRAND.dark} 40%, transparent 100%)`,
                  backdropFilter: 'blur(8px)', p: { xs: 3, md: 5 }, textAlign: 'center'
                }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <Typography variant="h3" sx={{
                      color: BRAND.gold, fontWeight: 900, textTransform: 'uppercase',
                      fontSize: { xs: '1.4rem', sm: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.1, mb: 1.5, textShadow: '3px 3px 15px rgba(0,0,0,0.9)'
                    }}>
                      {slide.Title}
                    </Typography>

                    <Typography sx={{
                      color: BRAND.light, maxWidth: "800px", mx: 'auto', mb: 3,
                      fontSize: { xs: '0.9rem', md: '1.15rem' }, opacity: 0.9,
                      lineHeight: 1.5, textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
                    }}>
                      {slide.Description}
                    </Typography>

                    {/* ACTION BUTTONS */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                      <Button component={RouterLink} to="/membership" sx={ButtonStyle}>
                        Join Our Community
                      </Button>
                      <Button component={RouterLink} to="/products/bosa" sx={{ ...ButtonStyle, bgcolor: 'transparent', border: `2px solid ${BRAND.gold}`, color: BRAND.gold, '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
                        Explore Products
                      </Button>
                    </Stack>
                  </motion.div>
                </Box>
              </Box>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

// SHARED COMPONENT STYLES
const ButtonStyle = {
  backgroundColor: BRAND.gold, color: BRAND.dark, fontWeight: 800,
  px: 4, py: 1.2, borderRadius: '50px', fontSize: '0.9rem',
  transition: '0.3s', letterSpacing: '0.1em',
  boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
  '&:hover': { transform: 'translateY(-3px)', bgcolor: BRAND.light, boxShadow: '0 15px 25px rgba(0,0,0,0.6)' }
};

const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', right: 20, top: '50%', zIndex: 5, color: BRAND.gold, border: `1px solid ${BRAND.gold}`, bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', left: 20, top: '50%', zIndex: 5, color: BRAND.gold, border: `1px solid ${BRAND.gold}`, bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowBackIosNew />
  </IconButton>
);

export default HomepageSlider;