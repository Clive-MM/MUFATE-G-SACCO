import React from 'react';
import { Box, Typography, Divider, Container, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';

// Consistent Brand Colors from ContactDetails
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

const AboutUsSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        px: 2,
        // Using the same brand background logic
        background: `radial-gradient(circle at top left, ${BRAND.dark}, #010a07)`,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={glassCardStyle}
        >
          {/* --- WHO WE ARE SECTION --- */}
          <SectionItem 
            icon={<InfoIcon sx={iconStyle} />}
            title="Who We Are"
            content="Golden Generation DT Sacco, formerly Mufate ‘G’ Sacco, is a progressive and member-driven financial cooperative founded in 1987. Our transformation reflects our commitment to modernize, expand our services, and empower more members—while preserving the rights and benefits of our farmers and community."
          />

          <Divider sx={dividerStyle} />

          {/* --- MISSION SECTION --- */}
          <SectionItem 
            icon={<FlagIcon sx={iconStyle} />}
            title="Our Mission"
            content="To economically empower our members by mobilizing resources and providing innovative, diverse, and competitive financial solutions tailored to their changing needs."
            delay={0.2}
          />

          <Divider sx={dividerStyle} />

          {/* --- VISION SECTION --- */}
          <SectionItem 
            icon={<VisibilityIcon sx={iconStyle} />}
            title="Our Vision"
            content="To become a nationally recognized and trusted financial institution that transforms the livelihoods of its members through innovation, integrity, and inclusive financial growth."
            delay={0.4}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

// Sub-component for clean organization
const SectionItem = ({ icon, title, content, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={3} 
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{ textAlign: { xs: 'center', md: 'left' }, py: 4 }}
    >
      <Box sx={iconContainerStyle}>
        {icon}
      </Box>
      <Box>
        <Typography sx={headerStyle}>
          {title}
        </Typography>
        <Typography sx={bodyStyle}>
          {content}
        </Typography>
      </Box>
    </Stack>
  </motion.div>
);

/* ================= STYLES ================= */

const glassCardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  borderRadius: '40px',
  padding: '2rem 3rem',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderTop: `6px solid ${BRAND.gold}`, // Brand Gold accent
  boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
};

const iconContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '70px',
  height: '70px',
  borderRadius: '20px',
  background: 'rgba(236, 155, 20, 0.1)', // Gold with low opacity
  border: `1px solid ${BRAND.gold}33`,
};

const iconStyle = {
  color: BRAND.gold,
  fontSize: '2.2rem',
};

const headerStyle = {
  fontSize: { xs: '1.5rem', md: '1.8rem' },
  fontWeight: 900,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  mb: 1.5,
};

const bodyStyle = {
  fontSize: '1.1rem',
  lineHeight: 1.8,
  color: BRAND.textMuted,
  fontFamily: '"Inter", "Segoe UI", sans-serif',
  maxWidth: '850px',
};

const dividerStyle = {
  borderColor: 'rgba(255, 255, 255, 0.05)',
  width: '100%',
};

export default AboutUsSection;