import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress,
  Button, Stack, TextField, Container, IconButton, Tooltip, Skeleton
} from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  ContentCopy as CopyIcon,
  CheckCircle as SuccessIcon,
  VerifiedUser as ShieldIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  MarkEmailRead as MailIcon,
  LocationOn as MapPinIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

// BRAND CONSTANTS
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
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  // STATES
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({ 
    Email: '', 
    PhoneNumber: '+254', 
    Subject: '', 
    Message: '' 
  });
  const [formLoading, setFormLoading] = useState(false);

  // FETCH BRANCHES
  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then(res => res.json())
      .then(data => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // SUBMISSION HANDLER
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccessModal(true); 
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
      } else {
        enqueueSnackbar('Failed to send message. Please try again.', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Server connection lost. Please check your internet.', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  // ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <Box sx={{ background: 'transparent', width: '100%', position: 'relative', zIndex: 1 }}>
      <Container ref={scrollRef} maxWidth="xl" sx={{ py: { xs: 4, md: 12 } }}>
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={4} justifyContent="center">
            
            {/* CARD 1: CONTACT INFO */}
            <Grid item xs={12} md={6} lg={4} component={motion.div} variants={itemVariants}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Connect Directly</Typography>
                  <Stack spacing={4} sx={{ mt: 5 }}>
                    {[
                      { icon: <MailIcon />, label: 'Postal', val: 'P.O. BOX 221-50104 KHAYEGA', copy: true },
                      { icon: <PhoneIcon />, label: 'Call Us', val: '+254 791 331 932', link: 'tel:+254791331932' },
                      { icon: <EmailIcon />, label: 'Email', val: 'info@mudetesacco.co.ke', link: 'mailto:info@mudetesacco.co.ke' }
                    ].map((item, i) => (
                      <Box key={i} sx={infoRowStyle}>
                        <Box sx={iconWrapperStyle}>{item.icon}</Box>
                        <Box>
                          <Typography sx={infoLabel}>{item.label}</Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography 
                              component={item.link ? "a" : "p"} 
                              href={item.link} 
                              sx={item.link ? linkHover : infoValue}
                            >
                              {item.val}
                            </Typography>
                            {item.copy && (
                              <IconButton 
                                size="small" 
                                onClick={() => { 
                                  navigator.clipboard.writeText(item.val); 
                                  enqueueSnackbar('Copied to clipboard!', { variant: 'info' }); 
                                }} 
                                sx={{ color: BRAND.gold }}
                              >
                                <CopyIcon fontSize="inherit" />
                              </IconButton>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    ))}
                    
                    <Box sx={{ pt: 2 }}>
                      <Typography sx={infoLabel}>Social Presence</Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <IconButton sx={socialIconStyle} component="a" href="https://x.com/GMufate" target="_blank">
                          <TwitterIcon />
                        </IconButton>
                        <IconButton sx={socialIconStyle} component="a" href="https://wa.me/254791331932" target="_blank">
                          <WhatsAppIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 2: BRANCHES */}
            <Grid item xs={12} md={6} lg={4} component={motion.div} variants={itemVariants}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Our Network</Typography>
                  <Box sx={scrollBoxStyle}>
                    {loading ? (
                      <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, bgcolor: 'rgba(236, 155, 20, 0.05)' }} />
                    ) : (
                      <Stack spacing={3}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                              <MapPinIcon sx={{ color: BRAND.gold, fontSize: '1rem' }} />
                              <Typography sx={{ color: BRAND.gold, fontWeight: 900, textTransform: 'uppercase', fontSize: '0.85rem' }}>
                                {branch.BranchName}
                              </Typography>
                            </Stack>
                            <Box component="iframe" src={toEmbedMap(branch.Location)} sx={mapStyle} />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 3: MESSAGE FORM */}
            <Grid item xs={12} lg={4} component={motion.div} variants={itemVariants}>
              <Card sx={professionalCardStyle}>
                <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Send a Message</Typography>
                  <Stack spacing={3} sx={{ mt: 4 }}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      required
                      sx={megaInputStyle}
                      value={formData.Email}
                      onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                    />
                    <TextField
                      label="Phone Number"
                      fullWidth
                      required
                      sx={megaInputStyle}
                      value={formData.PhoneNumber}
                      onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
                    />
                    <TextField
                      label="Subject"
                      fullWidth
                      required
                      sx={megaInputStyle}
                      value={formData.Subject}
                      onChange={(e) => setFormData({ ...formData, Subject: e.target.value })}
                    />
                    <TextField
                      label="How can we help?"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      sx={megaInputStyle}
                      value={formData.Message}
                      onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={formLoading}
                      sx={refinedGlowBtn}
                    >
                      {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT ENQUIRY'}
                    </Button>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ opacity: 0.6 }}>
                      <ShieldIcon sx={{ color: BRAND.gold, fontSize: '0.9rem' }} />
                      <Typography sx={{ fontSize: '0.7rem', color: BRAND.light, letterSpacing: 1 }}>
                        SECURE ENCRYPTED CHANNEL
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </motion.div>
      </Container>

      {/* THE FINAL TOUCH: SUCCESS MODAL */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </Box>
  );
};

