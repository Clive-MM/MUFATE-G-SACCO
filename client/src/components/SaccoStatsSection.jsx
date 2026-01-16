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

// Brand colors – same as AboutSection
const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
// const DEEP_GREEN = '#006400';
const DARK_BG = 'linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)';

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
        fontSize: 42,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.9))',
      }}
    />,
    <GroupsIcon
      sx={{
        fontSize: 42,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.9))',
      }}
    />,
    <PhoneIphoneIcon
      sx={{
        fontSize: 42,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.9))',
      }}
    />,
    <LocationCityIcon
      sx={{
        fontSize: 42,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.9))',
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
        background: DARK_BG, // same as AboutSection
        py: 10,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      {/* Heading block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textAlign: 'center',
            mb: 1.5,
            fontSize: { xs: '1.9rem', md: '2.5rem' },
            backgroundImage: 'linear-gradient(to right, #FFD700, #FFE066)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            textShadow: '0 0 18px rgba(0,0,0,0.8)',
          }}
        >
          Our Impact in Numbers
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            textAlign: 'center',
            mb: 3,
            color: '#f3f3f3',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            letterSpacing: 0.6,
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          Golden Generation DT SACCO continues to grow with our members —
          in service, reach and digital convenience.
        </Typography>

        {/* NOTE: gold underline removed as requested */}
      </motion.div>

      {/* Content: loader or stats */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: GOLD }} />
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
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    py: 4,
                    px: 2.5,
                    textAlign: 'center',
                    borderRadius: 5,
                    backdropFilter: 'blur(18px)',
                    background:
                      'linear-gradient(145deg, rgba(0,0,0,0.8), rgba(1,40,18,0.9))',
                    border: '1px solid rgba(255,215,0,0.28)',
                    boxShadow:
                      '0 26px 70px rgba(0,0,0,0.85), 0 0 26px rgba(255,215,0,0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: 'rgba(255,215,0,0.55)',
                      boxShadow:
                        '0 30px 80px rgba(0,0,0,0.95), 0 0 32px rgba(255,215,0,0.45)',
                      background:
                        'linear-gradient(145deg, rgba(1,55,22,0.95), rgba(0,0,0,0.9))',
                    },
                  }}
                >
                  {/* Icon */}
                  {iconMap[index]}

                  {/* Number */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: GOLD,
                      fontSize: { xs: '2.1rem', md: '2.7rem' },
                      textShadow:
                        '0 0 12px rgba(255,215,0,1), 0 0 26px rgba(0,0,0,0.9)',
                      letterSpacing: 1,
                      mb: 1,
                    }}
                  >
                    <CountUp
                      end={Number(item.value)}
                      duration={2}
                      separator=","
                      suffix="+"
                    />
                  </Typography>

                  {/* Label */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: LIGHT_GOLD,
                      mt: 0.5,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.8rem', md: '0.95rem' },
                    }}
                  >
                    {item.label}
                  </Typography>

                  {/* Subtle base line / accent removed as requested */}
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
