import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Stack, useTheme, useMediaQuery } from '@mui/material';
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
    autoplaySpeed: 3500,
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
                minHeight: { xs: '600px', md: '700px' }, 
                backgroundImage: `url(${slide.ImagePath})`,
                // Keep 'contain' for laptop, but use 'cover' or '100% auto' for mobile to fill width
                backgroundSize: { xs: '100% auto', md: 'contain' }, 
                backgroundRepeat: 'no-repeat',
                // Position image at the bottom on mobile to leave the top shadow for text
                backgroundPosition: { xs: 'center bottom', md: 'right center' }, 
                bgcolor: BRAND.dark, 
                display: 'flex',
                // On mobile, align items to the top (flex-start)
                alignItems: { xs: 'flex-start', md: 'center' },
                pt: { xs: '120px', md: '0px' } 
              }}
            >
              <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 }, mx: 0 }}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "420px" },
                    mb: 2,
                    lineHeight: 1.2,
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                  }}>
                    {slide.Title}
                  </Typography>

                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: { xs: "100%", md: "340px" },
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontSize: { xs: '0.85rem', md: '0.78rem' },
                    mb: 4,
                    opacity: 0.9,
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <Button 
                      component={RouterLink} to="/customer_registration" 
                      sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark }}
                    >
                      Join Us
                    </Button>
                    <Button 
                      component={RouterLink} to="/products" 
                      sx={{ 
                        ...ButtonStyle, 
                        border: `1.5px solid ${BRAND.gold}`, 
                        color: BRAND.gold,
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
  px: 3,
  py: 1,
  borderRadius: '4px',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
};

export default HomepageSlider;