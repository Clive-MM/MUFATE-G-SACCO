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

// Fixed the URL formatting for Google Maps
const toEmbedMap = (location) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        enqueueSnackbar(result.message || 'Message Sent!', { variant: 'success' });
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
    <Container ref={scrollRef} maxWidth="xl" sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <Grid container spacing={4} alignItems="stretch">
          
          {/* ================= COLUMN 1: CONTACT INFO ================= */}
          <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
            <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography sx={megaInfoTitle}>Get in Touch</Typography>
                <Box sx={megaGoldDivider} />
                <Stack spacing={5} sx={{ mt: 4 }}>
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
                <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, maxHeight: '500px', mt: 2 }}>
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
                            sx={{ width: '100%', height: '120px', border: 0, borderRadius: '12px', filter: 'grayscale(0.5) contrast(1.2)' }}
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

                      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                        <TextField
                          label="Email Address"
                          name="Email"
                          required
                          fullWidth
                          value={formData.Email}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />
                        <TextField
                          label="Phone Number"
                          name="PhoneNumber"
                          required
                          fullWidth
                          value={formData.PhoneNumber}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />
                        <TextField
                          label="Subject"
                          name="Subject"
                          required
                          fullWidth
                          value={formData.Subject}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />
                        <TextField
                          label="How can we help?"
                          name="Message"
                          multiline
                          rows={isMobile ? 3 : 4}
                          required
                          fullWidth
                          value={formData.Message}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />

                        <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn}>
                          {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                        </Button>

                        <Stack direction="row" spacing={1} justifyContent="center" sx={{ opacity: 0.6 }}>
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
          <FaWhatsapp size={32} />
        </Fab>
      </Zoom>
    </Container>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.96)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: `1px solid rgba(236, 155, 20, 0.15)`,
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  transition: 'transform 0.3s ease',
  '&:hover': { transform: 'translateY(-5px)' }
};

const megaInfoTitle = {
  color: BRAND.gold,
  fontSize: '1.6rem',
  fontWeight: 900,
  letterSpacing: '1px',
  textTransform: 'uppercase'
};

const megaGoldDivider = {
  height: '4px',
  background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`,
  width: '60px',
  mb: 2, mt: 1
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold },
  },
  '& label': { color: 'rgba(255,255,255,0.5)' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const branchItemStyle = {
  background: 'rgba(255, 255, 255, 0.02)',
  padding: 2.5,
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.05)',
};

const infoIconBox = { display: 'flex', alignItems: 'flex-start', gap: 3 };
const iconStyle = { color: BRAND.gold, fontSize: '2.4rem' };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', mb: 0.5 };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: '1rem' };

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND.gold}, #F4D03F)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '16px',
  py: 2,
  boxShadow: `0 8px 20px rgba(236, 155, 20, 0.3)`,
  '&:hover': {
    background: BRAND.gold,
    boxShadow: `0 12px 25px rgba(236, 155, 20, 0.5)`,
  }
};

const whatsappFabStyle = {
  position: 'fixed',
  bottom: { xs: 24, md: 40 },
  right: { xs: 24, md: 40 },
  backgroundColor: '#25D366',
  color: '#FFF',
  width: 65, height: 65,
  '&:hover': { backgroundColor: '#128C7E' }
};

export default ContactDetails;