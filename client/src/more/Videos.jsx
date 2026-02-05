import React from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Videos = () => {
  return (
    <Box sx={{ 
      bgcolor: BRAND.dark, // Uniform background with footer
      minHeight: '100vh',
      pt: { xs: 12, md: 16 }, // Padded down to be fully visible below the header
      pb: 10 
    }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            fontWeight={900} 
            sx={{ 
              color: BRAND.gold, 
              mb: 1,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Media Gallery
          </Typography>

          <Typography 
            variant="h6" 
            sx={{ 
              mb: 6, 
              color: BRAND.textMuted,
              fontWeight: 400,
              maxWidth: '700px'
            }}
          >
            Explore our journey through video. Watch coverage of our latest services, 
            community events, and official SACCO announcements.
          </Typography>
        </motion.div>

        <Grid 
          container 
          spacing={4} 
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <motion.div variants={itemVariants} whileHover={{ y: -10 }}>
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    height: { xs: 250, md: 280 },
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: BRAND.cardBg,
                    border: '1.5px solid rgba(236, 155, 20, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: BRAND.gold,
                      boxShadow: `0 10px 30px ${BRAND.dark}`,
                      '& .play-icon': { transform: 'scale(1.2)', color: BRAND.gold }
                    },
                  }}
                >
                  {/* Video Thumbnail Placeholder Overlay */}
                  <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(2,21,15,0.1) 0%, rgba(2,21,15,0.8) 100%)',
                    zIndex: 1
                  }} />

                  <PlayCircleFilledWhiteIcon 
                    className="play-icon"
                    sx={{ 
                      fontSize: '4rem', 
                      color: 'rgba(255,255,255,0.8)', 
                      zIndex: 2,
                      transition: '0.3s ease'
                    }} 
                  />

                  <Box sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    zIndex: 3
                  }}>
                    <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 800 }}>
                      SGM Event Highlights 2026
                    </Typography>
                    <Typography variant="caption" sx={{ color: BRAND.gold, fontWeight: 700 }}>
                      OFFICIAL ANNOUNCEMENT
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Videos;