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
        background: 'linear-gradient(to bottom, #0A1F14, #03140D)',
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        px: { xs: 2, md: 8 },
        pt: { xs: 2, md: 5 },
        pb: { xs: 4, md: 6 },
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: { xs: 'center', md: 'flex-start' },
        overflow: 'hidden',
      }}
    >

      {/* RIGHT GOLD BARS */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '4vw',
          display: 'flex',
          flexDirection: 'row',
          gap: '35px',
          zIndex: 0,
        }}
      >
        {['#E8C46A', '#D8AF56', '#F9E7C5', '#E8C46A', '#D8AF56']
          .slice(0, window.innerWidth < 600 ? 2 : window.innerWidth < 1024 ? 3 : 5)
          .map((color, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              whileInView={{
                height:
                  window.innerWidth < 600 ? '45%' :
                  window.innerWidth < 1024 ? '70%' : '100%'
              }}
              transition={{ duration: 0.9 + index * 0.2 }}
              style={{
                width: window.innerWidth < 600 ? '40px' : '70px',
                backgroundColor: color,
                borderRadius: '12px',
                boxShadow: '0 0 25px rgba(232,196,106,0.45)',
              }}
            />
          ))}
      </motion.div>

      {/* HEADER – updated to CONTACT US gold */}
      <Typography
        variant="h4"
        sx={{
          color: '#F4D03F',               // ← NEW BRIGHT GOLD
          fontWeight: 900,
          textTransform: 'uppercase',
          mb: 3,
          zIndex: 2,
          fontSize: { xs: '1.7rem', md: '2.3rem' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        We Value Your Feedback
      </Typography>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: '100%', maxWidth: '650px', zIndex: 2 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backdropFilter: 'blur(15px)',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '22px',
            padding: { xs: 2.5, md: 4 },
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >

          {['Email', 'Subject', 'Message'].map((field) => (
            <TextField
              key={field}
              label={field}
              name={field}
              type={field === 'Email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              required
              multiline={field === 'Message'}
              rows={field === 'Message' ? 4 : 1}
              fullWidth
              InputLabelProps={{
                sx: {
                  color: '#000',       // ← BLACK LABELS
                  fontWeight: 800,     // ← BOLD TEXT
                },
              }}
              InputProps={{
                sx: {
                  background: 'rgba(255,255,255,0.85)',
                  borderRadius: '14px',
                  boxShadow:
                    'inset 3px 3px 8px rgba(0,0,0,0.2), inset -3px -3px 8px rgba(255,255,255,0.9)',
                },
              }}
            />
          ))}

          {/* SUBMIT BUTTON – Gold + Dark Green Gradient */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={{
              background: 'linear-gradient(90deg, #E8C46A, #D8AF56)',
              color: '#000',
              fontWeight: 900,
              px: { xs: 3, md: 4 },
              py: 1.5,
              borderRadius: '14px',
              fontSize: '1rem',
              textTransform: 'uppercase',
              alignSelf: { xs: 'center', md: 'flex-start' },
              boxShadow: '0 0 18px rgba(232,196,106,0.6)',
              transition: '0.3s ease',
              '&:hover': {
                background:
                  'linear-gradient(90deg, #042F1A, #E8C46A)', // ← DARK GREEN → GOLD
                boxShadow: '0 0 28px rgba(232,196,106,0.9)',
                transform: 'scale(1.05)',
              },
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
