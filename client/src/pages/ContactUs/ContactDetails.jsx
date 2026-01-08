import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress, 
  Button, Stack, TextField, Container, Fab, Zoom, useMediaQuery, useTheme
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

/* ================= BRAND COLORS ================= */
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  /* ✅ STATE: Keys match Backend: Email, PhoneNumber, Subject, Message */
  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '+254',
    Subject: '',
    Message: ''
  });

  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ================= SUBMIT LOGIC ================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation for Kenyan Phone Format
    if (formData.PhoneNumber.length < 13) {
      enqueueSnackbar('Please use +254XXXXXXXXX format', { variant: 'warning' });
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

      if (response.ok) {
        enqueueSnackbar(result.message || 'Thank you for your feedback!', { variant: 'success' });
        
        // Reset Form
        setFormData({
          Email: '',
          PhoneNumber: '+254',
          Subject: '',
          Message: ''
        });

        setSubmitted(true);
        // Reset success state after 6 seconds to show form again
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        enqueueSnackbar(result.message || 'Submission failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Server connection failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Container ref={scrollRef} maxWidth="xl" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <Grid container spacing={4} justifyContent="center">
          
          <Grid item xs={12} lg={5} sx={{ display: 'flex' }}>
            <Card sx={megaGlassCard} component={motion.div}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div 
                    key="form" 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <CardContent
                      component="form"
                      onSubmit={handleFormSubmit}
                      sx={{ p: { xs: 3, md: 5 } }}
                    >
                      <Typography sx={megaInfoTitle}>Send Us a Message</Typography>
                      <Box sx={megaGoldDivider} />

                      <Stack spacing={2.5}>
                        <TextField
                          label="Email Address *"
                          name="Email"
                          type="email"
                          required
                          value={formData.Email}
                          onChange={handleFormChange}
                          placeholder="example@mail.com"
                          sx={megaInputStyle}
                          helperText="We respond within 24 hours"
                          FormHelperTextProps={{ sx: { color: BRAND.textMuted } }}
                        />

                        <TextField
                          label="Phone Number *"
                          name="PhoneNumber"
                          required
                          value={formData.PhoneNumber}
                          onChange={handleFormChange}
                          placeholder="+254..."
                          sx={megaInputStyle}
                          helperText="Format: +254..."
                          FormHelperTextProps={{ sx: { color: BRAND.textMuted } }}
                        />

                        {/* ✅ SUBJECT FIELD ADDED TO MATCH BACKEND/DB */}
                        <TextField
                          label="Subject *"
                          name="Subject"
                          required
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
                          {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                        </Button>

                        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2, opacity: 0.8 }}>
                          <LockIcon sx={{ fontSize: 16, color: BRAND.success }} />
                          <Typography sx={{ color: BRAND.light, fontSize: '0.75rem' }}>
                            Confidential & Secure
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success" 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
                  >
                    <Box sx={{ textAlign: 'center', p: 8, width: '100%' }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 90, color: BRAND.gold, mb: 2 }} />
                      <Typography variant="h4" sx={{ color: BRAND.gold, fontWeight: 900 }}>SENT!</Typography>
                      <Typography sx={{ color: BRAND.light, mt: 1 }}>
                        Thank you for reaching out. Check your email for a confirmation.
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </Grid>

        </Grid>
      </motion.div>

      {/* WhatsApp Floating Action Button */}
      <Zoom in>
        <Fab 
          href="https://wa.me/254791331932" 
          target="_blank" 
          sx={whatsappFabStyle}
          aria-label="whatsapp"
        >
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
  borderRadius: '24px',
  border: `1px solid rgba(236, 155, 20, 0.15)`,
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  width: '100%',
  minHeight: '650px'
};

const megaInfoTitle = {
  fontSize: { xs: '1.8rem', md: '2.2rem' },
  fontWeight: 800,
  color: BRAND.gold,
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const megaGoldDivider = {
  height: '4px',
  background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`,
  width: '80px',
  mb: 4,
  mt: 1,
  borderRadius: '2px'
};

const megaInputStyle = {
  '& label': { color: 'rgba(255,255,255,0.5)' },
  '& label.Mui-focused': { color: BRAND.gold },
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold },
  }
};

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND.gold}, #F4D03F)`,
  color: BRAND.dark,
  fontWeight: 900,
  fontSize: '1rem',
  borderRadius: '12px',
  py: 1.8,
  mt: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px rgba(236, 155, 20, 0.4)`,
    background: `linear-gradient(45deg, #F4D03F, ${BRAND.gold})`,
  },
  '&.Mui-disabled': {
    background: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.3)'
  }
};

const whatsappFabStyle = {
  position: 'fixed',
  bottom: { xs: 24, md: 40 },
  right: { xs: 24, md: 40 },
  backgroundColor: BRAND.success,
  color: '#FFF',
  zIndex: 1000,
  width: 65,
  height: 65,
  '&:hover': { backgroundColor: '#1eb954' }
};

export default ContactDetails;