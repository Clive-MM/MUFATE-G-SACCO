import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import axios from 'axios';


import GroupsIcon from '@mui/icons-material/Groups';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SaccoStatsSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://mudetesacco.co.ke/backend/statistics') 
      .then((res) => {
        setStats(res.data.statistics);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching statistics:', err);
        setLoading(false);
      });
  }, []);

  const iconMap = [
    <CalendarTodayIcon sx={{ fontSize: 36, color: '#64dd17', mb: 1 }} />,
    <GroupsIcon sx={{ fontSize: 36, color: '#64dd17', mb: 1 }} />,
    <PhoneIphoneIcon sx={{ fontSize: 36, color: '#64dd17', mb: 1 }} />,
    <LocationCityIcon sx={{ fontSize: 36, color: '#64dd17', mb: 1 }} />,
  ];

  const statItems = stats
    ? [
        { label: 'Years of Service', value: stats.YearsOfService },
        { label: 'Active Members', value: stats.ActiveMembers },
        { label: 'Mobile Banking Users', value: stats.MobileBankingUsers },
        { label: 'Total Branches', value: stats.BranchCount },
      ]
    : [];

  return (
    <Box
      sx={{
        background: 'linear-gradient(160deg, #1a1a1a 0%, #121212 100%)',
        py: 10,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
     
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 6,
          fontSize: { xs: '1.8rem', md: '2.4rem' },
          background: 'linear-gradient(to right, #64dd17, #76ff03)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Our Impact in Numbers
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#64dd17' }} />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {statItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    py: 4,
                    px: 2,
                    textAlign: 'center',
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 3,
                    boxShadow: '0 0 30px rgba(100, 221, 23, 0.08)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(100, 221, 23, 0.3)',
                    },
                  }}
                >
                  {iconMap[index]}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: 'transparent',
                      fontSize: '2.5rem',
                      WebkitTextStroke: '1px #64dd17',
                      textShadow: '0 0 10px #64dd17',
                    }}
                  >
                    <CountUp end={Number(item.value)} duration={2} separator="," suffix="+" />
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#ccc', mt: 1 }}
                  >
                    {item.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SaccoStatsSection;
