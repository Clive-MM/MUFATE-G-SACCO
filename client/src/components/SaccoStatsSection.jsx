
import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
} from '@mui/material';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import axios from 'axios';

import GroupsIcon from '@mui/icons-material/Groups';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const BRAND = {
  gold: '#EC9B14',
  lightGold: '#FFC25F',
  green: '#1F4F2E',
  dark: '#02150F',
  white: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.78)',
};

const STAT_ICONS = [
  CalendarTodayIcon,
  GroupsIcon,
  PhoneIphoneIcon,
  LocationCityIcon,
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

  // Prepare statistics from API
  const statItems = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: 'Years of Service',
        value: stats.YearsOfService,
      },
      {
        label: 'Active Members',
        value: stats.ActiveMembers,
      },
      {
        label: 'Mobile Users',
        value: stats.MobileBankingUsers,
      },
      {
        label: 'Total Branches',
        value: stats.BranchCount,
      },
    ];
  }, [stats]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(
            ellipse at 50% 45%,
            rgba(13, 76, 42, 0.22),
            transparent 65%
          ),
          linear-gradient(
            135deg,
            #02150F 0%,
            #031B12 55%,
            #02150F 100%
          )
        `,
        py: { xs: 7, md: 12 },
      }}
    >

      {/* BACKGROUND DECORATIVE GLOWS */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-8%',
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          borderRadius: '50%',
          background: BRAND.green,
          filter: 'blur(120px)',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          right: '-8%',
          width: { xs: 200, md: 450 },
          height: { xs: 200, md: 450 },
          borderRadius: '50%',
          background: BRAND.gold,
          filter: 'blur(140px)',
          opacity: 0.07,
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >

        {/* SECTION HEADING */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 10 },
          }}
        >

          {/* TOP DECORATIVE EMBLEM */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 2, md: 3 },
                mb: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: 45, md: 150 },
                  height: 1,
                  background: `
                    linear-gradient(
                      90deg,
                      transparent,
                      ${BRAND.gold}
                    )
                  `,
                }}
              />

              <TrendingUpIcon
                sx={{
                  fontSize: { xs: 34, md: 58 },
                  color: BRAND.gold,
                  filter: 'drop-shadow(0 0 12px rgba(236,155,20,0.4))',
                }}
              />

              <Box
                sx={{
                  width: { xs: 45, md: 150 },
                  height: 1,
                  background: `
                    linear-gradient(
                      90deg,
                      ${BRAND.gold},
                      transparent
                    )
                  `,
                }}
              />
            </Box>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: '2rem',
                  sm: '2.8rem',
                  md: '4.2rem',
                },
                lineHeight: 1.15,
                letterSpacing: {
                  xs: '-0.02em',
                  md: '-0.035em',
                },
                color: BRAND.white,
              }}
            >
              Our Impact In{' '}
              <Box
                component="span"
                sx={{
                  color: BRAND.gold,
                }}
              >
                Numbers
              </Box>
            </Typography>
          </motion.div>

          {/* GOLD ACCENT LINE */}
          <Box
            sx={{
              width: { xs: 100, md: 200 },
              height: 4,
              borderRadius: 5,
              background: `
                linear-gradient(
                  90deg,
                  transparent,
                  ${BRAND.gold},
                  ${BRAND.lightGold},
                  ${BRAND.gold},
                  transparent
                )
              `,
              mx: 'auto',
              mt: 2,
              boxShadow: '0 0 12px rgba(236,155,20,0.3)',
            }}
          />

        </Box>


        {/* STATISTICS */}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 8,
            }}
          >
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {statItems.map((item, index) => {
              const StatIcon = STAT_ICONS[index];
              const isFeatured = index === 1;

              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  key={item.label}
                >
                  <Box
                    component={motion.div}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -10,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.12,
                    }}
                    sx={{
                      height: '100%',
                      transform: {
                        md: isFeatured
                          ? 'translateY(-12px)'
                          : 'none',
                      },
                    }}
                  >

                    {/* STAT CARD */}
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        isolation: 'isolate',

                        minHeight: {
                          xs: 195,
                          sm: 245,
                          md: 355,
                        },

                        height: '100%',

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        textAlign: 'center',

                        px: { xs: 1, sm: 2, md: 2 },
                        py: { xs: 3, md: 4 },

                        borderRadius: {
                          xs: '20px',
                          md: '32px',
                        },

                        background: isFeatured
                          ? `
                            linear-gradient(
                              145deg,
                              rgba(236,155,20,0.25),
                              rgba(17,49,26,0.98) 48%,
                              rgba(3,25,16,1)
                            )
                          `
                          : `
                            linear-gradient(
                              145deg,
                              rgba(20,95,53,0.65),
                              rgba(3,37,23,0.94) 55%,
                              rgba(2,21,15,0.98)
                            )
                          `,

                        border: isFeatured
                          ? `2px solid ${BRAND.gold}`
                          : '1.5px solid rgba(22, 150, 79, 0.55)',

                        boxShadow: isFeatured
                          ? `
                            0 0 25px rgba(236,155,20,0.12),
                            inset 0 0 35px rgba(236,155,20,0.06)
                          `
                          : `
                            0 12px 30px rgba(0,0,0,0.16),
                            inset 0 0 25px rgba(22,150,79,0.04)
                          `,

                        transition: 'all 0.35s ease',

                        '&:hover': {
                          borderColor: BRAND.gold,
                          boxShadow: `
                            0 15px 35px rgba(0,0,0,0.25),
                            0 0 25px rgba(236,155,20,0.12)
                          `,
                        },
                      }}
                    >

                      {/* TOP INNER GLOW */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: '15%',
                          width: '70%',
                          height: '45%',
                          background: isFeatured
                            ? 'rgba(236,155,20,0.10)'
                            : 'rgba(22,150,79,0.10)',
                          filter: 'blur(55px)',
                          borderRadius: '50%',
                          pointerEvents: 'none',
                          zIndex: -1,
                        }}
                      />

                      {/* ICON CIRCLE */}
                      <Box
                        sx={{
                          width: {
                            xs: 58,
                            sm: 72,
                            md: 100,
                          },
                          height: {
                            xs: 58,
                            sm: 72,
                            md: 100,
                          },

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          borderRadius: '50%',

                          border: `2px solid ${
                            isFeatured
                              ? BRAND.lightGold
                              : 'rgba(236,155,20,0.65)'
                          }`,

                          background: `
                            radial-gradient(
                              circle,
                              rgba(236,155,20,0.16),
                              rgba(2,21,15,0.9)
                            )
                          `,

                          boxShadow: `
                            0 0 18px rgba(236,155,20,0.13),
                            inset 0 0 12px rgba(236,155,20,0.08)
                          `,

                          mb: { xs: 2, md: 2.5 },
                        }}
                      >
                        <StatIcon
                          sx={{
                            color: BRAND.gold,
                            fontSize: {
                              xs: 28,
                              sm: 35,
                              md: 48,
                            },
                            filter: 'drop-shadow(0 0 8px rgba(236,155,20,0.35))',
                          }}
                        />
                      </Box>


                      {/* ANIMATED FIGURE */}
                      <Typography
                        component="div"
                        sx={{
                          color: BRAND.gold,
                          fontWeight: 900,

                          fontSize: {
                            xs: '1.65rem',
                            sm: '2.4rem',
                            md: '3.7rem',
                          },

                          fontFamily: 'Georgia, serif',
                          lineHeight: 1.2,
                          letterSpacing: '-0.025em',
                          whiteSpace: 'nowrap',

                          mb: 1,

                          textShadow: `
                            0 0 15px rgba(236,155,20,0.15)
                          `,
                        }}
                      >
                        <CountUp
                          end={Number(item.value) || 0}
                          duration={2.5}
                          separator=","
                          suffix="+"
                        />
                      </Typography>


                      {/* STATISTIC LABEL */}
                      <Typography
                        sx={{
                          color: BRAND.white,
                          fontWeight: 800,
                          textTransform: 'uppercase',

                          fontSize: {
                            xs: '0.58rem',
                            sm: '0.75rem',
                            md: '0.95rem',
                          },

                          letterSpacing: '0.015em',
                          lineHeight: 1.4,
                        }}
                      >
                        {item.label}
                      </Typography>


                      {/* SMALL GREEN ACCENT */}
                      <Box
                        sx={{
                          width: { xs: 38, md: 55 },
                          height: 4,
                          borderRadius: 5,
                          bgcolor: '#159447',
                          mt: { xs: 1.5, md: 2 },
                          boxShadow: '0 0 10px rgba(21,148,71,0.35)',
                        }}
                      />


                      {/* CURVED GOLD BOTTOM CORNER */}
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,

                          width: {
                            xs: '38%',
                            md: '45%',
                          },

                          height: {
                            xs: 25,
                            md: 42,
                          },

                          background: `
                            linear-gradient(
                              135deg,
                              ${BRAND.lightGold},
                              ${BRAND.gold}
                            )
                          `,

                          borderTopLeftRadius: '100%',
                          borderBottomRightRadius: {
                            xs: '18px',
                            md: '30px',
                          },

                          opacity: 0.95,
                          zIndex: -1,
                        }}
                      />

                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}

      </Container>


      {/* BOTTOM DECORATIVE GREEN AND GOLD WAVES */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: { xs: 55, md: 95 },
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <path
            d="M0,45 C260,110 420,120 690,75 C960,30 1160,0 1440,30 L1440,120 L0,120 Z"
            fill="#0B542D"
            opacity="0.45"
          />

          <path
            d="M0,45 C260,110 420,120 690,75 C960,30 1160,0 1440,30"
            fill="none"
            stroke="#159447"
            strokeWidth="2"
          />

          <path
            d="M0,37 C260,102 420,112 690,67 C960,22 1160,-8 1440,22"
            fill="none"
            stroke="#EC9B14"
            strokeWidth="2"
            opacity="0.85"
          />
        </svg>
      </Box>

    </Box>
  );
};

export default SaccoStatsSection;
