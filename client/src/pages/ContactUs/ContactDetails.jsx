import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton,
  CircularProgress, Button, Stack, TextField, Container, Fab, Zoom, Skeleton, useMediaQuery, useTheme
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Phone as PhoneIcon, 
  AccessTime as AccessTimeIcon, 
  LocationOn as LocationOnIcon, 
  Email as EmailIcon, 
  ChevronRight as ChevronRightIcon, 
  CheckCircleOutline as CheckCircleOutlineIcon, 
  Lock as LockIcon,
  Facebook, X 
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

// Centralized Brand Tokens
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

const toEmbedMap = (location) => {
  const encoded = encodeURIComponent(location);
  return `https://maps.google.com/maps?q=${encoded}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  
  // Responsive Breakpoint Logic
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: "-100px" });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ Email: '', Phone: '+254', Subject: '', Message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.Phone.length < 13) {
      enqueueSnackbar('Please use +254 format', { variant: 'warning' });
      return;
    }
    setFormLoading(true);
    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
      }
    } catch (error) {
      enqueueSnackbar('Submission failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Container 
      id="contact-section" 
      ref={scrollRef} 
      maxWidth="xl" 
      sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}
    >
      <motion.div 
        initial="hidden" 
        animate={isInView ? "visible" : "hidden"} 
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <Grid container spacing={4} justifyContent="center">
          
          {/* COLUMN 1: BRANCH LOCATIONS */}
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              {loading ? (
                [1, 2].map((i) => (
                  <Skeleton key={i} variant="rectangular" height={420} sx={skeletonStyle} />
                ))
              ) : (
                branches.slice(0, 2).map((branch) => (
                  <Card sx={megaGlassCard} key={branch.BranchID} component={motion.div} variants={cardFadeUp}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography sx={megaBranchTitle}>BRANCH LOCATION</Typography>
                      <Typography sx={subTitleText}>{branch.BranchName}</Typography>
                      <Box component="iframe" src={toEmbedMap(branch.Location)} sx={megaMapStyle} title={branch.BranchName} />
                      <Stack spacing={2} sx={{ mt: 3 }}>
                        <Typography sx={megaBranchText}><PhoneIcon sx={megaIconStyle} /> {branch.ContactNumber}</Typography>
                        <Typography sx={megaBranchText}><LocationOnIcon sx={megaIconStyle} /> {branch.Location}</Typography>
                        <Button 
                          variant="outlined" 
                          endIcon={<ChevronRightIcon />} 
                          sx={megaDirectionsBtn} 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.Location)}`} 
                          target="_blank"
                        >
                          Get Directions
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              )}
            </Stack>
          </Grid>

          {/* COLUMN 2: QUICK CONTACT & HOURS */}
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={4} sx={{ height: '100%' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }} component={motion.div} variants={cardFadeUp}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={megaInfoTitle}><PhoneIcon sx={megaIconStyle} /> Call Center</Typography>
                  <Box sx={megaGoldDivider} />
                  <Typography sx={hugeInfoText}>+254 791 331 932</Typography>
                  <Typography sx={hugeInfoText}>+254 794 515 407</Typography>
                  <Box sx={{ mt: 4 }}>
                    <Typography sx={megaInfoTitle}><EmailIcon sx={megaIconStyle} /> Email Us</Typography>
                    <Box sx={megaGoldDivider} />
                    <Typography sx={hugeInfoText}>info@mudetesacco.co.ke</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ ...megaGlassCard, flexGrow: 1 }} component={motion.div} variants={cardFadeUp}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={megaInfoTitle}><AccessTimeIcon sx={megaIconStyle} /> Business Hours</Typography>
                  <Box sx={megaGoldDivider} />
                  <Typography sx={hugeInfoText}>Mon – Fri: <b>8:30 AM – 4:30 PM</b></Typography>
                  <Typography sx={hugeInfoText}>Sat: <b>8:30 AM – 12:30 PM</b></Typography>
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <IconButton sx={megaSocialIcon} aria-label="Follow us on X"><X /></IconButton>
                    <IconButton sx={megaSocialIcon} aria-label="Follow us on Facebook"><Facebook /></IconButton>
                    <IconButton sx={megaSocialIcon} aria-label="Chat with us on WhatsApp"><FaWhatsapp size={24} /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* COLUMN 3: FEEDBACK PORTAL (Full width on Tablet, 1/3 on Desktop) */}
          <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
            <Card sx={{ ...megaGlassCard, flexGrow: 1, position: 'relative', minHeight: '600px' }} component={motion.div} variants={cardFadeUp}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                    <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={megaInfoTitle}>Send Us a Message</Typography>
                      <Box sx={megaGoldDivider} />
                      
                      <Stack spacing={2.5} sx={{ mt: 1, flexGrow: 1 }}>
                        <TextField 
                          label="Email Address" name="Email" fullWidth required 
                          value={formData.Email} onChange={handleFormChange} 
                          sx={megaInputStyle} helperText="We respond within 24 hours"
                          FormHelperTextProps={{ sx: { color: BRAND.textMuted } }}
                        />
                        <TextField 
                          label="Phone Number" name="Phone" fullWidth required 
                          value={formData.Phone} onChange={handleFormChange} 
                          sx={megaInputStyle} helperText="Format: +254..."
                          FormHelperTextProps={{ sx: { color: BRAND.textMuted } }}
                        />
                        <TextField 
                          label="Message" name="Message" multiline rows={isMobile ? 4 : 6} 
                          fullWidth required value={formData.Message} 
                          onChange={handleFormChange} sx={megaInputStyle} 
                        />
                        
                        <Box sx={{ pt: 2 }}>
                          <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn} fullWidth>
                            {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                          </Button>
                          
                          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 2, opacity: 0.7 }}>
                            <LockIcon sx={{ fontSize: 16, color: BRAND.success }} />
                            <Typography sx={{ color: BRAND.light, fontSize: '0.75rem' }}>
                              Confidential & Secure
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: BRAND.gold, mb: 2 }} />
                      <Typography variant="h4" sx={{ color: BRAND.gold, fontWeight: 900, mb: 1 }}>SENT!</Typography>
                      <Typography sx={{ color: BRAND.light, opacity: 0.8 }}>Thank you for reaching out.</Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* FLOATING WHATSAPP */}
      <Zoom in={true} style={{ transitionDelay: '1000ms' }}>
        <Fab 
          href="https://wa.me/254791331932" 
          target="_blank"
          sx={whatsappFabStyle}
          aria-label="WhatsApp Support"
        >
          <FaWhatsapp size={35} />
        </Fab>
      </Zoom>
    </Container>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.94)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: `1px solid rgba(236, 155, 20, 0.2)`,
  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease',
  willChange: 'transform',
  '&:hover': { 
    transform: 'translateY(-8px)', 
    borderColor: BRAND.gold,
    boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 20px ${BRAND.gold}22`
  }
};

const skeletonStyle = {
  bgcolor: 'rgba(255,255,255,0.05)',
  borderRadius: '32px',
  mb: 3
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const megaGoldDivider = { 
  height: '3px', 
  background: `linear-gradient(90deg, ${BRAND.gold}, transparent)`, 
  width: '60px', 
  mb: 3, 
  mt: 1 
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF', 
    background: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(236, 155, 20, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
};

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND.gold}, #F4D03F)`,
  color: BRAND.dark, 
  fontWeight: 900, 
  borderRadius: '16px', 
  py: 2,
  boxShadow: `0 10px 25px ${BRAND.gold}33`,
  '&:hover': { 
    background: '#F4D03F',
    boxShadow: `0 15px 35px ${BRAND.gold}55` 
  }
};

