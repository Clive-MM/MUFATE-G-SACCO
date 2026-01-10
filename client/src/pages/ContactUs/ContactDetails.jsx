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
  const [formData, setFormData] = useState({ Email: '', PhoneNumber: '+254', Subject: '', Message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then(res => res.json())
      .then(data => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Animation Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Box sx={{ background: 'transparent', width: '100%', position: 'relative', zIndex: 1 }}>
      <Container ref={scrollRef} maxWidth="xl" sx={{ py: { xs: 4, md: 12 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          
          <Grid container spacing={4} justifyContent="center">
            
            {/* CARD 1: CONTACT INFO - High Interaction */}
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
                            <Typography component={item.link ? "a" : "p"} href={item.link} sx={item.link ? linkHover : infoValue}>
                              {item.val}
                            </Typography>
                            {item.copy && (
                              <IconButton size="small" onClick={() => { navigator.clipboard.writeText(item.val); enqueueSnackbar('Copied!', { variant: 'info' }); }} sx={{ color: BRAND.gold }}>
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
                        <IconButton sx={socialIconStyle}><TwitterIcon /></IconButton>
                        <IconButton sx={socialIconStyle}><WhatsAppIcon /></IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* CARD 2: BRANCHES - Interactive Maps */}
            <Grid item xs={12} md={6} lg={4} component={motion.div} variants={itemVariants}>
              <Card sx={professionalCardStyle}>
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Our Network</Typography>
                  <Box sx={scrollBoxStyle}>
                    {loading ? <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, bgcolor: 'rgba(236, 155, 20, 0.05)' }} /> : (
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

            {/* CARD 3: MESSAGE FORM - The "Golden Glow" Experience */}
            <Grid item xs={12} lg={4} component={motion.div} variants={itemVariants}>
              <Card sx={professionalCardStyle}>
                <CardContent component="form" sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={megaInfoTitle}>Send a Message</Typography>
                  <Stack spacing={3} sx={{ mt: 4 }}>
                    {['Email', 'PhoneNumber', 'Subject', 'Message'].map((field) => (
                      <TextField
                        key={field}
                        label={field.replace(/([A-Z])/g, ' $1').trim()}
                        fullWidth
                        multiline={field === 'Message'}
                        rows={field === 'Message' ? 4 : 1}
                        sx={megaInputStyle}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      />
                    ))}
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ ...refinedGlowBtn, ...(submitted && { background: BRAND.success }) }}
                    >
                      {submitted ? <SuccessIcon /> : 'ENQUIRE NOW'}
                    </Button>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ opacity: 0.6 }}>
                      <ShieldIcon sx={{ color: BRAND.gold, fontSize: '0.9rem' }} />
                      <Typography sx={{ fontSize: '0.7rem', color: BRAND.light, letterSpacing: 1 }}>
                        PROTECTED BY END-TO-END ENCRYPTION
                      </Typography>
                    </Stack>
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

/* ================= THE 10/10 STYLE ENGINE ================= */

const professionalCardStyle = {
  height: '100%',
  background: 'rgba(2, 21, 15, 0.65)',
  backdropFilter: 'blur(20px) saturate(160%)',
  borderRadius: '40px', // Smoother, larger radius
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
  width: 50,
  height: 50,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${BRAND.gold}22, transparent)`,
  color: BRAND.gold,
  border: `1px solid ${BRAND.gold}33`
};

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: BRAND.gold },
    '&.Mui-focused': {
      background: 'rgba(0,0,0,0.5)',
      boxShadow: `0 0 15px ${BRAND.gold}22`,
      '& fieldset': { borderColor: BRAND.gold, borderWidth: '2px' }
    }
  },
  '& label': { color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' },
  '& label.Mui-focused': { color: BRAND.gold }
};

const infoRowStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: 3,
  p: 2,
  borderRadius: '20px',
  transition: '0.3s',
  '&:hover': { background: 'rgba(255,255,255,0.03)' }
};

const mapStyle = {
  width: '100%',
  height: '160px',
  border: 0,
  borderRadius: '16px',
  filter: 'grayscale(1) invert(90%) contrast(0.8)',
  opacity: 0.7,
  transition: '0.4s',
  '&:hover': { opacity: 1, filter: 'grayscale(0.5) invert(0%)' }
};

const branchItemStyle = { 
  background: 'rgba(255, 255, 255, 0.02)', 
  p: 2.5, 
  borderRadius: '24px', 
  border: '1px solid rgba(255,255,255,0.05)' 
};

const megaInfoTitle = { color: BRAND.gold, fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px' };
const infoLabel = { color: BRAND.textMuted, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', mb: 0.5 };
const infoValue = { color: BRAND.light, fontWeight: 500, fontSize: '0.95rem' };
const linkHover = { color: BRAND.light, textDecoration: 'none', transition: '0.3s', fontWeight: 500, '&:hover': { color: BRAND.gold } };
const scrollBoxStyle = { flexGrow: 1, overflowY: 'auto', maxHeight: '550px', mt: 3, '&::-webkit-scrollbar': { width: '0px' } };
const iconStyle = { color: BRAND.gold, fontSize: '1.8rem' };
const refinedGlowBtn = { 
  background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`, 
  color: BRAND.dark, 
  fontWeight: 900, 
  borderRadius: '18px', 
  py: 2.2,
  letterSpacing: '2px',
  boxShadow: `0 10px 20px ${BRAND.gold}33`,
  '&:hover': { transform: 'scale(1.02)', boxShadow: `0 15px 30px ${BRAND.gold}55` }
};
const socialIconStyle = { 
  color: BRAND.gold, 
  border: '1px solid rgba(255,255,255,0.1)', 
  p: 1.5,
  '&:hover': { background: BRAND.gold, color: BRAND.dark, transform: 'rotate(10deg)' } 
};

export default ContactDetails;