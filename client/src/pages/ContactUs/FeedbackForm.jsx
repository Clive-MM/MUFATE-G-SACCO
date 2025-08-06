import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './FeedbackBanner.css';

const FeedbackBanner = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Subject: '',
    Message: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://mufate-g-sacco.onrender.com/feedback', formData);
      enqueueSnackbar(res.data.message, { variant: 'success' });
      setOpen(false);
      setFormData({ Email: '', Subject: '', Message: '' });
    } catch (err) {
      enqueueSnackbar('❌ Failed to submit feedback.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="feedback-section">
      <Box className="feedback-wrapper">
        <Typography className="feedback-title">
          We Value Your Feedback
        </Typography>
        <Typography className="feedback-text">
          Your opinion matters to us! Help us serve you better by sharing your thoughts, suggestions, or experiences with Mufate "G" Sacco.
        </Typography>
        <Button className="feedback-button" onClick={() => setOpen(true)}>
          Click Here
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: isMobile ? '95%' : '700px',
            borderRadius: 3,
            mx: 'auto',
            my: 2,
          }
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'stretch',
            gap: isMobile ? 3 : 5,
            p: isMobile ? 2 : 4,
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <img
                src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
                alt="MUFATE G SACCO logo"
                style={{ height: isMobile ? '80px' : '100px', objectFit: 'contain' }}
              />
            </Box>

            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{ mt: 2, fontWeight: 'bold', color: '#003B2F' }}
            >
              We’d Love to Hear from You
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: isMobile ? '14px' : '15px',
                color: '#333',
                lineHeight: 1.7
              }}
            >
              Your feedback helps us improve our services and serve you better. Please take a moment to share your thoughts, experiences, or suggestions with Mufate G Sacco. All responses are confidential and appreciated.
            </Typography>
          </Box>

          {/* Right Section - Form */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <TextField
              label="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Subject"
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Message"
              name="Message"
              value={formData.Message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              size="small"
            />
            <Button
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                backgroundColor: '#003B2F',
                color: '#fff',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#2e7d32'
                }
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ color: '#fff', mr: 1 }} />
                  Submitting...
                </>
              ) : (
                'SUBMIT'
              )}
            </Button>
          </Box>

          {/* Close Button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              width: 32,
              height: 32,
              '&:hover': {
                backgroundColor: '#ffe0b2'
              }
            }}
          >
            <CloseIcon sx={{ color: '#ef6c00', fontSize: '20px' }} />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FeedbackBanner;