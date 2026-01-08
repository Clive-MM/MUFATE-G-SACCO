import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton,
  CircularProgress, Button, Stack, TextField, Container, Fab, Zoom, Skeleton,
  useMediaQuery, useTheme
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Lock as LockIcon
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '+254',
    Subject: '', // ✅ Subject included
    Message: ''
  });

  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ================= FETCH BRANCHES ================= */
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
        enqueueSnackbar(result.message, { variant: 'success' });
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
        <Grid container spacing={4}>
          
          {/* ================= COLUMN 1: GENERAL INFO ================= */}
          <Grid item xs={12} lg={4}>
            <Typography sx={megaInfoTitle}>Get in Touch</Typography>
            <Box sx={megaGoldDivider} />
            <Stack spacing={4}>
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
                  <Typography sx={infoValue}>maderumoyia@mudetesacco.co.ke</Typography>
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
          </Grid>

          {/* ================= COLUMN 2: BRANCHES ================= */}
          <Grid item xs={12} lg={4}>
            <Typography sx={megaInfoTitle}>Our Branches</Typography>
            <Box sx={megaGoldDivider} />
            <Stack spacing={2} sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
              {loading ? (
                [1, 2].map(i => <Skeleton key={i} variant="rectangular" height={150} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />)
              ) : (
                branches.map((branch, idx) => (
                  <Card key={idx} sx={branchCardStyle}>
                    <CardContent>
                      <Typography sx={{ color: BRAND.gold, fontWeight: 700 }}>{branch.BranchName}</Typography>
                      <Typography sx={{ color: BRAND.light, fontSize: '0.85rem', mb: 1 }}>{branch.Location}</Typography>
                      <Box
                        component="iframe"
                        src={toEmbedMap(branch.Location)}
                        sx={{ width: '100%', height: '100px', border: 0, borderRadius: 2 }}
                        loading="lazy"
                      />
                    </CardContent>
                  </Card>
                ))
              )}
            </Stack>
          </Grid>

          {/* ================= COLUMN 3: FEEDBACK FORM ================= */}
          <Grid item xs={12} lg={4}>
            <Card sx={megaGlassCard}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography sx={megaInfoTitle}>Message Us</Typography>
                      <Box sx={megaGoldDivider} />

                      <Stack spacing={2}>
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
                          helperText="Format: +254..."
                        />
                        {/* ✅ SUBJECT FIELD NOW VISIBLE */}
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
                          label="Message *"
                          name="Message"
                          multiline
                          rows={4}
                          required
                          fullWidth
                          value={formData.Message}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />

                        <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn}>
                          {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                        </Button>

                        <Stack direction="row" spacing={1} justifyContent="center" sx={{ opacity: 0.7 }}>
                          <LockIcon sx={{ fontSize: 14, color: BRAND.success }} />
                          <Typography sx={{ color: BRAND.light, fontSize: '0.7rem' }}>Confidential & Secure</Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: BRAND.gold }} />
                      <Typography variant="h5" sx={{ color: BRAND.gold, fontWeight: 900, mt: 2 }}>SENT!</Typography>
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
          <FaWhatsapp size={30} />
        </Fab>
      </Zoom>
    </Container>
  );
};

/* ================= STYLES ================= */
const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.94)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: `1px solid rgba(236, 155, 20, 0.2)`
};

const megaInfoTitle = {
  color: BRAND.gold,
  fontSize: '1.5rem',
  fontWeight: 800,
  textTransform: 'uppercase'
};

const megaGoldDivider = {
  height: '3px',
  background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`,
  width: '50px',
  mb: 3, mt: 0.5
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.2)' }
  },
  '& label': { color: 'rgba(255,255,255,0.6)' },
  '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.4)' }
};

const branchCardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.05)',
  mb: 2
};

const infoIconBox = { display: 'flex', alignItems: 'center', gap: 2 };
const iconStyle = { color: BRAND.gold, fontSize: '2rem' };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.8rem', textTransform: 'uppercase' };
const infoValue = { color: BRAND.light, fontWeight: 600 };

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND.gold}, #F4D03F)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '12px',
  py: 1.5, mt: 1
};

const whatsappFabStyle = {
  position: 'fixed',
  bottom: 40, right: 40,
  backgroundColor: '#25D366',
  color: '#FFF'
};

export default ContactDetails;