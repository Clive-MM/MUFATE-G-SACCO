import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppleIcon from '@mui/icons-material/Apple';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HeroBanner = () => {
  // Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Time between each element appearing
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url("https://res.cloudinary.com/djydkcx01/image/upload/v1747941107/ChatGPT_Image_May_22_2025_10_11_23_PM_aoofyb.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '70vh', md: '80vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-end' },
        px: { xs: 3, md: 10 },
        overflow: 'hidden',

        /* Dark Overlay for Text Readability */
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: {
            xs: 'rgba(1, 20, 7, 0.75)',
            md: 'linear-gradient(to right, rgba(1,20,7,0.9), rgba(1,20,7,0.5), transparent)'
          },
          zIndex: 1,
        },
      }}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={{ position: 'relative', zIndex: 2, maxWidth: '550px' }}
      >
        {/* Visual "Glassmorphism" Left Accent Line */}
        <Box 
          sx={{ 
            borderLeft: `5px solid #EC9B14`, 
            pl: { xs: 2, md: 4 },
            py: 1
          }}
        >
          {/* STAGGERED TITLE */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                mb: 2,
                fontSize: { xs: '2.2rem', md: '3.5rem' },
                lineHeight: 1.1,
                color: '#EC9B14',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                textShadow: '3px 3px 15px rgba(0,0,0,0.6)',
              }}
            >
              Secure Banking <br /> On The Go
            </Typography>
          </motion.div>

          {/* STAGGERED DESCRIPTION */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                fontWeight: 500,
                lineHeight: 1.8,
                color: '#EC9B14',
                mb: 4,
                textShadow: '1px 1px 8px rgba(0,0,0,0.8)',
              }}
            >
              With <strong>GOLDEN GENERATION DT SACCO’s</strong> mobile banking services, 
              managing your finances is effortless. Enjoy secure, 24/7 access to your 
              funds right from your pocket.
            </Typography>
          </motion.div>

          {/* STAGGERED CTA & APP ICONS */}
          <motion.div variants={itemVariants}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Button
                component={RouterLink}
                to="/customer_registration"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#EC9B14',
                  color: '#02150F', // Dark text for high contrast on Gold
                  fontWeight: 900,
                  px: 4,
                  py: 1.8,
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  borderRadius: '4px',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  '&:hover': { 
                    bgcolor: '#FFFFFF', 
                    color: '#02150F',
                    transform: 'translateY(-3px)' 
                  },
                  transition: '0.3s'
                }}
              >
                Become a Member
              </Button>
              
              {/* App Store Indicators */}
              <Stack direction="row" spacing={2} sx={{ color: '#EC9B14', opacity: 0.9 }}>
                <AppleIcon sx={{ fontSize: '2rem', cursor: 'pointer', '&:hover': { color: '#FFF' } }} />
                <PlayArrowIcon sx={{ fontSize: '2rem', cursor: 'pointer', '&:hover': { color: '#FFF' } }} />
              </Stack>
            </Stack>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;