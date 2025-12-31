import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton,
  CircularProgress, Button, Stack
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Facebook, X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

// Updated to use the standard Search Embed which is free and visible
const toEmbedMap = (location) => {
  const encoded = encodeURIComponent(location);
  return `https://www.google.com/maps?q=${encoded}&output=embed`;
};

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
    <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 6 } }}>
      <Grid container spacing={4}>
        
        {/* LEFT COLUMN: Vertical Branches */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            {loading ? (
              <CircularProgress sx={{ color: BRAND_GOLD, mx: 'auto' }} />
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Card sx={glassCard} key={branch.BranchID}>
                  <CardContent>
                    <Typography sx={branchTitle}>
                      {branch.BranchName.includes('HQ') ? 'Head Office' : 'Branch Office'}: {branch.BranchName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Box 
                        component="iframe" 
                        src={toEmbedMap(branch.Location)} 
                        sx={mapStyle} 
                        title={branch.BranchName}
                      />
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography sx={branchText}><PhoneIcon sx={iconStyle} /> {branch.ContactNumber}</Typography>
                          <Typography sx={branchText}><LocationOnIcon sx={iconStyle} /> {branch.Location}</Typography>
                        </Box>
                        <Button 
                          variant="outlined" 
                          endIcon={<ChevronRightIcon />} 
                          sx={directionsBtn}
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.Location)}`}
                          target="_blank"
                        >
                          Get Directions
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Grid>

        {/* RIGHT COLUMN: Vertical Contact Info */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            {/* CALL & EMAIL CARD */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={infoTitle}><PhoneIcon sx={iconStyle} /> Call Us</Typography>
                <Box sx={goldDivider} />
                <Typography sx={infoText}>+254 791 331 932</Typography>
                <Typography sx={infoText}>+254 794 515 407</Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography sx={infoTitle}><EmailIcon sx={iconStyle} /> Email Us</Typography>
                  <Box sx={goldDivider} />
                  <Typography sx={infoText}>info@mudetesacco.co.ke</Typography>
                  <Typography sx={{ color: TEXT_LIGHT, opacity: 0.6, fontSize: '12px' }}>Send us an email anytime.</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* HOURS & SOCIALS CARD */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={infoTitle}><AccessTimeIcon sx={iconStyle} /> Office Hours</Typography>
                <Box sx={goldDivider} />
                <Typography sx={infoText}>Monday – Friday: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={infoText}>Saturday: <b>8:30 AM – 12:30 PM</b></Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography sx={infoTitle}>Connect With Us</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <IconButton sx={socialIcon}><X /></IconButton>
                    <IconButton sx={socialIcon}><Facebook /></IconButton>
                    <IconButton sx={socialIcon}><FaWhatsapp /></IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

/* ================= STYLES ================= */

const glassCard = {
  background: 'rgba(2, 21, 15, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
};

const goldDivider = {
  height: '1px',
  background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`,
  width: '100%',
  mb: 2,
  opacity: 0.5
};

const mapStyle = {
  width: { xs: '100%', sm: '220px' },
  height: '130px',
  borderRadius: '8px',
  border: `1px solid ${BRAND_GOLD}22`,
};

const directionsBtn = {
  color: BRAND_GOLD,
  borderColor: `${BRAND_GOLD}66`,
  textTransform: 'none',
  fontSize: '0.75rem',
  width: 'fit-content',
  '&:hover': { borderColor: BRAND_GOLD, background: `${BRAND_GOLD}11` }
};

const branchTitle = { fontWeight: 700, color: BRAND_GOLD, mb: 2, fontSize: '1.1rem' };
const branchText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.9rem' };
const infoTitle = { fontWeight: 600, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '1rem', mb: 0.5 };
const infoText = { color: TEXT_LIGHT, fontSize: '1rem', mb: 0.5 };
const iconStyle = { fontSize: 20, mr: 1.5, color: BRAND_GOLD };
const socialIcon = { color: BRAND_GOLD, border: `1px solid ${BRAND_GOLD}44`, '&:hover': { background: BRAND_GOLD, color: BRAND_DARK } };

export default ContactDetails;