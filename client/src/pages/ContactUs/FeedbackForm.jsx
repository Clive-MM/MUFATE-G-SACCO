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
        background: 'linear-gradient(to bottom, #01240F, #011407)', // DARK GREEN BRAND
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        px: { xs: 2, md: 8 },
        pt: { xs: 3, md: 6 },
        pb: { xs: 3, md: 6 },
        mt: 0,
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >

      {/* ➤ GOLD GRADIENT ANIMATED BARS */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '70px',
          display: 'flex',
          flexDirection: 'row',
          gap: '45px',
          zIndex: 0,
        }}
      >
        {['#FFD700', '#E6C200', '#FFF4B5', '#FFD700', '#E6C200'].map((color, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 + index * 0.20 }}
            style={{
              width: '85px',
              backgroundColor: color,
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
            }}
          />
        ))}
      </motion.div>

      {/* ➤ HEADER */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 12px rgba(255,215,0,0.25)',
          fontSize: { xs: '1.6rem', md: '2.4rem' },
          mb: 3,
          zIndex: 2,
        }}
      >
        We Value Your Feedback
      </Typography>

      {/* ➤ FEEDBACK FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            zIndex: 3,
            maxWidth: { xs: '100%', md: '650px' },
            width: '100%',

            backdropFilter: 'blur(18px)',
            background: 'rgba(255, 255, 255, 0.08)', // TRANSPARENT GLASS BOX
            borderRadius: '24px',
            padding: { xs: 2.5, md: 4 },
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.3), inset 0 0 25px rgba(255,215,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >

          {/* INPUT FIELDS */}
          {['Email', 'Subject', 'Message'].map((field, i) => (
            <TextField
              key={i}
              label={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              required
              multiline={field === 'Message'}
              rows={field === 'Message' ? 4 : 1}
              variant="outlined"
              InputLabelProps={{
                sx: {
                  color: '#FFF4B5', // ⭐ MUCH MORE VISIBLE SOFT GOLD LABEL
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }
              }}
              InputProps={{
                sx: {
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '14px',
                  color: '#01240F', // dark green text inside input
                  fontWeight: 600,
                  boxShadow:
                    'inset 4px 4px 10px rgba(0,0,0,0.2), inset -4px -4px 10px rgba(255,255,255,0.8)',
                  '& fieldset': {
                    borderColor: 'rgba(255,215,0,0.4)', // subtle gold border
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFD700',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFD700',
                    boxShadow: '0 0 12px #FFD700',
                  }
                }
              }}
            />
          ))}

          {/* ➤ SUBMIT BUTTON */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={{
              backgroundColor: '#FFD700',
              color: '#000',
              fontWeight: 900,
              px: 4,
              py: 1.5,
              borderRadius: '14px',
              textTransform: 'uppercase',
              fontSize: '1rem',
              boxShadow: '0 0 20px rgba(255,215,0,0.6)',
              alignSelf: 'flex-start',
              '&:hover': {
                backgroundColor: '#E6C200',
                transform: 'scale(1.05)',
                boxShadow: '0 0 25px rgba(255,215,0,0.85)',
              }
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: '#000' }} />
                &nbsp;Submitting...
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
