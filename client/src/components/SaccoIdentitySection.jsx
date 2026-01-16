import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

// Brand colors
const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
// const DEEP_GREEN = '#006400';
const DARK_BG =
  'linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)';

const SaccoIdentitySection = () => {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = axios.get(
      'https://mufate-g-sacco.onrender.com/sacco-profile'
    );
    const fetchCoreValues = axios.get(
      'https://mufate-g-sacco.onrender.com/corevalues'
    );

    Promise.all([fetchProfile, fetchCoreValues])
      .then(([profileRes, valuesRes]) => {
        setMission(profileRes.data.MissionStatement);
        setVision(profileRes.data.VisionStatement);
        setCoreValues(valuesRes.data.core_values.map((v) => v.CoreValueName));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching identity data:', err);
        setLoading(false);
      });
  }, []);

  const identityCards = [
    {
      title: 'Our Mission',
      icon: FlagIcon,
      content: mission,
    },
    {
      title: 'Our Values',
      icon: StarIcon,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {coreValues.map((v, i) => (
            <li key={i}>
              <Typography
                variant="body2"
                sx={{
                  color: GOLD,
                  textAlign: 'center',
                  mb: 1,
                  fontSize: '0.95rem',
                  textShadow:
                    '0 0 8px rgba(255,215,0,0.9), 0 0 14px rgba(255,215,0,0.6)',
                }}
              >
                {v}
              </Typography>
            </li>
          ))}
        </Box>
      ),
    },
    {
      title: 'Our Vision',
      icon: VisibilityIcon,
      content: vision,
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 8 },
        background: DARK_BG,
      }}
    >
      {/* SECTION HEADING */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '1.9rem', md: '2.4rem' },
            textAlign: 'center',
            mb: 5,
            textTransform: 'uppercase',
            letterSpacing: 3,
            color: GOLD,
            textShadow:
              '0 0 12px rgba(255,215,0,1), 0 0 22px rgba(255,215,0,0.7), 0 0 35px rgba(255,215,0,0.5)',
          }}
        >
          Our Identity
        </Typography>
      </motion.div>

      {/* LOADING */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress sx={{ color: GOLD }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 3,
          }}
        >
          {identityCards.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.18 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: `1px solid rgba(255, 215, 0, 0.3)`,
                    boxShadow:
                      '0 22px 55px rgba(0,0,0,0.85), 0 0 18px rgba(255,215,0,0.2)',
                    color: GOLD,
                    textAlign: 'center',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: LIGHT_GOLD,
                      boxShadow:
                        '0 28px 70px rgba(0,0,0,0.95), 0 0 32px rgba(255,215,0,0.6)',
                      background: `linear-gradient(145deg, rgba(0,40,20,0.8), rgba(0,25,10,0.7))`,
                    },
                  }}
                >
                  <CardContent sx={{ py: 4, px: 3.5 }}>
                    {/* Icon + Title */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2.8,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background:
                            'radial-gradient(circle, #FFE066, #806000)',
                          boxShadow: '0 0 18px rgba(255,215,0,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5,
                        }}
                      >
                        <IconComponent
                          sx={{ color: '#111', fontSize: 26 }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 900,
                          color: GOLD,
                          textTransform: 'uppercase',
                          letterSpacing: 1.5,
                          fontSize: '1.1rem',
                          textShadow:
                            '0 0 8px rgba(255,215,0,0.9), 0 0 16px rgba(255,215,0,0.5)',
                        }}
                      >
                        {card.title}
                      </Typography>
                    </Box>

                    {/* CONTENT */}
                    {typeof card.content === 'string' ? (
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.9,
                          fontSize: '1rem',
                          color: LIGHT_GOLD,
                          textAlign: 'center',
                          textShadow:
                            '0 0 8px rgba(255,215,0,0.75), 0 0 14px rgba(255,215,0,0.4)',
                        }}
                      >
                        {card.content}
                      </Typography>
                    ) : (
                      card.content
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SaccoIdentitySection;
