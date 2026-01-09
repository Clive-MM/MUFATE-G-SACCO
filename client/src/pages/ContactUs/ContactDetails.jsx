import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CircularProgress,
  Button, Stack, TextField, Container, IconButton, Tooltip, Skeleton,
  useMediaQuery, useTheme
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import {
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  ContentCopy as CopyIcon,
  MarkEmailRead as MailIcon,
  CheckCircle as SuccessIcon,
  VerifiedUser as ShieldIcon
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
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then(res => res.json())
      .then(data => { setBranches(data.branches || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // ✅ ONLY NEW LOGIC ADDED
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

      const data = await response.json();

      if (response.status === 201 || response.ok) {
        enqueueSnackbar(data.message || 'Message sent successfully!', { variant: 'success' });
        setSubmitted(true);
        setFormData({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        enqueueSnackbar(data.message || 'Failed to send message', { variant: 'error' });
      }
    } catch (err) {
      console.error("Submission error:", err);
      enqueueSnackbar('Server connection lost. Please check your internet.', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box sx={{ background: BRAND.dark, width: '100%', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* PROFESSIONAL BACKGROUND AMBIENCE */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${BRAND.gold}10 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        <Box sx={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${BRAND.gold}08 0%, transparent 70%)`, filter: 'blur(50px)' }} />
      </Box>

      <Container
        ref={scrollRef}
        maxWidth={false}
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ width: '100%', maxWidth: '1400px' }}
        >
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">

            {/* CARD 1: CONTACT */}
            <Grid item xs={12} md={6} lg={5} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography sx={megaInfoTitle}>Get in Touch</Typography>

                  <Stack spacing={3.5} sx={{ mt: 4, flexGrow: 1, justifyContent: 'space-between' }}>
                    <Box sx={infoIconBox}>
                      <MailIcon sx={iconStyle} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={infoLabel}>Postal Address</Typography>

                        {/* ✅ COPY ICON ADDED — NOTHING ELSE CHANGED */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography sx={infoValue}>P.O. BOX 221-50104 KHAYEGA</Typography>
                          <Tooltip title="Copy address">
                            <IconButton size="small" onClick={handleCopyAddress} sx={{ color: BRAND.gold }}>
                              <CopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
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
                  </Stack>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShieldIcon sx={{ color: BRAND.gold, fontSize: '1rem' }} />
                    <Typography sx={{ color: BRAND.textMuted, fontSize: '0.7rem' }}>Secure Communication Channel</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 2: BRANCHES */}
            <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={megaInfoTitle}>Our Branches</Typography>
                  <Box sx={scrollBoxStyle}>
                    {loading ? (
                      <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
                    ) : (
                      <Stack spacing={2.5}>
                        {branches.map((branch, idx) => (
                          <Box key={idx} sx={branchItemStyle}>
                            <Typography sx={{ color: BRAND.gold, fontWeight: 700, mb: 1, fontSize: '0.9rem' }}>
                              {branch.BranchName}
                            </Typography>

                            {/* ✅ LAZY-LOADED MAP (UNCHANGED) */}
                            <Box
                              component="iframe"
                              loading="lazy"
                              src={toEmbedMap(branch.Location)}
                              sx={mapStyle}
                            />
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 3: FORM */}
            <Grid item xs={12} lg={4} sx={{ display: 'flex' }}>
              <Card sx={professionalCardStyle}>
                <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={megaInfoTitle}>Send Message</Typography>
                  <Stack spacing={2.5} sx={{ mt: 3 }}>
                    <TextField label="Email" fullWidth required sx={megaInputStyle}
                      value={formData.Email}
                      onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                      error={formData.Email !== '' && !isEmailValid(formData.Email)}
                    />
                    <TextField label="Phone Number" fullWidth required sx={megaInputStyle}
                      value={formData.PhoneNumber}
                      onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
                    />
                    <TextField label="Subject" fullWidth required sx={megaInputStyle}
                      value={formData.Subject}
                      onChange={(e) => setFormData({ ...formData, Subject: e.target.value })}
                    />
                    <TextField label="Message" multiline rows={4} fullWidth required sx={megaInputStyle}
                      value={formData.Message}
                      onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
                    />
                    <Button type="submit" variant="contained" disabled={formLoading}
                      sx={{ ...refinedGlowBtn, ...(submitted && { background: BRAND.success }) }}
                      fullWidth
                    >
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

/* ================= STYLES (UNCHANGED) ================= */

const professionalCardStyle = {
  flexGrow: 1,
  background: 'rgba(2, 21, 15, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderTop: `2px solid ${BRAND.gold}`,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  transition: '0.4s all ease-in-out',
  '&:hover': { transform: 'translateY(-10px)', boxShadow: `0 30px 60px ${BRAND.gold}15` }
};

const megaInfoTitle = { color: BRAND.gold, fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' };

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused fieldset': { borderColor: BRAND.gold }
  },
  '& label': { color: 'rgba(255,255,255,0.4)' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const scrollBoxStyle = {
  flexGrow: 1,
  overflowY: 'auto',
  pr: 0.5,
  maxHeight: '500px',
  mt: 3,
  '&::-webkit-scrollbar': { width: '0px' },
  scrollbarWidth: 'none'
};

const linkHover = {
  color: BRAND.light,
  textDecoration: 'none',
  transition: '0.3s',
  '&:hover': { color: BRAND.gold, transform: 'translateX(5px)' }
};

const branchItemStyle = {
  background: 'rgba(255, 255, 255, 0.02)',
  p: 2,
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.05)'
};

const mapStyle = {
  width: '100%',
  height: '150px',
  border: 0,
  borderRadius: '12px',
  filter: 'grayscale(1) invert(90%)'
};

const infoIconBox = { display: 'flex', alignItems: 'center', gap: 2.5 };
const iconStyle = { color: BRAND.gold, fontSize: '2rem' };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: '0.95rem' };

const refinedGlowBtn = {
  background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '16px',
  py: 1.8,
  '&:hover': { transform: 'scale(1.02)', boxShadow: `0 10px 20px ${BRAND.gold}44` }
};

export default ContactDetails;
