import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: { xs: 3, md: 6 },

        // 👉 Deep green gradient background (brand)
        background: 'radial-gradient(circle at top left, #01240F, #011407)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          // 👉 Clean GOLDEN GENERATION DT SACCO Golden Card
          backgroundColor: '#E6C200',
          borderRadius: '22px',
          padding: '3rem 2.5rem',
          maxWidth: '1000px',
          width: '100%',
          textAlign: 'center',

          // Gold border + glow
          border: '3px solid #FFD700',
          boxShadow:
            '0 8px 30px rgba(0,0,0,0.45), 0 0 25px rgba(255,215,0,0.45)',

          transition: 'all 0.4s ease-in-out',
        }}
      >
        {/* ============================
            WHO WE ARE
        ============================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 900,

              // 👉 Gold Gradient Title
              background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',

              fontFamily: 'Segoe UI, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5,
              textShadow: '0 0 12px rgba(255,215,0,0.4)',
            }}
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <InfoIcon sx={{ mr: 1, fontSize: 30, color: '#3ede08' }} />
            </motion.div>
            Who We Are
          </Typography>

          <Typography
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.85,
              color: '#1a1a1a',
              mb: 2.5,
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            Golden Generation DT Sacco, formerly Mufate ‘G’ Sacco, is a
            progressive and member-driven financial cooperative founded in 1987.
            Our transformation reflects our commitment to modernize, expand our
            services, and empower more members—while preserving the rights and
            benefits of our farmers and community.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 2, backgroundColor: '#FFF4B5' }} />

        {/* ============================
            OUR MISSION
        ============================ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            sx={{
              fontSize: '1.75rem',
              fontWeight: 800,
              fontFamily: 'Segoe UI, sans-serif',

              background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              mb: 1,
              textShadow: '0 0 10px rgba(255,215,0,0.35)',
            }}
          >
            <motion.div whileHover={{ rotate: 10 }}>
              <FlagIcon sx={{ mr: 1, fontSize: 28, color: '#3ede08' }} />
            </motion.div>
            Our Mission
          </Typography>

          <Typography
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.85,
              color: '#1a1a1a',
              mb: 2.5,
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            To economically empower our members by mobilizing resources and
            providing innovative, diverse, and competitive financial solutions
            tailored to their changing needs.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 2, backgroundColor: '#FFF4B5' }} />

        {/* ============================
            OUR VISION
        ============================ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography
            sx={{
              fontSize: '1.75rem',
              fontWeight: 800,
              fontFamily: 'Segoe UI, sans-serif',

              background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              mb: 1,
              textShadow: '0 0 10px rgba(255,215,0,0.35)',
            }}
          >
            <motion.div whileHover={{ scale: 1.15 }}>
              <VisibilityIcon sx={{ mr: 1, fontSize: 28, color: '#3ede08' }} />
            </motion.div>
            Our Vision
          </Typography>

          <Typography
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.85,
              color: '#1a1a1a',
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            To become a nationally recognized and trusted financial institution
            that transforms the livelihoods of its members through innovation,
            integrity, and inclusive financial growth.
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default AboutUsSection;
