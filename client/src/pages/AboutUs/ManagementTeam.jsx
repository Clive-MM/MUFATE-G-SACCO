import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import Footer from '../../components/Footer';

const ManagementTeam = () => {
  const [managementList, setManagementList] = useState([]);

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/management/view')
      .then(response => setManagementList(response.data))
      .catch(error => console.error('Error fetching management data:', error));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  // Standardized Brand Colors to match Footer and BOD
  const COLORS = {
    gold: '#EC9B14',      // Matches BRAND.gold from Footer
    dark: '#02150F',      // Matches BRAND.dark from Footer
    textMuted: 'rgba(244, 244, 244, 0.6)', 
    light: '#F4F4F4',
  };

  return (
    <Box
      sx={{
        background: COLORS.dark,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // Responsive padding to push content below the navbar
        pt: { xs: 12, md: 18 }, 
        pb: 5,
      }}
    >
      {/* PAGE TITLE - Standardized Style */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 900,
          mb: 8,
          letterSpacing: '3px',
          color: COLORS.gold,
          textTransform: 'uppercase',
          fontSize: { xs: '1.5rem', md: '2.2rem' },
          textShadow: `0 0 15px ${COLORS.gold}33`,
        }}
      >
        MANAGEMENT TEAM
      </Typography>

      {/* TEAM GRID */}
      <Grid container spacing={4} justifyContent="center" px={4} sx={{ flexGrow: 1 }}>
        {managementList.map(member => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={member.MGTID} 
            data-aos="zoom-in"
          >
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                background: `rgba(255,255,255,0.03)`,
                border: `1px solid rgba(255,255,255,0.1)`,
                backdropFilter: "blur(8px)",
                transition: 'all 0.4s ease',
                height: '100%',
                "&:hover": {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 20px ${COLORS.gold}33`,
                  borderColor: COLORS.gold,
                },
              }}
            >
              {/* IMAGE */}
              <CardMedia
                component="img"
                height="380"
                image={member.ImageURL}
                alt={member.MGTName}
                sx={{ 
                    objectFit: 'cover',
                    objectPosition: "top",
                    filter: "brightness(0.9)",
                }}
              />

              {/* CONTENT */}
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                {/* NAME - Uniform Gold Style */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    color: COLORS.gold,
                    textTransform: 'uppercase',
                    mb: 1.5,
                    letterSpacing: 1,
                  }}
                >
                  {member.MGTName}
                </Typography>

                {/* DESIGNATION BADGE - Matches BOD Style */}
                <Typography
                  variant="body2"
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.8,
                    borderRadius: '4px',
                    background: COLORS.gold,
                    color: COLORS.dark, // Dark text for contrast
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {member.Designation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />
    </Box>
  );
};

export default ManagementTeam;