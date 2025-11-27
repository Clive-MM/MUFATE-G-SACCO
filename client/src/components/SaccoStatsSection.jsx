import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import axios from 'axios';

import GroupsIcon from '@mui/icons-material/Groups';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Brand colors (matching Navbar)
const BRAND_DARK = '#02150F';
const BRAND_GOLD = '#EC9B14';
const BRAND_GOLD_SOFT = '#F7D27A';

const SaccoStatsSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/statistics')
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
    <CalendarTodayIcon
      sx={{
        fontSize: 40,
        color: BRAND_GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(236,155,20,0.9))',
      }}
    />,
    <GroupsIcon
      sx={{
        fontSize: 40,
        color: BRAND_GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(236,155,20,0.9))',
      }}
    />,
    <PhoneIphoneIcon
      sx={{
        fontSize: 40,
        color: BRAND_GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(236,155,20,0.9))',
      }}
    />,
    <LocationCityIcon
      sx={{
        fontSize: 40,
        color: BRAND_GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(236,155,20,0.9))',
      }}
    />,
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
        backgroundColor: BRAND_DARK,
        py: 10,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      {/* Section heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textAlign: 'center',
          mb: 1.5,
          fontSize: { xs: '1.9rem', md: '2.5rem' },
          backgroundImage: 'linear-gradient(to right, #FFF5CC, #EC9B14, #F7D27A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          textShadow: '0 0 18px rgba(0,0,0,0.7)',
        }}
      >
        Our Impact in Numbers
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          textAlign: 'center',
          mb: 6,
          color: BRAND_GOLD_SOFT,
          fontSize: { xs: '0.9rem', md: '1rem' },
          letterSpacing: 0.8,
          opacity: 0.9,
        }}
      >
        Golden Generation DT SACCO continues to grow with our members —
        in service, reach and digital convenience.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: BRAND_GOLD }} />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {statItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.06, y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.15 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    py: 4,
                    px: 2,
                    textAlign: 'center',
                    borderRadius: 4,
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(236,155,20,0.3)`,
                    boxShadow:
                      '0 18px 40px rgba(0,0,0,0.8), 0 0 20px rgba(236,155,20,0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow:
                        '0 22px 50px rgba(0,0,0,0.95), 0 0 30px rgba(236,155,20,0.45)',
                      borderColor: 'rgba(236,155,20,0.45)',
                    },
                  }}
                >
                  {iconMap[index]}

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: BRAND_GOLD,
                      fontSize: { xs: '2rem', md: '2.6rem' },
                      textShadow:
                        '0 0 10px rgba(236,155,20,1), 0 0 22px rgba(0,0,0,0.9)',
                      letterSpacing: 1,
                    }}
                  >
                    <CountUp
                      end={Number(item.value)}
                      duration={2}
                      separator=","
                      suffix="+"
                    />
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: BRAND_GOLD_SOFT,
                      mt: 1.5,
                      fontWeight: 600,
                      letterSpacing: 0.9,
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                    }}
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
