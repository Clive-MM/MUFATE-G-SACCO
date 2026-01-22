import React from 'react';
import { Box, Typography, Divider, Container, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.7)',
  glassBg: 'rgba(255, 255, 255, 0.04)',
};

const AboutUsSection = () => {
  // Removed unused theme and isMobile variables to fix ESLint error
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 6, sm: 8, md: 12 },
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
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={glassCardStyle}
        >
          <SectionItem 
            icon={<InfoIcon sx={iconStyle} />}
            title="Who We Are"
            content="Golden Generation DT Sacco, formerly Mufate ‘G’ Sacco, is a progressive and member-driven financial cooperative founded in 1987. Our transformation reflects our commitment to modernize, expand our services, and empower more members—while preserving the rights and benefits of our farmers and community."
          />

          <Divider sx={dividerStyle} />

          <SectionItem 
            icon={<FlagIcon sx={iconStyle} />}
            title="Our Mission"
            content="To economically empower our members by mobilizing resources and providing innovative, diverse, and competitive financial solutions tailored to their changing needs."
            delay={0.2}
          />

          <Divider sx={dividerStyle} />

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

const SectionItem = ({ icon, title, content, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 2, sm: 4 }} 
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        sx={{ 
          py: { xs: 4, md: 6 }, 
          px: { xs: 1, sm: 2 },
          textAlign: { xs: 'center', sm: 'left' } 
        }}
    >
      <Box sx={iconWrapperStyle}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
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
  background: BRAND.glassBg,
  backdropFilter: 'blur(30px)',
  borderRadius: 'clamp(30px, 5vw, 60px)',
  padding: 'clamp(1rem, 3vw, 2.5rem)',
  border: `1.5px solid rgba(236, 155, 20, 0.5)`,
  boxShadow: `0 0 30px rgba(0,0,0,0.5), 0 0 10px rgba(236, 155, 20, 0.15), inset 0 0 20px rgba(236, 155, 20, 0.05)`,
  position: 'relative'
};

const iconWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { xs: '70px', sm: '85px', md: '100px' },
  height: { xs: '70px', sm: '85px', md: '100px' },
  borderRadius: { xs: '18px', md: '24px' },
  background: 'rgba(236, 155, 20, 0.05)',
  border: `2px solid rgba(236, 155, 20, 0.7)`, 
  boxShadow: `0 0 20px rgba(236, 155, 20, 0.25)`,
  flexShrink: 0,
};

const iconStyle = {
  color: BRAND.gold,
  fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
};

const headerStyle = {
  fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
  fontWeight: 800,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  mb: 1.5,
  textShadow: '0 0 10px rgba(236, 155, 20, 0.3)',
};

const bodyStyle = {
  fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
  lineHeight: 1.8,
  color: 'rgba(255, 255, 255, 0.85)',
  fontWeight: 400,
  maxWidth: '900px',
};

const dividerStyle = {
  height: '1.5px',
  border: 'none',
  background: `linear-gradient(90deg, transparent 0%, ${BRAND.gold} 50%, transparent 100%)`,
  opacity: 0.3,
  width: '80%',
  mx: 'auto',
};

const backgroundPatternStyle = {
  position: 'absolute',
  inset: 0,
  opacity: 0.06,
  pointerEvents: 'none',
  backgroundImage: `radial-gradient(${BRAND.gold} 1px, transparent 1px)`,
  backgroundSize: 'clamp(30px, 4vw, 50px) clamp(30px, 4vw, 50px)',
};

export default AboutUsSection;