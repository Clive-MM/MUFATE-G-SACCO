import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const MembershipInfo = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #011B0A, #012B12)', // deep SACCO green
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 10 },
        pt: { xs: 4, md: 6 },
        pb: { xs: 7, md: 9 },
        gap: { xs: 4, md: 3 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* SOFT GOLD BACKLIGHT */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.18), transparent)',
          filter: 'blur(55px)',
          zIndex: 0,
        }}
      />

      {/* TEXT SECTION */}
      <Box sx={{ maxWidth: '600px', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* GOLD TITLE */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '1.7rem', md: '2.2rem' },
              mb: 2,

              background: 'linear-gradient(to right, #FFD700, #FFF4B2)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 12px rgba(255,215,0,0.4)',
            }}
          >
            Membership
          </Typography>

          {/* GOLDEN BODY TEXT */}
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.65,
              color: '#FFECA8', // readable warm gold
              textShadow: '0px 0px 6px rgba(0,0,0,0.6)',
            }}
          >
            Becoming a member of GOLDEN GENERATION DT SACCO means joining a
            community committed to financial growth, empowerment, and support.
            Membership is open to individuals who share our vision of saving and
            investing for a better future. Once registered, members can access a
            wide range of financial services including savings products,
            affordable loans, investment opportunities and dividends.
          </Typography>
        </motion.div>
      </Box>

      {/* IMAGE SECTION */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <motion.img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1748347938/ChatGPT_Image_May_27_2025_03_12_00_PM_fea9r7.png"
          alt="Inspirational quote on leaves"
          style={{
            width: '100%',
            maxWidth: '360px',
            height: 'auto',
            borderRadius: '18px',
            boxShadow:
              '0 0 25px rgba(255,215,0,0.25), 0 10px 25px rgba(0,0,0,0.45)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
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
