import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './FeedbackBanner.css';

const FeedbackBanner = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Subject: '',
    Message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/feedback', formData);
      alert(res.data.message);
      setOpen(false);
    } catch (err) {
      alert('❌ Failed to submit feedback.');
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
        <Button
          className="feedback-button"
          onClick={() => setOpen(true)}
        >
          Click Here
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogContent sx={{ display: 'flex', gap: 4, p: 4, position: 'relative' }}>
          <Box sx={{ flex: 1 }}>
            <img
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
              alt="MUFATE G SACCO logo"
              style={{ height: '100px', objectFit: 'contain' }}
            />
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#003B2F' }}>
              We’d Love to Hear from You
            </Typography>
            <Typography sx={{ mt: 1, color: '#333', fontSize: '15px' }}>
              Your feedback helps us improve our services and serve you better. Please take a moment to share your thoughts, experiences, or suggestions with Mufate G Sacco. All responses are confidential and appreciated.
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Email" name="Email" value={formData.Email} onChange={handleChange} fullWidth />
            <TextField label="Subject" name="Subject" value={formData.Subject} onChange={handleChange} fullWidth />
            <TextField label="Message" name="Message" value={formData.Message} onChange={handleChange} multiline rows={4} fullWidth />
            <Button onClick={handleSubmit} sx={{ backgroundColor: '#003B2F', color: '#fff', '&:hover': { backgroundColor: '#2e7d32' } }}>
              SUBMIT
            </Button>
          </Box>

          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#fefefe',
              border: '1px solid #ddd',
              boxShadow: 1,
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
