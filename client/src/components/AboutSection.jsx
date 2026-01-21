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

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", 
  light: "#F4F4F4",
};

const ButtonStyle = {
  fontWeight: 700,
  px: { xs: 3, md: 4 },
  py: { xs: 1.2, md: 1.5 },
  borderRadius: '4px',
  fontSize: '0.85rem',
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

  const listItemStyle = {
    transition: '0.3s',
    px: { xs: 0, sm: 1 },
    borderRadius: '8px',
    alignItems: 'flex-start',
    '&:hover': {
      transform: 'translateX(6px)',
      backgroundColor: 'rgba(255,255,255,0.04)',
    },
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, px: { xs: 2, md: 4 }, py: { xs: 4, md: 10 } }}>
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
            flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on mobile
            borderRadius: '16px',
            overflow: 'hidden',
            mx: 'auto',
            width: '100%',
            maxWidth: '1400px',
            background: 'transparent',
            border: `1px solid rgba(236, 155, 20, 0.1)`,
          }}
        >
          {/* IMAGE SECTION - FIXED FOR MOBILE */}
          <Box 
            sx={{ 
              flex: 1.1, 
              height: { xs: '280px', sm: '400px', md: 'auto' }, // Set height for mobile
              position: 'relative',
              order: { xs: 1, md: 2 } // Image comes first on mobile
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
                '&::after': { // Adds a fade effect to blend with text
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: {
                        xs: `linear-gradient(to top, ${BRAND.dark}, transparent)`,
                        md: `linear-gradient(to right, ${BRAND.dark}, transparent)`
                    }
                }
              }}
            />
          </Box>

          {/* CONTENT SECTION */}
          <Box sx={{ 
            flex: 1, 
            p: { xs: 3, md: 8 }, 
            bgcolor: 'rgba(255, 255, 255, 0.01)',
            order: { xs: 2, md: 1 } 
          }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: BRAND.gold, mb: 3, textTransform: 'uppercase', fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
              About Us
            </Typography>

            <Typography sx={{ color: BRAND.light, fontSize: '1.05rem', lineHeight: 1.8, mb: 4, opacity: 0.9 }}>
              <strong style={{ color: BRAND.gold }}>Golden Generation Deposit Taking SACCO</strong> is a trusted, member-owned financial institution serving tea farmers, salaried workers,county workers and enterprenuers.
            </Typography>

            <List dense sx={{ pl: 0, mb: 4 }}>
              <ListItem sx={listItemStyle}>
                <ListItemIcon><PaymentsIcon sx={{ color: BRAND.gold }} /></ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold }}>Salary Processing & Check-off</Typography>}
                  secondary={<Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>Seamless check-off services for tea farmers, teachers, civil servants and private sector employees.</Typography>}
                />
              </ListItem>

              <ListItem sx={listItemStyle}>
                <ListItemIcon><AgricultureIcon sx={{ color: BRAND.gold }} /></ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold }}>Agricultural & Tea-Grower Support</Typography>}
                  secondary={<Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>Tailored products for farmers and smallholder producers, supporting inputs, farm improvement and seasonal needs.</Typography>}
                />
              </ListItem>

              <ListItem sx={listItemStyle}>
                <ListItemIcon><TrendingUpIcon sx={{ color: BRAND.gold }} /></ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold }}>Business & Development Loans</Typography>}
                  secondary={<Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>Competitive, well-structured credit for MSMEs, projects and personal development goals.</Typography>}
                />
              </ListItem>

              <ListItem sx={listItemStyle}>
                <ListItemIcon><SavingsIcon sx={{ color: BRAND.gold }} /></ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold }}>Smart Savings & Investment Accounts</Typography>}
                  secondary={<Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>Goal-based savings, fixed deposits and targeted products for education, emergencies and long-term growth.</Typography>}
                />
              </ListItem>

              <ListItem sx={listItemStyle}>
                <ListItemIcon><PhoneIphoneIcon sx={{ color: BRAND.gold }} /></ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold }}>Mobile & Digital Banking</Typography>}
                  secondary={<Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>24/7 access to your SACCO account through our USSD and mobile platforms – deposit, withdraw and check balances from anywhere.</Typography>}
                />
              </ListItem>

              <ListItem sx={listItemStyle}>
                <ListItemIcon><PrecisionManufacturingIcon sx={{ color: BRAND.gold }} /></ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700, color: BRAND.gold }}>Asset Financing</Typography>}
                  secondary={<Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>Get the machinery or equipment you need today with our asset financing. Repay comfortably over time, and enjoy full ownership once you complete payment.</Typography>}
                />
              </ListItem>
            </List>

            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Button component={RouterLink} to="/about/who-we-are" variant="contained" sx={{ ...ButtonStyle, bgcolor: BRAND.gold, color: BRAND.dark, '&:hover': { bgcolor: BRAND.light } }}>
                Learn More
              </Button>
            </Stack>

            <Typography variant="h6" sx={{ fontWeight: 800, fontStyle: 'italic', color: BRAND.gold, opacity: 0.7 }}>
              “Walking With You.”
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AboutSection;