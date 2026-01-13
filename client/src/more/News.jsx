import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Container, CircularProgress, Stack } from '@mui/material';
import { AutoAwesome as SparkleIcon } from '@mui/icons-material';

// Slick Slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const News = () => {
  const [heroPosts, setHeroPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from your specialized Hero route
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
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Elegant fade transition
    arrows: false,
    appendDots: dots => (
      <Box sx={{ position: 'absolute', bottom: 30 }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </Box>
    ),
  };

  if (loading) {
    return (
      <Box sx={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: BRAND.dark }}>
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: BRAND.dark, width: '100%' }}>
      {/* 1. Header Heading Section */}
      <Container maxWidth="xl" sx={{ pt: 4, pb: 2 }}>
        <Stack alignItems="center" spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SparkleIcon sx={{ color: BRAND.gold, fontSize: "1rem" }} />
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 800, letterSpacing: 4 }}>
              OFFICIAL UPDATES
            </Typography>
          </Stack>
          <Typography variant="h2" sx={{ color: "#FFF", fontWeight: 900, fontSize: { xs: "2rem", md: "3.5rem" } }}>
            THE <span style={{ color: BRAND.gold }}>NEWSROOM</span>
          </Typography>
        </Stack>
      </Container>

      {/* 2. Hero Slider Section */}
      <Box sx={{ width: '100%', position: 'relative', height: { xs: '50vh', md: '75vh' }, overflow: 'hidden' }}>
        <Slider {...settings}>
          {heroPosts.map((slide, index) => (
            <Box key={slide.PostID || index} sx={{ position: 'relative', height: { xs: '50vh', md: '75vh' } }}>
              {/* Background Image with Dark Overlay */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(to top, ${BRAND.dark} 10%, transparent 50%), url(${slide.CoverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Text Content Overlay */}
              <Container
                maxWidth="lg"
                sx={{
                  position: 'absolute',
                  bottom: { xs: 60, md: 100 },
                  left: { xs: 20, md: '10%' },
                  zIndex: 2
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#FFF",
                      fontWeight: 900,
                      maxWidth: "800px",
                      mb: 2,
                      textShadow: "2px 4px 10px rgba(0,0,0,0.8)",
                      fontSize: { xs: '1.8rem', md: '3.5rem' }
                    }}
                  >
                    {slide.Title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: BRAND.textMuted,
                      maxWidth: "600px",
                      lineHeight: 1.6,
                      textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
                      display: { xs: 'none', md: 'block' }
                    }}
                  >
                    {slide.Content.replace(/<[^>]*>/g, '').substring(0, 180)}...
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

export default News