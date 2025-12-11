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
        background: 'linear-gradient(to bottom, #01240F, #011407)',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        px: { xs: 2, sm: 4, md: 8 },
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
        minHeight: { xs: '110vh', sm: '100vh', md: '95vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >

      {/* GOLD ANIMATED BARS — AUTO-HIDE ON SMALL SCREENS */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '5%',
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          zIndex: 0,
          opacity: 0.9,
        }}
      >
        {['#FFD700', '#E6C200', '#FFF4B5', '#FFD700', '#E6C200'].map((color, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 + index * 0.25 }}
            style={{
              width: '75px',
              backgroundColor: color,
              borderRadius: '12px',
              boxShadow: '0 0 25px rgba(255, 215, 0, 0.45)',
              display: index < 3 ? 'block' : { xs: 'none', sm: 'block' }, // smarter hiding
            }}
          />
        ))}
      </motion.div>

      {/* HEADER */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 14px rgba(255,215,0,0.4)',
          fontSize: { xs: '1.7rem', md: '2.4rem' },
          mb: { xs: 3, md: 4 },
          zIndex: 2,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        We Value Your Feedback
      </Typography>

      {/* FEEDBACK FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            zIndex: 3,
            width: '100%',
            maxWidth: { xs: '100%', sm: '90%', md: '650px' },
            backdropFilter: 'blur(18px)',
            background: 'rgba(255, 255, 255, 0.12)', // improved frosted glass
            borderRadius: '24px',
            padding: { xs: 2.5, sm: 3, md: 4 },
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.35), inset 0 0 18px rgba(255,215,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >

          {/* INPUTS */}
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
              rows={field === 'Message' ? 5 : 1}
              variant="outlined"
              InputLabelProps={{
                sx: {
                  color: '#FFEFA8',
                  fontWeight: 700,
                  letterSpacing: '0.6px',
                  fontSize: '1rem',
                }
              }}
              InputProps={{
                sx: {
                  background: 'rgba(255,255,255,0.75)',
                  borderRadius: '14px',
                  color: '#01240F',
                  fontWeight: 600,
                  boxShadow:
                    'inset 4px 4px 10px rgba(0,0,0,0.25), inset -4px -4px 10px rgba(255,255,255,0.9)',
                  '& fieldset': {
                    borderColor: 'rgba(255,215,0,0.45)',
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

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={{
              backgroundColor: '#FFD700',
              color: '#000',
              fontWeight: 900,
              px: { xs: 4, sm: 5 },
              py: 1.5,
              borderRadius: '14px',
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              boxShadow: '0 0 22px rgba(255,215,0,0.65)',
              alignSelf: { xs: 'center', md: 'flex-start' },
              '&:hover': {
                backgroundColor: '#E6C200',
                transform: 'scale(1.07)',
                boxShadow: '0 0 28px rgba(255,215,0,0.9)',
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
