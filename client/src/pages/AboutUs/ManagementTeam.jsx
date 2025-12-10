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

  // BRAND COLORS
  const COLORS = {
    deepGreen: '#011407',
    deepGreen2: '#01240F',
    gold: '#FFD700',
    deepGold: '#E6C200',
    softGold: '#FFF4B5',
    textLight: '#F8F3D5',
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${COLORS.deepGreen}, ${COLORS.deepGreen2})`,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: 5,
      }}
    >
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 900,
          mb: 6,
          fontSize: { xs: '2rem', md: '2.6rem' },
          letterSpacing: 1.5,
          background: `linear-gradient(to right, ${COLORS.gold}, ${COLORS.softGold})`,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: `0 0 12px ${COLORS.gold}50`,
        }}
      >
        MANAGEMENT TEAM
      </Typography>

      {/* TEAM GRID */}
      <Grid container spacing={4} justifyContent="center" sx={{ px: { xs: 2, md: 6 } }}>
        {managementList.map(member => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.MGTID} data-aos="fade-up">
            <Card
              sx={{
                borderRadius: '18px',
                overflow: 'hidden',
                background: `rgba(1,20,10,0.78)`,
                border: `1.5px solid ${COLORS.gold}40`,
                boxShadow: `0 12px 35px rgba(0,0,0,0.45), 0 0 22px ${COLORS.gold}20`,
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 25px 45px rgba(0,0,0,0.6), 0 0 35px ${COLORS.gold}55`,
                  border: `1.5px solid ${COLORS.gold}`,
                },
              }}
            >
              {/* IMAGE */}
              <CardMedia
                component="img"
                height="360"
                image={member.ImageURL}
                alt={member.MGTName}
                sx={{ objectFit: 'cover' }}
              />

              {/* CONTENT */}
              <CardContent
                sx={{
                  textAlign: 'center',
                  py: 3,
                  color: COLORS.textLight,
                }}
              >
                {/* NAME */}
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    background: `linear-gradient(to right, ${COLORS.gold}, ${COLORS.softGold})`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2,
                  }}
                >
                  {member.MGTName}
                </Typography>

                {/* DESIGNATION */}
                <Typography
                  sx={{
                    display: 'inline-block',
                    px: 2.5,
                    py: 0.7,
                    borderRadius: '12px',
                    background: `rgba(255,215,0,0.12)`,
                    color: COLORS.softGold,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textShadow: `0 0 8px ${COLORS.gold}40`,
                    border: `1px solid ${COLORS.gold}40`,
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 10px rgba(0,0,0,0.35)`,
                    '&:hover': {
                      transform: 'scale(1.06)',
                      boxShadow: `0 0 15px ${COLORS.gold}70`,
                      background: COLORS.deepGold,
                      color: '#000',
                      borderColor: COLORS.gold,
                    },
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
