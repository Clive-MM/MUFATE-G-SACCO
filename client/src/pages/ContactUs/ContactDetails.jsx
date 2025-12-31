import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton,
  CircularProgress, Button, Stack, TextField
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import { Facebook, X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

const toEmbedMap = (location) => {
  const encoded = encodeURIComponent(location);
  return `https://www.google.com/maps?q=${encoded}&output=embed`;
};

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Feedback Form State
  const [formData, setFormData] = useState({ Email: '', Subject: '', Message: '' });
  const [formLoading, setFormLoading] = useState(false);

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
        enqueueSnackbar('Feedback sent!', { variant: 'success' });
        setFormData({ Email: '', Subject: '', Message: '' });
      } else {
        enqueueSnackbar('Error sending feedback', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Submission failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Grid container spacing={3} alignItems="stretch">
        
        {/* COLUMN 1: Vertical Branches */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            {loading ? (
              <CircularProgress sx={{ color: BRAND_GOLD, mx: 'auto' }} />
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Card sx={glassCard} key={branch.BranchID}>
                  <CardContent>
                    <Typography sx={branchTitle}>
                      {branch.BranchName.includes('HQ') ? 'Head Office' : 'Branch Office'}: {branch.BranchName}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box component="iframe" src={toEmbedMap(branch.Location)} sx={mapStyle} title={branch.BranchName} />
                      <Box>
                        <Typography sx={branchText}><PhoneIcon sx={iconStyle} /> {branch.ContactNumber}</Typography>
                        <Typography sx={branchText}><LocationOnIcon sx={iconStyle} /> {branch.Location}</Typography>
                        <Button 
                          variant="outlined" endIcon={<ChevronRightIcon />} sx={directionsBtn}
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.Location)}`} target="_blank"
                        >
                          Get Directions
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Grid>

        {/* COLUMN 2: Vertical Contact Info (The Original Middle Content) */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={infoTitle}><PhoneIcon sx={iconStyle} /> Call Us</Typography>
                <Box sx={goldDivider} />
                <Typography sx={infoText}>+254 791 331 932</Typography>
                <Typography sx={infoText}>+254 794 515 407</Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography sx={infoTitle}><EmailIcon sx={iconStyle} /> Email Us</Typography>
                  <Box sx={goldDivider} />
                  <Typography sx={infoText}>info@mudetesacco.co.ke</Typography>
                  <Typography sx={{ color: TEXT_LIGHT, opacity: 0.6, fontSize: '12px' }}>Send us an email anytime.</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={infoTitle}><AccessTimeIcon sx={iconStyle} /> Office Hours</Typography>
                <Box sx={goldDivider} />
                <Typography sx={infoText}>Monday – Friday: <b>8:30 AM – 4:30 PM</b></Typography>
                <Typography sx={infoText}>Saturday: <b>8:30 AM – 12:30 PM</b></Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography sx={infoTitle}>Connect With Us</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <IconButton sx={socialIcon}><X /></IconButton>
                    <IconButton sx={socialIcon}><Facebook /></IconButton>
                    <IconButton sx={socialIcon}><FaWhatsapp /></IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* COLUMN 3: Feedback Form (The New Rectangular Card) */}
        <Grid item xs={12} md={4}>
          <Card sx={{ ...glassCard, height: '100%' }}>
            <CardContent component="form" onSubmit={handleFormSubmit}>
              <Typography sx={infoTitle}>Send Us a Message</Typography>
              <Box sx={goldDivider} />
              <Stack spacing={2.5} sx={{ mt: 2 }}>
                <TextField 
                  label="Email" name="Email" fullWidth required value={formData.Email} onChange={handleFormChange}
                  InputProps={{ sx: feedbackInput }} InputLabelProps={{ sx: feedbackLabel }}
                />
                <TextField 
                  label="Subject" name="Subject" fullWidth required value={formData.Subject} onChange={handleFormChange}
                  InputProps={{ sx: feedbackInput }} InputLabelProps={{ sx: feedbackLabel }}
                />
                <TextField 
                  label="Message" name="Message" multiline rows={6} fullWidth required value={formData.Message} onChange={handleFormChange}
                  InputProps={{ sx: feedbackInput }} InputLabelProps={{ sx: feedbackLabel }}
                />
                <Button
                  type="submit" variant="contained" disabled={formLoading}
                  endIcon={!formLoading && <SendIcon />} sx={feedbackSubmitBtn}
                >
                  {formLoading ? <CircularProgress size={24} /> : 'Submit Feedback'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

/* ================= STYLES ================= */

const glassCard = {
  background: 'rgba(2, 21, 15, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
};

const goldDivider = {
  height: '1px',
  background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`,
  width: '100%',
  mb: 2,
  opacity: 0.5
};

const feedbackInput = {
  background: 'rgba(255,255,255,0.9)',
  borderRadius: '12px',
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
};

const feedbackLabel = { color: '#02150F', fontWeight: 600 };

const feedbackSubmitBtn = {
  background: BRAND_GOLD,
  color: BRAND_DARK,
  fontWeight: 900,
  py: 1.5,
  borderRadius: '12px',
  '&:hover': { background: '#D48A12' }
};

const mapStyle = { width: '100%', height: '130px', borderRadius: '8px', border: `1px solid ${BRAND_GOLD}22` };
const directionsBtn = { color: BRAND_GOLD, borderColor: `${BRAND_GOLD}66`, textTransform: 'none', fontSize: '0.75rem', width: 'fit-content', mt: 1 };
const branchTitle = { fontWeight: 700, color: BRAND_GOLD, mb: 2, fontSize: '1rem' };
const branchText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.85rem' };
const infoTitle = { fontWeight: 600, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '1rem', mb: 0.5 };
const infoText = { color: TEXT_LIGHT, fontSize: '1rem', mb: 0.5 };
const iconStyle = { fontSize: 20, mr: 1.5, color: BRAND_GOLD };
const socialIcon = { color: BRAND_GOLD, border: `1px solid ${BRAND_GOLD}44`, '&:hover': { background: BRAND_GOLD, color: BRAND_DARK } };

export default ContactDetails;