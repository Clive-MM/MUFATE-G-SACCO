import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Link, Container, Stack, Divider, Tooltip
} from '@mui/material';
import {
  LocationOn, Email, AccessTime, Phone, ArrowUpward,
  Facebook, X as XIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import SupportChatWidget from "./SupportChatWidget";

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

const Footer = () => {
  const [postImages, setPostImages] = useState([]);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts/images')
      .then((res) => setPostImages(res.data.images || []))
      .catch((err) => console.error('❌ Failed to fetch recent post images:', err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Icon Styling from ContactDetails logic
  const socialIconStyle = {
    color: BRAND.gold, 
    border: '1px solid rgba(255,255,255,0.1)',
    transition: '0.3s ease',
    width: 45,
    height: 45,
    '&:hover': { color: BRAND.dark, background: BRAND.gold, transform: 'translateY(-3px)' }
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    mb: 2.5,
    transition: '0.3s',
    '&:hover': { transform: 'translateX(8px)' }
  };

  const iconWrapperStyle = {
    color: BRAND.gold,
    fontSize: '1.2rem',
    mt: 0.5
  };

  return (
    <Box 
      sx={{ 
        bgcolor: BRAND.dark, 
        color: BRAND.light, 
        pt: 10, 
        position: 'relative',
        borderTop: `1px solid rgba(255,255,255,0.05)`
      }}
    >
      <Container maxWidth="xl">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 6, md: 4 }} 
          justifyContent="space-between"
        >
          {/* Column 1: Logo + Description */}
          <Box sx={{ flex: 1.2 }}>
            <img
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              alt="Logo"
              style={{ height: '70px', marginBottom: '20px' }}
            />
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 2, letterSpacing: '2px' }}>
              WALKING WITH YOU
            </Typography>
            <Typography sx={{ color: BRAND.textMuted, lineHeight: 1.8, mb: 4, maxWidth: '400px' }}>
              Golden Generation DT Sacco, formerly Mufate G Sacco, has undergone rebranding to expand, modernize, and serve more members effectively.
            </Typography>
            
            <Stack direction="row" spacing={2}>
              <Tooltip title="Follow on X">
                <IconButton component="a" href="https://x.com/GMufate" target="_blank" sx={socialIconStyle}>
                  <XIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Facebook">
                <IconButton component="a" href="https://www.facebook.com/share/1CLhxfKxb2/" target="_blank" sx={socialIconStyle}>
                  <Facebook />
                </IconButton>
              </Tooltip>
              <Tooltip title="WhatsApp Support">
                <IconButton 
                  component="a" 
                  href="https://wa.me/254791331932" 
                  target="_blank" 
                  sx={{ ...socialIconStyle, '&:hover': { background: BRAND.success, color: '#FFF' } }}
                >
                  <FaWhatsapp />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Column 2: Recent Posts (2x2 Grid) */}
          <Box sx={{ flex: 0.8 }}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase' }}>
              Recent Posts
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
              {postImages.slice(0, 4).map((post, idx) => (
                <Link key={idx} component={RouterLink} to="/news">
                  <Box 
                    component="img" 
                    src={post.CoverImage} 
                    sx={{ 
                      width: '100%', 
                      height: '80px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      transition: '0.3s',
                      filter: 'grayscale(0.5)',
                      '&:hover': { filter: 'grayscale(0)', transform: 'scale(1.05)' }
                    }} 
                  />
                </Link>
              ))}
            </Box>
          </Box>

          {/* Column 3: Quick Links */}
          <Box sx={{ flex: 0.7 }}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase' }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {['Home', 'About Us', 'Services', 'Our Products', 'Blogs & Posts', 'FAQs', 'Membership', 'Contact Us'].map((text) => (
                <Link
                  key={text}
                  component={RouterLink}
                  to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                  sx={{ 
                    color: BRAND.textMuted, 
                    textDecoration: 'none', 
                    transition: '0.3s',
                    '&:hover': { color: BRAND.gold, transform: 'translateX(5px)' }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Column 4: Contact Info */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase' }}>
              Contact Us
            </Typography>
            
            <Box sx={contactItemStyle}>
              <Phone sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted }}>+254 791 331 932 / +254 794 515 407</Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <LocationOn sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted }}>Khayega - Kakamega</Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <Email sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted }}>info@mudetesacco.co.ke</Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <AccessTime sx={iconWrapperStyle} />
              <Box>
                <Typography sx={{ color: BRAND.textMuted, display: 'block' }}>Mon - Fri: 8:30AM - 4:00PM</Typography>
                <Typography sx={{ color: BRAND.textMuted }}>Sat: 8:30AM - 12:30PM</Typography>
              </Box>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ mt: 8, borderColor: 'rgba(255,255,255,0.05)' }} />

        {/* REPLACED FOOTER BOTTOM SECTION */}
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Typography
            sx={{
              color: BRAND.gold,
              letterSpacing: '3px',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '0.8rem', md: '1.35rem' }
            }}
          >
            GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
          </Typography>
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.7rem', mt: 1, letterSpacing: '1px' }}>
            ALL RIGHTS RESERVED
          </Typography>
        </Box>
      </Container>

      {/* Scroll to Top - Styled like Contact Buttons */}
      <IconButton 
        onClick={scrollToTop}
        sx={{
          position: 'absolute',
          right: 30,
          bottom: 120,
          bgcolor: BRAND.gold,
          color: BRAND.dark,
          '&:hover': { bgcolor: BRAND.lightGold, transform: 'scale(1.1)' },
          transition: '0.3s'
        }}
      >
        <ArrowUpward fontSize="small" />
      </IconButton>

      <SupportChatWidget />
    </Box>
  );
};

export default Footer;