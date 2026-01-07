import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, CircularProgress, 
  Stack, InputAdornment, useMediaQuery, useTheme 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';

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
  
  // Responsive Breakpoints logic
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallPhone = useMediaQuery('(max-width:360px)');

  const [formData, setFormData] = useState({
    Email: '',
    Phone: '+254', // Enforce prefix for cleaner data
    Subject: '',
    Message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Phone Validation for SACCO standards
    if (formData.Phone.length < 13) {
      enqueueSnackbar('Please enter a valid phone number (e.g., +254 7XX XXX XXX)', { variant: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        enqueueSnackbar('Feedback sent successfully!', { variant: 'success' });
        setFormData({ Email: '', Phone: '+254', Subject: '', Message: '' });
      } else {
        enqueueSnackbar('Submission failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Connection error. Check your internet.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '85vh' },
        px: { xs: 3, md: 6 }, // Optimized padding for 14-inch laptops and mobile
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
      {/* RIGHT GOLD BARS - Optimized for low-end phone performance */}
      {!isSmallPhone && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '4vw',
            display: 'flex',
            gap: { xs: '15px', md: '35px' },
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          {[BRAND.gold, BRAND.goldSoft, '#F9E79F'].map((color, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: '20px', md: '60px' },
                height: { xs: '40%', md: '100%' },
                backgroundColor: color,
                opacity: 0.15, // Reduced opacity for better text contrast
                borderRadius: '12px',
                filter: 'blur(40px)', // Softer look
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
          letterSpacing: '1px'
        }}
      >
        Send Us a Message
      </Typography>
      
      <Typography sx={{ color: BRAND.light, opacity: 0.7, mb: 4, zIndex: 2, fontSize: '0.9rem' }}>
        Have questions? Our team typically responds within 24 hours.
      </Typography>

      {/* FORM */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ width: '100%', maxWidth: '600px', zIndex: 2 }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={2.5}
          sx={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '22px',
            p: { xs: 2.5, md: 4 },
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            willChange: 'transform', // Performance optimization for mobile
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
            helperText="We'll send our reply to this address."
            sx={inputStyle}
          />

          <TextField
            label="Phone Number"
            name="Phone"
            fullWidth
            required
            value={formData.Phone}
            onChange={handleChange}
            placeholder="+254 700 000 000"
            helperText="Required for urgent SMS updates."
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

            {/* SECURITY NOTE */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
              <LockIcon sx={{ fontSize: '14px', color: BRAND.success }} />
              <Typography sx={{ color: BRAND.light, fontSize: '0.75rem' }}>
                Your information is kept confidential and secure.
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

/* ================= STYLES ================= */

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    transition: '0.3s ease',
    '& fieldset': { border: 'none' },
    '&:hover': { transform: 'translateY(-2px)' },
    '&.Mui-focused': { boxShadow: `0 0 0 2px ${BRAND.gold}` }
  },
  '& .MuiInputLabel-root': { color: BRAND.dark, fontWeight: 700 },
  '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.5)', marginLeft: 1 }
};

const submitBtnStyle = {
  width: { xs: '100%', sm: 'auto' },
  px: 5,
  py: 1.8,
  borderRadius: '12px',
  fontWeight: 900,
  fontSize: '1rem',
  color: BRAND.dark,
  background: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldSoft})`,
  boxShadow: `0 8px 20px ${BRAND.gold}44`,
  '&:hover': {
    background: BRAND.goldSoft,
    transform: 'scale(1.02)',
    boxShadow: `0 12px 25px ${BRAND.gold}66`,
  },
};

export default FeedbackForm;