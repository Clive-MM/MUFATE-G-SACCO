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
            
            {/* 1. FLEXIBLE IMAGE CONTAINER: Prevents vertical cropping */}
            <Box
              sx={{
                width: '100%',
                minHeight: { xs: '550px', md: '750px', lg: '850px' }, 
                backgroundImage: `
                  linear-gradient(to right, ${BRAND.dark} 0%, rgba(2, 21, 15, 0.7) 40%, transparent 85%), 
                  linear-gradient(to top, ${BRAND.dark} 10%, transparent 40%),
                  url(${slide.ImagePath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: { xs: 'center right', md: 'center' },
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* 2. RESPONSIVE TITLE: Adjusted sizes to prevent overflow */}
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "800px" },
                    mb: 2,
                    lineHeight: { xs: 1.2, md: 1.1 },
                    textShadow: "3px 3px 10px rgba(0,0,0,0.8)",
                    fontSize: { xs: '1.8rem', sm: '2.8rem', md: '3.8rem', lg: '4.5rem' },
                    wordBreak: 'keep-all' // Prevents awkward word splitting
                  }}>
                    {slide.Title}
                  </Typography>

                  {/* 3. DESCRIPTION: Uses opacity and shadow for clarity without a box */}
                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "600px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textShadow: "1px 1px 5px rgba(0,0,0,1)",
                    fontSize: { xs: '0.95rem', md: '1.15rem' },
                    mb: 4,
                    opacity: 0.9
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  {/* 4. BUTTONS: Stacked on mobile, row on desktop */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: 'fit-content' }}>
                    <Button 
                      component={RouterLink} to="/membership" 
                      sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark }}
                    >
                      Join Our Community
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
                      Explore Our Products
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
  px: { xs: 3, md: 5 },
  py: 1.5,
  borderRadius: '4px',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  transition: '0.3s ease',
  '&:hover': { transform: 'translateY(-2px)' }
};

const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', right: 15, top: '50%', zIndex: 5, color: BRAND.gold, bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowForwardIos fontSize="small" />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', left: 15, top: '50%', zIndex: 5, color: BRAND.gold, bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowBackIosNew fontSize="small" />
  </IconButton>
);

export default HomepageSlider;