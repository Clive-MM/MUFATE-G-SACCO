import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton,
  CircularProgress, Button, Stack, TextField, Container, Fab, Zoom
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Facebook, X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

const toEmbedMap = (location) => {
  const encoded = encodeURIComponent(location);
  return `https://maps.google.com/maps?q=${encoded}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const scrollRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, margin: "-100px" });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ Email: '', Subject: '', Message: '' });
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <Container 
      id="contact-section" 
      ref={scrollRef} 
      maxWidth={false} 
      sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 8 } }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <Grid container spacing={5} justifyContent="center">
          
          {/* COLUMN 1: BRANCHES */}
          <Grid item xs={12} lg={4} component={motion.div} variants={cardVariants} sx={{ display: 'flex' }}>
            <Stack spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress sx={{ color: BRAND_GOLD }} /></Box>
              ) : (
                branches.slice(0, 2).map((branch) => (
                  <Card sx={megaGlassCard} key={branch.BranchID}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography sx={megaBranchTitle}>OFFICIAL LOCATION</Typography>
                      <Typography sx={subTitleText}>{branch.BranchName}</Typography>
                      <Box component="iframe" src={toEmbedMap(branch.Location)} sx={megaMapStyle} />
                      <Stack spacing={2} sx={{ mt: 3 }}>
                        <Typography sx={megaBranchText}><PhoneIcon sx={megaIconStyle} /> {branch.ContactNumber}</Typography>
                        <Typography sx={megaBranchText}><LocationOnIcon sx={megaIconStyle} /> {branch.Location}</Typography>
                        <Button variant="outlined" endIcon={<ChevronRightIcon />} sx={megaDirectionsBtn} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.Location)}`} target="_blank">
                          Get Directions
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              )}
            </Stack>
          </Grid>

          {/* COLUMN 2: QUICK CONTACT */}
          <Grid item xs={12} lg={4} component={motion.div} variants={cardVariants} sx={{ display: 'flex' }}>
            <Stack spacing={4} sx={{ flexGrow: 1, width: '100%' }}>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={megaInfoTitle}><PhoneIcon sx={megaIconStyle} /> Call Center</Typography>
                  <Box sx={megaGoldDivider} />
                  <Typography sx={hugeInfoText}>+254 791 331 932</Typography>
                  <Typography sx={hugeInfoText}>+254 794 515 407</Typography>
                  <Box sx={{ mt: 6 }}>
                    <Typography sx={megaInfoTitle}><EmailIcon sx={megaIconStyle} /> Email Us</Typography>
                    <Box sx={megaGoldDivider} />
                    <Typography sx={hugeInfoText}>info@mudetesacco.co.ke</Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...megaGlassCard, flexGrow: 1 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={megaInfoTitle}><AccessTimeIcon sx={megaIconStyle} /> Business Hours</Typography>
                  <Box sx={megaGoldDivider} />
                  <Typography sx={hugeInfoText}>Mon – Fri: <b>8:30 AM – 4:30 PM</b></Typography>
                  <Typography sx={hugeInfoText}>Sat: <b>8:30 AM – 12:30 PM</b></Typography>
                  <Box sx={{ mt: 5, display: 'flex', gap: 2 }}>
                    <IconButton sx={megaSocialIcon}><X /></IconButton>
                    <IconButton sx={megaSocialIcon}><Facebook /></IconButton>
                    <IconButton sx={megaSocialIcon}><FaWhatsapp size={24} /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* COLUMN 3: FEEDBACK PORTAL */}
          <Grid item xs={12} lg={4} component={motion.div} variants={cardVariants} sx={{ display: 'flex' }}>
            <Card sx={{ ...megaGlassCard, flexGrow: 1, position: 'relative' }}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                    <CardContent component="form" onSubmit={handleFormSubmit} sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={megaInfoTitle}>Send a Message</Typography>
                        <VerifiedUserIcon sx={{ color: BRAND_GOLD, opacity: 0.5 }} />
                      </Box>
                      <Box sx={megaGoldDivider} />
                      <Stack spacing={3} sx={{ mt: 2, flexGrow: 1 }}>
                        <TextField label="Email Address" name="Email" fullWidth required value={formData.Email} onChange={handleFormChange} sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }} />
                        <TextField label="Subject" name="Subject" fullWidth required value={formData.Subject} onChange={handleFormChange} sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }} />
                        <TextField label="How can we help?" name="Message" multiline rows={10} fullWidth required value={formData.Message} onChange={handleFormChange} sx={megaInputStyle} InputLabelProps={{ sx: megaLabelStyle }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                          <Button type="submit" variant="contained" disabled={formLoading} sx={refinedGlowBtn}>
                            {formLoading ? <CircularProgress size={24} color="inherit" /> : 'SEND MESSAGE'}
                          </Button>
                        </Box>
                        <Typography sx={{ textAlign: 'center', color: TEXT_LIGHT, opacity: 0.4, fontSize: '0.8rem' }}>Kindly ensure your contact information is accurate.</Typography>
                      </Stack>
                    </CardContent>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 120, color: BRAND_GOLD, mb: 2 }} />
                      <Typography variant="h4" sx={{ color: BRAND_GOLD, fontWeight: 900, mb: 1 }}>SENT!</Typography>
                      <Typography sx={{ color: TEXT_LIGHT, opacity: 0.8 }}>We've received your feedback.</Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* FLOATING WHATSAPP BUTTON */}
      <Zoom in={true} style={{ transitionDelay: '1000ms' }}>
        <Fab 
          href="https://wa.me/254791331932" 
          target="_blank"
          sx={whatsappFabStyle}
        >
          <FaWhatsapp size={35} />
        </Fab>
      </Zoom>
    </Container>
  );
};

