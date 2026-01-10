import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress,
  Button, Stack, TextField, Container, IconButton, Tooltip, Skeleton,
  useTheme
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
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
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    Email: '',
    PhoneNumber: '+254',
    Subject: '',
    Message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

  const whatsappNumber = '254791331932';
  const whatsappMessage = encodeURIComponent('Hello 👋, thank you for contacting Golden Generation DT SACCO...');

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
        enqueueSnackbar('Message sent successfully!', { variant: 'success' });
        setSubmitted(true);
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      enqueueSnackbar('Connection error.', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box
      sx={{
        /* CHANGE: Background is now transparent so Parent image shows */
        background: 'transparent', 
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Container
        ref={scrollRef}
        maxWidth={false}
        sx={{
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ width: '100%', maxWidth: '1400px' }}
        >
          <Grid container spacing={4} justifyContent="center" alignItems="stretch">

            {/* CARD 1: CONTACT */}
            <Grid item xs={12} md={6} lg={5} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography sx={megaInfoTitle}>Get in Touch</Typography>
                  <Stack spacing={4} sx={{ mt: 4, flexGrow: 1 }}>
                    <Box sx={infoIconBox}>
                      <MailIcon sx={iconStyle} />
                      <Box>
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
                        <IconButton sx={socialIconStyle} component="a" href="https://x.com/GMufate" target="_blank"><TwitterIcon /></IconButton>
                        <IconButton sx={socialIconStyle} component="a" href={`https://wa.me/${whatsappNumber}`} target="_blank"><WhatsAppIcon /></IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 2: BRANCHES */}
            <Grid item xs={12} md={6} lg={3.5} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={megaInfoTitle}>Our Branches</Typography>
                  <Box sx={scrollBoxStyle}>
                    {loading ? <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }} /> : (
                      <Stack spacing={3}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Typography sx={{ color: BRAND.gold, fontWeight: 700, mb: 1 }}>{branch.BranchName}</Typography>
                            <Box component="iframe" src={toEmbedMap(branch.Location)} sx={mapStyle} />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 3: FORM */}
            <Grid item xs={12} lg={3.5} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={megaInfoTitle}>Send Message</Typography>
                  <Stack spacing={2.5} sx={{ mt: 3 }}>
                    <TextField label="Email" fullWidth required sx={megaInputStyle} value={formData.Email} onChange={(e) => setFormData({ ...formData, Email: e.target.value })} />
                    <TextField label="Phone Number" fullWidth required sx={megaInputStyle} value={formData.PhoneNumber} onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })} />
                    <TextField label="Subject" fullWidth required sx={megaInputStyle} value={formData.Subject} onChange={(e) => setFormData({ ...formData, Subject: e.target.value })} />
                    <TextField label="Message" multiline rows={4} fullWidth required sx={megaInputStyle} value={formData.Message} onChange={(e) => setFormData({ ...formData, Message: e.target.value })} />
                    <Button type="submit" variant="contained" disabled={formLoading} sx={{ ...refinedGlowBtn, ...(submitted && { background: BRAND.success }) }} fullWidth>
                      {formLoading ? <CircularProgress size={24} color="inherit" /> : submitted ? <SuccessIcon /> : 'SUBMIT ENQUIRY'}
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

/* ================= REFINED GLASS STYLES ================= */

const professionalCardStyle = {
  flexGrow: 1,
  background: 'rgba(2, 21, 15, 0.7)', // Reduced opacity to show image
  backdropFilter: 'blur(15px) saturate(160%)', // Premium glass blur
  borderRadius: '32px',
  border: `1px solid rgba(236, 155, 20, 0.2)`,
  borderTop: `4px solid ${BRAND.gold}`,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  transition: '0.4s all ease-in-out',
  '&:hover': { transform: 'translateY(-10px)', background: 'rgba(2, 21, 15, 0.8)' }
};

const megaInfoTitle = { color: BRAND.gold, fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' };

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(0,0,0,0.3)', // Darker inputs for contrast
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
  },
  '& label': { color: 'rgba(255,255,255,0.5)' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const scrollBoxStyle = { flexGrow: 1, overflowY: 'auto', maxHeight: '500px', mt: 3, '&::-webkit-scrollbar': { width: '0px' } };
const branchItemStyle = { background: 'rgba(255, 255, 255, 0.03)', p: 2, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' };
const mapStyle = { width: '100%', height: '140px', border: 0, borderRadius: '12px', filter: 'grayscale(1) invert(90%) opacity(0.7)' };
const infoIconBox = { display: 'flex', alignItems: 'center', gap: 2.5 };
const iconStyle = { color: BRAND.gold, fontSize: '2rem' };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: '0.95rem' };
const linkHover = { color: BRAND.light, textDecoration: 'none', transition: '0.3s', '&:hover': { color: BRAND.gold } };
const refinedGlowBtn = { background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`, color: BRAND.dark, fontWeight: 900, borderRadius: '16px', py: 1.8 };
const socialIconStyle = { color: BRAND.gold, border: '1px solid rgba(255,255,255,0.1)', transition: '0.3s ease', '&:hover': { background: BRAND.gold, color: BRAND.dark } };

export default ContactDetails;