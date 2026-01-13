import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Container, CircularProgress, Stack } from '@mui/material';

// Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const News = () => {
  const [heroPosts, setHeroPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts/hero')
      .then(res => {
        setHeroPosts(res.data.hero || []);
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
    arrows: false,
    appendDots: dots => (
      <Box sx={{ position: 'absolute', bottom: 40, width: '100%' }}>
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
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: BRAND.dark, width: '100%', minHeight: '100vh', overflow: 'hidden' }}>

      {/* 1. Page Heading - Styled with Brand Gold Typography */}
      <Container maxWidth="xl" sx={{ pt: 6, pb: 4 }}>
        <Stack alignItems="center" spacing={1}>
          <Typography
            variant="h2"
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              color: BRAND.gold,
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              letterSpacing: "0.1em",
              textAlign: 'center',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
            }}
          >
            THE NEWSROOM
          </Typography>
        </Stack>
      </Container>

      {/* 2. Actualized Hero Slider Section */}
      <Box sx={{ width: '100%', position: 'relative', height: { xs: '60vh', md: '75vh' } }}>
        <Slider {...settings}>
          {heroPosts.map((slide, index) => (
            <Box key={slide.PostID || index} sx={{ position: 'relative', height: { xs: '60vh', md: '75vh' } }}>

              {/* Background Layer */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `
                    linear-gradient(to top, ${BRAND.dark} 15%, transparent 60%), 
                    linear-gradient(to right, rgba(2, 21, 15, 0.8) 0%, transparent 70%), 
                    url(${slide.CoverImage})
                  `,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Text Content Overlay */}
              <Container maxWidth="lg" sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: { xs: 0, md: '5%' },
                zIndex: 2
              }}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <Typography variant="h3" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: "850px",
                    mb: 2,
                    lineHeight: 1.1,
                    textShadow: "4px 4px 15px rgba(0,0,0,0.9)",
                    fontSize: { xs: '2.2rem', md: '4rem' }
                  }}>
                    {slide.Title}
                  </Typography>

                  <Typography variant="h6" sx={{
                    color: BRAND.light,
                    maxWidth: "600px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    opacity: 0.9,
                    display: { xs: 'none', md: 'block' },
                    textShadow: "2px 2px 10px rgba(0,0,0,0.8)"
                  }}>
                    {slide.Content.replace(/<[^>]*>/g, '').substring(0, 220)}...
                  </Typography>
                </motion.div>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default News;