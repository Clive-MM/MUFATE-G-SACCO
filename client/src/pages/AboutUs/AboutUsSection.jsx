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
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        px: 2,
        background: `radial-gradient(circle at center, #032419 0%, ${BRAND.dark} 100%)`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Elements to match the designed image pattern */}
      <Box sx={backgroundPatternStyle} />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
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
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={4} 
        alignItems="center"
        sx={{ py: 5, px: { xs: 2, sm: 4 } }}
    >
      <Box sx={iconWrapperStyle}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
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

/* ================= THEMED STYLES ================= */

const glassCardStyle = {
  background: BRAND.glassBg,
  backdropFilter: 'blur(30px)',
  borderRadius: '60px',
  padding: '1rem',
  // High-gloss gold border as seen in image 2
  border: `1.5px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: `0 0 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(236, 155, 20, 0.05)`,
  position: 'relative'
};

const iconWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
  borderRadius: '24px',
  background: 'rgba(236, 155, 20, 0.03)',
  border: `2px solid rgba(236, 155, 20, 0.5)`, // Thicker border for icons
  boxShadow: `0 0 15px rgba(236, 155, 20, 0.2)`,
};

const iconStyle = {
  color: BRAND.gold,
  fontSize: '2.8rem',
};

const headerStyle = {
  fontSize: '1.4rem',
  fontWeight: 800,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  mb: 1,
};

const bodyStyle = {
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: 'rgba(255, 255, 255, 0.8)',
  fontWeight: 400,
};

const dividerStyle = {
  // Creating the glowing line effect from image 2
  height: '2px',
  border: 'none',
  background: `linear-gradient(90deg, transparent 0%, ${BRAND.gold} 50%, transparent 100%)`,
  opacity: 0.4,
  margin: '0 10%',
};

const backgroundPatternStyle = {
  position: 'absolute',
  inset: 0,
  opacity: 0.05,
  pointerEvents: 'none',
  // Mimics the circuit/bean pattern in image 2
  backgroundImage: `radial-gradient(${BRAND.gold} 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

export default AboutUsSection;