import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import axios from 'axios';

import GroupsIcon from '@mui/icons-material/Groups';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Brand colors - unified with AboutSection
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

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

  const iconStyle = {
    fontSize: { xs: 40, md: 45 },
    color: BRAND.gold,
    mb: 2,
    filter: `drop-shadow(0 0 10px rgba(236, 155, 20, 0.4))`,
  };

  const iconMap = [
    <CalendarTodayIcon sx={iconStyle} />,
    <GroupsIcon sx={iconStyle} />,
    <PhoneIphoneIcon sx={iconStyle} />,
    <LocationCityIcon sx={iconStyle} />,
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
        bgcolor: BRAND.dark,
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow - matches AboutSection style */}
      <Box sx={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '300px',
        height: '300px',
        bgcolor: BRAND.gold,
        filter: 'blur(120px)',
        opacity: 0.04,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Heading block */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: BRAND.gold,
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: { xs: 1, md: 2 },
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Our Impact in Numbers
            </Typography>

            <Typography
              sx={{
                color: BRAND.light,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                maxWidth: 700,
                mx: 'auto',
                opacity: 0.8,
                lineHeight: 1.6,
                fontWeight: 300
              }}
            >
              Golden Generation DT SACCO continues to grow with our members — 
              expanding our service, reach, and digital convenience across the region.
            </Typography>
          </motion.div>
        </Box>

        {/* Content: loader or stats */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {statItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: { xs: 5, md: 6 },
                      px: 3,
                      textAlign: 'center',
                      borderRadius: '24px',
                      backdropFilter: 'blur(12px)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: BRAND.gold,
                        background: 'rgba(236, 155, 20, 0.04)',
                        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 15px rgba(236, 155, 20, 0.1)`,
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {iconMap[index]}
                    </Box>

                    {/* Number */}
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: BRAND.gold,
                        fontSize: { xs: '2.2rem', md: '2.8rem' },
                        mb: 1,
                        fontFamily: 'serif', // Gives a prestigious "financial" feel
                      }}
                    >
                      <CountUp
                        end={Number(item.value)}
                        duration={2.5}
                        separator=","
                        suffix="+"
                      />
                    </Typography>

                    {/* Label */}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: BRAND.textMuted,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.75rem', md: '0.85rem' },
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
      </Container>
    </Box>
  );
};

export default SaccoStatsSection;