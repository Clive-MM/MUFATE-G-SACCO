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
    <Box sx={{ 
      width: '100%', 
      bgcolor: BRAND.dark, 
      overflow: 'hidden',
      /* FIX: This pushes the slider below your fixed Navbar */
      marginTop: { xs: '80px', md: '100px' } 
    }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100%' }}>
            
            <Box
              sx={{
                width: '100%',
                /* Adjust height so it doesn't cause excessive scrolling */
                height: { xs: 'calc(100vh - 80px)', md: 'calc(100vh - 100px)' },
                minHeight: { xs: '500px', md: '650px' }, 
                backgroundImage: `
                  linear-gradient(to right, ${BRAND.dark} 5%, rgba(2, 21, 15, 0.4) 50%, transparent 90%), 
                  /* REDUCED SHADOW: Changed from 30% darkness to 15% for a lighter feel */
                  linear-gradient(to top, ${BRAND.dark} 15%, transparent 40%),
                  url(${slide.ImagePath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "900px" },
                    mb: 2,
                    lineHeight: { xs: 1.2, md: 1.1 },
                    textShadow: "2px 2px 15px rgba(0,0,0,0.7)",
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '4.8rem' },
                  }}>
                    {slide.Title}
                  </Typography>

                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "650px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textShadow: "1px 1px 8px rgba(0,0,0,0.8)",
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    mb: 5,
                    opacity: 0.95
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
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
  fontWeight: 900,
  px: 5,
  py: 2,
  borderRadius: '4px',
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }
};

const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', right: 25, top: '50%', zIndex: 10, color: BRAND.gold, bgcolor: 'rgba(2,21,15,0.4)', border: `1px solid ${BRAND.gold}`, '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', left: 25, top: '50%', zIndex: 10, color: BRAND.gold, bgcolor: 'rgba(2,21,15,0.4)', border: `1px solid ${BRAND.gold}`, '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowBackIosNew />
  </IconButton>
);

export default HomepageSlider;