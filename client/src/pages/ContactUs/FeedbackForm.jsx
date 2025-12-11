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

        /* 🔥 Updated Brand Background (Gold → Dark Green Fade) */
        background: 'linear-gradient(to bottom, #01240F, #011407)',
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
      }}
    >
      {/* ===================
          GOLD BARS (BRAND)
      =================== */}
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
        {['#FFD700', '#E6C200', '#FFF4B5', '#FFD700', '#E6C200'].map((color, index) => (
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

      {/* ===========================
          HEADER — GOLD GRADIENT
      ============================ */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: { xs: '1.4rem', md: '2rem' },

          /* GOLD Gradient Title */
          background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',

          mb: 3,
          zIndex: 2,
          textShadow: '0 0 12px rgba(0,0,0,0.45)',
        }}
      >
        We Value Your Feedback
      </Typography>

      {/* ===========================
          FEEDBACK FORM
      ============================ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            zIndex: 2,
            maxWidth: { xs: '100%', md: '600px' },
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            gap: 2,

            backdropFilter: 'blur(14px)',
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '20px',
            padding: { xs: 2, md: 4 },
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
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
              required
              multiline={field === 'Message'}
              rows={field === 'Message' ? 4 : 1}
              variant="outlined"
              InputLabelProps={{
                style: { color: '#FFD700', fontWeight: 600 },
              }}
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.75)',
                  borderRadius: '12px',
                  color: '#01240F', // Visible text color
                  boxShadow:
                    'inset 4px 4px 10px #bebebe, inset -4px -4px 10px #ffffff',
                },
              }}
            />
          ))}

          {/* ===========================
              SUBMIT BUTTON — GOLD
          ============================ */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={{
              backgroundColor: '#FFD700',
              color: '#000',
              fontWeight: 800,

              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1.5 },
              borderRadius: '12px',

              boxShadow: '0 0 12px rgba(255,215,0,0.6)',
              textTransform: 'uppercase',

              '&:hover': {
                backgroundColor: '#E6C200',
                boxShadow: '0 0 20px rgba(255,215,0,0.9)',
                transform: 'scale(1.05)',
              },

              mt: 2,
              alignSelf: 'flex-start',
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: '#000' }} />
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
