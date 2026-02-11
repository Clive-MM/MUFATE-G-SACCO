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
  { id: 1, title: 'Annual Special Delegate Meeting 2026', category: 'OFFICIAL EVENT', views: '1.2K views', time: '2 days ago', duration: '12:00' },
  { id: 2, title: 'Member Success Stories: The Journey to Financial Freedom', category: 'TESTIMONIALS', views: '850 views', time: '1 week ago', duration: '05:45' },
  { id: 3, title: 'New Digital Banking Features & Security Updates', category: 'PRODUCT LAUNCH', views: '3.4K views', time: '3 hours ago', duration: '08:20' },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Videos = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      bgcolor: BRAND.dark, 
      minHeight: '100vh',
      pt: { xs: 8, md: 15 }, 
      pb: 8,
      overflow: 'hidden' 
    }}>
      <Container maxWidth="xl">
        
        {/* Header Section */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center', px: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                color: BRAND.gold, 
                mb: 2,
                fontSize: { xs: '2.2rem', sm: '3.5rem', md: '4.5rem' },
                textTransform: 'uppercase',
                letterSpacing: { xs: '2px', md: '4px' },
                lineHeight: 1.1
              }}
            >
              Media Gallery
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                color: BRAND.textMuted,
                fontWeight: 300,
                maxWidth: '750px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
              }}
            >
              Experience the Golden Generation journey. Watch our latest highlights, 
              member success stories, and official Sacco updates in high definition.
            </Typography>
          </motion.div>
        </Box>

        {/* Video Grid with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <AnimatePresence>
              {VIDEO_DATA.map((video) => (
                <Grid item xs={12} sm={6} lg={4} key={video.id}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    whileTap={{ scale: 0.98 }} // Mobile physical feedback
                  >
                    {/* Thumbnail Card */}
                    <Paper
                      elevation={0}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        borderRadius: { xs: '12px', md: '20px' }, // Smoother mobile corners
                        overflow: 'hidden',
                        bgcolor: '#000',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(236, 155, 20, 0.08)',
                        transition: '0.3s ease-in-out',
                        '&:hover': {
                          borderColor: BRAND.gold,
                          boxShadow: `0 15px 40px rgba(0,0,0,0.7), 0 0 20px ${BRAND.gold}20`,
                          '& .play-btn': { opacity: 1, transform: 'scale(1.1) rotate(10deg)' },
                          '& .thumb-img': { transform: 'scale(1.05)' }
                        }
                      }}
                    >
                      {/* Placeholder for Video Image */}
                      <Box 
                        className="thumb-img"
                        sx={{ 
                          position: 'absolute', inset: 0, 
                          bgcolor: 'rgba(255,255,255,0.03)', 
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                        }} 
                      />

                      <Box sx={{ 
                        position: 'absolute', bottom: 10, right: 10, 
                        bgcolor: 'rgba(0,0,0,0.85)', color: '#fff', 
                        px: 1, py: 0.2, borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, zIndex: 3
                      }}>
                        {video.duration}
                      </Box>

                      <PlayCircleFilledWhiteIcon 
                        className="play-btn"
                        sx={{ 
                          fontSize: { xs: '3.5rem', md: '5rem' }, 
                          color: BRAND.gold, 
                          zIndex: 2, 
                          opacity: 0.8, 
                          transition: 'all 0.4s ease' 
                        }} 
                      />
                    </Paper>

                    {/* Metadata Area */}
                    <Box sx={{ mt: { xs: 1.5, md: 2.5 }, display: 'flex', gap: { xs: 1.5, md: 2 }, px: { xs: 1, md: 0 } }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: BRAND.gold, 
                          width: { xs: 36, md: 44 }, 
                          height: { xs: 36, md: 44 }, 
                          fontWeight: 800, 
                          fontSize: '0.8rem',
                          color: BRAND.dark,
                          boxShadow: `0 4px 10px rgba(0,0,0,0.3)`
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
                            fontSize: { xs: '1rem', md: '1.15rem' },
                            mb: 0.5,
                            display: '-webkit-box', 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden' 
                          }}
                        >
                          {video.title}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                          Golden Generation • {video.category}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, opacity: 0.6, fontSize: { xs: '0.75rem', md: '0.8rem' } }}>
                          {video.views} • {video.time}
                        </Typography>
                      </Box>

                      <IconButton size="small" sx={{ color: BRAND.textMuted, alignSelf: 'flex-start', mt: -0.5 }}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </motion.div>

        {/* Footer */}
        <Box sx={{ py: 6, mt: { xs: 6, md: 12 }, borderTop: `1px solid rgba(236, 155, 20, 0.1)` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  color: BRAND.gold,
                  letterSpacing: '2px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.75rem', md: '1.2rem' }
                }}
              >
                GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
              </Typography>
              <Typography
                sx={{
                  color: BRAND.gold,
                  opacity: 0.7,
                  fontSize: { xs: '0.65rem', md: '0.8rem' },
                  fontWeight: 600,
                  mt: 0.5,
                  textTransform: 'uppercase'
                }}>
                All Rights Reserved
              </Typography>
            </Box>

            <IconButton
              onClick={handleScrollToTop}
              component={motion.button}
              whileHover={{ y: -5, backgroundColor: BRAND.gold, color: BRAND.dark }}
              whileTap={{ scale: 0.9 }}
              sx={{
                position: 'absolute',
                right: { xs: 0, md: 20 },
                color: BRAND.gold,
                border: `1.5px solid ${BRAND.gold}`,
                p: { xs: 0.5, md: 1 },
                transition: 'all 0.3s ease',
              }}
            >
              <ExpandLessIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
            </IconButton>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Videos;