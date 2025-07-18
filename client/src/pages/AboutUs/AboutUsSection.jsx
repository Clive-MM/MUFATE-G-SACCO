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
        background: 'radial-gradient(circle at top left, #0d402b, #1b5e20)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: '#f2a922',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          maxWidth: '1000px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          border: '2px solid #fff3c4',
          transition: 'all 0.4s ease-in-out',
        }}
      >
        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              fontSize: '1.9rem',
              color: '#3ede08ff',
              fontWeight: 800,
              fontFamily: 'Segoe UI, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
            }}
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <InfoIcon sx={{ mr: 1, fontSize: 28 }} />
            </motion.div>
            Who We Are
          </Typography>
          <Typography
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#1a1a1a',
              mb: 2,
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            Mufate ‘G’ Sacco Society Limited is a dynamic savings and credit cooperative society,
            founded in 1987, committed to delivering reliable financial solutions to farmers, traders,
            and institutions. Our foundation is built on trust, empowerment, and financial inclusion.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 2, backgroundColor: '#ffffffaa' }} />

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            sx={{
              fontSize: '1.6rem',
              color: '#3ede08ff',
              fontWeight: 700,
              fontFamily: 'Segoe UI, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)',
            }}
          >
            <motion.div whileHover={{ rotate: 10 }}>
              <FlagIcon sx={{ mr: 1, fontSize: 26 }} />
            </motion.div>
            Our Mission
          </Typography>
          <Typography
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#1a1a1a',
              mb: 2,
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            To economically empower our members by mobilizing resources and delivering
            quality, diversified, and competitive financial services tailored to their needs.
          </Typography>
        </motion.div>

        <Divider sx={{ my: 2, backgroundColor: '#ffffffaa' }} />

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography
            sx={{
              fontSize: '1.6rem',
              color: '#3ede08ff',
              fontWeight: 700,
              fontFamily: 'Segoe UI, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)',
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <VisibilityIcon sx={{ mr: 1, fontSize: 26 }} />
            </motion.div>
            Our Vision
          </Typography>
          <Typography
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#1a1a1a',
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            To become a nationally recognized and trusted financial service provider that transforms
            the livelihoods of its members through innovation and integrity.
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default AboutUsSection;
