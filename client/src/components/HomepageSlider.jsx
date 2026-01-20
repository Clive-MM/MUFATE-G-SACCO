import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, IconButton, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <Box sx={{ position: 'absolute', bottom: 30, left: { xs: 0, md: '5%' }, width: 'fit-content' }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex" }}> {dots} </ul>
      </Box>
    ),
    customPaging: i => (
      <Box className="custom-dot" sx={{
        width: 12, height: 12, bgcolor: "rgba(236, 155, 20, 0.3)",
        borderRadius: "50%", mx: 0.5, transition: '0.3s',
        border: `1px solid ${BRAND.gold}`
      }} />
    )
  };

  if (loading) return (
    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
      <CircularProgress sx={{ color: BRAND.gold }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', position: 'relative', height: { xs: '75vh', md: '85vh' }, overflow: 'hidden' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', height: { xs: '75vh', md: '85vh' } }}>
            {/* BACKGROUND LAYER */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `
                  linear-gradient(to top, ${BRAND.dark} 30%, transparent 80%), 
                  linear-gradient(to right, ${BRAND.dark} 10%, rgba(2, 21, 15, 0.6) 50%, transparent 90%), 
                  url(${slide.ImagePath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* CONTENT LAYER - FULLY LEFT ALIGNED */}
            <Container maxWidth="xl" sx={{
              position: 'absolute',
              top: '55%',
              left: { xs: '5%', md: '5%' },
              transform: 'translateY(-50%)',
              zIndex: 2,
              pointerEvents: 'none' // Allows clicks to pass to arrows if overlapping
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ pointerEvents: 'auto' }}
              >
                <Typography variant="h1" sx={{
                  color: BRAND.gold,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  maxWidth: "900px",
                  mb: 1,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  textShadow: "4px 4px 15px rgba(0,0,0,0.8)",
                  fontSize: { xs: '2.2rem', sm: '3.5rem', md: '5rem' }
                }}>
                  {slide.Title}
                </Typography>

                <Typography sx={{
                  color: BRAND.light,
                  maxWidth: "650px",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  mb: 5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {/* Sanitizes HTML if description comes with tags */}
                  {slide.Description?.replace(/<[^>]*>/g, '')}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    component={RouterLink} to="/membership" 
                    sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark, '&:hover': { bgcolor: '#fff' } }}
                  >
                    Join Our Community
                  </Button>
                  <Button 
                    component={RouterLink} to="/products/bosa" 
                    sx={{ ...ButtonStyle, border: `2px solid ${BRAND.gold}`, color: BRAND.gold, '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}
                  >
                    Explore Our Products
                  </Button>
                </Stack>
              </motion.div>
            </Container>
          </Box>
        ))}
      </Slider>

      {/* Global CSS for Slick Active Dots */}
      <style>{`
        .slick-dots li.slick-active .custom-dot {
          background-color: ${BRAND.gold} !important;
          width: 30px !important;
          border-radius: 10px !important;
        }
      `}</style>
    </Box>
  );
};

const ButtonStyle = {
  fontWeight: 900,
  px: 4,
  py: 1.8,
  borderRadius: '4px', // Squared off slightly to match the "Register" button in your header
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  transition: '0.3s all',
};

const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', right: 20, top: '50%', zIndex: 10, color: BRAND.gold, bgcolor: 'rgba(2,21,15,0.5)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', left: 20, top: '50%', zIndex: 10, color: BRAND.gold, bgcolor: 'rgba(2,21,15,0.5)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowBackIosNew />
  </IconButton>
);

export default HomepageSlider;