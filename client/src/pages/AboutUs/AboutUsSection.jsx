import React, { useState, useRef } from 'react';
import { Box, Typography, Divider, Container, Stack, useTheme, useMediaQuery } from '@mui/material';
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
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Performance: Handle scroll to update dot indicators
  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.88;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeStep) setActiveStep(index);
    }
  };

  const sections = [
    {
      icon: <InfoIcon sx={iconStyle} />,
      title: "Who We Are",
      content: "Golden Generation DT Sacco, formerly Mufate ‘G’ Sacco, is a progressive and member-driven financial cooperative founded in 1987. Our transformation reflects our commitment to modernize and empower more members."
    },
    {
      icon: <FlagIcon sx={iconStyle} />,
      title: "Our Mission",
      content: "To economically empower our members by mobilizing resources and providing innovative, diverse, and competitive financial solutions tailored to their changing needs."
    },
    {
      icon: <VisibilityIcon sx={iconStyle} />,
      title: "Our Vision",
      content: "To become a nationally recognized and trusted financial institution that transforms the livelihoods of its members through innovation and integrity."
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, md: 15 },
        bgcolor: BRAND.dark,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={backgroundPatternStyle} />

      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center">
          <Box
            ref={scrollRef}
            onScroll={handleScroll}
            sx={{
              width: '100%',
              // Laptop: Single Column Card | Mobile: Horizontal Flex
              display: isMobile ? 'flex' : 'block',
              flexDirection: isMobile ? 'row' : 'column',
              overflowX: isMobile ? 'auto' : 'visible',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              ...(isMobile ? {} : glassCardStyle) // Only apply glass border to the whole block on Desktop
            }}
          >
            {sections.map((item, index) => (
              <Box 
                key={index} 
                sx={{ 
                  minWidth: isMobile ? '88%' : '100%', 
                  scrollSnapAlign: 'center',
                  flexShrink: 0 
                }}
              >
                <SectionItem 
                  {...item} 
                  isMobile={isMobile} 
                  isActive={activeStep === index} 
                />
                {!isMobile && index < sections.length - 1 && <Divider sx={dividerStyle} />}
              </Box>
            ))}
          </Box>

          {/* DOT INDICATORS FOR MOBILE */}
          {isMobile && (
            <Stack direction="row" spacing={1.5}>
              {sections.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: activeStep === i ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: activeStep === i ? BRAND.gold : 'rgba(255, 255, 255, 0.2)',
                    transition: '0.4s all ease',
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

const SectionItem = ({ icon, title, content, isMobile, isActive }) => (
  <motion.div
    initial={false}
    animate={isMobile ? { scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.5 } : {}}
  >
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={{ xs: 2, sm: 3 }} 
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      sx={{ 
        py: { xs: 5, md: 4 }, 
        px: { xs: 3, sm: 2 },
        textAlign: { xs: 'center', sm: 'left' },
        // Mobile specific card look
        ...(isMobile && {
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '24px',
          border: `1px solid ${isActive ? BRAND.gold : 'rgba(255, 255, 255, 0.1)'}`,
          mx: 1,
          height: '280px', // Standardized mobile height
          justifyContent: 'center'
        })
      }}
    >
      <Box sx={iconWrapperStyle}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={headerStyle}>
          {title}
        </Typography>
        <Typography sx={{
          ...bodyStyle,
          maxWidth: isMobile ? '240px' : '100%', // Text wrapping logic
          mx: 'auto'
        }}>
          {content}
        </Typography>
      </Box>
    </Stack>
  </motion.div>
);

// --- STYLES ---

const glassCardStyle = {
  background: BRAND.glassBg,
  backdropFilter: 'blur(20px)',
  borderRadius: '32px', 
  padding: '10px', 
  border: `1px solid rgba(236, 155, 20, 0.2)`,
  boxShadow: `0 15px 35px rgba(0,0,0,0.4)`,
};

const iconWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { xs: '65px', md: '75px' },
  height: { xs: '65px', md: '75px' },
  borderRadius: '16px',
  background: 'rgba(236, 155, 20, 0.08)',
  border: `1.5px solid rgba(236, 155, 20, 0.4)`, 
  flexShrink: 0,
  mb: { xs: 1, sm: 0 }
};

const iconStyle = {
  color: BRAND.gold,
  fontSize: { xs: '1.8rem', md: '2.2rem' },
};

const headerStyle = {
  fontSize: { xs: '1.1rem', md: '1.25rem' },
  fontWeight: 800,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  mb: 1.5, 
};

const bodyStyle = {
  fontSize: { xs: '0.88rem', md: '0.98rem' },
  lineHeight: 1.7, 
  color: 'rgba(255, 255, 255, 0.85)',
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