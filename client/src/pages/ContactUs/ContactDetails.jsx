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
      <Grid container spacing={3}>
        {/* LEFT COLUMN: BRANCHES */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {loading ? (
              <Grid item xs={12} sx={{ textAlign: 'center', py: 5 }}>
                <CircularProgress sx={{ color: BRAND_GOLD }} />
              </Grid>
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Grid item xs={12} key={branch.BranchID}>
                  <Card sx={glassCard}>
                    <CardContent>
                      <Typography sx={branchTitle}>
                        {branch.BranchName.includes('HQ') ? 'Head Office' : 'Branch Office'}: {branch.BranchName}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <Box component="iframe" src={toEmbedMap(branch.Location)} sx={mapStyle} loading="lazy" />
                        
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography sx={branchText}>
                              <PhoneIcon sx={iconStyle} /> {branch.ContactNumber}
                            </Typography>
                            <Typography sx={branchText}>
                              <LocationOnIcon sx={iconStyle} /> {branch.Location}
                            </Typography>
                          </Box>
                          
                          <Button 
                            variant="outlined" 
                            endIcon={<ChevronRightIcon />}
                            sx={directionsBtn}
                          >
                            Get Directions
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>

        {/* RIGHT COLUMN: QUICK CONTACT */}
        <Grid item xs={12} md={5}>
          <Card sx={{ ...glassCard, height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* CALL US */}
              <Box>
                <Typography sx={infoTitle}><PhoneIcon sx={iconStyle} /> Call Us</Typography>
                <Box sx={{ borderBottom: `1px solid ${BRAND_GOLD}33`, width: '100%', mb: 2 }} />
                <Typography sx={infoText}>+254 791 331 932</Typography>
                <Typography sx={infoText}>+254 794 515 407</Typography>
              </Box>

              {/* EMAIL US */}
              <Box>
                <Typography sx={infoTitle}><EmailIcon sx={iconStyle} /> Email Us</Typography>
                <Box sx={{ borderBottom: `1px solid ${BRAND_GOLD}33`, width: '100%', mb: 2 }} />
                <Typography sx={infoText}>info@mudetesacco.co.ke</Typography>
                <Typography sx={{ ...infoText, opacity: 0.6, fontSize: '12px' }}>Send us an email anytime.</Typography>
              </Box>

              {/* HOURS */}
              <Box>
                <Typography sx={infoTitle}><AccessTimeIcon sx={iconStyle} /> Office Hours</Typography>
                <Box sx={{ borderBottom: `1px solid ${BRAND_GOLD}33`, width: '100%', mb: 2 }} />
                <Typography sx={infoText}>Monday – Friday: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={infoText}>Saturday: <b>8:30 AM – 12:30 PM</b></Typography>
              </Box>

              {/* SOCIALS */}
              <Box>
                <Typography sx={infoTitle}>Send Us a Message</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <IconButton sx={socialIcon}><X /></IconButton>
                  <IconButton sx={socialIcon}><Facebook /></IconButton>
                  <IconButton sx={socialIcon}><FaWhatsapp /></IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

/* ================= STYLES ================= */

const glassCard = {
  background: 'rgba(2, 21, 15, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
};

const directionsBtn = {
  color: BRAND_GOLD,
  borderColor: `${BRAND_GOLD}66`,
  textTransform: 'none',
  borderRadius: '8px',
  fontSize: '0.8rem',
  mt: 2,
  '&:hover': { borderColor: BRAND_GOLD, background: `${BRAND_GOLD}11` }
};

const mapStyle = {
  width: { xs: '100%', sm: '200px' },
  height: '120px',
  borderRadius: '10px',
  border: `1px solid ${BRAND_GOLD}22`,
};

const branchTitle = {
  fontWeight: 600,
  color: BRAND_GOLD,
  mb: 2,
  fontSize: '1.1rem',
};

const branchText = {
  color: TEXT_LIGHT,
  display: 'flex',
  alignItems: 'center',
  mb: 1.5,
  fontSize: '0.9rem',
};

const infoTitle = {
  fontWeight: 600,
  color: BRAND_GOLD,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.1rem',
  mb: 1
};

const infoText = {
  color: TEXT_LIGHT,
  fontSize: '0.95rem',
  mb: 0.5,
};

const iconStyle = {
  fontSize: 20,
  mr: 1.5,
  color: BRAND_GOLD,
};

const socialIcon = {
  color: BRAND_GOLD,
  border: `1px solid ${BRAND_GOLD}44`,
  background: 'rgba(0,0,0,0.3)',
  '&:hover': { background: BRAND_GOLD, color: BRAND_DARK }
};

export default ContactDetails;