import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import axios from 'axios';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

const Videos = () => {
  const [videos, setVideos] = useState([1, 2, 3]); // Placeholder for initial state

  // You can use this to fetch actual video data from your backend
  useEffect(() => {
    // axios.get('https://mufate-g-sacco.onrender.com/media/videos')
    //   .then(res => setVideos(res.data.videos))
    //   .catch(err => console.log(err));
  }, []);

  return (
    <Box sx={{ 
      bgcolor: BRAND.dark, 
      minHeight: '100vh',
      pt: { xs: 15, md: 20 }, // Increased top padding to ensure clear visibility below navbar
      pb: 12 
    }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 8, textAlign: { xs: 'center', md: 'left' } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                color: BRAND.gold, 
                mb: 2,
                fontSize: { xs: '2.8rem', md: '4.5rem' },
                textTransform: 'uppercase',
                letterSpacing: '4px',
                lineHeight: 1
              }}
            >
              Media Gallery
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                color: BRAND.textMuted,
                fontWeight: 300,
                maxWidth: '800px',
                lineHeight: 1.8,
                fontSize: { xs: '1rem', md: '1.2rem' }
              }}
            >
              Experience the Golden Generation journey. Watch our latest highlights, 
              member success stories, and official Sacco updates in high definition.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={5}> {/* Increased spacing between cards */}
          <AnimatePresence>
            {videos.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}> {/* Large 2-col on tablets, 3-col on desktop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ y: -15 }} // More dramatic lift on hover
                >
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'relative',
                      height: { xs: 350, md: 450, lg: 500 }, // Significantly increased height
                      borderRadius: '24px', // Rounder corners for a modern feel
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'black',
                      border: '1px solid rgba(236, 155, 20, 0.2)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: BRAND.gold,
                        boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${BRAND.gold}33`,
                        '& .play-btn': { transform: 'scale(1.1) rotate(360deg)', color: BRAND.gold },
                        '& .video-overlay': { background: 'linear-gradient(180deg, rgba(2,21,15,0) 0%, rgba(2,21,15,0.95) 100%)' }
                      },
                    }}
                  >
                    {/* Background Visual (This would be the video thumbnail) */}
                    <Box 
                      className="video-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(2,21,15,0.2) 0%, rgba(2,21,15,0.8) 100%)',
                        zIndex: 1,
                        transition: '0.4s'
                      }} 
                    />

                    <PlayCircleFilledWhiteIcon 
                      className="play-btn"
                      sx={{ 
                        fontSize: '6rem', // Larger play button
                        color: 'rgba(255,255,255,0.9)', 
                        zIndex: 2,
                        transition: 'all 0.6s ease'
                      }} 
                    />

                    <Box sx={{
                      position: 'absolute',
                      bottom: 40,
                      left: 30,
                      right: 30,
                      zIndex: 3
                    }}>
                      <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 2 }}>
                        FEATURED CONTENT
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: '#FFF', 
                          fontWeight: 800, 
                          mt: 1,
                          fontSize: { xs: '1.5rem', md: '1.8rem' } 
                        }}
                      >
                        Annual Special Delegate Meeting 2026
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
                        A comprehensive look at our strategic growth and 2026 vision.
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  );
};

export default Videos;