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
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
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
                backgroundImage: `url(${slide.ImagePath})`,
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: { xs: 'center', md: 'right center' }, 
                bgcolor: BRAND.dark, 
                display: 'flex',
                alignItems: 'center',
                pt: { xs: '100px', md: '120px' } 
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, mx: 0 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* TITLE: Significantly reduced for an elegant look */}
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "420px" },
                    mb: 1,
                    lineHeight: 1.1,
                    letterSpacing: '0.02em',
                    textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem', lg: '1.8rem' },
                  }}>
                    {slide.Title}
                  </Typography>

                  {/* DESCRIPTION: Reduced to small-print/caption size */}
                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "340px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                    fontSize: { xs: '0.7rem', md: '0.78rem' },
                    mb: 4,
                    opacity: 0.85,
                    letterSpacing: '0.01em'
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  <Stack direction="row" spacing={1.5}>
                    <Button 
                      component={RouterLink} to="/customer_registration" 
                      sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark }}
                    >
                      Join Us
                    </Button>
                    <Button 
                      component={RouterLink} to="/products/bosa" 
                      sx={{ 
                        ...ButtonStyle, 
                        border: `1.5px solid ${BRAND.gold}`, 
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
  fontWeight: 700,
  px: 2,
  py: 0.6,
  borderRadius: '2px',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
  boxShadow: 'none',
};

export default HomepageSlider;