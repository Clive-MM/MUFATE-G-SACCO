import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.7)',
  glassBg: 'rgba(255, 255, 255, 0.03)',
};

// Animation Variants for Parent Container
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, -0.01, 0.9],
      when: "beforeChildren",
      staggerChildren: 0.2, // Time between each item reveal
    },
  },
};

// Animation Variants for Items
const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Animation Variants for Divider Drawing
const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 0.3, transition: { duration: 1, ease: "easeInOut" } },
};

const AboutUsSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, sm: 6, md: 8 }, 
        px: { xs: 2, sm: 4 },
        background: `radial-gradient(circle at center, #032419 0%, ${BRAND.dark} 100%)`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={backgroundPatternStyle} />

      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={glassCardStyle}
        >
          <SectionItem 
            icon={<InfoIcon sx={iconStyle} />}
            title="Who We Are"
            content="Golden Generation DT Sacco, formerly Mufate ‘G’ Sacco, is a progressive and member-driven financial cooperative founded in 1987. Our transformation reflects our commitment to modernize and empower more members."
          />

          <AnimatedDivider />

          <SectionItem 
            icon={<FlagIcon sx={iconStyle} />}
            title="Our Mission"
            content="To economically empower our members by mobilizing resources and providing innovative, diverse, and competitive financial solutions tailored to their changing needs."
          />

          <AnimatedDivider />

          <SectionItem 
            icon={<VisibilityIcon sx={iconStyle} />}
            title="Our Vision"
            content="To become a nationally recognized and trusted financial institution that transforms the livelihoods of its members through innovation and integrity."
          />
        </motion.div>
      </Container>
    </Box>
  );
};

const SectionItem = ({ icon, title, content }) => (
  <motion.div variants={itemVariants}>
    <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 1.5, sm: 3 }} 
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        sx={{ 
          py: { xs: 2.5, md: 3.5 }, 
          px: { xs: 1, sm: 1.5 },
          textAlign: { xs: 'center', sm: 'left' } 
        }}
    >
      <Box 
        component={motion.div}
        whileHover={{ scale: 1.05, rotate: 5 }}
        sx={iconWrapperStyle}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={headerStyle}>{title}</Typography>
        <Typography sx={bodyStyle}>{content}</Typography>
      </Box>
    </Stack>
  </motion.div>
);

const AnimatedDivider = () => (
  <motion.div 
    variants={lineVariants} 
    style={{
      height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${BRAND.gold} 50%, transparent 100%)`,
      width: '90%',
      margin: '0 auto',
      transformOrigin: 'center'
    }}
  />
);

/* ================= STYLES ================= */

const glassCardStyle = {
  background: BRAND.glassBg,
  backdropFilter: 'blur(20px)',
  borderRadius: 'clamp(20px, 3vw, 40px)', 
  padding: 'clamp(0.75rem, 2vw, 1.5rem)',
  border: `1px solid rgba(236, 155, 20, 0.2)`,
  boxShadow: `0 15px 35px rgba(0,0,0,0.4)`,
  position: 'relative'
};

const iconWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { xs: '55px', sm: '65px', md: '75px' },
  height: { xs: '55px', sm: '65px', md: '75px' },
  borderRadius: { xs: '12px', md: '16px' },
  background: 'rgba(236, 155, 20, 0.08)',
  border: `1.5px solid rgba(236, 155, 20, 0.4)`, 
  flexShrink: 0,
  cursor: 'pointer'
};

const iconStyle = {
  color: BRAND.gold,
  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
};

const headerStyle = {
  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
  fontWeight: 800,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  mb: 0.5,
};

const bodyStyle = {
  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.85)',
  fontWeight: 400,
};

const backgroundPatternStyle = {
  position: 'absolute',
  inset: 0,
  opacity: 0.04,
  pointerEvents: 'none',
  backgroundImage: `radial-gradient(${BRAND.gold} 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

export default AboutUsSection;