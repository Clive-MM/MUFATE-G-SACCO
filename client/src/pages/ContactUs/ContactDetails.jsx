import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton,
  CircularProgress, Button, Stack, TextField, Container
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import { Facebook, X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

const toEmbedMap = (location) => {
  const encoded = encodeURIComponent(location);
  return `https://maps.google.com/maps?q=${encoded}&output=embed`;
};

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ Email: '', Subject: '', Message: '' });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        enqueueSnackbar('Feedback sent successfully!', { variant: 'success' });
        setFormData({ Email: '', Subject: '', Message: '' });
      }
    } catch (error) {
      enqueueSnackbar('Submission failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 10, px: { xs: 2, md: 8 }, background: '#010B08' }}>
      <Grid container spacing={6} alignItems="stretch">
        
        {/* COLUMN 1: MEGA BRANCH CARDS */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Stack spacing={5} sx={{ flexGrow: 1, width: '100%' }}>
            {loading ? (
              <CircularProgress sx={{ color: BRAND_GOLD, mx: 'auto' }} />
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Card sx={megaGlassCard} key={branch.BranchID}>
                  <CardContent sx={{ p: 5 }}>
                    <Typography sx={branchCategoryText}>
                      {branch.BranchName.includes('HQ') ? 'PRIMARY HUB' : 'REGIONAL BRANCH'}
                    </Typography>
                    <Typography sx={megaBranchName}>{branch.BranchName}</Typography>
                    
                    <Box component="iframe" src={toEmbedMap(branch.Location)} sx={megaMapStyle} title={branch.BranchName} />
                    
                    <Stack spacing={2.5} sx={{ mt: 4 }}>
                      <Typography sx={megaBodyText}><PhoneIcon sx={megaIcon} /> {branch.ContactNumber}</Typography>
                      <Typography sx={megaBodyText}><LocationOnIcon sx={megaIcon} /> {branch.Location}</Typography>
                      <Button 
                        variant="outlined" endIcon={<ChevronRightIcon />} sx={megaOutlineBtn}
                        href={`https://www.google.com/maps/search/?api=1&query={encodeURIComponent(branch.Location)}`} target="_blank"
                      >
                        Launch Navigation
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Grid>

        {/* COLUMN 2: CONTACT & SERVICE INFO */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Stack spacing={5} sx={{ flexGrow: 1, width: '100%' }}>
            <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
              <CardContent sx={{ p: 5 }}>
                <Typography sx={megaHeaderTitle}><PhoneIcon sx={megaIcon} /> Contact Lines</Typography>
                <Box sx={megaDivider} />
                <Typography sx={giantDisplayLink}>+254 791 331 932</Typography>
                <Typography sx={giantDisplayLink}>+254 794 515 407</Typography>
                
                <Box sx={{ mt: 8 }}>
                  <Typography sx={megaHeaderTitle}><EmailIcon sx={megaIcon} /> Official Email</Typography>
                  <Box sx={megaDivider} />
                  <Typography sx={giantDisplayLink}>info@mudetesacco.co.ke</Typography>
                  <Typography sx={{ color: TEXT_LIGHT, opacity: 0.4, fontSize: '1.2rem', mt: 1 }}>Direct support and inquiries</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
              <CardContent sx={{ p: 5 }}>
                <Typography sx={megaHeaderTitle}><AccessTimeIcon sx={megaIcon} /> Service Hours</Typography>
                <Box sx={megaDivider} />
                <Typography sx={giantDisplayText}>Mon – Fri: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={giantDisplayText}>Sat: <b>8:30 AM – 12:30 PM</b></Typography>
                
                <Box sx={{ mt: 8 }}>
                  <Typography sx={megaHeaderTitle}>Social Presence</Typography>
                  <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
                    <IconButton sx={giantSocialBtn}><X sx={{ fontSize: 40 }} /></IconButton>
                    <IconButton sx={giantSocialBtn}><Facebook sx={{ fontSize: 40 }} /></IconButton>
                    <IconButton sx={giantSocialBtn}><FaWhatsapp size={40} /></IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* COLUMN 3: FEEDBACK PORTAL */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
            <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: 6, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={megaHeaderTitle}>Member Feedback Portal</Typography>
              <Box sx={megaDivider} />
              
              <Stack spacing={4} sx={{ mt: 4, flexGrow: 1 }}>
                <TextField 
                  label="Registered Email" name="Email" fullWidth required value={formData.Email} onChange={handleFormChange}
                  sx={giantInputStyle} InputLabelProps={{ sx: giantLabelStyle }}
                />
                <TextField 
                  label="Subject of Inquiry" name="Subject" fullWidth required value={formData.Subject} onChange={handleFormChange}
                  sx={giantInputStyle} InputLabelProps={{ sx: giantLabelStyle }}
                />
                <TextField 
                  label="Your detailed message..." name="Message" multiline rows={12} fullWidth required value={formData.Message} onChange={handleFormChange}
                  sx={giantInputStyle} InputLabelProps={{ sx: giantLabelStyle }}
                />
                <Button
                  type="submit" variant="contained" disabled={formLoading}
                  endIcon={!formLoading && <SendIcon sx={{ fontSize: 30 }} />} sx={giantSubmitBtn}
                >
                  {formLoading ? <CircularProgress size={32} color="inherit" /> : 'TRANSMIT FEEDBACK'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

/* ================= THE "COMMAND CENTER" STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.95)',
  backdropFilter: 'blur(30px)',
  borderRadius: '40px',
  border: `1px solid rgba(236, 155, 20, 0.4)`,
  boxShadow: '0 30px 80px 0 rgba(0, 0, 0, 0.9)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '4px',
    background: `linear-gradient(90deg, transparent, ${BRAND_GOLD}, transparent)`,
  }
};

const megaDivider = {
  height: '4px',
  background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`,
  width: '120px',
  mb: 5,
  mt: 1.5,
  borderRadius: '2px'
};

const giantInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    fontSize: '1.3rem',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '20px',
    padding: '10px',
    '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.2)' },
    '&:hover fieldset': { borderColor: BRAND_GOLD },
    '&.Mui-focused fieldset': { borderColor: BRAND_GOLD, borderWidth: '3px' },
  }
};

const giantLabelStyle = { color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem' };

const giantSubmitBtn = {
  background: `linear-gradient(45deg, ${BRAND_GOLD}, #FFD700)`,
  color: BRAND_DARK,
  fontWeight: 900,
  fontSize: '1.3rem',
  letterSpacing: '4px',
  py: 3,
  mt: 'auto',
  borderRadius: '20px',
  boxShadow: `0 15px 40px ${BRAND_GOLD}55`,
  '&:hover': { background: BRAND_GOLD, filter: 'brightness(1.2)', transform: 'scale(1.02)' },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

const megaMapStyle = { width: '100%', height: '280px', borderRadius: '25px', border: `2px solid rgba(236, 155, 20, 0.15)`, mt: 2 };
const megaOutlineBtn = { color: BRAND_GOLD, borderColor: BRAND_GOLD, borderRadius: '15px', py: 2, px: 4, fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', mt: 3, '&:hover': { background: `${BRAND_GOLD}11`, borderWidth: '2px' }};
const branchCategoryText = { fontWeight: 900, color: BRAND_GOLD, fontSize: '1.1rem', letterSpacing: '4px', opacity: 0.7, mb: 1 };
const megaBranchName = { color: TEXT_LIGHT, fontWeight: 800, fontSize: '2.4rem', lineHeight: 1.2, mb: 2 };
const megaBodyText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', fontSize: '1.3rem', py: 0.8, fontWeight: 400 };
const megaHeaderTitle = { fontWeight: 800, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '2rem' };
const giantDisplayText = { color: TEXT_LIGHT, fontSize: '1.6rem', mb: 1.5, fontWeight: 400 };
const giantDisplayLink = { color: TEXT_LIGHT, fontSize: '1.8rem', mb: 1.5, fontWeight: 700, letterSpacing: '1px' };
const megaIcon = { fontSize: 45, mr: 3, color: BRAND_GOLD };
const giantSocialBtn = { color: BRAND_GOLD, border: `3px solid ${BRAND_GOLD}33`, p: 2.5, transition: '0.4s', '&:hover': { background: BRAND_GOLD, color: BRAND_DARK, boxShadow: `0 0 30px ${BRAND_GOLD}` } };

export default ContactDetails;