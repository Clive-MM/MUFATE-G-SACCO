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

const SaccoIdentitySection = () => {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = axios.get('https://mudetesacco.co.ke/backend/sacco-profile');
    const fetchCoreValues = axios.get('https://mudetesacco.co.ke/backend/corevalues');

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
      hoverColor: '#f9a825', // Amber
    },
    {
      title: 'Our Values',
      icon: StarIcon,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {coreValues.map((v, i) => (
            <li key={i}>
              <Typography variant="body2" sx={{ color: '#fff', mb: 1 }}>
                {v}
              </Typography>
            </li>
          ))}
        </Box>
      ),
      hoverColor: '#1565c0', // Blue
    },
    {
      title: 'Our Vision',
      icon: VisibilityIcon,
      content: vision,
      hoverColor: '#2e7d32', // Green
    },
  ];

  return (
    <Box
      sx={{
        py: 3,
        px: { xs: 2, md: 8 },
        background: 'linear-gradient(180deg, #f9f9f9 0%, #eef4f1 100%)',
        backgroundImage:
          'radial-gradient(#e1fbe6 1px, transparent 1px), radial-gradient(#e1fbe6 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0,10px 10px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', md: '2.4rem' },
            color: '#003c3c',
            textTransform: 'uppercase',
            letterSpacing: 2,
            textAlign: 'center',
            mb: 5,
          }}
        >
          Our Identity
        </Typography>
      </motion.div>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#003c3c' }} />
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
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  elevation={4}
                  sx={{
                    backgroundColor: '#003c3c',
                    borderRadius: 3,
                    py: 4,
                    px: 3,
                    height: '100%',
                    color: '#fff',
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      backgroundColor: card.hoverColor,
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                      '& .icon': {
                        color: '#ffffff',
                      },
                      '& .titleText': {
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  <CardContent>
                    {/* Icon and Title */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <IconComponent
                        className="icon"
                        sx={{
                          mr: 1,
                          color: '#64dd17',
                          transition: 'color 0.4s ease',
                        }}
                      />
                      <Typography
                        variant="h6"
                        className="titleText"
                        sx={{
                          fontWeight: 'bold',
                          color: '#64dd17',
                          textTransform: 'uppercase',
                          fontSize: '1.1rem',
                          transition: 'color 0.4s ease',
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
                          lineHeight: 1.8,
                          color: '#f0f0f0',
                          fontSize: '0.95rem',
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