// --- SUCCESS MODAL COMPONENT ---
const SuccessModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(2, 21, 15, 0.85)',
          backdropFilter: 'blur(12px)',
          p: 3
        }}
      >
        <Box
          component={motion.div}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          sx={{
            maxWidth: 480,
            width: '100%',
            background: 'rgba(2, 21, 15, 0.98)',
            borderRadius: '40px',
            border: `1px solid ${BRAND.gold}33`,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            boxShadow: `0 0 80px ${BRAND.gold}15`
          }}
        >
          <Box sx={modalIconContainer}>
            <SuccessIcon sx={{ color: BRAND.dark, fontSize: '3rem' }} />
          </Box>
          
          <Typography sx={{ color: BRAND.gold, fontWeight: 900, fontSize: '1.8rem', mb: 2, letterSpacing: 1 }}>
            MESSAGE RECEIVED
          </Typography>
          
          <Typography sx={{ color: BRAND.light, opacity: 0.8, lineHeight: 1.8, mb: 4 }}>
            Thank you for reaching out to **Golden Generation DT SACCO**. 
            One of our relationship managers will review your enquiry and contact you shortly.
          </Typography>

          <Button onClick={onClose} variant="contained" fullWidth sx={refinedGlowBtn}>
            RETURN TO PAGE
          </Button>
        </Box>
      </Box>
    )}
  </AnimatePresence>
);

// --- STYLES ---

const professionalCardStyle = {
  height: '100%',
  background: 'rgba(2, 21, 15, 0.65)',
  backdropFilter: 'blur(25px) saturate(170%)',
  borderRadius: '40px',
  border: '1px solid rgba(236, 155, 20, 0.15)',
  borderTop: `4px solid ${BRAND.gold}`,
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    background: 'rgba(2, 21, 15, 0.8)',
    boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 20px ${BRAND.gold}15`,
    border: `1px solid ${BRAND.gold}44`,
  }
};

const iconWrapperStyle = {
  width: 54, height: 54, borderRadius: '18px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: `linear-gradient(135deg, ${BRAND.gold}22, transparent)`,
  color: BRAND.gold, border: `1px solid ${BRAND.gold}33`
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(0,0,0,0.4)',
    borderRadius: '20px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused': {
      background: 'rgba(0,0,0,0.6)',
      '& fieldset': { borderColor: BRAND.gold, borderWidth: '2px' }
    }
  },
  '& label': { color: 'rgba(255,255,255,0.4)' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const infoRowStyle = { 
  display: 'flex', alignItems: 'center', gap: 3, p: 2, borderRadius: '24px',
  transition: '0.3s', '&:hover': { background: 'rgba(255,255,255,0.04)' }
};

const mapStyle = {
  width: '100%', height: '160px', border: 0, borderRadius: '18px',
  filter: 'grayscale(1) invert(90%) contrast(0.8)',
  opacity: 0.7, transition: '0.4s',
  '&:hover': { opacity: 1, filter: 'grayscale(0.2) invert(0%)' }
};

const modalIconContainer = {
  width: 90, height: 90, borderRadius: '50%',
  background: BRAND.gold, display: 'flex', alignItems: 'center',
  justifyContent: 'center', mx: 'auto', mb: 4,
  boxShadow: `0 0 40px ${BRAND.gold}55`
};

const refinedGlowBtn = { 
  background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`, 
  color: BRAND.dark, fontWeight: 900, borderRadius: '20px', py: 2.2,
  letterSpacing: '2px', boxShadow: `0 10px 25px ${BRAND.gold}33`,
  '&:hover': { transform: 'scale(1.02)', boxShadow: `0 15px 35px ${BRAND.gold}55` }
};

const megaInfoTitle = { color: BRAND.gold, fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px' };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', mb: 0.5 };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: '0.95rem' };
const linkHover = { color: BRAND.light, textDecoration: 'none', transition: '0.3s', '&:hover': { color: BRAND.gold } };
const scrollBoxStyle = { flexGrow: 1, overflowY: 'auto', maxHeight: '550px', mt: 3, '&::-webkit-scrollbar': { width: '0px' } };
const branchItemStyle = { background: 'rgba(255, 255, 255, 0.02)', p: 2.5, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' };
const socialIconStyle = { 
  color: BRAND.gold, border: '1px solid rgba(255,255,255,0.1)', p: 1.5,
  '&:hover': { background: BRAND.gold, color: BRAND.dark, transform: 'rotate(8deg)' } 
};

export default ContactDetails;