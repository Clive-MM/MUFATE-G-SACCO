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
        staggerChildren: 0.3, 
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url("https://res.cloudinary.com/djydkcx01/image/upload/v1747941107/ChatGPT_Image_May_22_2025_10_11_23_PM_aoofyb.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '80vh', md: '75vh' }, // Taller on mobile for better text fit
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-end' },
        px: { xs: 2, md: 10 },
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
            xs: 'rgba(1, 20, 7, 0.85)', // Darker on mobile
            md: 'linear-gradient(to right, rgba(1,20,7,0.9), rgba(1,20,7,0.4), transparent)'
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
        sx={{ 
            position: 'relative', 
            zIndex: 2, 
            maxWidth: '600px',
            textAlign: { xs: 'center', md: 'left' } // Center text on mobile
        }}
      >
        {/* STAGGERED TITLE */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
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
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              fontWeight: 500,
              lineHeight: 1.8,
              color: '#EC9B14',
              mb: 4,
              textShadow: '1px 1px 8px rgba(0,0,0,0.8)',
            }}
          >
            With <strong>GOLDEN GENERATION DT SACCO’s</strong> mobile banking services, 
            managing your finances is effortless. Enjoy secure, 24/7 access to your account 
            right from your phone — whether you're checking balances, transferring 
            funds, or paying bills on the go.
          </Typography>
        </motion.div>

        {/* STAGGERED CTA */}
        <motion.div variants={itemVariants}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            alignItems="center"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            <Button
              component={RouterLink}
              to="/customer_registration"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#EC9B14',
                color: '#02150F',
                fontWeight: 900,
                px: 4,
                py: 1.8,
                fontSize: '0.9rem',
                borderRadius: '4px',
                width: { xs: '100%', sm: 'auto' }, // Full width button on mobile
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
            
            {/* APP STORE SECTION */}
            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
               <Typography 
                 sx={{ 
                   color: '#FFFFFF', 
                   fontSize: '0.75rem', 
                   fontWeight: 700, 
                   textTransform: 'uppercase',
                   letterSpacing: '1px'
                 }}
               >
                 Download the mobile app here:
               </Typography>
               <Stack direction="row" spacing={2} sx={{ color: '#EC9B14' }}>
                <AppleIcon sx={{ fontSize: '2.2rem', cursor: 'pointer', '&:hover': { color: '#FFF' } }} />
                <PlayArrowIcon sx={{ fontSize: '2.2rem', cursor: 'pointer', '&:hover': { color: '#FFF' } }} />
              </Stack>
            </Stack>
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroBanner;