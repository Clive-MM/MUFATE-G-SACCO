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
  LocationOn as LocationOnIcon
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

/* ================= BRAND ================= */
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
  
  // Custom breakpoints for better machine/screen variety
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
    if (formData.PhoneNumber.length < 13) {
      enqueueSnackbar('Please use +254 format', { variant: 'warning' });
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.status === 201) {
        enqueueSnackbar('Message Sent Successfully', { variant: 'success' });
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        enqueueSnackbar(result.message || 'Error', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Failed to connect to server', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    // maxWidth set to false and manual width control to reduce "hanging" space
    <Box sx={{ width: '100%', overflowX: 'hidden', background: BRAND.dark }}>
      <Container 
        ref={scrollRef} 
        maxWidth={false} 
        sx={{ 
          py: { xs: 4, md: 8 }, 
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          maxWidth: '1800px' // Increased width to fill modern wide monitors
        }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Spacing reduced to 3 to keep cards closer and wider */}
          <Grid container spacing={3} alignItems="stretch">
            
            {/* ================= COLUMN 1: CONTACT INFO ================= */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Get in Touch</Typography>
                  <Box sx={megaGoldDivider} />
                  <Stack spacing={isMobile ? 3 : 5} sx={{ mt: 4 }}>
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

            {/* ================= COLUMN 2: BRANCHES ================= */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={megaInfoTitle}>Our Branches</Typography>
                  <Box sx={megaGoldDivider} />
                  <Box sx={{ 
                    flexGrow: 1, 
                    overflowY: 'auto', 
                    pr: 1, 
                    maxHeight: isMobile ? '400px' : '550px', 
                    mt: 2,
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-thumb': { background: BRAND.gold, borderRadius: '10px' }
                  }}>
                    {loading ? (
                      <Stack spacing={2}>
                        {[1, 2].map(i => <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />)}
                      </Stack>
                    ) : (
                      <Stack spacing={2}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Typography sx={{ color: BRAND.gold, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOnIcon fontSize="small" /> {branch.BranchName}
                            </Typography>
                            <Typography sx={{ color: BRAND.light, fontSize: '0.8rem', mb: 1.5, opacity: 0.8 }}>
                              {branch.Location}
                            </Typography>
                            <Box
                              component="iframe"
                              src={toEmbedMap(branch.Location)}
                              sx={{ width: '100%', height: '120px', border: 0, borderRadius: '12px', filter: 'grayscale(0.3) contrast(1.1)' }}
                              loading="lazy"
                            />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* ================= COLUMN 3: FEEDBACK FORM ================= */}
            <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                      <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={megaInfoTitle}>Send Message</Typography>
                        <Box sx={megaGoldDivider} />

                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                          <TextField
                            label="Email Address *"
                            name="Email"
                            required
                            fullWidth
                            value={formData.Email}
                            onChange={handleFormChange}
                            sx={megaInputStyle}
                          />
                          <TextField
                            label="Phone Number *"
                            name="PhoneNumber"
                            required
                            fullWidth
                            value={formData.PhoneNumber}
                            onChange={handleFormChange}
                            sx={megaInputStyle}
                          />
                          <TextField
                            label="Subject *"
                            name="Subject"
                            required
                            fullWidth
                            value={formData.Subject}
                            onChange={handleFormChange}
                            sx={megaInputStyle}
                          />
                          <TextField
                            label="How can we help? *"
                            name="Message"
                            multiline
                            rows={isMobile ? 3 : 5}
                            required
                            fullWidth
                            value={formData.Message}
                            onChange={handleFormChange}
                            sx={megaInputStyle}
                          />

                          <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn}>
                            {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                          </Button>

                          <Stack direction="row" spacing={1} justifyContent="center" sx={{ opacity: 0.6, mt: 1 }}>
                            <LockIcon sx={{ fontSize: 14, color: BRAND.success }} />
                            <Typography sx={{ color: BRAND.light, fontSize: '0.7rem' }}>End-to-end Encrypted</Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 100, color: BRAND.gold, mb: 2 }} />
                        <Typography variant="h4" sx={{ color: BRAND.gold, fontWeight: 900 }}>SUCCESS!</Typography>
                        <Typography sx={{ color: BRAND.light, mt: 1, opacity: 0.8 }}>We will get back to you shortly.</Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        <Zoom in>
          <Fab href="https://wa.me/254791331932" target="_blank" sx={whatsappFabStyle}>
            <FaWhatsapp size={isMobile ? 28 : 35} />
          </Fab>
        </Zoom>
      </Container>
    </Box>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.98)',
  backdropFilter: 'blur(30px)',
  borderRadius: { xs: '20px', md: '32px' },
  border: `1px solid rgba(236, 155, 20, 0.2)`,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': { 
    transform: 'translateY(-8px)',
    borderColor: BRAND.gold,
    boxShadow: `0 30px 60px -12px rgba(236, 155, 20, 0.15)`
  }
};

const megaInfoTitle = {
  color: BRAND.gold,
  fontSize: { xs: '1.3rem', md: '1.7rem' },
  fontWeight: 900,
  letterSpacing: '1px',
  textTransform: 'uppercase'
};

const megaGoldDivider = {
  height: '4px',
  background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`,
  width: '70px',
  mb: 1, mt: 0.5
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '16px',
    fontSize: { xs: '0.9rem', md: '1rem' },
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold, borderWidth: '2px' },
  },
  '& label': { color: 'rgba(255,255,255,0.5)', fontSize: { xs: '0.85rem', md: '1rem' } },
  '& label.Mui-focused': { color: BRAND.gold }
};

const branchItemStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  padding: { xs: 2, md: 3 },
  borderRadius: '24px',
  border: '1px solid rgba(255,255,255,0.06)',
  transition: 'background 0.3s ease',
  '&:hover': { background: 'rgba(255, 255, 255, 0.06)' }
};

const infoIconBox = { display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } };
const iconStyle = { color: BRAND.gold, fontSize: { xs: '2rem', md: '2.8rem' } };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', mb: 0.2 };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: { xs: '0.9rem', md: '1.1rem' } };

const refinedGlowBtn = {
  background: `linear-gradient(135deg, ${BRAND.gold} 0%, #FFD700 100%)`,
  color: BRAND.dark,
  fontWeight: 900,
  fontSize: '1rem',
  borderRadius: '16px',
  py: { xs: 1.5, md: 2 },
  mt: 2,
  boxShadow: `0 10px 20px rgba(236, 155, 20, 0.3)`,
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 15px 30px rgba(236, 155, 20, 0.5)`,
    background: `linear-gradient(135deg, #FFD700 0%, ${BRAND.gold} 100%)`,
  },
  '&:active': { transform: 'scale(0.98)' }
};

const whatsappFabStyle = {
  position: 'fixed',
  bottom: { xs: 20, md: 40 },
  right: { xs: 20, md: 40 },
  backgroundColor: BRAND.success,
  color: '#FFF',
  width: { xs: 56, md: 70 },
  height: { xs: 56, md: 70 },
  boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
  '&:hover': { backgroundColor: '#128C7E', transform: 'rotate(15deg) scale(1.1)' },
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

export default ContactDetails;