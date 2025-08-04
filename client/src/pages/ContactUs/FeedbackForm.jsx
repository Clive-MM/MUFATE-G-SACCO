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

const FeedbackForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    Email: '',
    Subject: '',
    Message: '',
  });
  const [loading, setLoading] = useState(false); // 🔄 Loading indicator

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner

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
      setLoading(false); // stop spinner
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
      }}
    >
      {/* Vertical Colored Bars */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: { md: '80px' },
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          gap: { md: '50px' },
          zIndex: 0,
        }}
      >
        {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, index) => (
          <Box
            key={index}
            sx={{
              width: { md: '90px' },
              backgroundColor: color,
            }}
          />
        ))}
      </Box>

      {/* Heading */}
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

      {/* Feedback Form */}
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
        }}
      >
        <TextField
          label="Email"
          name="Email"
          type="email"
          value={formData.Email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
        <TextField
          label="Subject"
          name="Subject"
          value={formData.Subject}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
        <TextField
          label="Message"
          name="Message"
          value={formData.Message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={!loading && <SendIcon />}
          sx={{
            backgroundColor: '#2E7D32',
            color: '#fff',
            fontWeight: 'bold',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 1.25 },
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
            textTransform: 'uppercase',
            borderRadius: '8px',
            boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.6)',
            '&:hover': {
              backgroundColor: '#1B5E20',
              boxShadow: '0 0 15px 3px rgba(255, 215, 0, 0.8)',
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
    </Box>
  );
};

export default FeedbackForm;
