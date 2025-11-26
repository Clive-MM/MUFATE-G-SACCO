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

// Brand colors
const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
const DEEP_GREEN = '#006400';
const BG_GRADIENT =
  'linear-gradient(145deg, #020806 0%, #02160C 40%, #000000 100%)';

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
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
      }}
    />,
    <GroupsIcon
      sx={{
        fontSize: 40,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
      }}
    />,
    <PhoneIphoneIcon
      sx={{
        fontSize: 40,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
      }}
    />,
    <LocationCityIcon
      sx={{
        fontSize: 40,
        color: GOLD,
        mb: 1.5,
        filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
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
        background: BG_GRADIENT,
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
          backgroundImage: 'linear-gradient(to right, #FFF8C5, #FFD700, #FFE066)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          textShadow:
            '0 0 10px rgba(0,0,0,0.8), 0 0 18px rgba(255,215,0,0.65)',
        }}
      >
        Our Impact in Numbers
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          textAlign: 'center',
          mb: 6,
          color: LIGHT_GOLD,
          fontSize: { xs: '0.9rem', md: '1rem' },
          letterSpacing: 0.8,
          opacity: 0.9,
        }}
      >
        Golden Generation DT SACCO continues to grow with our members — in
        service, reach and digital convenience.
      </Typography>

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
                    background:
                      'radial-gradient(circle at top, rgba(0,60,20,0.9), rgba(0,0,0,0.85))',
                    border: `1px solid rgba(255,215,0,0.18)`,
                    boxShadow:
                      '0 18px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.15)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow:
                        '0 22px 50px rgba(0,0,0,0.95), 0 0 30px rgba(255,215,0,0.4)',
                      borderColor: 'rgba(255,215,0,0.45)',
                    },
                  }}
                >
                  {iconMap[index]}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: GOLD,
                      fontSize: { xs: '2rem', md: '2.6rem' },
                      textShadow:
                        '0 0 10px rgba(255,215,0,1), 0 0 22px rgba(0,0,0,0.9)',
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
                      color: LIGHT_GOLD,
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
