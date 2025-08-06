import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';

const FeedbackForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    Email: '',
    Subject: '',
    Message: '',
  });
  const [loading, setLoading] = useState(false);

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

      const result = await response.json();

      if (response.status === 201) {
        enqueueSnackbar(result.message, { variant: 'success' });
        setFormData({ Email: '', Subject: '', Message: '' });
      } else {
        enqueueSnackbar(result.message || 'Submission failed.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to bottom, rgb(189, 225, 237), rgb(233, 241, 250))',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        px: { xs: 2, md: 8 },
        pt: { xs: 3, md: 3 },
        pb: { xs: 3, md: 4 },
        mt: 0,
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.4), 0 8px 32px rgba(31, 38, 135, 0.25)',
      }}
    >
      {/* ✅ Vertical Animated Colored Bars */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '80px',
          display: 'flex',
          flexDirection: 'row',
          gap: '50px',
          zIndex: 0,
        }}
      >
        {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 + index * 0.2 }}
            style={{
              width: '90px',
              backgroundColor: color,
              borderRadius: '8px',
            }}
          />
        ))}
      </motion.div>

      {/* ✅ Heading */}
      <Typography
        variant="h4"
        sx={{
          color: '#003B49',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: { xs: '1.4rem', md: '2rem' },
          mb: 3,
          zIndex: 1,
        }}
      >
        We Value Your Feedback
      </Typography>

      {/* ✅ Feedback Form with Neumorphism + Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            zIndex: 1,
            maxWidth: { xs: '100%', md: '600px' },
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backdropFilter: 'blur(16px)',
            background: 'rgba(255, 255, 255, 0.35)',
            borderRadius: '20px',
            padding: { xs: 2, md: 4 },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          {['Email', 'Subject', 'Message'].map((field, i) => (
            <TextField
              key={i}
              label={field}
              name={field}
              type={field === 'Email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              multiline={field === 'Message'}
              rows={field === 'Message' ? 4 : 1}
              variant="outlined"
              required
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '14px',
                  boxShadow: 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff',
                },
              }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={{
              backgroundColor: '#2E7D32',
              color: '#fff',
              fontWeight: 600,
              px: 4,
              py: 1.2,
              borderRadius: '14px',
              textTransform: 'uppercase',
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#1B5E20',
                boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.6)',
              },
              '&:active': {
                boxShadow: 'inset 2px 2px 4px #bebebe, inset -2px -2px 4px #ffffff',
              },
              alignSelf: 'flex-start',
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.2,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: '#fff' }} />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FeedbackForm;
