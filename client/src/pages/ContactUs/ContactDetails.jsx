import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress,
  Button, Stack, TextField, Container, IconButton, Tooltip, Skeleton,
  useTheme, useMediaQuery
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
  MarkEmailRead as MailIcon
} from '@mui/icons-material';
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '+254',
    Subject: '',
    Message: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const whatsappNumber = '254791331932';
  const whatsappMessage = encodeURIComponent('Hello 👋, I am contacting Golden Generation DT SACCO regarding...');

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then(res => res.json())
      .then(data => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('P.O. BOX 221-50104 KHAYEGA');
    enqueueSnackbar('Postal address copied', { variant: 'success' });
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
      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
      } else {
        enqueueSnackbar('Failed to send message', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('Server connection lost.', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <Box sx={{ background: 'transparent', width: '100%', position: 'relative', zIndex: 1 }}>
      <Container 
        ref={scrollRef} 
        maxWidth={false} 
        sx={{ 
            py: { xs: 4, md: 8 }, 
            px: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ width: '100%', maxWidth: '1400px' }}
        >
          <Grid 
            container 
            spacing={3} 
            justifyContent="center" 
            alignItems={isMobile ? "flex-start" : "stretch"}
          >
            {/* CARD 1: CONTACT */}
            <Grid item xs={12} md={6} lg={5} component={motion.div} variants={itemVariants} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 2.5, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography sx={megaInfoTitle}>Get in Touch</Typography>
                  <Stack spacing={isMobile ? 2.5 : 3.5} sx={{ mt: 3, flexGrow: 1 }}>
                    <Box sx={infoIconBox}>
                      <MailIcon sx={iconStyle} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={infoLabel}>Postal Address</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography sx={infoValue}>P.O. BOX 221-50104 KHAYEGA</Typography>
                          <IconButton size="small" onClick={handleCopyAddress} sx={{ color: BRAND.gold }}><CopyIcon fontSize="small" /></IconButton>
                        </Stack>
                      </Box>
                    </Box>
                    <Box sx={infoIconBox}>
                      <PhoneIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Call Us</Typography>
                        <Typography component="a" href="tel:+254791331932" sx={linkHover}>+254 791 331 932</Typography>
                        <Typography component="a" href="tel:+254794515407" sx={{ ...linkHover, display: 'block' }}>+254 794 515 407</Typography>
                      </Box>
                    </Box>
                    <Box sx={infoIconBox}>
                      <EmailIcon sx={iconStyle} />
                      <Box>
                        <Typography sx={infoLabel}>Email Support</Typography>
                        <Typography component="a" href="mailto:info@mudetesacco.co.ke" sx={linkHover}>info@mudetesacco.co.ke</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={infoLabel}>Connect With Us</Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <IconButton component="a" href="https://x.com/GMufate" target="_blank" sx={socialIconStyle}><TwitterIcon /></IconButton>
                        <IconButton component="a" href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" sx={{ ...socialIconStyle, '&:hover': { background: BRAND.success, color: '#FFF' } }}><WhatsAppIcon /></IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 2: BRANCHES */}
            <Grid item xs={12} md={6} lg={3.5} component={motion.div} variants={itemVariants} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 2.5, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={megaInfoTitle}>Our Branches</Typography>
                  <Box sx={scrollBoxStyle}>
                    {loading ? <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }} /> : (
                      <Stack spacing={2}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Typography sx={{ color: BRAND.gold, fontWeight: 700, mb: 1, fontSize: '0.85rem' }}>{branch.BranchName}</Typography>
                            <Box component="iframe" loading="lazy" src={toEmbedMap(branch.Location)} sx={mapStyle} />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 3: FORM */}
            <Grid item xs={12} lg={3.5} component={motion.div} variants={itemVariants} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 2.5, md: 4 } }}>
                  <Typography sx={megaInfoTitle}>Send Message</Typography>
                  <Stack spacing={2} sx={{ mt: 3 }}>
                    <TextField label="Email" fullWidth required sx={megaInputStyle} value={formData.Email} onChange={(e) => setFormData({ ...formData, Email: e.target.value })} error={formData.Email !== '' && !isEmailValid(formData.Email)} />
                    <TextField label="Phone" fullWidth required sx={megaInputStyle} value={formData.PhoneNumber} onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })} />
                    <TextField label="Subject" fullWidth required sx={megaInputStyle} value={formData.Subject} onChange={(e) => setFormData({ ...formData, Subject: e.target.value })} />
                    <TextField label="Message" multiline rows={isMobile ? 3 : 4} fullWidth required sx={megaInputStyle} value={formData.Message} onChange={(e) => setFormData({ ...formData, Message: e.target.value })} />
                    <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn} fullWidth>
                      {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT ENQUIRY'}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </Box>
  );
};

