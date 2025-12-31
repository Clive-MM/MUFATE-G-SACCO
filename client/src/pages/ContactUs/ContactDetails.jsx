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
  Button,
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

const toEmbedMap = (url) =>
  url?.includes('embed')
    ? url
    : `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(url)}`;

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
        
        {/* LEFT COLUMN: BRANCH CARDS (Stacked Vertically) */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <CircularProgress sx={{ color: BRAND_GOLD }} />
              </Box>
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
                        loading="lazy" 
                      />
                      
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography sx={branchText}>
                          <PhoneIcon sx={iconStyle} /> {branch.ContactNumber}
                        </Typography>
                        <Typography sx={branchText}>
                          <LocationOnIcon sx={iconStyle} /> {branch.Location}
                        </Typography>
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
          </Box>
        </Grid>

        {/* RIGHT COLUMN: CONTACT INFO CARDS (Stacked Vertically) */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* CALL & EMAIL COMBINED CARD */}
            <Card sx={glassCard}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography sx={infoTitle}><PhoneIcon sx={iconStyle} /> Call Us</Typography>
                  <Typography sx={infoText}>+254 791 331 932</Typography>
                  <Typography sx={infoText}>+254 794 515 407</Typography>
                </Box>
                <Box sx={{ borderBottom: `1px solid ${BRAND_GOLD}22` }} />
                <Box>
                  <Typography sx={infoTitle}><EmailIcon sx={iconStyle} /> Email Us</Typography>
                  <Typography sx={infoText}>info@mudetesacco.co.ke</Typography>
                  <Typography sx={{ ...infoText, opacity: 0.6, fontSize: '12px' }}>Send us an email anytime.</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* OFFICE HOURS CARD */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={infoTitle}><AccessTimeIcon sx={iconStyle} /> Office Hours</Typography>
                <Typography sx={infoText}>Monday – Friday: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={infoText}>Saturday: <b>8:30 AM – 12:30 PM</b></Typography>
              </CardContent>
            </Card>

            {/* SOCIALS CARD */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={infoTitle}>Connect With Us</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <IconButton sx={socialIcon}><X /></IconButton>
                  <IconButton sx={socialIcon}><Facebook /></IconButton>
                  <IconButton sx={socialIcon}><FaWhatsapp /></IconButton>
                </Box>
              </CardContent>
            </Card>

          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

/* ================= STYLES ================= */

const glassCard = {
  background: 'rgba(2, 21, 15, 0.8)',
  backdropFilter: 'blur(12px)',
  borderRadius: '15px',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
  width: '100%'
};

const directionsBtn = {
  color: BRAND_GOLD,
  borderColor: `${BRAND_GOLD}66`,
  textTransform: 'none',
  borderRadius: '8px',
  fontSize: '0.75rem',
  mt: 1,
  width: 'fit-content',
  '&:hover': { borderColor: BRAND_GOLD, background: `${BRAND_GOLD}11` }
};

const mapStyle = {
  width: { xs: '100%', sm: '180px' },
  height: '110px',
  borderRadius: '10px',
  border: `1px solid ${BRAND_GOLD}22`,
};

const branchTitle = {
  fontWeight: 600,
  color: BRAND_GOLD,
  mb: 2,
  fontSize: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const branchText = {
  color: TEXT_LIGHT,
  display: 'flex',
  alignItems: 'center',
  mb: 1,
  fontSize: '0.85rem',
};

const infoTitle = {
  fontWeight: 600,
  color: BRAND_GOLD,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  mb: 1
};

const infoText = {
  color: TEXT_LIGHT,
  fontSize: '0.9rem',
  mb: 0.5,
};

const iconStyle = {
  fontSize: 18,
  mr: 1.5,
  color: BRAND_GOLD,
};

const socialIcon = {
  color: BRAND_GOLD,
  border: `1px solid ${BRAND_GOLD}44`,
  background: 'rgba(255,255,255,0.05)',
  '&:hover': { background: BRAND_GOLD, color: BRAND_DARK }
};

export default ContactDetails;