import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Container, CircularProgress, Stack } from '@mui/material';
import NewsFeed from './NewsFeed';

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
      <Box sx={{ position: 'absolute', bottom: { xs: 10, md: 40 }, width: '100%' }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "center" }}> {dots} </ul>
      </Box>
    ),
    customPaging: i => (
      <Box sx={{
        width: { xs: 8, md: 12 }, height: { xs: 8, md: 12 }, bgcolor: "rgba(236, 155, 20, 0.3)",
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
    <Box sx={{ bgcolor: BRAND.dark, width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 2 }}>
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
              fontSize: { xs: "1.8rem", sm: "3.5rem", md: "4.5rem" },
              letterSpacing: { xs: "0.05em", md: "0.1em" },
              textAlign: 'center',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
            }}
          >
            THE NEWSROOM
          </Typography>
        </Stack>
      </Container>

      {/* FIXED HERO SECTION */}
      <Box sx={{ width: '100%', position: 'relative', height: { xs: '65vh', md: '75vh' }, mb: 4 }}>
        <Slider {...settings}>
          {heroPosts.map((slide, index) => (
            <Box key={slide.PostID || index} sx={{ position: 'relative', height: { xs: '65vh', md: '75vh' } }}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `
                    linear-gradient(to top, ${BRAND.dark} 25%, transparent 70%), 
                    linear-gradient(to right, rgba(2, 21, 15, 0.8) 0%, transparent 90%), 
                    url(${slide.CoverImage})
                  `,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Container maxWidth="lg" sx={{
                position: 'absolute',
                // On mobile, we anchor to the bottom so it doesn't float over the middle of images
                bottom: { xs: 50, md: 'auto' },
                top: { xs: 'auto', md: '50%' },
                transform: { xs: 'none', md: 'translateY(-50%)' },
                left: { xs: 0, md: '5%' },
                px: { xs: 3, md: 0 },
                zIndex: 2
              }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <Typography variant="h3" sx={{
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    maxWidth: "850px",
                    mb: 1,
                    lineHeight: 1.1,
                    textShadow: "2px 2px 10px rgba(0,0,0,0.9)",
                    fontSize: { xs: '1.5rem', sm: '2.5rem', md: '4rem' }
                  }}>
                    {slide.Title}
                  </Typography>

                  {/* CONTENT VISIBILITY FIX BELOW */}
                  <Typography sx={{
                    color: BRAND.light,
                    maxWidth: "600px",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    opacity: 0.9,
                    textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    // This allows the content to be seen on mobile
                    display: '-webkit-box',
                    WebkitLineClamp: { xs: 3, md: 5 }, // Shows only 3 lines on mobile
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {slide.Content.replace(/<[^>]*>/g, '')}
                  </Typography>
                </motion.div>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>

      <NewsFeed />
    </Box>
  );
};

export default News;