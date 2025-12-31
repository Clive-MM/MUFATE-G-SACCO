import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Link,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { Facebook, X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

const toEmbedMap = (url) =>
  url?.includes('embed')
    ? url
    : `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;

const ContactDetails = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        background: `radial-gradient(circle at top, rgba(236,155,20,0.15), transparent 45%), 
                     linear-gradient(180deg, ${BRAND_DARK}, #03140D)`,
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Grid container spacing={2} alignItems="stretch">
        {/* 1. BRANCH CARDS (Dynamic from API) */}
        {loading ? (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ color: BRAND_GOLD }} />
          </Grid>
        ) : (
          branches.slice(0, 2).map((branch) => (
            <Grid item xs={12} sm={6} md={2.4} key={branch.BranchID}>
              <Card sx={glassCard}>
                <CardContent>
                  <Typography sx={branchTitle}>{branch.BranchName}</Typography>
                  <Box
                    component="iframe"
                    src={toEmbedMap(branch.Location)}
                    sx={mapStyle}
                    loading="lazy"
                  />
                  <Typography sx={branchText}>
                    <LocationOnIcon sx={iconStyle} /> {branch.Location}
                  </Typography>
                  <Typography sx={branchText}>
                    <PhoneIcon sx={iconStyle} /> {branch.ContactNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}

        {/* 2. CALL US CARD */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={glassCard}>
            <CardContent>
              <Typography sx={infoTitle}>
                <PhoneIcon sx={iconStyle} /> Call Us
              </Typography>
              <Typography sx={infoText}>+254 791 331 932</Typography>
              <Typography sx={infoText}>+254 794 515 407</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. EMAIL US CARD */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={glassCard}>
            <CardContent>
              <Typography sx={infoTitle}>
                <EmailIcon sx={iconStyle} /> Email Us
              </Typography>
              <Typography sx={infoText}>
                <Link href="mailto:info@mudetesacco.co.ke" sx={{ color: 'inherit', textDecoration: 'none' }}>
                  info@mudetesacco.co.ke
                </Link>
              </Typography>
              <Typography sx={{ ...infoText, opacity: 0.7, fontSize: '12px', mt: 2 }}>
                Send us an email anytime.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 4. CONNECT & HOURS CARD (Combined or Separate) */}
        {/* Based on Image 1, let's keep Connect and Hours as separate cards to fill the 5-column layout */}
        
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={glassCard}>
            <CardContent>
              <Typography sx={infoTitle}>Connect With Us</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
                <IconButton href="https://x.com/GMufate" target="_blank" sx={socialIcon}><X /></IconButton>
                <IconButton href="https://facebook.com" target="_blank" sx={socialIcon}><Facebook /></IconButton>
                <IconButton href="https://wa.me/254791331932" target="_blank" sx={{ ...socialIcon, color: '#25D366' }}><FaWhatsapp size={20} /></IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={glassCard}>
            <CardContent>
              <Typography sx={infoTitle}>
                <AccessTimeIcon sx={iconStyle} /> Office Hours
              </Typography>
              <Typography sx={infoText}>Mon – Fri: 8:30 AM – 4:30 PM</Typography>
              <Typography sx={infoText}>Sat: 8:30 AM – 12:30 PM</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

/* ================= STYLES ================= */

const glassCard = {
  height: '100%',
  borderRadius: '20px',
  background: 'rgba(2, 21, 15, 0.8)', // Darker background like Image 1
  border: `1px solid ${BRAND_GOLD}44`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    borderColor: BRAND_GOLD,
  },
};

const mapStyle = {
  width: '100%',
  height: 140, // Slightly shorter for the 5-column look
  borderRadius: '12px',
  border: 'none',
  mb: 2,
};

const branchTitle = {
  fontWeight: 800,
  color: BRAND_GOLD,
  mb: 2,
  fontSize: '0.9rem',
  textTransform: 'uppercase',
};

const branchText = {
  color: TEXT_LIGHT,
  display: 'flex',
  alignItems: 'flex-start',
  mb: 1,
  fontSize: '13px',
};

const infoTitle = {
  fontWeight: 700,
  color: BRAND_GOLD,
  display: 'flex',
  alignItems: 'center',
  mb: 2,
  fontSize: '1rem',
};

const infoText = {
  color: TEXT_LIGHT,
  fontSize: '14px',
  mb: 0.5,
};

const iconStyle = {
  fontSize: 18,
  mr: 1,
  color: BRAND_GOLD,
};

const socialIcon = {
  color: BRAND_GOLD,
  border: `1px solid ${BRAND_GOLD}55`,
  padding: '8px',
  '&:hover': {
    background: `${BRAND_GOLD}22`,
  }
};

export default ContactDetails;