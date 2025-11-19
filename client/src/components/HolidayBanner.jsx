import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { motion, AnimatePresence } from 'framer-motion';

const HolidayBanner = () => {
  const [holiday, setHoliday] = useState(null);

  useEffect(() => {
    axios.get('https://mudetesacco.co.ke/backend/holiday/message')
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
              backgroundColor: '#f2a922',
              color: '#003B2F',
              px: 3,
              py: 1.5,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              zIndex: 10,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CelebrationIcon sx={{ fontSize: '1.4rem' }} />
              <Typography component="span" sx={{ fontWeight: 'bold' }}>
                {holiday.holiday}
              </Typography>
            </Box>
            <Typography component="span">{holiday.message}</Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HolidayBanner;
