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
                /* HEIGHT: Set to 100vh to ensure the image fills the screen, no white space */
                height: '100vh',
                minHeight: { xs: '600px', md: '750px' }, 
                backgroundImage: `
                  /* GRADIENT: Reduced to quarter length (25%) and made lighter */
                  linear-gradient(to right, ${BRAND.dark} 25%, rgba(2, 21, 15, 0.1) 60%, transparent 100%), 
                  linear-gradient(to top, rgba(2, 21, 15, 0.4) 0%, transparent 15%),
                  url(${slide.ImagePath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                /* VERTICAL DROP: Replaced marginTop with paddingTop to keep image at the top */
                pt: { xs: '140px', md: '180px' } 
              }}
            >
              {/* CONTENT: Pushed to the far left margin */}
              <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, mx: 0 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "600px" },
                    mb: 1,
                    lineHeight: 1.1,
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.4rem', lg: '2.8rem' },
                  }}>
                    {slide.Title}
                  </Typography>

                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "450px",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    textShadow: "1px 1px 4px rgba(0,0,0,0.9)",
                    fontSize: { xs: '0.8rem', md: '0.95rem' },
                    mb: 4,
                    opacity: 0.95
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
  px: 3,
  py: 1,
  borderRadius: '4px',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
};

export default HomepageSlider;