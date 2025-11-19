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
    axios.get('https://mudetesacco.co.ke/backend/branches')
      .then(res => setBranches(res.data.branches || []))
      .catch(error => console.error("Error fetching branches:", error));
  }, []);

  useEffect(() => {
    axios.get('https://mudetesacco.co.ke/backend/corevalues')
      .then(res => setCoreValues(res.data.core_values || []))
      .catch(error => console.error("Error fetching core values:", error));
  }, []);

  return (
    <>
      {/* Hero Image */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg"
          alt="About Us Hero"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>

      <AboutUsSection />

      {/* Branches & Core Values Section */}
      <section style={{ background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)', padding: '4rem 1.5rem' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: '800',
            fontSize: { xs: '2rem', md: '2.4rem' },
            color: '#1b5e20',
            textAlign: { xs: 'center', md: 'left' },
            mb: 6,
            letterSpacing: 2,
            textShadow: '0 2px 3px rgba(0,0,0,0.1)',
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
          }}
        >
          {[...branches, { CoreValues: true }].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                elevation={6}
                sx={{
                  width: '100%',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '20px',
                  background: item.CoreValues
                    ? 'linear-gradient(to bottom right, #5fd225ff, #4ff00aff)'
                    : 'linear-gradient(to bottom right, #5fd225ff, #4ff00aff)',
                  color: '#ffffff',
                  textAlign: 'center',
                  py: 4,
                  px: 3,
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-6px)',
                    boxShadow: '0 18px 30px rgba(0, 0, 0, 0.4)',
                    border: item.CoreValues ? '2px solid #64dd17' : '2px solid #76ff03',
                  },
                }}
              >
                <CardContent>
                  {item.CoreValues ? (
                    <>
                      <FavoriteIcon sx={{ fontSize: 50, color: '#ff7043', mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.4rem' }}>
                        Our Core Values
                      </Typography>
                      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {coreValues.map((value, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i }}
                          >
                            <Typography variant="body2" sx={{ mb: 1, fontSize: '1rem' }}>
                              {value.CoreValueName}
                            </Typography>
                          </motion.li>
                        ))}
                      </Box>
                    </>
                  ) : (
                    <>
                      <RoomIcon sx={{ fontSize: 50, color: '#76ff03', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.4rem' }}>
                        {item.BranchName}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '1rem', mb: 1 }}>
                        {item.Location}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                        <strong>Contact:</strong> {item.ContactNumber}
                      </Typography>
                      <Box
                        component="a"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.GoogleMapURL)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 2,
                          px: 2,
                          py: 1,
                          backgroundColor: '#ffffff',
                          color: '#004d40',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            backgroundColor: '#64dd17',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                          },
                        }}
                      >
                        <RoomIcon sx={{ fontSize: 20 }} />
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
