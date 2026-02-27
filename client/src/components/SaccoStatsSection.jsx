import React, { useEffect, useState, useMemo } from 'react';
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

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

// PERFORMANCE: Define static styles and icons outside to prevent re-renders
const ICON_STYLE = {
  fontSize: { xs: 30, sm: 40, md: 50 },
  color: BRAND.gold,
  mb: { xs: 1, md: 2 },
  filter: `drop-shadow(0 0 10px rgba(236, 155, 20, 0.4))`,
};

const ICONS = [
  <CalendarTodayIcon sx={ICON_STYLE} />,
  <GroupsIcon sx={ICON_STYLE} />,
  <PhoneIphoneIcon sx={ICON_STYLE} />,
  <LocationCityIcon sx={ICON_STYLE} />,
];

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

  // PERFORMANCE: useMemo ensures this list is only recalculated when API data changes
  const statItems = useMemo(() => {
    if (!stats) return [];
    return [
      { label: 'Years of Service', value: stats.YearsOfService },
      { label: 'Active Members', value: stats.ActiveMembers },
      { label: 'Mobile Users', value: stats.MobileBankingUsers }, // Shortened for mobile fit
      { label: 'Total Branches', value: stats.BranchCount },
    ];
  }, [stats]);

  return (
    <Box
      sx={{
        bgcolor: BRAND.dark,
        py: { xs: 8, md: 15 },
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '-5%',
        width: { xs: '200px', md: '400px' },
        height: { xs: '200px', md: '400px' },
        bgcolor: BRAND.gold,
        filter: 'blur(100px)',
        opacity: 0.05,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 10 } }}>
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
                fontSize: { xs: "1.8rem", md: "4rem" },
                letterSpacing: "0.05em",
                mb: 2
              }}
            >
              Our Impact In Numbers
            </Typography>
          </motion.div>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={{ xs: 1.5, sm: 3, md: 4 }} // Tighter spacing on mobile
            justifyContent="center"
          >
            {statItems.map((item, index) => (
              <Grid 
                item 
                xs={6} // THE KEY CHANGE: 2 cards per row on mobile (6/12)
                sm={6} 
                md={3} 
                key={index}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: { xs: 3, md: 8 }, 
                      px: { xs: 1, md: 3 },
                      textAlign: 'center',
                      borderRadius: { xs: '16px', md: '24px' },
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      transition: '0.3s all ease',
                      '&:hover': {
                        borderColor: BRAND.gold,
                        bgcolor: 'rgba(236, 155, 20, 0.06)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {ICONS[index]}
                    </Box>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: BRAND.gold,
                        // Scaled down mobile font so large numbers like 16,000 don't break
                        fontSize: { xs: '1.4rem', sm: '2rem', md: '3.2rem' }, 
                        mb: 0.5,
                        fontFamily: 'serif',
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
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.6rem', md: '0.9rem' }, 
                        lineHeight: 1.2
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