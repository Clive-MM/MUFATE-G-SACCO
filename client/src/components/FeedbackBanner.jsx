import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './FeedbackBanner.css';

const FeedbackBanner = () => {
  return (
    <Box className="feedback-section">
      <Box className="feedback-wrapper">
        <Typography className="feedback-title">
          We Value Your Feedback
        </Typography>
        <Typography className="feedback-text">
          Your opinion matters to us! Help us serve you better by sharing your thoughts, suggestions, or experiences with Mufate "G" Sacco. Whether it’s a compliment, a concern, or an idea — we’re here to listen.
        </Typography>
        <Button
          className="feedback-button"
          component={RouterLink}
          to="/contact"
        >
          Click Here
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackBanner;
