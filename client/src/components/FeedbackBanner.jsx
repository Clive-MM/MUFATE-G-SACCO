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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ForumIcon from '@mui/icons-material/Forum'; // Added for the button icon
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';

const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
};

const FeedbackBanner = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { enqueueSnackbar } = useSnackbar();

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
      const res = await axios.post('https://mufate-g-sacco.onrender.com/feedback', formData);
      enqueueSnackbar(res.data.message || "✅ Feedback submitted successfully!", { variant: 'success' });
      setOpen(false);
      setFormData({ Email: '', Subject: '', Message: '' });
    } catch (err) {
      enqueueSnackbar('❌ Failed to submit feedback.', { variant: 'error' });
    }
  };

  const textFieldStyles = {
    mb: 2,
    '& label': { color: 'rgba(255,255,255,0.6)' },
    '& label.Mui-focused': { color: BRAND.gold },
    '& .MuiOutlinedInput-root': {
      color: BRAND.light,
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px' },
      '&:hover fieldset': { borderColor: BRAND.gold },
      '&.Mui-focused fieldset': { borderColor: BRAND.gold },
      bgcolor: 'rgba(255,255,255,0.03)',
    },
  };

  return (
    <Box 
      sx={{ 
        bgcolor: BRAND.dark, 
        py: { xs: 6, md: 10 }, 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern Mimic */}
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.1,
        backgroundImage: `radial-gradient(${BRAND.gold} 0.5px, transparent 0.5px)`,
        backgroundSize: '20px 20px',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box 
            sx={{ 
              position: 'relative',
              textAlign: 'center',
              p: { xs: 4, md: 8 },
              borderRadius: '32px',
              border: `1px solid ${BRAND.gold}44`,
              background: `linear-gradient(145deg, rgba(2, 21, 15, 0.9) 0%, rgba(2, 35, 25, 0.4) 100%)`,
              backdropFilter: 'blur(10px)',
              // The "Golden Glow" from the image
              boxShadow: `0 0 40px ${BRAND.gold}15, inset 0 0 20px ${BRAND.gold}05`,
              overflow: 'hidden'
            }}
          >
            {/* Top Glowing Edge Accent */}
            <Box sx={{
              position: 'absolute',
              top: 0, left: '20%', right: '20%', height: '1px',
              background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
              boxShadow: `0 0 15px ${BRAND.gold}`
            }} />

            <Typography 
              variant="h2" 
              sx={{ 
                color: BRAND.gold, 
                fontWeight: 900, 
                textTransform: 'uppercase',
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                letterSpacing: '0.15rem',
                // Text shadow to mimic the image "glow"
                textShadow: `0 0 20px ${BRAND.gold}66`
              }}
            >
              We Value Your Feedback
            </Typography>

            <Typography 
              sx={{ 
                color: BRAND.light, 
                opacity: 0.9, 
                maxWidth: '750px', 
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: '1.15rem',
                mb: 5,
                fontWeight: 300
              }}
            >
              Your opinion matters to us! Help us serve you better by sharing your thoughts,
              suggestions, or experiences with <strong>GOLDEN GENERATION DT Sacco</strong>.
            </Typography>

            <Button 
              variant="contained"
              onClick={() => setOpen(true)}
              endIcon={<ForumIcon />}
              sx={{
                background: `linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.lightGold} 100%)`,
                color: BRAND.dark,
                fontWeight: 800,
                px: 5,
                py: 2,
                borderRadius: '16px', // Slightly squared like the button in the image
                fontSize: '1rem',
                letterSpacing: '0.1rem',
                boxShadow: `0 10px 30px ${BRAND.gold}44`,
                transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'scale(1.05) translateY(-5px)',
                  boxShadow: `0 15px 40px ${BRAND.gold}77`,
                  background: BRAND.lightGold,
                },
              }}
            >
              CLICK HERE TO SHARE
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* POPUP REMAINS THE SAME AS REQUESTED */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: '#011A13',
            color: BRAND.light,
            borderRadius: '28px',
            border: `1px solid ${BRAND.gold}33`,
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
          }
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
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
                Your feedback helps us improve our services. All responses are confidential and highly appreciated.
              </Typography>
            </Box>

            <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column' }}>
              <TextField label="Email" name="Email" value={formData.Email} onChange={handleChange} fullWidth sx={textFieldStyles} />
              <TextField label="Subject" name="Subject" value={formData.Subject} onChange={handleChange} fullWidth sx={textFieldStyles} />
              <TextField label="Message" name="Message" value={formData.Message} onChange={handleChange} multiline rows={4} fullWidth sx={textFieldStyles} />
              <Button onClick={handleSubmit} fullWidth sx={{ mt: 1, py: 1.5, borderRadius: '12px', backgroundColor: BRAND.gold, color: BRAND.dark, fontWeight: 700, '&:hover': { backgroundColor: BRAND.lightGold } }}>
                SUBMIT FEEDBACK
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FeedbackBanner;