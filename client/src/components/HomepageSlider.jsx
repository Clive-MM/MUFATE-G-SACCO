import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, IconButton, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// UNIFIED BRAND COLORS
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
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
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <Box sx={{ position: 'absolute', bottom: { xs: 20, md: 40 }, width: '100%' }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "center" }}> {dots} </ul>
      </Box>
    ),
    customPaging: i => (
      <Box sx={{
        width: { xs: 8, md: 12 }, height: { xs: 8, md: 12 }, bgcolor: "rgba(236, 155, 20, 0.3)",
        borderRadius: "50%", mx: 0.5, transition: '0.3s',
        '&:hover': { bgcolor: BRAND.gold }
      }} />
    )
  };

  if (loading) {
    return (
      <Box sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', position: 'relative', height: { xs: '70vh', md: '85vh' }, overflow: 'hidden', bgcolor: BRAND.dark }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', height: { xs: '70vh', md: '85vh' } }}>
            
            {/* FULL WIDTH BACKGROUND WITH BRAND GRADIENTS */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `
                  linear-gradient(to top, ${BRAND.dark} 25%, transparent 70%), 
                  linear-gradient(to right, rgba(2, 21, 15, 0.8) 0%, transparent 90%), 
                  url(${slide.ImagePath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* LEFT-ALIGNED TEXT OVERLAY */}
            <Container maxWidth="xl" sx={{
              position: 'absolute',
              bottom: { xs: 60, md: 'auto' },
              top: { xs: 'auto', md: '50%' },
              transform: { xs: 'none', md: 'translateY(-50%)' },
              left: { xs: 0, md: '5%' },
              px: { xs: 3, md: 5 },
              zIndex: 2
            }}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                <Typography variant="h2" sx={{
                  color: BRAND.gold,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  maxWidth: "850px",
                  mb: 2,
                  lineHeight: 1.1,
                  textShadow: "2px 2px 12px rgba(0,0,0,0.9)",
                  fontSize: { xs: '1.8rem', sm: '3rem', md: '4.5rem' }
                }}>
                  {slide.Title}
                </Typography>

                <Typography sx={{
                  color: BRAND.light,
                  maxWidth: "650px",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  opacity: 0.95,
                  textShadow: "1px 1px 6px rgba(0,0,0,0.8)",
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  mb: 4,
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 4, md: 6 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {slide.Description}
                </Typography>

                {/* CALL TO ACTION BUTTONS */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    component={RouterLink} 
                    to="/membership" 
                    sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark }}
                  >
                    Join Our Community
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/products/bosa" 
                    sx={{ 
                      ...ButtonStyle, 
                      bgcolor: 'transparent', 
                      border: `2px solid ${BRAND.gold}`, 
                      color: BRAND.gold,
                      '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark }
                    }}
                  >
                    Explore Our Products
                  </Button>
                </Stack>
              </motion.div>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

// SHARED BUTTON STYLE
const ButtonStyle = {
  fontWeight: 800,
  px: { xs: 3, md: 5 },
  py: 1.5,
  borderRadius: '50px',
  fontSize: { xs: '0.85rem', md: '0.95rem' },
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  transition: '0.3s ease',
  boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 20px rgba(0,0,0,0.5)' }
};

// CUSTOM NAVIGATION ARROWS
const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', right: 25, top: '50%', zIndex: 4, color: BRAND.gold, border: `1px solid ${BRAND.gold}`, bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowForwardIos fontSize="medium" />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', left: 25, top: '50%', zIndex: 4, color: BRAND.gold, border: `1px solid ${BRAND.gold}`, bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowBackIosNew fontSize="medium" />
  </IconButton>
);

export default HomepageSlider;