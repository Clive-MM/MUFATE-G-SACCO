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
    fontSize: { xs: 40, md: 50 },
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
        py: { xs: 10, md: 15 },
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Decoration Glow */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '-5%',
        width: '400px',
        height: '400px',
        bgcolor: BRAND.gold,
        filter: 'blur(150px)',
        opacity: 0.05,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* HEADER SECTION */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 }, px: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: BRAND.gold,
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                letterSpacing: { xs: "0.05em", md: "0.1em" },
                mb: 3
              }}
            >
              Our Impact
            </Typography>
            <Typography 
              sx={{ 
                color: BRAND.light, 
                maxWidth: "850px", 
                mx: 'auto', 
                fontSize: { xs: "1rem", md: "1.15rem" }, 
                opacity: 0.85,
                lineHeight: 1.8,
                fontWeight: 300
              }}
            >
              Golden Generation DT SACCO continues to grow with our members—expanding 
              our service, reach, and digital convenience across the region.
            </Typography>
          </motion.div>
        </Box>

        {/* STATS GRID - Implementation of Center Alignment */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={{ xs: 3, md: 4 }} 
            justifyContent="center" // Centers the cards horizontally
            alignItems="stretch"
          >
            {statItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  sx={{ width: '100%', maxWidth: { xs: '400px', md: 'none' } }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: { xs: 6, md: 8 },
                      px: 3,
                      height: '100%',
                      textAlign: 'center',
                      borderRadius: '24px',
                      backdropFilter: 'blur(10px)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      '&:hover': {
                        borderColor: BRAND.gold,
                        bgcolor: 'rgba(236, 155, 20, 0.06)',
                        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(236, 155, 20, 0.1)`,
                      },
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      {iconMap[index]}
                    </Box>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: BRAND.gold,
                        fontSize: { xs: '2.5rem', md: '3.2rem' }, // Slightly larger for serif
                        mb: 1,
                        letterSpacing: -1,
                        fontFamily: 'serif', // Prestigious font style applied
                      }}
                    >
                      <CountUp
                        end={Number(item.value)}
                        duration={2.5}
                        separator=","
                        suffix="+"
                      />
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: BRAND.textMuted,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SaccoStatsSection;