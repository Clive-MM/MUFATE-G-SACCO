
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Stack
} from '@mui/material';

import { motion } from 'framer-motion';
import axios from 'axios';

// Core value icons
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BoltIcon from '@mui/icons-material/Bolt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BalanceIcon from '@mui/icons-material/Balance';

const BRAND = {
  gold: '#EC9B14',
  lightGold: '#FFC25F',
  green: '#1F4F2E',
  dark: '#02150F',
  white: '#F4F4F4'
};

// Cloudinary financial growth illustration
const GROWTH_IMAGE =
  'https://res.cloudinary.com/djydkcx01/image/upload/v1795697284/Investment_Growth_Orb_lxfcts.png';

// Match icons to core value names
const getValueIcon = (value) => {
  const name = value.toLowerCase();

  if (name.includes('teamwork')) return GroupsIcon;
  if (name.includes('integrity')) return VerifiedUserIcon;
  if (name.includes('competitiveness')) return EmojiEventsIcon;
  if (name.includes('accountability')) return FactCheckIcon;
  if (name.includes('service')) return WorkspacePremiumIcon;
  if (name.includes('efficiency')) return BoltIcon;
  if (name.includes('social')) return VolunteerActivismIcon;
  if (name.includes('fairness')) return BalanceIcon;

  return VerifiedUserIcon;
};

