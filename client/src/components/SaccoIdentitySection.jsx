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

// Brand colors – same as AboutSection
const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
const DEEP_GREEN = '#006400';
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
                sx={{ color: '#e6e6e6', mb: 1, fontSize: '0.95rem' }}
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
        background: DARK_BG, // 🔥 same dark green gradient as AboutSection
      }}
    >
      {/* Section heading */}
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
            mb: 4,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: 'transparent',
            backgroundImage: 'linear-gradient(to right, #FFD700, #FFE066)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `
              0 0 12px rgba(0, 0, 0, 0.8),
              0 0 20px rgba(255, 215, 0, 0.45)
            `,
          }}
        >
          Our Identity
        </Typography>
      </motion.div>

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
                    background: 'rgba(0, 0, 0, 0.78)',
                    border: '1px solid rgba(255, 215, 0, 0.25)',
                    color: '#f5f5f5',
                    textAlign: 'left',
                    boxShadow:
                      '0 22px 55px rgba(0,0,0,0.9), 0 0 22px rgba(0,0,0,0.5)',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow:
                        '0 28px 70px rgba(0,0,0,0.95), 0 0 28px rgba(255,215,0,0.35)',
                      borderColor: 'rgba(255, 215, 0, 0.7)',
                    },
                  }}
                >
                  <CardContent sx={{ py: 4, px: 3.5 }}>
                    {/* Icon + Title */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background:
                            'radial-gradient(circle at 30% 0%, #FFE066, #806000)',
                          boxShadow: '0 0 18px rgba(255,215,0,0.75)',
                          mr: 1.5,
                        }}
                      >
                        <IconComponent
                          sx={{
                            color: '#111',
                            fontSize: 26,
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: LIGHT_GOLD,
                          textTransform: 'uppercase',
                          letterSpacing: 1.3,
                          fontSize: '1.05rem',
                        }}
                      >
                        {card.title}
                      </Typography>
                    </Box>

                    {/* Content */}
                    {typeof card.content === 'string' ? (
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.9,
                          color: '#e0e0e0',
                          fontSize: '0.96rem',
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
