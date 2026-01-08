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
  ChevronRight as ChevronRightIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Lock as LockIcon,
  Facebook, X
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
  `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ FIXED: backend-aligned keys */
  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '+254',
    Subject: '',
    Message: ''
  });

  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

  /* ================= SUBMIT ================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.PhoneNumber.length < 13) {
      enqueueSnackbar('Please use +254 format', { variant: 'warning' });
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch(
        'https://mufate-g-sacco.onrender.com/feedback',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (response.status === 201) {
        setSuccessMessage(
          result.message ||
          'Your message has been sent successfully. We will contact you via email or phone.'
        );

        enqueueSnackbar(result.message, { variant: 'success' });

        /* ✅ clear fields */
        setFormData({
          Email: '',
          PhoneNumber: '+254',
          Subject: '',
          Message: ''
        });

        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setSuccessMessage('');
        }, 6000);
      } else {
        enqueueSnackbar(result.message || 'Submission failed', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Submission failed', { variant: 'error' });
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
        <Grid container spacing={4} justifyContent="center">

          {/* ================= COLUMN 3: FEEDBACK ================= */}
          <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
            <Card sx={{ ...megaGlassCard, flexGrow: 1, minHeight: '600px' }} component={motion.div}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CardContent
                      component="form"
                      onSubmit={handleFormSubmit}
                      sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <Typography sx={megaInfoTitle}>Send Us a Message</Typography>
                      <Box sx={megaGoldDivider} />

                      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                        <TextField
                          label="Email Address"
                          name="Email"
                          required
                          value={formData.Email}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />

                        <TextField
                          label="Phone Number"
                          name="PhoneNumber"
                          required
                          value={formData.PhoneNumber}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />

                        <TextField
                          label="Subject"
                          name="Subject"
                          required
                          value={formData.Subject}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />

                        <TextField
                          label="Message"
                          name="Message"
                          multiline
                          rows={isMobile ? 4 : 6}
                          required
                          value={formData.Message}
                          onChange={handleFormChange}
                          sx={megaInputStyle}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          disabled={formLoading}
                          sx={refinedGlowBtn}
                        >
                          {formLoading ? <CircularProgress size={24} /> : 'SEND MESSAGE'}
                        </Button>

                        <Stack direction="row" spacing={1} justifyContent="center" sx={{ opacity: 0.7 }}>
                          <LockIcon sx={{ fontSize: 16, color: BRAND.success }} />
                          <Typography sx={{ color: BRAND.light, fontSize: '0.75rem' }}>
                            Confidential & Secure
                          </Typography>
                        </Stack>

                        <AnimatePresence>
                          {successMessage && (
                            <Typography
                              component={motion.div}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              sx={{ color: BRAND.success, fontWeight: 600, textAlign: 'center' }}
                            >
                              {successMessage}
                            </Typography>
                          )}
                        </AnimatePresence>
                      </Stack>
                    </CardContent>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 90, color: BRAND.gold }} />
                      <Typography sx={{ color: BRAND.gold, fontWeight: 900 }}>SENT!</Typography>
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
          <FaWhatsapp size={35} />
        </Fab>
      </Zoom>
    </Container>
  );
};

/* ================= STYLES (UNCHANGED) ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.94)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: `1px solid rgba(236, 155, 20, 0.2)`
};

const megaGoldDivider = {
  height: '3px',
  background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`,
  width: '60px',
  mb: 3,
  mt: 1
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px'
  }
};

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND.gold}, #F4D03F)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '16px',
  py: 2
};

const whatsappFabStyle = {
  position: 'fixed',
  bottom: { xs: 20, md: 40 },
  right: { xs: 20, md: 40 },
  backgroundColor: '#25D366',
  color: '#FFF',
  zIndex: 1000
};

export default ContactDetails;
