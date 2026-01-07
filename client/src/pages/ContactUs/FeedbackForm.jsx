import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, CircularProgress, 
  Stack, useMediaQuery, useTheme 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSnackbar } from 'notistack';
import { motion, AnimatePresence } from 'framer-motion';

// Unified Brand Tokens
const BRAND = {
  gold: '#EC9B14',
  goldSoft: '#F4D03F',
  dark: '#02150F',
  light: '#F4F4F4',
  success: '#25D366'
};

const FeedbackForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallPhone = useMediaQuery('(max-width:360px)');

  const [formData, setFormData] = useState({
    Email: '',
    Subject: '',
    Message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setSubmitted(true);
        setFormData({ Email: '', Subject: '', Message: '' });
        // Reset success state after 5 seconds to show form again
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        enqueueSnackbar('Submission failed. Please check required fields.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Connection error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '75vh' },
        px: { xs: 3, md: 6 },
        pt: { xs: 4, md: 5 },
        pb: { xs: 6, md: 7 },
        background: `linear-gradient(135deg, #0A1F14 0%, ${BRAND.dark} 100%)`,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' },
      }}
    >
      {/* DECORATIVE BACKGROUND ELEMENTS */}
      {!isSmallPhone && (
        <Box
          sx={{
            position: 'absolute',
            top: 0, bottom: 0, right: '4vw',
            display: 'flex', gap: { xs: '15px', md: '35px' },
            zIndex: 0, pointerEvents: 'none'
          }}
        >
          {[BRAND.gold, BRAND.goldSoft, '#F9E79F'].map((color, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: '20px', md: '60px' },
                height: '100%',
                backgroundColor: color,
                opacity: 0.1,
                borderRadius: '12px',
                filter: 'blur(50px)',
              }}
            />
          ))}
        </Box>
      )}

      {/* HEADER */}
      <Typography
        variant="h4"
        sx={{
          color: BRAND.gold,
          fontWeight: 900,
          textTransform: 'uppercase',
          mb: 1,
          zIndex: 2,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.3rem' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Send Us a Message
      </Typography>
      
      <Typography sx={{ color: BRAND.light, opacity: 0.7, mb: 4, zIndex: 2, fontSize: '0.9rem' }}>
        Have questions? Our team typically responds within 24 hours.
      </Typography>

      {/* FORM CONTAINER */}
      <Box sx={{ width: '100%', maxWidth: '600px', zIndex: 2 }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <Stack
              key="form"
              component={motion.form}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              spacing={2.5}
              sx={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '22px',
                p: { xs: 2.5, md: 4 },
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <TextField
                label="Email Address"
                name="Email"
                type="email"
                fullWidth
                required
                value={formData.Email}
                onChange={handleChange}
                sx={inputStyle}
              />

              <TextField
                label="Subject"
                name="Subject"
                fullWidth
                required
                value={formData.Subject}
                onChange={handleChange}
                sx={inputStyle}
              />

              <TextField
                label="How can we help?"
                name="Message"
                multiline
                rows={isMobile ? 4 : 5}
                fullWidth
                required
                value={formData.Message}
                onChange={handleChange}
                sx={inputStyle}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={!loading && <SendIcon />}
                  sx={submitBtnStyle}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: BRAND.dark }} /> : 'Submit Message'}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
                  <LockIcon sx={{ fontSize: '14px', color: BRAND.success }} />
                  <Typography sx={{ color: BRAND.light, fontSize: '0.75rem' }}>
                    Your information is kept confidential.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          ) : (
            <Box
              key="success"
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              sx={{
                textAlign: 'center',
                py: 8,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '22px',
                border: `1px solid ${BRAND.gold}33`,
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 80, color: BRAND.gold, mb: 2 }} />
              <Typography variant="h5" sx={{ color: BRAND.gold, fontWeight: 800, mb: 1 }}>
                MESSAGE SENT
              </Typography>
              <Typography sx={{ color: BRAND.light, opacity: 0.7 }}>
                Thank you for your feedback. We'll be in touch soon.
              </Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

/* ================= STYLES ================= */

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    '& fieldset': { border: 'none' },
    '&.Mui-focused': { boxShadow: `0 0 0 2px ${BRAND.gold}` }
  },
  '& .MuiInputLabel-root': { color: BRAND.dark, fontWeight: 700 },
};

const submitBtnStyle = {
  width: { xs: '100%', sm: 'auto' },
  px: 5, py: 1.8,
  borderRadius: '12px',
  fontWeight: 900,
  color: BRAND.dark,
  background: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldSoft})`,
  '&:hover': {
    background: BRAND.goldSoft,
    transform: 'scale(1.02)',
  },
};

export default FeedbackForm;