import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Link, Container, Stack, Divider, Tooltip, Grid
} from '@mui/material'; // Added Grid here
import {
  LocationOn, Email, AccessTime, Phone, ArrowUpward,
  Facebook, X as XIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

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
    gap: 1.5,
    mb: 2,
  };

  const iconWrapperStyle = {
    color: BRAND.gold,
    fontSize: '1.1rem',
    mt: 0.3
  };

  return (
    <Box 
      sx={{ 
        bgcolor: BRAND.dark, 
        color: BRAND.light, 
        pt: 8, 
        pb: 2,
        position: 'relative',
        borderTop: `1px solid rgba(255,255,255,0.05)`
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          
          {/* Column 1: Logo + Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ pr: { md: 5 } }}>
              <img
                src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
                alt="Logo"
                style={{ height: '65px', marginBottom: '15px' }}
              />
              <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 2, letterSpacing: '2px', fontSize: '0.9rem' }}>
                WALKING WITH YOU
              </Typography>
              <Typography sx={{ color: BRAND.textMuted, lineHeight: 1.8, mb: 4, fontSize: '0.88rem' }}>
                Golden Generation DT Sacco, formerly Mufate G Sacco, has undergone rebranding to expand, modernize, and serve more members effectively.
              </Typography>
              
              <Stack direction="row" spacing={1.5}>
                <IconButton component="a" href="https://x.com/GMufate" target="_blank" sx={socialIconStyle}>
                  <XIcon fontSize="small" />
                </IconButton>
                <IconButton component="a" href="https://www.facebook.com/share/1CLhxfKxb2/" target="_blank" sx={socialIconStyle}>
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

          {/* Column 2: Recent Posts */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
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
                      height: '75px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      transition: '0.3s',
                      filter: 'brightness(0.8)',
                      '&:hover': { filter: 'brightness(1.1)', transform: 'scale(1.05)' }
                    }} 
                  />
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Column 3: Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
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
                    fontSize: '0.88rem',
                    transition: '0.2s',
                    '&:hover': { color: BRAND.gold, transform: 'translateX(5px)' }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Contact Info */}
          <Grid item xs={12} md={3.5}>
            <Typography sx={{ color: BRAND.gold, fontWeight: 900, mb: 4, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Contact Us
            </Typography>
            
            <Box sx={contactItemStyle}>
              <Phone sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem', lineHeight: 1.6 }}>
                +254 791 331 932<br/>+254 794 515 407
              </Typography>
            </Box>

            <Box sx={contactItemStyle}>
              <LocationOn sx={iconWrapperStyle} />
              <Typography sx={{ color: BRAND.textMuted, fontSize: '0.88rem' }}>
                Khayega - Kakamega
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
          <Typography sx={{ color: BRAND.textMuted, fontSize: '0.7rem', mt: 1, textTransform: 'uppercase' }}>
            All Rights Reserved
          </Typography>
        </Box>
      </Container>

      {/* Scroll Up Button */}
      <IconButton 
        onClick={scrollToTop}
        sx={{
          position: 'absolute',
          right: { xs: 20, md: 40 },
          bottom: 120,
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