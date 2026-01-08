import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress, 
  Button, Stack, TextField, Container, Fab, Zoom, Skeleton,
  useMediaQuery, useTheme
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Lock as LockIcon,
  LocationOn as LocationOnIcon,
  MarkEmailRead as MailIcon // Icon for P.O. Box
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

const toEmbedMap = (location) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '+254',
    Subject: '',
    Message: ''
  });

  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then(res => res.json())
      .then(data => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFormChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.status === 201) {
        enqueueSnackbar('Message Sent!', { variant: 'success' });
        setSubmitted(true);
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      }
    } catch (err) {
      enqueueSnackbar('Error sending message', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box sx={{ background: BRAND.dark, width: '100%' }}>
      {/* 1. maxWidth={false} and the sx width/maxWidth below are the primary width-increasing lines */}
      <Container 
        ref={scrollRef} 
        maxWidth={false} 
        sx={{ 
          py: { xs: 4, md: 8 }, 
          px: { xs: 2, md: 4, lg: 6 },
          width: '100%',
          maxWidth: '1920px' // Allows the cards to stretch much wider on large monitors
        }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* 2. spacing={2} reduces the gap between cards, allowing the cards themselves to occupy more horizontal space */}
          <Grid container spacing={2} alignItems="stretch">
            
            {/* COLUMN 1: CONTACT INFO */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Get in Touch</Typography>
                  <Box sx={megaGoldDivider} />
                  
                  <Stack spacing={4} sx={{ mt: 4 }}>
                    {/* NEW P.O. BOX SECTION */}
                    <Box sx={infoIconBox}>
                      <MailIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Postal Address</Typography>
                        <Typography sx={infoValue}>P.O. BOX 221-50104 KHAYEGA</Typography>
                      </Box>
                    </Box>

                    <Box sx={infoIconBox}>
                      <PhoneIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Call Us</Typography>
                        <Typography sx={infoValue}>+254 791 331 932</Typography>
                      </Box>
                    </Box>

                    <Box sx={infoIconBox}>
                      <EmailIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Email Us</Typography>
                        <Typography sx={infoValue}>info@mudetesacco.co.ke</Typography>
                      </Box>
                    </Box>

                    <Box sx={infoIconBox}>
                      <AccessTimeIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Working Hours</Typography>
                        <Typography sx={infoValue}>Mon - Fri: 8:00 AM - 5:00 PM</Typography>
                        <Typography sx={infoValue}>Sat: 8:00 AM - 12:00 PM</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* COLUMN 2: BRANCHES */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={megaInfoTitle}>Our Branches</Typography>
                  <Box sx={megaGoldDivider} />
                  <Box sx={{ 
                    flexGrow: 1, 
                    overflowY: 'auto', 
                    pr: 1, 
                    maxHeight: '550px', 
                    mt: 2,
                    '&::-webkit-scrollbar': { width: '5px' },
                    '&::-webkit-scrollbar-thumb': { background: BRAND.gold, borderRadius: '10px' }
                  }}>
                    {loading ? <Skeleton variant="rectangular" height={300} /> : (
                      <Stack spacing={2}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Typography sx={{ color: BRAND.gold, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOnIcon fontSize="small" /> {branch.BranchName}
                            </Typography>
                            <Typography sx={{ color: BRAND.light, fontSize: '0.85rem', mb: 1, opacity: 0.8 }}>
                              {branch.Location}
                            </Typography>
                            <Box component="iframe" src={toEmbedMap(branch.Location)} sx={{ width: '100%', height: '150px', border: 0, borderRadius: '12px' }} />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* COLUMN 3: FORM */}
            <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 5 }, height: '100%' }}>
                   <Typography sx={megaInfoTitle}>Send Message</Typography>
                   <Box sx={megaGoldDivider} />
                   <Stack spacing={2.5} sx={{ mt: 2 }}>
                      <TextField label="Email" name="Email" fullWidth required sx={megaInputStyle} value={formData.Email} onChange={handleFormChange} />
                      <TextField label="Phone" name="PhoneNumber" fullWidth required sx={megaInputStyle} value={formData.PhoneNumber} onChange={handleFormChange} />
                      <TextField label="Subject" name="Subject" fullWidth required sx={megaInputStyle} value={formData.Subject} onChange={handleFormChange} />
                      <TextField label="Message" name="Message" multiline rows={4} fullWidth required sx={megaInputStyle} value={formData.Message} onChange={handleFormChange} />
                      <Button type="submit" variant="contained" sx={refinedGlowBtn} fullWidth>
                        {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                      </Button>
                   </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.98)',
  backdropFilter: 'blur(30px)',
  borderRadius: { xs: '24px', md: '40px' },
  border: `1px solid rgba(236, 155, 20, 0.25)`,
  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
  transition: 'all 0.4s ease-in-out',
  '&:hover': { 
    transform: 'translateY(-10px)',
    borderColor: BRAND.gold,
    boxShadow: `0 30px 70px rgba(236, 155, 20, 0.15)`
  }
};

const megaInfoTitle = { color: BRAND.gold, fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 900, textTransform: 'uppercase' };
const megaGoldDivider = { height: '4px', background: BRAND.gold, width: '80px', mb: 2 };
const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold }
  },
  '& label': { color: 'rgba(255,255,255,0.5)' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const branchItemStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  padding: 3,
  borderRadius: '24px',
  border: '1px solid rgba(255,255,255,0.08)',
};

const infoIconBox = { display: 'flex', alignItems: 'center', gap: 3 };
const iconStyle = { color: BRAND.gold, fontSize: { xs: '2rem', md: '2.5rem' } };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: { xs: '0.95rem', md: '1.1rem' } };

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND.gold}, #FFD700)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '16px',
  py: 2,
  '&:hover': { background: '#FFD700' }
};

export default ContactDetails;