/* ================= STYLES ================= */

const professionalCardStyle = {
  flexGrow: 1,
  width: '100%',
  background: 'rgba(2, 21, 15, 0.7)',
  backdropFilter: 'blur(20px) saturate(160%)',
  borderRadius: '32px',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderTop: `4px solid ${BRAND.gold}`,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  minHeight: { xs: 'auto', md: '620px' },
  transition: '0.4s all ease-in-out',
  '&:hover': { transform: { md: 'translateY(-10px)' }, background: 'rgba(2, 21, 15, 0.8)' }
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    fontSize: '0.9rem',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold, borderWidth: '2px' }
  },
  '& label': { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const mapStyle = {
  width: '100%', height: { xs: '120px', md: '140px' }, border: 0, borderRadius: '12px',
  filter: 'grayscale(1) invert(90%) opacity(0.6)', transition: '0.4s',
  '&:hover': { filter: 'grayscale(0.3) invert(0%)', opacity: 1 }
};

const socialIconStyle = {
  color: BRAND.gold, border: '1px solid rgba(255,255,255,0.1)',
  '&:hover': { color: BRAND.dark, background: BRAND.gold }
};

const refinedGlowBtn = {
  background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`,
  color: BRAND.dark, fontWeight: 900, borderRadius: '12px', py: { xs: 1.5, md: 1.8 },
  '&:hover': { boxShadow: `0 10px 20px ${BRAND.gold}44` }
};

const megaInfoTitle = { 
    color: BRAND.gold, 
    fontSize: { xs: '1.1rem', md: '1.4rem' }, 
    fontWeight: 900, 
    textTransform: 'uppercase', 
    letterSpacing: '1px' 
};

const infoIconBox = { display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2.5 } };
const iconStyle = { color: BRAND.gold, fontSize: { xs: '1.5rem', md: '2rem' } };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase' };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.95rem' } };
const linkHover = { color: BRAND.light, textDecoration: 'none', fontSize: { xs: '0.85rem', md: '0.95rem' }, '&:hover': { color: BRAND.gold } };
const scrollBoxStyle = { flexGrow: 1, overflowY: 'auto', maxHeight: { xs: '350px', md: '480px' }, mt: 2, pr: 1, '&::-webkit-scrollbar': { width: '3px' }, '&::-webkit-scrollbar-thumb': { background: BRAND.gold, borderRadius: '10px' } };
const branchItemStyle = { background: 'rgba(255, 255, 255, 0.02)', p: 1.5, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' };

// Success Modal remains the same
const SuccessModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} sx={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2, 21, 15, 0.9)', backdropFilter: 'blur(12px)', p: 3 }}>
        <Box component={motion.div} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} sx={{ maxWidth: 400, width: '100%', background: 'rgba(2, 21, 15, 0.95)', borderRadius: '32px', border: `1px solid ${BRAND.gold}33`, p: 5, textAlign: 'center' }}>
          <Box sx={{ width: 60, height: 60, borderRadius: '50%', background: BRAND.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}><SuccessIcon sx={{ color: BRAND.dark, fontSize: '2rem' }} /></Box>
          <Typography sx={{ color: BRAND.gold, fontWeight: 900, fontSize: '1.4rem', mb: 1 }}>SENT!</Typography>
          <Typography sx={{ color: BRAND.light, opacity: 0.8, fontSize: '0.9rem', mb: 4 }}>We have received your message and will respond shortly.</Typography>
          <Button onClick={onClose} variant="contained" fullWidth sx={refinedGlowBtn}>CLOSE</Button>
        </Box>
      </Box>
    )}
  </AnimatePresence>
);

export default ContactDetails;