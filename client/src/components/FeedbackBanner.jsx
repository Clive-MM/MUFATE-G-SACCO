import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  Container,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
};

const FeedbackBanner = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { enqueueSnackbar } = useSnackbar();

  // 1. Updated State to include PhoneNumber (Aligned with Backend Model)
  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '',
    Subject: '',
    Message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Email and Phone Number are optional.
    // Subject and Message are required.
    if (!formData.Subject.trim() || !formData.Message.trim()) {
      enqueueSnackbar(
        '❌ Please enter a subject and your feedback message.',
        { variant: 'warning' }
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        'https://mufate-g-sacco.onrender.com/feedback',
        {
          Email: formData.Email.trim() || null,
          PhoneNumber: formData.PhoneNumber.trim() || null,
          Subject: formData.Subject.trim(),
          Message: formData.Message.trim()
        }
      );

      const referenceNumber = res.data.referenceNumber;

      enqueueSnackbar(
        `✅ Feedback submitted successfully. Reference: ${referenceNumber}`,
        {
          variant: 'success',
          autoHideDuration: 7000
        }
      );

      // Close the form after successful submission
      setOpen(false);

      // Reset form
      setFormData({
        Email: '',
        PhoneNumber: '',
        Subject: '',
        Message: ''
      });

    } catch (err) {
      console.error('Submission Error:', err);

      const serverMsg =
        err.response?.data?.message ||
        '❌ Failed to submit feedback. Please try again.';

      enqueueSnackbar(serverMsg, {
        variant: 'error',
        autoHideDuration: 6000
      });

    } finally {
      setLoading(false);
    }
  };

const textFieldStyles = {
  mb: 2,

  '& label': {
    color: 'rgba(255,255,255,0.6)',
  },

  '& label.Mui-focused': {
    color: BRAND.gold,
  },

  '& .MuiOutlinedInput-root': {
    color: BRAND.light,

    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.2)',
      borderRadius: '12px',
    },

    '&:hover fieldset': {
      borderColor: BRAND.gold,
    },

    '&.Mui-focused fieldset': {
      borderColor: BRAND.gold,
    },

    bgcolor: 'rgba(255,255,255,0.03)',
  },

  // ✅ Golden helper text
  '& .MuiFormHelperText-root': {
    color: BRAND.gold,
    fontWeight: 500,
    marginLeft: '4px',
    marginTop: '5px',
  },

  // ✅ Keep helper text golden even when focused
  '& .MuiFormHelperText-root.Mui-focused': {
    color: BRAND.gold,
  },
};

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 10 }, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography variant="h3" sx={{ color: BRAND.gold, fontWeight: 900, textTransform: 'uppercase', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            We Value Your Feedback
          </Typography>

          <Typography sx={{ color: BRAND.light, opacity: 0.8, maxWidth: '800px', lineHeight: 1.8, fontSize: '1.1rem' }}>
            Your opinion matters to us! Help us serve you better by sharing your thoughts,
            suggestions, or experiences with GOLDEN GENERATION DT Sacco.
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: BRAND.gold,
              color: BRAND.dark,
              fontWeight: 800,
              px: 6,
              py: 1.5,
              borderRadius: '50px',
              fontSize: '1rem',
              '&:hover': { bgcolor: BRAND.lightGold, transform: 'scale(1.05)' },
              transition: '0.3s'
            }}
          >
            CLICK HERE TO SHARE
          </Button>
        </Box>
      </Container>

      <Dialog
        open={open}
        onClose={() => !loading && setOpen(false)} // Prevent closing while loading
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: '#011A13',
            backgroundImage: 'none',
            color: BRAND.light,
            borderRadius: '28px',
            border: `1px solid ${BRAND.gold}33`,
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
          }
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          disabled={loading}
          sx={{ position: 'absolute', top: 16, right: 16, color: BRAND.gold, zIndex: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: { xs: 3, md: 6 } }}>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 5 }}>
            <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
              <Box sx={{ mb: 3 }}>
                <img
                  src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
                  alt="Logo"
                  style={{ height: '80px', filter: 'drop-shadow(0 0 10px rgba(236,155,20,0.2))' }}
                />
              </Box>
              <Typography variant="h4" sx={{ color: BRAND.gold, fontWeight: 800, mb: 2, textTransform: 'uppercase', fontSize: '1.5rem' }}>
                We’d Love to Hear from You
              </Typography>
              <Typography sx={{ opacity: 0.7, lineHeight: 1.6 }}>
                Your feedback helps us improve our services. You may submit your feedback anonymously, or provide your email or phone number if you would like us to contact you.
              </Typography>
            </Box>

            <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Email (Optional)"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
                helperText="Provide your email if you would like us to respond."
              />


              <TextField
                label="Phone Number (Optional)"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. 0712345678"
                sx={textFieldStyles}
                helperText="Optional. Provide your number if you would like us to contact you."
              />

              <TextField
                label="Subject *"
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyles}
              />
              <TextField
                label="Message *"
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
                placeholder="Tell us about your feedback, suggestion, complaint or experience..."
                sx={textFieldStyles}
              />

              <Button
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: '12px',
                  backgroundColor: BRAND.gold,
                  color: BRAND.dark,
                  fontWeight: 700,
                  '&:hover': { backgroundColor: BRAND.lightGold },
                  '&.Mui-disabled': { backgroundColor: 'rgba(236,155,20,0.3)', color: BRAND.dark }
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: BRAND.dark }} /> : "SUBMIT FEEDBACK"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FeedbackBanner;