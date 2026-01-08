import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress, 
  Button, Stack, TextField, Container, Fab, Zoom, Skeleton,
  useMediaQuery, useTheme, IconButton, Tooltip
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ContentCopy as CopyIcon,
  LocationOn as LocationOnIcon,
  MarkEmailRead as MailIcon
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

const toEmbedMap = (location) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Live Validation Helpers
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone) => phone.length >= 13;

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then(res => res.json())
      .then(data => { setBranches(data.branches || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar(`${label} copied!`, { variant: 'success', autoHideDuration: 2000 });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.status === 201) {
        setSubmitted(true);
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      enqueueSnackbar('Server connection failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box sx={{ background: BRAND.dark, width: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* BACKGROUND PARTICLE EFFECT */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.3 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 80, 0],
              y: [0, Math.random() * 80, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${BRAND.gold}15 0%, transparent 75%)`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
          />
        ))}
      </Box>

      <Container 
        ref={scrollRef} 
        maxWidth={false} 
        sx={{ 
          py: { xs: 4, md: 8 }, 
          px: { xs: 2, md: 4, lg: 6 }, 
          width: '100%', 
          maxWidth: '1920px', // Width expansion logic
          position: 'relative', 
          zIndex: 1 
        }}
      >
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Grid container spacing={3} alignItems="stretch">
            
            {/* COLUMN 1: CONTACT INFO (UPATED WITH NEW PHONE) */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Get in Touch</Typography>
                  <Stack spacing={4} sx={{ mt: 4 }}>
                    
                    <Box sx={infoIconBox}>
                      <MailIcon sx={iconStyle} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={infoLabel}>Postal Address</Typography>
                        <Typography sx={infoValue}>P.O. BOX 221-50104 KHAYEGA</Typography>
                      </Box>
                      <Tooltip title="Copy Address">
                        <IconButton onClick={() => handleCopy('P.O. BOX 221-50104 KHAYEGA', 'Address')} sx={{ color: BRAND.gold }}>
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box sx={infoIconBox}>
                      <PhoneIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Call Us</Typography>
                        <Stack spacing={0.5}>
                          <Typography component="a" href="tel:+254791331932" sx={{ ...infoValue, textDecoration: 'none', '&:hover': { color: BRAND.gold } }}>
                            +254 791 331 932
                          </Typography>
                          <Typography component="a" href="tel:+254794515407" sx={{ ...infoValue, textDecoration: 'none', '&:hover': { color: BRAND.gold } }}>
                            +254 794 515 407
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>

                    <Box sx={infoIconBox}>
                      <EmailIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Email Us</Typography>
                        <Typography component="a" href="mailto:info@mudetesacco.co.ke" sx={{ ...infoValue, textDecoration: 'none', '&:hover': { color: BRAND.gold } }}>
                          info@mudetesacco.co.ke
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={infoIconBox}>
                      <AccessTimeIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Working Hours</Typography>
                        <Typography sx={infoValue}>Mon - Fri: 8:00 AM - 5:00 PM</Typography>
                        <Typography sx={infoValue}>Sat: 8:00 AM - 12:00 PM</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* COLUMN 2: BRANCHES (SCROLLBAR HIDDEN) */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={megaInfoTitle}>Our Branches</Typography>
                  <Box sx={{ 
                    flexGrow: 1, overflowY: 'auto', pr: 0.5, maxHeight: '550px', mt: 2,
                    '&::-webkit-scrollbar': { width: '0px' }, // Hide scrollbar track
                    scrollbarWidth: 'none' 
                  }}>
                    {loading ? <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }} /> : (
                      <Stack spacing={2}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Typography sx={{ color: BRAND.gold, fontWeight: 700, mb: 1 }}>{branch.BranchName}</Typography>
                            <Box component="iframe" src={toEmbedMap(branch.Location)} sx={{ width: '100%', height: '160px', border: 0, borderRadius: '16px', filter: 'invert(90%) hue-rotate(180deg) opacity(0.8)' }} />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* COLUMN 3: FORM WITH LIVE VALIDATION */}
            <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Send Message</Typography>
                  <Stack spacing={2.5} sx={{ mt: 3 }}>
                    <TextField 
                      label="Email" fullWidth required sx={megaInputStyle} 
                      value={formData.Email} onChange={(e) => setFormData({...formData, Email: e.target.value})}
                      error={formData.Email !== '' && !isEmailValid(formData.Email)}
                      color={isEmailValid(formData.Email) ? "success" : "primary"}
                    />
                    <TextField 
                      label="Phone Number" fullWidth required sx={megaInputStyle} 
                      value={formData.PhoneNumber} onChange={(e) => setFormData({...formData, PhoneNumber: e.target.value})}
                      color={isPhoneValid(formData.PhoneNumber) ? "success" : "primary"}
                    />
                    <TextField label="Subject" fullWidth required sx={megaInputStyle} value={formData.Subject} onChange={(e) => setFormData({...formData, Subject: e.target.value})} />
                    <TextField label="Message" multiline rows={4} fullWidth required sx={megaInputStyle} value={formData.Message} onChange={(e) => setFormData({...formData, Message: e.target.value})} />
                    <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn} fullWidth>
                      {formLoading ? <CircularProgress size={24} color="inherit" /> : submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.95)',
  backdropFilter: 'blur(40px)',
  borderRadius: { xs: '24px', md: '40px' },
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': { transform: 'translateY(-10px)', borderColor: BRAND.gold, boxShadow: `0 0 40px ${BRAND.gold}22` }
};

const megaInfoTitle = { color: BRAND.gold, fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' };

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    transition: '0.3s all',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderWidth: '2px' }
  },
  '& label': { color: 'rgba(255,255,255,0.4)' }
};

const branchItemStyle = {
  background: 'rgba(255, 255, 255, 0.02)',
  padding: 2.5,
  borderRadius: '24px',
  border: '1px solid rgba(255,255,255,0.05)',
  transition: '0.3s all',
  '&:hover': { background: 'rgba(255, 255, 255, 0.05)' }
};

const infoIconBox = { display: 'flex', alignItems: 'center', gap: 3, p: 1, borderRadius: '12px', transition: '0.3s all', '&:hover': { background: 'rgba(255,255,255,0.02)' } };
const iconStyle = { color: BRAND.gold, fontSize: { xs: '2rem', md: '2.5rem' } };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', mb: 0.5 };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: { xs: '0.95rem', md: '1.1rem' } };

const refinedGlowBtn = {
  background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '20px',
  py: 2,
  boxShadow: `0 10px 30px ${BRAND.gold}44`,
  '&:hover': { transform: 'scale(1.02)', boxShadow: `0 15px 40px ${BRAND.gold}66` },
  '&.Mui-disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
};

export default ContactDetails;