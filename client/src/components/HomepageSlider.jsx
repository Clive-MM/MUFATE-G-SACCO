import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [activeSlide, setActiveSlide] = useState(0); // Track active slide for animation trigger

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
    speed: 500,          // Quick interchange speed
    autoplay: true,
    autoplaySpeed: 3000, // Duration each slide stays
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next), // Resets animation on change
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
          <Box key={index} sx={{ position: 'relative', width: '100%', outline: 'none' }}>
            <Box
              sx={{
                width: '100%',
                height: { xs: '70vh', md: '100vh' },
                minHeight: { xs: '500px', md: '700px' }, 
                backgroundImage: `linear-gradient(to right, ${BRAND.dark} 20%, rgba(2, 21, 15, 0) 80%), url(${slide.ImagePath})`,
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', 
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* LINE TO MOVE TEXT TO FAR LEFT: 
                We remove 'mx: 0' and use 'marginLeft: 0' with 'maxWidth: false' 
              */}
              <Container 
                maxWidth={false} 
                sx={{ 
                  ml: { xs: 2, md: 6, lg: 10 }, // Controls distance from the far left margin
                  width: 'auto' 
                }}
              >
                <AnimatePresence mode="wait">
                  {activeSlide === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }} // Starts further left
                      animate={{ opacity: 1, x: 0 }}    // Slides into position
                      transition={{ duration: 0.5, ease: "easeOut" }} // Matched to slider speed
                    >
                      <Typography variant="h1" sx={{
                        color: BRAND.gold,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        maxWidth: { xs: "100%", md: "500px" },
                        mb: 1,
                        lineHeight: 1.1,
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                      }}>
                        {slide.Title}
                      </Typography>

                      <Typography sx={{
                        color: BRAND.light,
                        maxWidth: "400px",
                        fontWeight: 400,
                        lineHeight: 1.5,
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        mb: 4,
                        opacity: 0.85,
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
                  )}
                </AnimatePresence>
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
  borderRadius: '2px',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
};

export default HomepageSlider;