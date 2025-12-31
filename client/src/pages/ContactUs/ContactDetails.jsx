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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Facebook, X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(true);
        setFormData({ Email: '', Subject: '', Message: '' });
        setTimeout(() => setSubmitted(false), 5000); // Reset form after 5 seconds
      }
    } catch (error) {
      enqueueSnackbar('Submission failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={{ xs: 3, md: 5 }} alignItems="stretch" justifyContent="center">
        
        {/* COLUMN 1: Large Branch Cards */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Stack spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress sx={{ color: BRAND_GOLD }} /></Box>
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Card sx={megaGlassCard} key={branch.BranchID}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
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
                        href={`http://googleusercontent.com/maps.google.com/7{encodeURIComponent(branch.Location)}`} target="_blank"
                      >
                        Navigate
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
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography sx={megaInfoTitle}><PhoneIcon sx={megaIconStyle} /> Call Us</Typography>
                <Box sx={megaGoldDivider} />
                <Typography sx={hugeInfoText}>+254 791 331 932</Typography>
                <Typography sx={hugeInfoText}>+254 794 515 407</Typography>
                <Box sx={{ mt: 6 }}>
                  <Typography sx={megaInfoTitle}><EmailIcon sx={megaIconStyle} /> Email Us</Typography>
                  <Box sx={megaGoldDivider} />
                  <Typography sx={hugeInfoText}>info@mudetesacco.co.ke</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography sx={megaInfoTitle}><AccessTimeIcon sx={megaIconStyle} /> Office Hours</Typography>
                <Box sx={megaGoldDivider} />
                <Typography sx={hugeInfoText}>Mon – Fri: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={hugeInfoText}>Sat: <b>8:30 AM – 12:30 PM</b></Typography>
                <Box sx={{ mt: 6 }}>
                  <Typography sx={megaInfoTitle}>Connect</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <IconButton sx={megaSocialIcon}><X /></IconButton>
                    <IconButton sx={megaSocialIcon}><Facebook /></IconButton>
                    <IconButton sx={megaSocialIcon}><FaWhatsapp size={28} /></IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* COLUMN 3: Feedback Form with Success Animation */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
          <Card sx={{ ...megaGlassCard, flexGrow: 1, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={megaInfoTitle}>Send Us a Message</Typography>
                    <Box sx={megaGoldDivider} />
                    <Stack spacing={3} sx={{ mt: 2, flexGrow: 1 }}>
                      <TextField label="Email" name="Email" fullWidth required value={formData.Email} onChange={handleFormChange} sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }} />
                      <TextField label="Subject" name="Subject" fullWidth required value={formData.Subject} onChange={handleFormChange} sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }} />
                      <TextField label="Message" name="Message" multiline rows={8} fullWidth required value={formData.Message} onChange={handleFormChange} sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }} />
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 2 }}>
                        <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn}>
                          {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT FEEDBACK'}
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box sx={{ textAlign: 'center', p: 5 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: BRAND_GOLD, mb: 3 }} />
                    </motion.div>
                    <Typography variant="h4" sx={{ color: BRAND_GOLD, fontWeight: 800, mb: 1 }}>Message Sent!</Typography>
                    <Typography sx={{ color: TEXT_LIGHT, opacity: 0.8 }}>Thank you for reaching out. Our team will get back to you shortly.</Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.95)',
  backdropFilter: 'blur(25px)',
  borderRadius: '35px',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 25px 80px 0 rgba(0, 0, 0, 0.9)',
};

const megaGoldDivider = { height: '3px', background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`, width: '80px', mb: 3, mt: 1 };

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '15px',
    '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.2)' },
    '&.Mui-focused fieldset': { borderColor: BRAND_GOLD, borderWidth: '2px' },
  }
};

const megaLabelStyle = { color: 'rgba(255,255,255,0.5)' };

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND_GOLD}, #FFD700)`,
  color: BRAND_DARK,
  fontWeight: 900,
  fontSize: '0.9rem',
  px: 5, py: 1.8,
  borderRadius: '50px',
  boxShadow: `0 0 20px ${BRAND_GOLD}55`,
  transition: '0.3s',
  '&:hover': { 
    transform: 'scale(1.05)',
    boxShadow: `0 0 35px ${BRAND_GOLD}aa`,
  }
};

const megaMapStyle = { width: '100%', height: '200px', borderRadius: '20px', border: `1px solid rgba(236, 155, 20, 0.1)`, mt: 1 };
const megaDirectionsBtn = { color: BRAND_GOLD, borderColor: BRAND_GOLD, borderRadius: '10px', textTransform: 'none', mt: 1 };
const megaBranchTitle = { fontWeight: 900, color: BRAND_GOLD, fontSize: '0.85rem', letterSpacing: '2px' };
const subTitleText = { color: TEXT_LIGHT, fontWeight: 700, fontSize: '1.6rem', mb: 1 };
const megaBranchText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', fontSize: '1rem' };
const megaInfoTitle = { fontWeight: 800, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '1.5rem' };
const hugeInfoText = { color: TEXT_LIGHT, fontSize: '1.3rem', mb: 1 };
const megaIconStyle = { fontSize: 30, mr: 2, color: BRAND_GOLD };
const megaSocialIcon = { color: BRAND_GOLD, border: `2px solid ${BRAND_GOLD}33`, '&:hover': { background: BRAND_GOLD, color: BRAND_DARK } };

export default ContactDetails;