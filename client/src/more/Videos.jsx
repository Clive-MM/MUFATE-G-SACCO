import React from 'react';
import { Box, Typography, Grid, Paper, Container, IconButton, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

const VIDEO_DATA = [
  { 
    id: 1, 
    title: 'Annual Special Delegate Meeting 2026', 
    category: 'OFFICIAL EVENT',
    views: '1.2K views',
    time: '2 days ago',
    duration: '12:00'
  },
  { 
    id: 2, 
    title: 'Member Success Stories: The Journey to Financial Freedom', 
    category: 'TESTIMONIALS',
    views: '850 views',
    time: '1 week ago',
    duration: '05:45'
  },
  { 
    id: 3, 
    title: 'New Digital Banking Features & Security Updates', 
    category: 'PRODUCT LAUNCH',
    views: '3.4K views',
    time: '3 hours ago',
    duration: '08:20'
  },
];

const Videos = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      bgcolor: BRAND.dark, 
      minHeight: '100vh',
      pt: { xs: 15, md: 20 }, 
      pb: 12 
    }}>
      <Container maxWidth="xl">
        
        {/* --- RESTORED CENTERED HEADER --- */}
        <Box sx={{ mb: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                fontSize: { xs: '1rem', md: '1.2rem' },
                mx: 'auto'
              }}
            >
              Experience the Golden Generation journey. Watch our latest highlights, 
              member success stories, and official Sacco updates in high definition.
            </Typography>
          </motion.div>
        </Box>

        {/* --- YOUTUBE STYLE VIDEO GRID --- */}
        <Grid container spacing={4}>
          <AnimatePresence>
            {VIDEO_DATA.map((video, index) => (
              <Grid item xs={12} sm={6} lg={4} key={video.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Thumbnail (16:9 Landscape) */}
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      bgcolor: '#000',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(236, 155, 20, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: BRAND.gold,
                        boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                        '& .play-btn': { opacity: 1, transform: 'scale(1.1)' }
                      }
                    }}
                  >
                    <Box sx={{ 
                      position: 'absolute', bottom: 12, right: 12, 
                      bgcolor: 'rgba(0,0,0,0.8)', color: '#fff', 
                      px: 1, py: 0.3, borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, zIndex: 2 
                    }}>
                      {video.duration}
                    </Box>

                    <PlayCircleFilledWhiteIcon 
                      className="play-btn"
                      sx={{ 
                        fontSize: '4.5rem', 
                        color: BRAND.gold, 
                        zIndex: 2, 
                        opacity: 0.7, 
                        transition: 'all 0.3s ease' 
                      }} 
                    />
                  </Paper>

                  {/* Metadata below video */}
                  <Box sx={{ mt: 2.5, display: 'flex', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: BRAND.gold, 
                        width: 40, 
                        height: 40, 
                        fontWeight: 800, 
                        color: BRAND.dark 
                      }}
                    >
                      GG
                    </Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#FFF', 
                          fontWeight: 700, 
                          lineHeight: 1.3, 
                          fontSize: '1.1rem',
                          mb: 0.5,
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical', 
                          overflow: 'hidden' 
                        }}
                      >
                        {video.title}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: BRAND.textMuted, fontWeight: 500 }}>
                        Golden Generation Sacco • {video.category}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: BRAND.textMuted, opacity: 0.8 }}>
                        {video.views} • {video.time}
                      </Typography>
                    </Box>

                    <IconButton size="small" sx={{ color: BRAND.textMuted, alignSelf: 'flex-start' }}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {/* --- RESTORED ORIGINAL CENTERED FOOTER --- */}
        <Box sx={{ py: 6, mt: 12, position: 'relative', px: { xs: 2, md: 4 } }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  color: BRAND.gold,
                  letterSpacing: '3px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.9rem', md: '1.35rem' }
                }}
              >
                GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
              </Typography>
              <Typography
                sx={{
                  color: BRAND.gold,
                  opacity: 0.85,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  mt: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                All Rights Reserved
              </Typography>
            </Box>

            <IconButton
              onClick={handleScrollToTop}
              component={motion.button}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                position: 'absolute',
                right: 0,
                color: BRAND.gold,
                border: `2px solid ${BRAND.gold}`,
                p: { xs: 0.5, md: 1 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(236, 155, 20, 0.1)',
                  boxShadow: `0 0 15px ${BRAND.gold}`,
                },
              }}
            >
              <ExpandLessIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Videos;