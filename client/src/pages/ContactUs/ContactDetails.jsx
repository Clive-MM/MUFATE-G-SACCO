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
    <Container maxWidth={false} sx={{ py: 8, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={5} alignItems="stretch" justifyContent="center">
        
        {/* COLUMN 1: Large Branch Cards */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Stack spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress sx={{ color: BRAND_GOLD }} /></Box>
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Card sx={megaGlassCard} key={branch.BranchID}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography sx={megaBranchTitle}>
                      {branch.BranchName.includes('HQ') ? 'HEAD OFFICE' : 'BRANCH OFFICE'}
                    </Typography>
                    <Typography sx={subTitleText}>{branch.BranchName}</Typography>
                    
                    <Box component="iframe" src={toEmbedMap(branch.Location)} sx={megaMapStyle} title={branch.BranchName} />
                    
                    <Stack spacing={2} sx={{ mt: 3 }}>
                      <Typography sx={megaBranchText}><PhoneIcon sx={megaIconStyle} /> {branch.ContactNumber}</Typography>
                      <Typography sx={megaBranchText}><LocationOnIcon sx={megaIconStyle} /> {branch.Location}</Typography>
                      <Button 
                        variant="outlined" endIcon={<ChevronRightIcon />} sx={megaDirectionsBtn}
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.Location)}`} target="_blank"
                      >
                        Navigate to Branch
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Grid>

        {/* COLUMN 2: Contact Information & Socials */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Stack spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
            <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={megaInfoTitle}><PhoneIcon sx={megaIconStyle} /> Call Us</Typography>
                <Box sx={megaGoldDivider} />
                <Typography sx={hugeInfoText}>+254 791 331 932</Typography>
                <Typography sx={hugeInfoText}>+254 794 515 407</Typography>
                
                <Box sx={{ mt: 6 }}>
                  <Typography sx={megaInfoTitle}><EmailIcon sx={megaIconStyle} /> Email Support</Typography>
                  <Box sx={megaGoldDivider} />
                  <Typography sx={hugeInfoText}>info@mudetesacco.co.ke</Typography>
                  <Typography sx={{ color: TEXT_LIGHT, opacity: 0.5, fontSize: '1.1rem', mt: 1 }}>Available 24/7 for inquiries</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={megaInfoTitle}><AccessTimeIcon sx={megaIconStyle} /> Office Hours</Typography>
                <Box sx={megaGoldDivider} />
                <Typography sx={hugeInfoText}>Mon – Fri: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={hugeInfoText}>Saturday: <b>8:30 AM – 12:30 PM</b></Typography>
                
                <Box sx={{ mt: 6 }}>
                  <Typography sx={megaInfoTitle}>Connect Socially</Typography>
                  <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                    <IconButton sx={megaSocialIcon}><X sx={{ fontSize: 32 }} /></IconButton>
                    <IconButton sx={megaSocialIcon}><Facebook sx={{ fontSize: 32 }} /></IconButton>
                    <IconButton sx={megaSocialIcon}><FaWhatsapp size={32} /></IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* COLUMN 3: Giant Feedback Form */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
            <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={megaInfoTitle}>Send Us a Message</Typography>
              <Box sx={megaGoldDivider} />
              
              <Stack spacing={4} sx={{ mt: 4, flexGrow: 1 }}>
                <TextField 
                  label="Your Email Address" name="Email" fullWidth required value={formData.Email} onChange={handleFormChange}
                  sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }}
                />
                <TextField 
                  label="Message Subject" name="Subject" fullWidth required value={formData.Subject} onChange={handleFormChange}
                  sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }}
                />
                <TextField 
                  label="How can we help you today?" name="Message" multiline rows={10} fullWidth required value={formData.Message} onChange={handleFormChange}
                  sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }}
                />
                <Button
                  type="submit" variant="contained" disabled={formLoading}
                  endIcon={!formLoading && <SendIcon sx={{ fontSize: 28 }} />} sx={megaSubmitBtn}
                >
                  {formLoading ? <CircularProgress size={30} color="inherit" /> : 'SUBMIT YOUR FEEDBACK'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

/* ================= MEGA STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '30px',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.8)',
  transition: 'transform 0.3s ease',
  '&:hover': { transform: 'translateY(-5px)' }
};

const megaGoldDivider = {
  height: '3px',
  background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`,
  width: '100px',
  mb: 4,
  mt: 1
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    fontSize: '1.2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.2)' },
    '&:hover fieldset': { borderColor: BRAND_GOLD },
    '&.Mui-focused fieldset': { borderColor: BRAND_GOLD, borderWidth: '2px' },
  }
};

const megaLabelStyle = { color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' };

const megaSubmitBtn = {
  background: `linear-gradient(45deg, ${BRAND_GOLD}, #FFD700)`,
  color: BRAND_DARK,
  fontWeight: 900,
  fontSize: '1.2rem',
  letterSpacing: '2px',
  py: 2.5,
  mt: 'auto',
  borderRadius: '15px',
  boxShadow: `0 10px 30px ${BRAND_GOLD}66`,
  '&:hover': { background: BRAND_GOLD, filter: 'brightness(1.1)' }
};

const megaMapStyle = { width: '100%', height: '220px', borderRadius: '20px', border: `1px solid rgba(236, 155, 20, 0.1)`, mt: 2 };
const megaDirectionsBtn = { color: BRAND_GOLD, borderColor: `${BRAND_GOLD}88`, borderRadius: '12px', py: 1.5, px: 3, fontSize: '1rem', textTransform: 'none', mt: 2 };
const megaBranchTitle = { fontWeight: 900, color: BRAND_GOLD, fontSize: '1rem', letterSpacing: '3px', opacity: 0.8 };
const subTitleText = { color: TEXT_LIGHT, fontWeight: 700, fontSize: '1.8rem', mb: 1 };
const megaBranchText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', fontSize: '1.1rem', py: 0.5 };
const megaInfoTitle = { fontWeight: 800, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '1.6rem' };
const hugeInfoText = { color: TEXT_LIGHT, fontSize: '1.4rem', mb: 1, fontWeight: 500 };
const megaIconStyle = { fontSize: 35, mr: 2, color: BRAND_GOLD };
const megaSocialIcon = { color: BRAND_GOLD, border: `2px solid ${BRAND_GOLD}33`, p: 2, '&:hover': { background: `${BRAND_GOLD}22`, borderColor: BRAND_GOLD } };

export default ContactDetails;