/* ================= STYLES ================= */

const megaGlassCard = {
  background: 'rgba(2, 21, 15, 0.92)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: `1px solid rgba(236, 155, 20, 0.25)`,
  boxShadow: '0 30px 70px rgba(0,0,0,0.8)',
  transition: 'all 0.4s ease',
  '&:hover': { transform: 'translateY(-10px)', borderColor: BRAND_GOLD }
};

const megaGoldDivider = { height: '3px', background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`, width: '80px', mb: 4, mt: 1 };

const megaInputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#FFF', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px',
    '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.15)' },
    '&.Mui-focused fieldset': { borderColor: BRAND_GOLD, borderWidth: '2px' },
  }
};

const megaLabelStyle = { color: 'rgba(255,255,255,0.4)' };

const refinedGlowBtn = {
  background: `linear-gradient(45deg, ${BRAND_GOLD}, #FFD700)`,
  color: BRAND_DARK, fontWeight: 900, borderRadius: '50px', px: 6, py: 1.8,
  boxShadow: `0 10px 30px ${BRAND_GOLD}44`,
  '&:hover': { transform: 'scale(1.05)', boxShadow: `0 15px 40px ${BRAND_GOLD}77` }
};

const whatsappFabStyle = {
  position: 'fixed', bottom: 40, right: 40,
  backgroundColor: '#25D366', color: '#FFF',
  width: 70, height: 70,
  '&:hover': { backgroundColor: '#128C7E', transform: 'scale(1.1) rotate(10deg)' },
  boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)' },
    '70%': { boxShadow: '0 0 0 20px rgba(37, 211, 102, 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' }
  }
};

const megaMapStyle = { width: '100%', height: '220px', borderRadius: '24px', border: 'none', mt: 2 };
const megaDirectionsBtn = { color: BRAND_GOLD, borderColor: BRAND_GOLD, borderRadius: '12px', mt: 2 };
const megaBranchTitle = { fontWeight: 900, color: BRAND_GOLD, fontSize: '0.8rem', letterSpacing: '3px' };
const subTitleText = { color: TEXT_LIGHT, fontWeight: 800, fontSize: '1.8rem', mb: 1 };
const megaBranchText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', gap: 2 };
const megaInfoTitle = { fontWeight: 800, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '1.6rem', gap: 2 };
const hugeInfoText = { color: TEXT_LIGHT, fontSize: '1.4rem', fontWeight: 600 };
const megaIconStyle = { fontSize: 30, color: BRAND_GOLD };
const megaSocialIcon = { color: BRAND_GOLD, border: `1px solid ${BRAND_GOLD}44`, '&:hover': { backgroundColor: BRAND_GOLD, color: BRAND_DARK } };

export default ContactDetails;