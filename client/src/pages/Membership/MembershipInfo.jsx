import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const MembershipInfo = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom,rgb(189, 225, 237),rgb(233, 241, 250))', 
        borderRadius: '10px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 10 },
        pt: { xs: 3, md: 5 },
        pb: { xs: 6, md: 8 },
        gap: { xs: 2, md: 2 },
      }}
    >
      {/* ✅ Text Section */}
      <Box sx={{ color: '#333', maxWidth: '600px', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              mb: 3,
              color: '#003B49',
            }}
          >
            Membership
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: '1.05rem',
            }}
          >
            Becoming a member of Mufate G Sacco means joining a community committed to financial growth,
            empowerment, and support. Membership is open to individuals who share our vision of saving and
            investing for a better future. Once registered, members can access a wide range of financial services
            including savings products, affordable loans, investment opportunities and dividends.
          </Typography>
        </motion.div>
      </Box>

      {/* ✅ Image Section */}
      <Box
        sx={{
          position: 'relative',
          mt: { xs: 4, md: 0 },
          zIndex: 2,
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1748347938/ChatGPT_Image_May_27_2025_03_12_00_PM_fea9r7.png"
          alt="Inspirational quote on tea leaves background"
          style={{
            width: '100%',
            maxWidth: '360px',
            height: 'auto',
            borderRadius: '16px',
            boxShadow:
              '0 0 20px rgba(46, 125, 50, 0.2), 0 10px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </Box>
    </Box>
  );
};

export default MembershipInfo;
