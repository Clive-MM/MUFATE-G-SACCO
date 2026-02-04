import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppleIcon from '@mui/icons-material/Apple';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url("https://res.cloudinary.com/djydkcx01/image/upload/v1747941107/ChatGPT_Image_May_22_2025_10_11_23_PM_aoofyb.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '70vh', md: '80vh' }, // Slightly taller for more breathing room
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-end' },
        px: { xs: 3, md: 10 },
        overflow: 'hidden',

        /* Improved Overlay for better text contrast */
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: {
            xs: 'rgba(1, 20, 7, 0.7)', // Darker on mobile for readability
            md: 'linear-gradient(to right, rgba(1,20,7,0.85), rgba(1,20,7,0.4), transparent)'
          },
          zIndex: 1,
        },
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
        style={{ position: 'relative', zIndex: 2, maxWidth: '550px' }}
      >
        {/* Left Accent Line */}
        <Box sx={{ borderLeft: `4px solid #EC9B14`, pl: 3 }}>
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
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

          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 400,
                lineHeight: 1.8,
                color: '#EC9B14',
                opacity: 0.9,
                mb: 4,
                textShadow: '1px 1px 8px rgba(0,0,0,0.8)',
              }}
            >
              With <strong>GOLDEN GENERATION DT SACCO’s</strong> mobile banking services, 
              managing your finances is effortless. Enjoy secure, 24/7 access to your 
              funds right from your pocket.
            </Typography>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#EC9B14',
                  color: '#011407',
                  fontWeight: 800,
                  px: 4,
                  py: 1.5,
                  borderRadius: '4px', // Squared edges often look more "Corporate/Banking"
                  '&:hover': { bgcolor: '#fff', color: '#011407' },
                  transition: '0.3s'
                }}
              >
                Get Started
              </Button>
              
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#fff', opacity: 0.8 }}>
                <AppleIcon sx={{ fontSize: '1.8rem', cursor: 'pointer', '&:hover': { color: '#EC9B14' } }} />
                <PlayArrowIcon sx={{ fontSize: '1.8rem', cursor: 'pointer', '&:hover': { color: '#EC9B14' } }} />
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  Available on Stores
                </Typography>
              </Stack>
            </Stack>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroBanner;