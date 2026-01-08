import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import { useSnackbar } from 'notistack';
import { motion, AnimatePresence } from 'framer-motion';

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

  // ✅ Backend-aligned state
  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '',
    Subject: '',
    Message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://mufate-g-sacco.onrender.com/feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
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

        // Clear fields
        setFormData({
          Email: '',
          PhoneNumber: '',
          Subject: '',
          Message: ''
        });

        setTimeout(() => setSuccessMessage(''), 6000);
      } else {
        enqueueSnackbar(result.message || 'Submission failed.', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Connection error. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: { xs: 'auto', md: '75vh' },
        px: { xs: 3, md: 6 },
        pt: { xs: 4, md: 5 },
        pb: { xs: 6, md: 7 },
        background: `linear-gradient(135deg, #0A1F14 0%, ${BRAND.dark} 100%)`,
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' }
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          color: BRAND.gold,
          fontWeight: 900,
          textTransform: 'uppercase',
          mb: 1,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.3rem' },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        Send Us a Message
      </Typography>

      <Typography sx={{ color: BRAND.light, opacity: 0.7, mb: 4 }}>
        Have questions? Our team typically responds within 24 hours.
      </Typography>

      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        <Stack
          component={motion.form}
          onSubmit={handleSubmit}
          spacing={2.5}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '22px',
            p: { xs: 2.5, md: 4 },
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
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
            label="Phone Number"
            name="PhoneNumber"
            fullWidth
            required
            value={formData.PhoneNumber}
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
            label="Message"
            name="Message"
            multiline
            rows={isMobile ? 4 : 5}
            fullWidth
            required
            value={formData.Message}
            onChange={handleChange}
            sx={inputStyle}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={submitBtnStyle}
          >
            {loading ? <CircularProgress size={24} sx={{ color: BRAND.dark }} /> : 'SEND MESSAGE'}
          </Button>

          {/* Confidential + Success */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
              <LockIcon sx={{ fontSize: 14, color: BRAND.success }} />
              <Typography sx={{ color: BRAND.light, fontSize: '0.75rem' }}>
                Your information is kept confidential.
              </Typography>
            </Box>

            <AnimatePresence>
              {successMessage && (
                <Typography
                  component={motion.div}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  sx={{ color: BRAND.success, fontSize: '0.85rem', fontWeight: 600 }}
                >
                  {successMessage}
                </Typography>
              )}
            </AnimatePresence>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    '& fieldset': { border: 'none' },
    '&.Mui-focused': { boxShadow: '0 0 0 2px #EC9B14' }
  },
  '& .MuiInputLabel-root': { color: '#02150F', fontWeight: 700 }
};

const submitBtnStyle = {
  width: '100%',
  py: 1.8,
  borderRadius: '12px',
  fontWeight: 900,
  color: '#02150F',
  background: 'linear-gradient(90deg, #EC9B14, #F4D03F)'
};

export default FeedbackForm;
