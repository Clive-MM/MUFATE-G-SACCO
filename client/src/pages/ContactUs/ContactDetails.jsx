import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Facebook } from '@mui/icons-material';
import { X } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

/* Utility: convert normal Google Maps URL → embed URL */
const toEmbedMap = (url) => {
  if (!url) return '';
  if (url.includes('embed')) return url;
  return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
};

const ContactDetails = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://mufate-g-sacco.onrender.com/branches')
      .then((res) => res.json())
      .then((data) => {
        setBranches(data.branches || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, ${BRAND_DARK}, #03140D)`,
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 9 },
      }}
    >
      <Grid container spacing={4} alignItems="stretch">
        {/* ================= LEFT — BRANCH CARDS ================= */}
        <Grid item xs={12} md={8}>
          {loading ? (
            <CircularProgress sx={{ color: BRAND_GOLD }} />
          ) : (
            <Grid container spacing={3}>
              {branches.map((branch) => (
                <Grid item xs={12} md={6} key={branch.BranchID}>
                  <Card sx={branchCardStyle}>
                    <CardContent sx={{ height: '100%' }}>
                      <Typography sx={branchTitle}>
                        {branch.BranchName}
                      </Typography>

                      {/* MAP */}
                      <Box
                        component="iframe"
                        src={toEmbedMap(branch.GoogleMapURL)}
                        sx={mapStyle}
                        loading="lazy"
                      />

                      <Typography sx={branchText}>
                        <LocationOnIcon sx={iconStyle} />
                        {branch.Location}
                      </Typography>

                      <Typography sx={branchText}>
                        <PhoneIcon sx={iconStyle} />
                        {branch.ContactNumber}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* ================= RIGHT — INFO SQUARE CARDS ================= */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* CALL US */}
            <Grid item xs={12}>
              <Card sx={infoCardStyle}>
                <CardContent>
                  <Typography sx={infoTitle}>
                    <PhoneIcon sx={iconStyle} /> Call Us
                  </Typography>
                  <Typography sx={infoText}>+254 791 331 932</Typography>
                  <Typography sx={infoText}>+254 794 515 407</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* SOCIAL PLATFORMS */}
            <Grid item xs={12}>
              <Card sx={infoCardStyle}>
                <CardContent>
                  <Typography sx={infoTitle}>
                    Connect With Us
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <IconButton
                      component="a"
                      href="https://x.com/GMufate"
                      target="_blank"
                      sx={{ color: BRAND_GOLD }}
                    >
                      <X />
                    </IconButton>

                    <IconButton
                      component="a"
                      href="https://www.facebook.com/share/1CLhxfKxb2/"
                      target="_blank"
                      sx={{ color: BRAND_GOLD }}
                    >
                      <Facebook />
                    </IconButton>

                    <IconButton
                      component="a"
                      href="https://wa.me/254791331932?text=Hello%20Mufate%20G%20Sacco%2C%20I%20would%20like%20to%20inquire%20about%20..."
                      target="_blank"
                      sx={{ color: '#25D366' }}
                    >
                      <FaWhatsapp size={22} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* OFFICE HOURS */}
            <Grid item xs={12}>
              <Card sx={infoCardStyle}>
                <CardContent>
                  <Typography sx={infoTitle}>
                    <AccessTimeIcon sx={iconStyle} /> Office Hours
                  </Typography>
                  <Typography sx={infoText}>
                    Monday – Friday: 8:30 AM – 4:30 PM
                  </Typography>
                  <Typography sx={infoText}>
                    Saturday: 8:30 AM – 12:30 PM
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

/* ================= STYLES ================= */

const branchCardStyle = {
  background: 'rgba(255,255,255,0.04)',
  borderRadius: '20px',
  border: `1px solid ${BRAND_GOLD}40`,
  boxShadow: '0 0 25px rgba(236,155,20,0.25)',
  minHeight: 420,
};

const mapStyle = {
  width: '100%',
  height: 180,
  borderRadius: '12px',
  border: 0,
  mb: 2,
};

const branchTitle = {
  fontWeight: 800,
  color: BRAND_GOLD,
  mb: 1,
  textTransform: 'uppercase',
};

const branchText = {
  color: TEXT_LIGHT,
  display: 'flex',
  alignItems: 'center',
  mb: 1,
};

const infoCardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '20px',
  border: `1px solid ${BRAND_GOLD}40`,
  boxShadow: '0 0 22px rgba(236,155,20,0.25)',
  minHeight: 180,
};

const infoTitle = {
  fontWeight: 800,
  color: BRAND_GOLD,
  display: 'flex',
  alignItems: 'center',
};

const infoText = {
  color: TEXT_LIGHT,
  mt: 1,
};

const iconStyle = {
  fontSize: 18,
  mr: 1,
  color: BRAND_GOLD,
};

export default ContactDetails;
