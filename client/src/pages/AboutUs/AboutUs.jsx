// AboutUs.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

import Footer from '../../components/Footer';
import AboutUsSection from './AboutUsSection';

const AboutUs = () => {
  const [branches, setBranches] = useState([]);
  const [coreValues, setCoreValues] = useState([]);

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/branches')
      .then(res => setBranches(res.data.branches || []))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/corevalues')
      .then(res => setCoreValues(res.data.core_values || []))
      .catch(error => console.error('Error fetching core values:', error));
  }, []);

  // Brand colors used inline (keeps component self-contained)
  const COLORS = {
    deepGreen: '#011407',      // very dark
    deepGreen2: '#01240F',     // mid dark
    gold: '#FFD700',
    deepGold: '#E6C200',
    softGold: '#FFF4B5',
    bodyText: '#EDE7D6',       // visible on deep green
  };

  return (
    <>
      {/* Hero Image */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg"
          alt="About Us Hero"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
        />
      </div>

      <AboutUsSection />

      {/* Branches & Core Values Section */}
      <section
        style={{
          background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)',
          padding: '4rem 1.5rem',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.4rem' },
            color: COLORS.deepGreen2,
            textAlign: { xs: 'center', md: 'left' },
            mb: 6,
            letterSpacing: 2,
            textShadow: '0 2px 3px rgba(0,0,0,0.06)',
            ml: { md: '12%' },
          }}
        >
          OUR BRANCHES
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 4,
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {/* map branches then final card showing core values */}
          {[...branches, { CoreValues: true }].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
            >
              <Card
                elevation={8}
                sx={{
                  width: '100%',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '18px',
                  px: 3,
                  py: 4,
                  // Deep-green glass card
                  background:
                    'linear-gradient(180deg, rgba(1,20,10,0.78), rgba(1,20,10,0.9))',
                  border: `1.5px solid ${COLORS.gold}33`,
                  color: COLORS.softGold,
                  textAlign: 'center',
                  boxShadow: `0 18px 36px rgba(0,0,0,0.45), 0 0 26px ${COLORS.gold}20`,
                  transition: 'all 0.38s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 30px 70px rgba(0,0,0,0.6), 0 0 40px ${COLORS.gold}55`,
                    border: `1.5px solid ${COLORS.gold}`,
                  },
                }}
              >
                <CardContent sx={{ width: '100%' }}>
                  {item.CoreValues ? (
                    <>
                      <FavoriteIcon sx={{ fontSize: 48, color: COLORS.deepGold, mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontWeight: 900,
                          fontSize: '1.4rem',
                          background: `linear-gradient(to right, ${COLORS.gold}, ${COLORS.softGold})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent', // ✅ correct gradient text approach
                          textShadow: `0 0 10px ${COLORS.gold}55`,
                        }}
                      >
                        Our Core Values
                      </Typography>


                      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {coreValues.length === 0 ? (
                          <Typography sx={{ color: COLORS.bodyText }}>No values found</Typography>
                        ) : (
                          coreValues.map((value, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * i }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 1,
                                  fontSize: '1rem',
                                  color: COLORS.softGold,
                                  fontWeight: 600,
                                }}
                              >
                                {value.CoreValueName}
                              </Typography>
                            </motion.li>
                          ))
                        )}
                      </Box>
                    </>
                  ) : (
                    <>
                      <RoomIcon sx={{ fontSize: 48, color: COLORS.gold, mb: 2 }} />

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 900,
                          mb: 1,
                          fontSize: '1.25rem',
                          color: COLORS.softGold,
                          WebkitBackgroundClip: 'text',
                        }}
                      >
                        {item.BranchName || 'Branch'}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ fontSize: '1rem', mb: 1, color: COLORS.bodyText }}
                      >
                        {item.Location || 'Location not available'}
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: '1rem', color: COLORS.bodyText }}>
                        <strong style={{ color: COLORS.gold }}>Contact:</strong>{' '}
                        <span style={{ color: COLORS.bodyText }}>{item.ContactNumber || 'N/A'}</span>
                      </Typography>

                      <Box
                        component="a"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          item.GoogleMapURL || item.Location || ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 2,
                          px: 2,
                          py: 1,
                          background: COLORS.gold,
                          color: '#000',
                          borderRadius: '999px',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          boxShadow: `0 8px 30px ${COLORS.gold}33`,
                          transition: 'all 0.25s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: `0 18px 45px ${COLORS.gold}55`,
                            background: COLORS.deepGold,
                            color: '#000',
                          },
                        }}
                      >
                        <RoomIcon sx={{ fontSize: 18 }} />
                        <span>Google Map</span>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
