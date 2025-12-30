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
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const TEXT_LIGHT = '#F4F4F4';

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
        py: { xs: 5, md: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* ================= LEFT SIDE — BRANCH CARDS ================= */}
        <Grid item xs={12} md={8}>
          {loading ? (
            <CircularProgress sx={{ color: BRAND_GOLD }} />
          ) : (
            <Grid container spacing={3}>
              {branches.map((branch) => (
                <Grid item xs={12} key={branch.BranchID}>
                  <Card
                    sx={{
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '18px',
                      border: `1px solid ${BRAND_GOLD}40`,
                      boxShadow: '0 0 25px rgba(236,155,20,0.25)',
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: BRAND_GOLD,
                          mb: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        {branch.BranchName}
                      </Typography>

                      {/* MAP */}
                      <Box
                        component="iframe"
                        src={branch.GoogleMapURL}
                        sx={{
                          width: '100%',
                          height: 200,
                          borderRadius: '12px',
                          border: 0,
                          mb: 2,
                        }}
                        loading="lazy"
                      />

                      <Typography sx={{ color: TEXT_LIGHT, mb: 1 }}>
                        <LocationOnIcon
                          sx={{ fontSize: 18, mr: 1, color: BRAND_GOLD }}
                        />
                        {branch.Location}
                      </Typography>

                      <Typography sx={{ color: TEXT_LIGHT }}>
                        <PhoneIcon
                          sx={{ fontSize: 18, mr: 1, color: BRAND_GOLD }}
                        />
                        {branch.ContactNumber}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* ================= RIGHT SIDE — 3 STACKED INFO CARDS ================= */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction="column">
            {/* CALL US */}
            <Grid item>
              <Card sx={infoCardStyle}>
                <CardContent>
                  <Typography sx={infoTitle}>
                    <PhoneIcon sx={infoIcon} /> Call Us
                  </Typography>
                  <Typography sx={infoText}>+254 791 331 932</Typography>
                  <Typography sx={infoText}>+254 794 515 407</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* EMAIL */}
            <Grid item>
              <Card sx={infoCardStyle}>
                <CardContent>
                  <Typography sx={infoTitle}>
                    <EmailIcon sx={infoIcon} /> Email Us
                  </Typography>
                  <Typography sx={infoText}>
                    info@mudetesacco.co.ke
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* OFFICE HOURS */}
            <Grid item>
              <Card sx={infoCardStyle}>
                <CardContent>
                  <Typography sx={infoTitle}>
                    <AccessTimeIcon sx={infoIcon} /> Office Hours
                  </Typography>
                  <Typography sx={infoText}>
                    Mon – Fri: 8:30 AM – 4:30 PM
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

/* ================= SHARED STYLES ================= */

const infoCardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '18px',
  border: `1px solid ${BRAND_GOLD}40`,
  boxShadow: '0 0 22px rgba(236,155,20,0.25)',
};

const infoTitle = {
  fontWeight: 800,
  color: BRAND_GOLD,
  display: 'flex',
  alignItems: 'center',
  mb: 1,
};

const infoIcon = {
  mr: 1,
  color: BRAND_GOLD,
};

const infoText = {
  color: TEXT_LIGHT,
  fontSize: '0.95rem',
};

export default ContactDetails;
