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
      <Box sx={{ position: 'relative', mt: -4, pb: 2, width: '100%' }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "center" }}> {dots} </ul>
      </Box>
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
            sx={{
              color: BRAND.gold,
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: "2rem", md: "4.5rem" },
              textAlign: 'center',
            }}
          >
            THE NEWSROOM
          </Typography>
        </Stack>
      </Container>

      {/* Hero Slider - Changed to minHeight to allow full content growth */}
      <Box sx={{ width: '100%', position: 'relative', mb: 4 }}>
        <Slider {...settings}>
          {heroPosts.map((slide, index) => (
            <Box key={slide.PostID || index} sx={{ outline: 'none' }}>
              <Box sx={{ 
                position: 'relative', 
                // Uses minHeight so the card expands if the text is long
                minHeight: { xs: '70vh', md: '75vh' },
                display: 'flex !important',
                flexDirection: 'column',
                justifyContent: 'center',
                py: { xs: 8, md: 10 } 
              }}>
                {/* Background Image */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `
                      linear-gradient(to top, ${BRAND.dark} 20%, rgba(2, 21, 15, 0.4) 100%), 
                      url(${slide.CoverImage})
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1
                  }}
                />
                
                {/* Content Container */}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography variant="h3" sx={{
                      color: BRAND.gold,
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      maxWidth: "850px",
                      mb: 3,
                      lineHeight: 1.1,
                      textShadow: "2px 2px 15px rgba(0,0,0,0.9)",
                      fontSize: { xs: '1.8rem', md: '4rem' }
                    }}>
                      {slide.Title}
                    </Typography>

                    <Typography sx={{
                      color: BRAND.light,
                      maxWidth: "800px",
                      fontWeight: 400,
                      lineHeight: 1.6,
                      opacity: 1,
                      textShadow: "1px 1px 10px rgba(0,0,0,1)",
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      // REMOVED ALL CLAMPING AND SUBSTRING - SHOWS FULL TEXT
                      display: 'block',
                      height: 'auto',
                      overflow: 'visible'
                    }}>
                      {slide.Content.replace(/<[^>]*>/g, '')}
                    </Typography>
                  </motion.div>
                </Container>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <NewsFeed />
    </Box>
  );
};

export default News;