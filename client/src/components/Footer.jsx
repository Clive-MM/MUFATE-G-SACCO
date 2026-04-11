import React from 'react';
import {
  Box, Typography, IconButton, Link, Container, Stack, Divider, Grid, Tooltip
} from '@mui/material';
import {
  LocationOn, Email, AccessTime, Phone, ArrowUpward,
  Facebook, X as XIcon, Apple, Android, LinkedIn, Instagram, Youtube
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIconStyle = {
    color: BRAND.gold,
    border: '1px solid rgba(255,255,255,0.1)',
    transition: '0.3s ease',
    width: 40,
    height: 40,
    borderRadius: '50%',
    '&:hover': { color: BRAND.dark, background: BRAND.gold, transform: 'translateY(-3px)' }
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    mb: 2.5,
  };

  const iconWrapperStyle = {
    color: BRAND.gold,
    fontSize: '1.2rem',
    mt: 0.4
  };

  // Style for the new Mobile App Buttons
  const appButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    p: '8px 16px',
    borderRadius: '8px',
    border: `1px solid rgba(236, 155, 20, 0.2)`,
    color: BRAND.light,
    textDecoration: 'none',
    transition: '0.3s',
    background: 'rgba(255,255,255,0.03)',
    mb: 1.5,
    '&:hover': {
      borderColor: BRAND.gold,
      background: 'rgba(236, 155, 20, 0.1)',
      transform: 'translateY(-3px)'
    }
  };

  return (
    <Box
      sx={{
        bgcolor: BRAND.dark,
        color: BRAND.light,
        pt: 10,
        pb: 2,
        position: 'relative',
        borderTop: `1px solid rgba(255,255,255,0.05)`
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">

          {/* Column 1: Branding */}
          <Grid item xs={12} md={3.5}>
            <Box>
              <img
                src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
                alt="Logo"
                style={{ height: '70px', marginBottom: '20px' }}
              />
              <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 2, letterSpacing: '2px', fontSize: '0.9rem' }}>
                WALKING WITH YOU
              </Typography>
              <Typography
                sx={{
                  color: BRAND.textMuted,
                  lineHeight: 1.8,
                  mb: 4,
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  letterSpacing: '0.3px'
                }}
              >
                Golden Generation DT Sacco,<br />
                formerly Mufate G Sacco,<br />
                expanding and modernizing<br />
                to serve our members effectively.
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <IconButton component="a" href="https://x.com/ggdtsacco" target="_blank" sx={socialIconStyle}>
                  <XIcon fontSize="small" />
                </IconButton>
                <IconButton component="a" href="https://www.linkedin.com/company/ggdtsacco" target="_blank" sx={socialIconStyle}>
                  <LinkedIn fontSize="small" />
                </IconButton>

                <IconButton component="a" href="https://www.tiktok.com/@ggdtsacco" target="_blank" sx={socialIconStyle}>
                  <FaTiktok size={16} />
                </IconButton>

                {/* New: Instagram */}
                <IconButton component="a" href="https://www.instagram.com/ggdtsacco" target="_blank" sx={socialIconStyle}>
                  <Instagram fontSize="small" />
                </IconButton>

                <IconButton component="a" href="https://www.youtube.com/@ggdtsacco" target="_blank" sx={socialIconStyle}>
                  <YouTube fontSize="small" />
                </IconButton>

                <IconButton component="a" href="https://www.facebook.com/profile.php?id=61572342663004" target="_blank" sx={socialIconStyle}>
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton
                  component="a" href="https://wa.me/254791331932" target="_blank"
                  sx={{ ...socialIconStyle, '&:hover': { background: BRAND.success, color: '#FFF' } }}
                >
                  <FaWhatsapp size={18} />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Column 2: Repurposed for Mobile Apps */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Mobile Apps
            </Typography>
            <Box>
              <Tooltip title="Download for Android" arrow>
                <Link href="#" sx={appButtonStyle}>
                  <Android sx={{ color: BRAND.gold }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.6rem', opacity: 0.6, mb: -0.5 }}>Get it on</Typography>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>Google Play</Typography>
                  </Box>
                </Link>
              </Tooltip>

              <Tooltip title="Download for iOS" arrow>
                <Link href="#" sx={appButtonStyle}>
                  <Apple sx={{ color: BRAND.gold }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.6rem', opacity: 0.6, mb: -0.5 }}>Download on</Typography>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>App Store</Typography>
                  </Box>
                </Link>
              </Tooltip>
            </Box>
          </Grid>

          {/* Column 3: Updated Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Quick Links
            </Typography>
            <Stack spacing={1.8}>
              {[
                { name: 'Home', path: '/' },
                { name: 'About Who We Are', path: '/about/who-we-are' },
                { name: 'FOSA Products', path: '/products/fosa' },
                { name: 'BOSA Products', path: '/products/bosa' },
                { name: 'Savings', path: '/products/savings' },
                { name: 'Resources', path: '/resources' },
                { name: 'FAQs', path: '/faqs' }
              ].map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: BRAND.textMuted,
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: '0.2s',
                    '&:hover': { color: BRAND.gold, transform: 'translateX(5px)' }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Contact Us
            </Typography>

            <Box sx={contactItemStyle}>
              <Phone sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem', lineHeight: 1.6 }}>
                +254 791 331 932<br />+254 794 515 407
              </Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <LocationOn sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>
                Khayega - Kakamega
              </Typography>
              <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>
                Mudete - Vihiga
              </Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <Email sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>
                info@mudetesacco.co.ke
              </Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <AccessTime sx={iconWrapperStyle} />
              <Box>
                <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>Mon - Fri: 8:30AM - 4:00PM</Typography>
                <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>Sat: 8:30AM - 12:30PM</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 8, mb: 4, borderColor: 'rgba(255,255,255,0.05)' }} />

        <Box sx={{ pb: 4, textAlign: 'center' }}>
          <Typography sx={{ color: BRAND.gold, letterSpacing: '3px', fontWeight: 900, fontSize: { xs: '0.8rem', md: '1.2rem' } }}>
            GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
          </Typography>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.75rem', mt: 1, textTransform: 'uppercase', letterSpacing: '1px' }}>
            All Rights Reserved
          </Typography>
        </Box>
      </Container>

      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'absolute',
          right: { xs: 20, md: 40 },
          bottom: { xs: 80, md: 100 },
          bgcolor: BRAND.gold,
          color: BRAND.dark,
          width: 45,
          height: 45,
          '&:hover': { bgcolor: BRAND.light, color: BRAND.dark, transform: 'translateY(-5px)' },
          transition: '0.3s'
        }}
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
};

export default Footer;