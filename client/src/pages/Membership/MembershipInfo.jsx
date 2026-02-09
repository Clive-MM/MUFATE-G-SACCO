import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// --- UNIFIED BRAND TOKENS (Synced with Footer) ---
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const MembershipInfo = () => {
  return (
    <Box
      sx={{
        // Updated to use the deep BRAND.dark from Footer for seamless section flow
        background: `linear-gradient(180deg, ${BRAND.dark} 0%, #031c14 100%)`, 
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
        // Matching the Footer's subtle top separation
        borderTop: `1px solid rgba(255,255,255,0.05)`
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
          // Radial glow using your specific BRAND.gold
          background: `radial-gradient(circle, ${BRAND.gold}1F, transparent)`, 
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

          {/* BRAND GOLD TITLE */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '1.7rem', md: '2.2rem' },
              mb: 2,
              // Switched to solid BRAND.gold to match Footer headers
              color: BRAND.gold,
              letterSpacing: '1px',
            }}
          >
            Membership
          </Typography>

          {/* LIGHT BODY TEXT */}
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.65,
              // Using BRAND.light for consistent contrast across the site
              color: BRAND.light, 
              opacity: 0.9,
              fontWeight: 400,
              textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
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
            // Updated shadow to use BRAND.gold glow
            boxShadow:
              `0 0 30px ${BRAND.gold}33, 0 10px 30px rgba(0,0,0,0.5)`,
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