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
          Your opinion matters to us! Help us serve you better by sharing your thoughts,
          suggestions, or experiences with Mufate "G" Sacco.
        </Typography>

        <Button className="feedback-button" onClick={() => setOpen(true)}>
          <strong>CLICK HERE</strong>
        </Button>
      </Box>

      {/* ===================== POPUP ===================== */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #011407, #01240F)',
            color: '#FFD700',
            borderRadius: 3,
            boxShadow: "0 0 35px rgba(255,215,0,0.25)"
          }
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 3 : 5,
            p: isMobile ? 2 : 4,
            position: 'relative'
          }}
        >

          {/* LEFT SIDE — GOLD TEXT */}
          <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
            <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <img
                src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
                alt="MUFATE G SACCO logo"
                style={{ height: isMobile ? '80px' : '100px' }}
              />
            </Box>

            <Typography className="feedback-modal-title">
              We’d Love to Hear from You
            </Typography>

            <Typography className="feedback-modal-text">
              Your feedback helps us improve our services and serve you better.
              Please share your thoughts or suggestions.  
              All responses are confidential and appreciated.
            </Typography>
          </Box>

          {/* RIGHT SIDE — FORM */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

            <TextField
              label="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ className: 'gold-label' }}
              InputProps={{ className: 'gold-input' }}
            />

            <TextField
              label="Subject"
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ className: 'gold-label' }}
              InputProps={{ className: 'gold-input' }}
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
              InputLabelProps={{ className: 'gold-label' }}
              InputProps={{ className: 'gold-input' }}
            />

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ color: '#000', mr: 1 }} />
                  SUBMITTING...
                </>
              ) : (
                'SUBMIT'
              )}
            </Button>
          </Box>

          {/* CLOSE ICON */}
          <IconButton
            onClick={() => setOpen(false)}
            className="feedback-close-btn"
            sx={{ position: 'absolute', top: 12, right: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FeedbackBanner;
