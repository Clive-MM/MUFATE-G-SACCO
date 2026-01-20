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
      /* LINE THAT DROPS HERO SECTION LOWER */
      marginTop: { xs: '80px', md: '100px' } 
    }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100%' }}>
            
            <Box
              sx={{
                width: '100%',
                height: { xs: 'calc(100vh - 80px)', md: 'calc(100vh - 100px)' },
                minHeight: { xs: '500px', md: '650px' }, 
                backgroundImage: `
                  linear-gradient(to right, ${BRAND.dark} 20%, rgba(2, 21, 15, 0.2) 60%, transparent 95%), 
                  linear-gradient(to top, ${BRAND.dark} 10%, transparent 30%),
                  url(${slide.ImagePath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* Container padding reduced and maxWidth set to xl to allow content to hit the left edge further */}
              <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4, lg: 6 }, ml: { md: 2, lg: 4 } }}>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* REDUCED FONT SIZE: To prevent overshadowing the image */}
                  <Typography variant="h1" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: { xs: "100%", md: "750px" },
                    mb: 1.5,
                    lineHeight: { xs: 1.2, md: 1.1 },
                    textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem', lg: '3.8rem' },
                  }}>
                    {slide.Title}
                  </Typography>

                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "550px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
                    fontSize: { xs: '0.9rem', md: '1.05rem' },
                    mb: 4,
                    opacity: 0.9
                  }}>
                    {slide.Description?.replace(/<[^>]*>/g, '')}
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                      Our Products
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
  px: 4,
  py: 1.5,
  borderRadius: '4px',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
  '&:hover': { transform: 'translateY(-2px)' }
};

const NextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', right: 20, top: '50%', zIndex: 10, color: BRAND.gold, bgcolor: 'rgba(2,21,15,0.4)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowForwardIos fontSize="small" />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: 'absolute', left: 20, top: '50%', zIndex: 10, color: BRAND.gold, bgcolor: 'rgba(2,21,15,0.4)', '&:hover': { bgcolor: BRAND.gold, color: BRAND.dark } }}>
    <ArrowBackIosNew fontSize="small" />
  </IconButton>
);

export default HomepageSlider;