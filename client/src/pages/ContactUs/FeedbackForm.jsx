import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
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
      const response = await fetch(
        'https://mufate-g-sacco.onrender.com/feedback',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.status === 201) {
        enqueueSnackbar(result.message, { variant: 'success' });
        setFormData({ Email: '', Subject: '', Message: '' });
      } else {
        enqueueSnackbar(result.message || 'Submission failed.', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #001A0F, #002715)',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',

        px: { xs: 2, md: 8 },
        pt: { xs: 3, md: 3 },
        pb: { xs: 3, md: 4 },

        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* GOLD VERTICAL GLOW STRIPES */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '40px',
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          zIndex: 0,
        }}
      >
        {[
          '#FDD835',
          '#FFEB3B',
          '#FBC02D',
          '#FFF59D',
          '#FDD835',
          '#FBC02D',
        ].map((color, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 0.9 + index * 0.2 }}
            style={{
              width: '90px',
              backgroundColor: color,
              borderRadius: '12px',
              boxShadow: '0 0 30px rgba(255,215,0,0.5)',
            }}
          />
        ))}
      </motion.div>

      {/* GOLD GLOWING HEADING */}
      <Typography
        variant="h4"
        sx={{
          color: '#FFD700',
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: { xs: '1.5rem', md: '2.2rem' },
          mb: 4,
          zIndex: 2,
          textShadow: '0 0 12px rgba(255,215,0,0.7)',
        }}
      >
        WE VALUE YOUR FEEDBACK
      </Typography>

      {/* FEEDBACK FORM */}
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

            padding: { xs: 2, md: 4 },

            /* GLASS NEUMORPHISM GOLD STYLE */
            backdropFilter: 'blur(18px)',
            background: 'rgba(0, 0, 0, 0.45)',
            borderRadius: '20px',

            boxShadow:
              '0 0 20px rgba(255, 215, 0, 0.4), inset 0 0 12px rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,215,0,0.4)',
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
              required
              fullWidth
              multiline={field === 'Message'}
              rows={field === 'Message' ? 4 : 1}
              variant="outlined"
              InputLabelProps={{
                sx: {
                  color: '#FFD700 !important',
                  fontWeight: 600,
                },
              }}
              InputProps={{
                style: {
                  background: 'rgba(255,255,255,0.75)',
                  borderRadius: '12px',
                  boxShadow:
                    'inset 4px 4px 10px rgba(0,0,0,0.4), inset -4px -4px 10px rgba(255,255,255,0.5)',
                },
              }}
            />
          ))}

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            startIcon={!loading && <SendIcon />}
            sx={{
              mt: 2,
              alignSelf: 'flex-start',
              px: 4,
              py: 1.5,

              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '1rem',

              backgroundColor: '#FFD700',
              color: '#000',
              borderRadius: '12px',

              boxShadow: '0 0 12px rgba(255,215,0,0.6)',
              '&:hover': {
                backgroundColor: '#FFEB3B',
                boxShadow: '0 0 20px rgba(255,215,0,1)',
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: '#000' }} />
                &nbsp;Submitting...
              </>
            ) : (
              'SUBMIT'
            )}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FeedbackForm;
