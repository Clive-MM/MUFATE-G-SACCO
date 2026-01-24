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
  glassBg: 'rgba(255, 255, 255, 0.03)', 
};

const AboutUsSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 6, sm: 8, md: 10 }, 
        px: { xs: 0, sm: 2 }, 
        bgcolor: BRAND.dark,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={backgroundPatternStyle} />

      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            ...glassCardStyle,
            width: '100%', 
          }}
        >
          <SectionItem 
            icon={<InfoIcon sx={iconStyle} />}
            title="Who We Are"
            content="Golden Generation DT Sacco, formerly Mufate ‘G’ Sacco, is a progressive and member-driven financial cooperative founded in 1987. Our transformation reflects our commitment to modernize and empower more members."
          />

          <Divider sx={dividerStyle} />

          <SectionItem 
            icon={<FlagIcon sx={iconStyle} />}
            title="Our Mission"
            content="To economically empower our members by mobilizing resources and providing innovative, diverse, and competitive financial solutions tailored to their changing needs."
            delay={0.1}
          />

          <Divider sx={dividerStyle} />

          <SectionItem 
            icon={<VisibilityIcon sx={iconStyle} />}
            title="Our Vision"
            content="To become a nationally recognized and trusted financial institution that transforms the livelihoods of its members through innovation and integrity."
            delay={0.2}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

const SectionItem = ({ icon, title, content, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 2, sm: 3 }} 
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        sx={{ 
          py: { xs: 3, md: 4 }, 
          px: { xs: 1.5, sm: 2 },
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



const glassCardStyle = {
  background: BRAND.glassBg,
  backdropFilter: 'blur(20px)',
  borderRadius: '32px', 
  padding: '10px', 
  border: `1px solid rgba(236, 155, 20, 0.2)`,
  boxShadow: `0 15px 35px rgba(0,0,0,0.4)`,
  position: 'relative'
};

const iconWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { xs: '60px', sm: '65px', md: '75px' },
  height: { xs: '60px', sm: '65px', md: '75px' },
  borderRadius: '16px',
  background: 'rgba(236, 155, 20, 0.08)',
  border: `1.5px solid rgba(236, 155, 20, 0.4)`, 
  flexShrink: 0,
};

const iconStyle = {
  color: BRAND.gold,
  fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
};

const headerStyle = {
  fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.25rem' },
  fontWeight: 800,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  mb: 1, 
};

const bodyStyle = {
  fontSize: { xs: '0.9rem', sm: '0.92rem', md: '0.98rem' },
  lineHeight: 1.7, 
  color: 'rgba(255, 255, 255, 0.85)',
  fontWeight: 400,
};

const dividerStyle = {
  height: '1px',
  border: 'none',
  background: `linear-gradient(90deg, transparent 0%, ${BRAND.gold} 50%, transparent 100%)`,
  opacity: 0.15,
  width: '85%',
  mx: 'auto',
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