import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { motion, AnimatePresence } from 'framer-motion';

// Identical Brand Palette for Uniformity
const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
};

const HolidayBanner = () => {
  const [holiday, setHoliday] = useState(null);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/holiday/message')
      .then(res => {
        if (res.data.message) {
          setHoliday(res.data);
        }
      })
      .catch(err => console.error('❌ Failed to load holiday message:', err));
  }, []);

  return (
    <AnimatePresence>
      {holiday && (
        <motion.div
          key="holiday-banner"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Box
            sx={{
              // Using the Gold/Dark theme for the banner
              backgroundColor: BRAND.gold,
              color: BRAND.dark,
              px: 3,
              py: 1.5,
              textAlign: 'center',
              boxShadow: `0 4px 20px ${BRAND.gold}33`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              zIndex: 1100, // Ensure it stays above other elements
              position: 'relative',
              // High-end glass/glow touch to the bottom edge
              borderBottom: `2px solid ${BRAND.lightGold}`,
            }}
          >
            {/* Holiday Title with Glow Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CelebrationIcon 
                sx={{ 
                  fontSize: '1.4rem',
                  filter: `drop-shadow(0 0 5px ${BRAND.dark}44)` 
                }} 
              />
              <Typography 
                component="span" 
                sx={{ 
                  fontWeight: 900, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05rem',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {holiday.holiday}
              </Typography>
            </Box>

            {/* Holiday Message */}
            <Typography 
              component="span" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                opacity: 0.9
              }}
            >
              {holiday.message}
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HolidayBanner;