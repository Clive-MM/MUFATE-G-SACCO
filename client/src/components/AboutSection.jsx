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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import PaymentsIcon from '@mui/icons-material/Payments';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
const DEEP_GREEN = '#006400';
const DARK_BG = 'linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)';

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
    <Box sx={{ background: DARK_BG, px: 1, py: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 6,
            overflow: 'hidden',
            mx: 'auto',
            width: '100%',
            maxWidth: '1700px',
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 215, 0, 0.25)',
            boxShadow:
              '0 26px 70px rgba(0,0,0,0.85), 0 0 30px rgba(255,215,0,0.15)',
          }}
        >
          {/* LEFT SIDE CONTENT */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: 'transparent',
                backgroundImage: 'linear-gradient(to right, #FFD700, #FFE066)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                fontSize: { xs: '1.8rem', md: '2.3rem' },
              }}
            >
              About Us
            </Typography>

            {/* SEO & Branding-focused intro */}
            <Typography
              variant="body1"
              sx={{
                color: '#f5f5f5',
                fontSize: '1.06rem',
                lineHeight: 1.9,
                mb: 2.5,
              }}
            >
              <strong>Golden Generation Deposit Taking SACCO</strong>{' '}
              <span style={{ color: LIGHT_GOLD }}>
                (formerly MUFATE G SACCO – Mudete Factory Tea Growers SACCO LTD)
              </span>{' '}
              is a trusted, member-owned deposit taking SACCO serving{' '}
              <strong>tea farmers, salaried workers, teachers, pensioners, county staff and business owners</strong>{' '}
              across Vihiga and Kakamega counties. Our rebrand reflects a
              broader common bond – opening doors to more members while
              preserving our strong roots in the tea-growing community.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#e6e6e6',
                fontSize: '1.02rem',
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              We provide <strong>safe, transparent and flexible financial solutions</strong> –
              from everyday savings and salary processing to development loans
              and digital banking – helping you <strong>save, borrow and invest with confidence</strong>.
              When someone searches for a reliable SACCO in Western Kenya, we want them
              to find a partner that is <strong>walking with them</strong> at every stage of life.
            </Typography>

            <List dense sx={{ pl: 0 }}>
              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon sx={{ color: GOLD }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 700, color: LIGHT_GOLD }}>
                      Salary Processing & Check-off
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>
                      Seamless check-off services for tea farmers, teachers,
                      civil servants and private sector employees.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  <AgricultureIcon sx={{ color: GOLD }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 700, color: LIGHT_GOLD }}>
                      Agricultural & Tea-Grower Support
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>
                      Tailored products for farmers and smallholder producers,
                      supporting inputs, farm improvement and seasonal needs.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  <TrendingUpIcon sx={{ color: GOLD }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 700, color: LIGHT_GOLD }}>
                      Business & Development Loans
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>
                      Competitive, well-structured credit for MSMEs, projects
                      and personal development goals.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  <SavingsIcon sx={{ color: GOLD }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 700, color: LIGHT_GOLD }}>
                      Smart Savings & Investment Accounts
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>
                      Goal-based savings, fixed deposits and targeted products
                      for education, emergencies and long-term growth.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  <PhoneIphoneIcon sx={{ color: GOLD }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 700, color: LIGHT_GOLD }}>
                      Mobile & Digital Banking
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem' }}>
                      24/7 access to your SACCO account through our USSD and
                      mobile platforms – deposit, withdraw and check balances
                      from anywhere.
                    </Typography>
                  }
                />
              </ListItem>
            </List>

            <Typography
              variant="body1"
              sx={{
                color: '#e0e0e0',
                fontSize: '1.02rem',
                lineHeight: 1.8,
                mb: 2.5,
              }}
            >
              As <strong>Golden Generation DT SACCO</strong>,
              our vision is to become a leading member-driven financial institution
              — providing secure savings, affordable credit
              and digital banking solutions to uplift communities
              and empower economic growth across the region and beyond.
            </Typography>

            <Button
              component={RouterLink}
              to="/about/who-we-are"
              variant="contained"
              size="medium"
              sx={{
                backgroundImage: `linear-gradient(135deg, ${GOLD}, ${LIGHT_GOLD})`,
                color: '#111',
                fontWeight: 'bold',
                px: 3.5,
                py: 1,
                borderRadius: '999px',
                fontSize: '0.95rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.35s ease-in-out',
                boxShadow: '0 0 18px rgba(255,215,0,0.85)',
                '&:hover': {
                  backgroundImage: `linear-gradient(135deg, ${DEEP_GREEN}, ${GOLD})`,
                  color: '#fff',
                  transform: 'translateY(-2px) scale(1.04)',
                  boxShadow:
                    '0 18px 32px rgba(0,0,0,0.9), 0 0 22px rgba(255,215,0,0.95)',
                },
              }}
            >
              Learn More
            </Button>

            <Typography
              variant="subtitle2"
              sx={{
                mt: 3,
                fontWeight: 800,
                fontStyle: 'italic',
                color: LIGHT_GOLD,
                letterSpacing: 1.2,
                textShadow: `
      0 0 6px rgba(255, 215, 0, 0.8),
      0 0 12px rgba(255, 215, 0, 0.6),
      0 0 18px rgba(255, 215, 0, 0.4)
    `,
                fontSize: { xs: '1rem', md: '1.15rem' },
                textAlign: 'left',
              }}
            >
              “Walking With You.”
            </Typography>

          </Box>

          {/* RIGHT SIDE SLIDESHOW */}
          <Box
            sx={{
              flex: 1.2,
              minHeight: { xs: 300, md: 'auto' },
              backgroundImage: `linear-gradient(
                  to right,
                  rgba(0,0,0,0.55),
                  rgba(0,0,0,0.15)
                ), url(${images[currentIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 1s ease-in-out',
            }}
          />
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AboutSection;
