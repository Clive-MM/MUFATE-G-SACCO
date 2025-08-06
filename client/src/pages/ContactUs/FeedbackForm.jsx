import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';

const FeedbackForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ Email: '', Subject: '', Message: '' });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #cce6f4, #eaf4fb)',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Dynamic Animated Bars */}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'row',
          gap: '40px',
          zIndex: 0,
          padding: '0 80px',
        }}
      >
        {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 + i * 0.2 }}
            style={{
              width: '70px',
              backgroundColor: color,
              borderRadius: '12px',
            }}
          />
        ))}
      </motion.div>

      {/* Feedback Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          zIndex: 1,
          maxWidth: '600px',
          width: '100%',
          backdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.45)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#003B49',
            textAlign: 'center',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          We Value Your Feedback
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {['Email', 'Subject', 'Message'].map((field, idx) => (
            <TextField
              key={idx}
              label={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              multiline={field === 'Message'}
              rows={field === 'Message' ? 4 : 1}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  boxShadow: 'inset 4px 4px 10px #bebebe, inset -4px -4px 10px #ffffff',
                },
              }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#2E7D32',
              color: '#fff',
              fontWeight: 'bold',
              py: 1.5,
              px: 3,
              borderRadius: '12px',
              textTransform: 'uppercase',
              boxShadow: '4px 4px 12px #bebebe, -4px -4px 12px #ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: '#1B5E20',
                boxShadow: '0 0 15px 4px rgba(255, 215, 0, 0.7)',
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: '#fff' }} />
                Submitting...
              </>
            ) : (
              <>
                <SendIcon />
                Submit
              </>
            )}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FeedbackForm;
