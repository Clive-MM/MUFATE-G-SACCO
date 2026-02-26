import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// ICONS
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaymentsIcon from '@mui/icons-material/Payments';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

// PERFORMANCE: Moved outside component to prevent re-creation on every render
const SERVICES = [
  {
    title: "Smart Savings & Investment",
    desc: "Build your financial future through disciplined savings and rewarding investment accounts. From goal-based savings to competitive fixed deposits.",
    icon: <SavingsIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
    link: "/products/savings"
  },
  {
    title: "Tailored & Affordable Loans",
    desc: "Tailored loan products to meet diverse needs — from development and agribusiness to business expansion, education, and emergencies.",
    icon: <AccountBalanceIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
    link: "/products/loans"
  },
  {
    title: "Asset Financing",
    desc: "Acquire the equipment, machinery, or tools you need today. We fund your purchase and use the asset as security while you repay in installments.",
    icon: <PrecisionManufacturingIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
    link: "/products/asset-financing"
  },
  {
    title: "Mobile Banking & Digital Lending",
    desc: "Secure 24/7 access via USSD and mobile platforms. Deposit, withdraw, and apply for loans instantly — anytime, anywhere.",
    icon: <PhoneIphoneIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
    link: "/services/mobile-banking"
  },
  {
    title: "Benevolent Funeral Cover",
    desc: "Standing by our members when it matters most. Our Benevolent Fund offers a helping hand with funeral expenses for contributors.",
    icon: <FavoriteIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
    link: "/services/benevolent"
  },
  {
    title: "Timely Salary Processing",
    desc: "Reliable payroll and check-off platform ensuring tea farmers, teachers, and civil servants receive payments promptly and seamlessly.",
    icon: <PaymentsIcon sx={{ fontSize: { xs: 35, md: 45 } }} />,
    link: "/services/fosa"
  },
];

const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <Box sx={{ 
      bgcolor: BRAND.dark, 
      py: { xs: 8, md: 15 }, 
      width: '100%', 
      overflow: 'hidden',
      position: 'relative' 
    }}>
      {/* Decorative Glow */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: { xs: '300px', md: '600px' },
        height: { xs: '300px', md: '600px' },
        bgcolor: BRAND.gold,
        filter: 'blur(180px)',
        opacity: 0.04,
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 5, md: 8 }} alignItems="center">
          
          <Box sx={{ textAlign: 'center', maxWidth: '800px' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: BRAND.gold,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: "2.2rem", md: "4rem" },
                  letterSpacing: "0.05em",
                  mb: 2
                }}
              >
                Why Choose Us
              </Typography>
              <Typography sx={{ color: BRAND.textMuted, fontSize: '1.1rem' }}>
                Empowering the Golden Generation through secure, accessible, and rewarding financial growth.
              </Typography>
            </motion.div>
          </Box>

          {/* MOBILE: Snap Slider | DESKTOP: Grid */}
          
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              // Performance & UX: Enable horizontal scroll on mobile
              flexWrap: { xs: 'nowrap', sm: 'wrap' },
              overflowX: { xs: 'auto', sm: 'visible' },
              scrollSnapType: { xs: 'x mandatory', sm: 'none' },
              gap: { xs: 2, md: 4 },
              px: { xs: 2, sm: 0 },
              // Hide scrollbars for cleaner Look
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              // Grid behavior for Desktop
              justifyContent: { sm: 'center' },
              '& > div': {
                minWidth: { xs: '85%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 28px)' },
                scrollSnapAlign: 'center',
              }
            }}
          >
            {SERVICES.map((service, index) => (
              <Box key={index} component={motion.div} variants={cardVariants}>
                <Card 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  elevation={0}
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '20px',
                    border: `1px solid ${hoveredCard === index ? BRAND.gold : 'rgba(255, 255, 255, 0.1)'}`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={service.link}
                    sx={{
                      height: '100%',
                      p: { xs: 4, md: 5 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start', // Left aligned for easier reading
                      textAlign: 'left',
                    }}
                  >
                    <Box sx={{ 
                      mb: 3, 
                      color: BRAND.gold, 
                      transform: hoveredCard === index ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                      transition: '0.4s' 
                    }}>
                      {service.icon}
                    </Box>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        color: BRAND.gold, 
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                        mb: 2,
                        lineHeight: 1.3
                      }}
                    >
                      {service.title}
                    </Typography>
                    
                    <Typography 
                      sx={{ 
                        color: BRAND.textMuted, 
                        fontSize: '0.95rem', 
                        lineHeight: 1.7,
                        mb: 3
                      }}
                    >
                      {service.desc}
                    </Typography>

                    {/* Member UX: Clear Call to Action inside the card */}
                    <Box sx={{ 
                      mt: 'auto', 
                      display: 'flex', 
                      alignItems: 'center', 
                      color: BRAND.gold,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      opacity: hoveredCard === index ? 1 : 0.7,
                      transition: '0.3s'
                    }}>
                      LEARN MORE <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button 
              component={RouterLink} 
              to="/about/who-we-are" 
              sx={{ 
                color: BRAND.gold,
                fontWeight: 800,
                borderBottom: `2px solid ${BRAND.gold}`,
                borderRadius: 0,
                px: 2,
                pb: 1,
                letterSpacing: '0.2em',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: BRAND.light,
                  borderColor: BRAND.light
                }
              }}
            >
              DISCOVER OUR HISTORY
            </Button>
          </motion.div>

        </Stack>
      </Container>
    </Box>
  );
};

export default AboutSection;