const whatsappFabStyle = {
  position: 'fixed', bottom: { xs: 20, md: 40 }, right: { xs: 20, md: 40 },
  backgroundColor: '#25D366', color: '#FFF',
  width: { xs: 60, md: 75 }, height: { xs: 60, md: 75 },
  '&:hover': { backgroundColor: '#128C7E', transform: 'scale(1.1)' },
  zIndex: 1000
};

const megaMapStyle = { 
  width: '100%', height: '200px', borderRadius: '20px', 
  border: '1px solid rgba(255,255,255,0.1)', mt: 2 
};

const megaDirectionsBtn = { 
  color: BRAND.gold, borderColor: 'rgba(236, 155, 20, 0.4)', 
  borderRadius: '12px', textTransform: 'none', fontWeight: 700 
};

const megaBranchTitle = { fontWeight: 900, color: BRAND.gold, fontSize: '0.75rem', letterSpacing: '2px' };
const subTitleText = { color: BRAND.light, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' }, mb: 1 };
const megaBranchText = { color: BRAND.light, display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '0.95rem' };
const megaInfoTitle = { fontWeight: 800, color: BRAND.gold, display: 'flex', alignItems: 'center', fontSize: '1.4rem', gap: 1.5 };
const hugeInfoText = { color: BRAND.light, fontSize: '1.2rem', fontWeight: 600, mb: 0.5 };
const megaIconStyle = { fontSize: 24, color: BRAND.gold };
const megaSocialIcon = { 
  color: BRAND.gold, 
  border: `1px solid rgba(236, 155, 20, 0.3)`, 
  '&:hover': { backgroundColor: BRAND.gold, color: BRAND.dark } 
};

export default ContactDetails;