import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// ICONS
import PaymentsIcon from '@mui/icons-material/Payments';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

// BRAND COLORS FROM HOMEPAGE SLIDER
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  light: "#F4F4F4",
};

// SHARED BUTTON STYLE FROM SLIDER
const ButtonStyle = {
  fontWeight: 700,
  px: { xs: 3.5, md: 4 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px', // Standardized to your slider style
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  transition: '0.3s ease-in-out',
};

const AboutSection = () => {
  const images = [
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423604/IMG_4947_wave6f.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423603/IMG_5049_bwdgmv.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423600/Delegates_following_proceedings...._tmrjcy.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423598/1_10_m4w5gx.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423599/MUFATE_Sacco_Vice_Chairman_Mr_H_Mukavale_rglyuo.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ bgcolor: BRAND.dark, px: { xs: 2, md: 4 }, py: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 2,
            overflow: 'hidden',
            mx: 'auto',
            width: '100%',
            maxWidth: '1600px',
            background: 'transparent',
            border: `1px solid rgba(236, 155, 20, 0.15)`,
          }}
        >
          {/* LEFT SIDE CONTENT */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 8 },
              bgcolor: 'rgba(255, 255, 255, 0.02)', // Subtle lift from pure dark
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: BRAND.gold,
                mb: 3,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
              }}
            >
              About Us
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: BRAND.light,
                fontSize: '1.05rem',
                lineHeight: 1.8,
                mb: 3,
                opacity: 0.9,
              }}
            >
              <strong style={{ color: BRAND.gold }}>Golden Generation Deposit Taking SACCO</strong> is a trusted, member-owned financial institution serving tea farmers, salaried workers, and entrepreneurs across Western Kenya.
            </Typography>

            <List dense sx={{ pl: 0, mb: 4 }}>
              {[
                { icon: <PaymentsIcon />, primary: 'Salary Processing', secondary: 'Seamless check-off services for civil servants and private sector.' },
                { icon: <AgricultureIcon />, primary: 'Agri-Business Support', secondary: 'Tailored inputs and seasonal loans for tea growers.' },
                { icon: <TrendingUpIcon />, primary: 'Development Loans', secondary: 'Competitive credit for MSMEs and personal projects.' },
                { icon: <SavingsIcon />, primary: 'Smart Savings', secondary: 'Goal-based accounts and high-interest fixed deposits.' },
                { icon: <PhoneIphoneIcon />, primary: 'Digital Banking', secondary: '24/7 access via USSD and mobile app.' },
                { icon: <PrecisionManufacturingIcon />, primary: 'Asset Financing', secondary: 'Get equipment today and pay comfortably over time.' }
              ].map((item, i) => (
                <ListItem
                  key={i}
                  sx={{
                    px: 0,
                    py: 1.5,
                    transition: '0.3s',
                    '&:hover': { transform: 'translateX(8px)' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 45, color: BRAND.gold }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold, fontSize: '1rem' }}>{item.primary}</Typography>}
                    secondary={<Typography sx={{ color: BRAND.light, opacity: 0.7, fontSize: '0.9rem' }}>{item.secondary}</Typography>}
                  />
                </ListItem>
              ))}
            </List>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                    component={RouterLink}
                    to="/about/who-we-are"
                    variant="contained"
                    sx={{
                        ...ButtonStyle,
                        bgcolor: BRAND.gold,
                        color: BRAND.dark,
                        '&:hover': {
                            bgcolor: BRAND.light,
                        }
                    }}
                >
                    Learn More
                </Button>
            </Stack>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontStyle: 'italic',
                color: BRAND.gold,
                opacity: 0.8,
                mt: 2
              }}
            >
              “Walking With You.”
            </Typography>
          </Box>

          {/* RIGHT SIDE SLIDESHOW */}
          <Box
            sx={{
              flex: 1.1,
              minHeight: { xs: 400, md: 'auto' },
              position: 'relative',
              '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: {
                      xs: `linear-gradient(to top, ${BRAND.dark}, transparent)`,
                      md: `linear-gradient(to right, ${BRAND.dark}, transparent)`
                  }
              }
            }}
          >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${images[currentIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 1.2s ease-in-out',
                }}
            />
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AboutSection;