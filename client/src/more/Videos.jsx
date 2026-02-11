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
    <Box sx={{ bgcolor: BRAND.dark, minHeight: '100vh', pt: { xs: 10, md: 15 }, pb: 12 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 8, textAlign: 'left' }}>
          <Typography 
            variant="h4" 
            fontWeight={900} 
            sx={{ color: '#FFF', mb: 1, textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Recommended Videos
          </Typography>
          <Box sx={{ height: '4px', width: '60px', bgcolor: BRAND.gold, borderRadius: '2px' }} />
        </Box>

        <Grid container spacing={3}>
          <AnimatePresence>
            {VIDEO_DATA.map((video, index) => (
              <Grid item xs={12} sm={6} lg={4} key={video.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* VIDEO THUMBNAIL AREA */}
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 9', // Forces YouTube Shape
                      borderRadius: '12px', // Slightly rounded like modern YT
                      overflow: 'hidden',
                      bgcolor: '#1a1a1a',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover .play-btn': { opacity: 1, transform: 'scale(1.2)' }
                    }}
                  >
                    {/* Duration Badge */}
                    <Box sx={{ 
                      position: 'absolute', bottom: 8, right: 8, 
                      bgcolor: 'rgba(0,0,0,0.8)', color: '#fff', 
                      px: 0.8, py: 0.2, borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, zIndex: 2 
                    }}>
                      {video.duration}
                    </Box>

                    <PlayCircleFilledWhiteIcon 
                      className="play-btn"
                      sx={{ 
                        fontSize: '4rem', 
                        color: BRAND.gold, 
                        zIndex: 2, 
                        opacity: 0.7, 
                        transition: '0.3s ease' 
                      }} 
                    />
                  </Paper>

                  {/* INFO AREA (Below the video) */}
                  <Box sx={{ mt: 2, display: 'flex', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: BRAND.gold, width: 36, height: 36, fontWeight: 'bold', fontSize: '0.8rem' }}>GG</Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ color: '#FFF', fontWeight: 700, lineHeight: 1.3, mb: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      >
                        {video.title}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.85rem' }}>
                        Golden Generation Sacco • {video.category}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.85rem' }}>
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

        {/* Footer */}
        <Box sx={{ mt: 15, borderTop: `1px solid ${BRAND.cardBg}`, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 700, fontSize: '0.8rem' }}>
                GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
            </Typography>
            <IconButton onClick={handleScrollToTop} sx={{ color: BRAND.gold, border: `1px solid ${BRAND.gold}` }}>
                <ExpandLessIcon />
            </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Videos;