const SaccoIdentitySection = () => {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const [profileRes, valuesRes] = await Promise.all([
          axios.get(
            'https://mufate-g-sacco.onrender.com/sacco-profile'
          ),
          axios.get(
            'https://mufate-g-sacco.onrender.com/corevalues'
          )
        ]);

        setMission(
          profileRes.data.MissionStatement || ''
        );

        setVision(
          profileRes.data.VisionStatement || ''
        );

        setCoreValues(
          valuesRes.data.core_values?.map(
            value => value.CoreValueName
          ) || []
        );

      } catch (error) {
        console.error(
          'Error fetching SACCO identity:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIdentity();
  }, []);

  return (
    <Box
  sx={{
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: BRAND.dark,
    py: { xs: 7, md: 9 }
  }}
>

      {/* BACKGROUND DECORATIVE GLOW */}
      <Box
        sx={{
          position: 'absolute',
          width: 450,
          height: 450,
          borderRadius: '50%',
          background: 'rgba(16,120,65,0.13)',
          filter: 'blur(100px)',
          top: -200,
          right: '-5%',
          pointerEvents: 'none'
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(236,155,20,0.07)',
          filter: 'blur(100px)',
          bottom: -200,
          left: '-5%',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl">

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 12
            }}
          >
            <CircularProgress
              sx={{ color: BRAND.gold }}
            />
          </Box>
        ) : (

          <Stack spacing={{ xs: 5, md: 3 }}>

            {/* MISSION - IMAGE - VISION */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1.2fr 1fr'
                },
                alignItems: 'center',
                gap: { xs: 4, md: 2 },
                minHeight: { md: 390 }
              }}
            >

              {/* MISSION */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  px: { xs: 2, md: 1 }
                }}
              >
                <Typography
                  sx={{
                    color: BRAND.white,
                    fontWeight: 900,
                    fontSize: {
                      xs: '2.5rem',
                      md: '3.3rem'
                    },
                    lineHeight: 1.05
                  }}
                >
                  Our
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      color: BRAND.gold
                    }}
                  >
                    Mission
                  </Box>
                </Typography>

                <Box
                  sx={{
                    width: 65,
                    height: 5,
                    bgcolor: BRAND.gold,
                    borderRadius: 5,
                    my: 2,
                    mx: {
                      xs: 'auto',
                      md: 0
                    }
                  }}
                />

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: {
                      xs: '0.95rem',
                      md: '1.08rem'
                    },
                    lineHeight: 1.65,
                    fontWeight: 500,
                    maxWidth: 430,
                    mx: {
                      xs: 'auto',
                      md: 0
                    }
                  }}
                >
                  {mission}
                </Typography>
              </Box>


              {/* CENTRAL FINANCIAL GROWTH IMAGE */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  minHeight: {
                    xs: 300,
                    md: 390
                  }
                }}
              >

                {/* Decorative glowing circle */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: {
                      xs: 260,
                      md: 380
                    },
                    height: {
                      xs: 260,
                      md: 380
                    },
                    borderRadius: '50%',
                    border: '1px solid rgba(236,155,20,0.35)',
                    boxShadow: `
                      0 0 35px rgba(16,185,90,0.15),
                      inset 0 0 35px rgba(236,155,20,0.08)
                    `
                  }}
                />

                <Box
                  component="img"
                  src={GROWTH_IMAGE}
                  alt="Financial growth represented by a growing plant and savings"
                  loading="lazy"
                  sx={{
                    width: '100%',
                    maxWidth: {
                      xs: 340,
                      md: 470
                    },
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 1,
                    filter: `
                      drop-shadow(0 0 25px rgba(16,185,90,0.18))
                    `
                  }}
                />

              </Box>


              {/* VISION */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  px: { xs: 2, md: 1 }
                }}
              >
                <Typography
                  sx={{
                    color: BRAND.white,
                    fontWeight: 900,
                    fontSize: {
                      xs: '2.5rem',
                      md: '3.3rem'
                    },
                    lineHeight: 1.05
                  }}
                >
                  Our
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      color: BRAND.gold
                    }}
                  >
                    Vision
                  </Box>
                </Typography>

                <Box
                  sx={{
                    width: 65,
                    height: 5,
                    bgcolor: BRAND.gold,
                    borderRadius: 5,
                    my: 2,
                    mx: {
                      xs: 'auto',
                      md: 0
                    }
                  }}
                />

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: {
                      xs: '0.95rem',
                      md: '1.08rem'
                    },
                    lineHeight: 1.65,
                    fontWeight: 500,
                    maxWidth: 380,
                    mx: {
                      xs: 'auto',
                      md: 0
                    }
                  }}
                >
                  {vision}
                </Typography>
              </Box>

            </Box>


            {/* CORE VALUES SECTION */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              sx={{
                pt: { xs: 2, md: 1 },
                pb: 2
              }}
            >

              {/* HEADING */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 1.5, md: 3 }}
                sx={{ mb: 3.5 }}
              >

                <Box
                  sx={{
                    flex: 1,
                    maxWidth: 150,
                    height: 2,
                    background: `
                      linear-gradient(
                        90deg,
                        transparent,
                        ${BRAND.gold}
                      )
                    `
                  }}
                />

                <Typography
                  sx={{
                    color: BRAND.white,
                    fontSize: {
                      xs: '1.8rem',
                      md: '2.7rem'
                    },
                    fontWeight: 900,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Our{' '}
                  <Box
                    component="span"
                    sx={{ color: BRAND.gold }}
                  >
                    Core Values
                  </Box>
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    maxWidth: 150,
                    height: 2,
                    background: `
                      linear-gradient(
                        90deg,
                        ${BRAND.gold},
                        transparent
                      )
                    `
                  }}
                />

              </Stack>


              {/* VALUE TILES */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    md: 'repeat(4, minmax(0, 1fr))'
                  },
                  gap: {
                    xs: 1.5,
                    md: 2
                  },
                  maxWidth: 1250,
                  mx: 'auto'
                }}
              >

                {coreValues.map((value, index) => {
                  const ValueIcon = getValueIcon(value);

                  return (
                    <Box
                      key={`${value}-${index}`}
                      component={motion.div}
                      whileHover={{
                        y: -5,
                        borderColor: BRAND.gold,
                        backgroundColor: 'rgba(14,75,43,0.75)'
                      }}
                      transition={{ duration: 0.25 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: {
                          xs: 1,
                          md: 1.5
                        },
                        minHeight: {
                          xs: 70,
                          md: 82
                        },
                        px: {
                          xs: 1.2,
                          md: 2
                        },
                        py: 1.2,
                        borderRadius: '22px',
                        background: `
                          linear-gradient(
                            135deg,
                            rgba(10,76,43,0.65),
                            rgba(2,34,23,0.85)
                          )
                        `,
                        border: '1px solid rgba(22,180,99,0.55)',
                        boxShadow: `
                          0 0 15px rgba(0,180,90,0.08),
                          inset 0 0 12px rgba(0,180,90,0.05)
                        `,
                        transition: 'all 0.3s ease'
                      }}
                    >

                      <ValueIcon
                        sx={{
                          color: BRAND.gold,
                          fontSize: {
                            xs: 27,
                            md: 40
                          },
                          flexShrink: 0
                        }}
                      />

                      <Typography
                        sx={{
                          color: BRAND.white,
                          fontWeight: 700,
                          fontSize: {
                            xs: '0.75rem',
                            sm: '0.88rem',
                            md: '1rem'
                          },
                          lineHeight: 1.35
                        }}
                      >
                        {value}
                      </Typography>

                    </Box>
                  );
                })}

              </Box>
            </Box>

          </Stack>
        )}

      </Container>
    </Box>
  );
};

export default SaccoIdentitySection;
