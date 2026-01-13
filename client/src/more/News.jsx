import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Box, Typography, Container, CircularProgress, Stack, useTheme, useMediaQuery } from '@mui/material';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 7000,
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
        borderRadius: "50%", mx: 0.8, transition: '0.3s',
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

      {/* 1. Page Heading - Styled to match Contact Hero */}
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 12 }, pb: 4 }}>
        <Stack alignItems="center" spacing={1}>
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              color: BRAND.gold,
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '2.5rem', md: '5rem' },
              letterSpacing: { xs: '0.1em', md: '0.2em' },
              textAlign: 'center',
              lineHeight: 1,
              filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))',
            }}
          >
            THE <span style={{ color: BRAND.light }}>NEWSROOM</span>
          </Typography>

          <Typography
            sx={{
              color: BRAND.textMuted,
              fontWeight: 500,
              letterSpacing: '4px',
              fontSize: '0.8rem',
              textTransform: 'uppercase'
            }}
          >
            Latest Updates & Insights
          </Typography>
        </Stack>
      </Container>

      {/* 2. Hero Slider - Uniform Background and Text logic */}
      <Box sx={{ width: '100%', position: 'relative', height: { xs: '65vh', md: '75vh' }, mt: 4 }}>
        <Slider {...settings}>
          {heroPosts.map((slide, index) => (
            <Box key={slide.PostID || index} sx={{ position: 'relative', height: { xs: '65vh', md: '75vh' } }}>

              {/* Background with Brand Overlay */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(to bottom, rgba(2,21,15,0.5) 0%, ${BRAND.dark} 100%), url(${slide.CoverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Content Overlay - Styled like a Professional Card overlay */}
              <Container
                maxWidth="lg"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: { xs: 0, md: '5%' },
                  zIndex: 2,
                  px: { xs: 3, md: 0 }
                }}
              >
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Box sx={{
                    p: { md: 4 },
                    borderRadius: '24px',
                    maxWidth: "900px",
                    // Subtle glassmorphism to match ContactDetails cards
                    background: { md: 'rgba(2, 21, 15, 0.4)' },
                    backdropFilter: { md: 'blur(10px)' },
                    border: { md: '1px solid rgba(255,255,255,0.05)' }
                  }}>
                    <Typography
                      variant="h3"
                      sx={{
                        color: BRAND.gold,
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        mb: 2,
                        lineHeight: 1.1,
                        fontSize: { xs: '2.2rem', md: '4.2rem' },
                        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.8))',
                      }}
                    >
                      {slide.Title}
                    </Typography>

                    <Typography
                      sx={{
                        color: BRAND.light,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        fontWeight: 400,
                        lineHeight: 1.6,
                        opacity: 0.85,
                        maxWidth: "700px",
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {slide.Content.replace(/<[^>]*>/g, '')}
                    </Typography>
                  </Box>
                </motion.div>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* FOOTER - Uniform with ContactUs */}
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography
          sx={{
            color: BRAND.gold,
            letterSpacing: '3px',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: { xs: '0.9rem', md: '1.35rem' },
            opacity: 0.6
          }}
        >
          GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default News;