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
  return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encoded}`;
};

const ContactDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ Email: '', Subject: '', Message: '' });

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
        enqueueSnackbar('Feedback sent successfully!', { variant: 'success' });
        setFormData({ Email: '', Subject: '', Message: '' });
      } else {
        enqueueSnackbar('Submission failed.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error sending feedback.', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 6 } }}>
      <Grid container spacing={4} alignItems="stretch">
        
        {/* LEFT COLUMN: BRANCHES */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            {loading ? (
              <CircularProgress sx={{ color: BRAND_GOLD, mx: 'auto' }} />
            ) : (
              branches.slice(0, 2).map((branch) => (
                <Card sx={glassCard} key={branch.BranchID}>
                  <CardContent>
                    <Typography sx={branchTitle}>{branch.BranchName}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Box component="iframe" src={toEmbedMap(branch.Location)} sx={mapStyle} />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={branchText}><PhoneIcon sx={iconStyle} /> {branch.ContactNumber}</Typography>
                        <Typography sx={branchText}><LocationOnIcon sx={iconStyle} /> {branch.Location}</Typography>
                        <Button variant="outlined" endIcon={<ChevronRightIcon />} sx={directionsBtn}>
                          Get Directions
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
            
            {/* QUICK CONTACTS (Moved below branches to balance height) */}
            <Card sx={glassCard}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography sx={infoTitle}><PhoneIcon sx={iconStyle} /> Call Us</Typography>
                  <Typography sx={infoText}>+254 791 331 932</Typography>
                </Box>
                <Box>
                  <Typography sx={infoTitle}><AccessTimeIcon sx={iconStyle} /> Hours</Typography>
                  <Typography sx={infoText}>Mon-Fri: 8:30AM - 4:30PM</Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* RIGHT COLUMN: FEEDBACK FORM (Occupying empty space) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ ...glassCard, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent component="form" onSubmit={handleFormSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography sx={{ ...branchTitle, mb: 1 }}>Send Us a Message</Typography>
              <Box sx={goldDivider} />
              
              <TextField
                label="Email Address"
                name="Email"
                type="email"
                fullWidth
                required
                value={formData.Email}
                onChange={handleFormChange}
                InputProps={{ sx: formInputStyle }}
                InputLabelProps={{ sx: formLabelStyle }}
              />
              <TextField
                label="Subject"
                name="Subject"
                fullWidth
                required
                value={formData.Subject}
                onChange={handleFormChange}
                InputProps={{ sx: formInputStyle }}
                InputLabelProps={{ sx: formLabelStyle }}
              />
              <TextField
                label="Message"
                name="Message"
                multiline
                rows={4}
                fullWidth
                required
                value={formData.Message}
                onChange={handleFormChange}
                InputProps={{ sx: formInputStyle }}
                InputLabelProps={{ sx: formLabelStyle }}
              />
              
              <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton sx={socialIcon}><X /></IconButton>
                  <IconButton sx={socialIcon}><Facebook /></IconButton>
                  <IconButton sx={socialIcon}><FaWhatsapp /></IconButton>
                </Box>
                
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formLoading}
                  endIcon={!formLoading && <SendIcon />}
                  sx={submitBtnStyle}
                >
                  {formLoading ? <CircularProgress size={20} /> : 'Submit'}
                </Button>
              </Box>
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
  mb: 1,
  opacity: 0.5
};

const formInputStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '10px',
  color: TEXT_LIGHT,
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(236, 155, 20, 0.2)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: BRAND_GOLD },
};

const formLabelStyle = { color: 'rgba(244, 244, 244, 0.6)' };

const submitBtnStyle = {
  background: BRAND_GOLD,
  color: BRAND_DARK,
  fontWeight: 700,
  px: 4,
  borderRadius: '10px',
  '&:hover': { background: '#D48A12' }
};

const mapStyle = { width: { xs: '100%', sm: '180px' }, height: '110px', borderRadius: '8px', border: 'none' };
const directionsBtn = { color: BRAND_GOLD, borderColor: `${BRAND_GOLD}66`, textTransform: 'none', mt: 1 };
const branchTitle = { fontWeight: 700, color: BRAND_GOLD, mb: 2, fontSize: '1.1rem' };
const branchText = { color: TEXT_LIGHT, display: 'flex', alignItems: 'center', mb: 1, fontSize: '0.9rem' };
const infoTitle = { fontWeight: 600, color: BRAND_GOLD, display: 'flex', alignItems: 'center', fontSize: '0.9rem', mb: 0.5 };
const infoText = { color: TEXT_LIGHT, fontSize: '0.85rem' };
const iconStyle = { fontSize: 18, mr: 1, color: BRAND_GOLD };
const socialIcon = { color: BRAND_GOLD, border: `1px solid ${BRAND_GOLD}44`, p: 0.5 };

export default ContactDetails;