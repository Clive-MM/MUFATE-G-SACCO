import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

import Footer from '../../components/Footer';
import AboutUsSection from './AboutUsSection';

const AboutUs = () => {
  const [branches, setBranches] = useState([]);
  const [coreValues, setCoreValues] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/branches')
      .then(res => setBranches(res.data.branches || []))
      .catch(error => console.error("Error fetching branches:", error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/corevalues')
      .then(res => setCoreValues(res.data.core_values || []))
      .catch(error => console.error("Error fetching core values:", error));
  }, []);

  return (
    <>
      {/* Hero Image */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <img
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1747331947/ChatGPT_Image_May_15_2025_08_58_50_PM_uwznuh.png"
          alt="About Us Hero"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>

      <AboutUsSection />

      {/* Branches & Core Values Section */}
      <section style={{ background: '#f4f4f4', padding: '2rem 1rem' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#2e7d32',
            textAlign: 'center',
            mb: 4,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Our Branches
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 3,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Branch Cards */}
          {branches.map((branch, index) => (
            <motion.div
              key={branch.BranchID}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  backgroundColor: '#003c3c',
                  color: '#fff',
                  textAlign: 'center',
                  py: 3,
                  px: 2,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    backgroundColor: '#2e7d32',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent>
                  <RoomIcon sx={{ fontSize: 40, color: '#64dd17', mb: 1 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {branch.BranchName}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{branch.Location}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Contact:</strong> {branch.ContactNumber}
                  </Typography>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Core Values Card */}
          {coreValues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: branches.length * 0.2 }}
            >
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  backgroundColor: '#003c3c',
                  color: '#fff',
                  textAlign: 'center',
                  py: 3,
                  px: 2,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent>
                  <FavoriteIcon sx={{ fontSize: 40, color: '#ff8a65', mb: 1 }} />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Our Core Values
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {coreValues.map((value, i) => (
                      <li key={i}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                           {value.CoreValueName}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Box>
      </section>

      {/* CTA Section */}
            {/* CTA Section */}
      <Box
        component="section"
        sx={{
          backgroundColor: '#04374f',
          color: '#fff',
          px: 2,
          pt: 2,
          pb: 6,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {/* Image */}
          <Box sx={{ flex: '1 1 350px' }}>
            <Box
              component="img"
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1747336462/ChatGPT_Image_May_15_2025_10_13_52_PM_cmnvr8.png"
              alt="Hands united in support and teamwork"
              sx={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                mt: '-40px',
              }}
            />
          </Box>

          {/* Text + CTA Button */}
          <Box sx={{ flex: '1 1 450px', py: 2 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              Join Mufate Sacco Today!
            </Typography>
            <Typography sx={{ fontSize: '15px', lineHeight: 1.6, mb: 2 }}>
              Download our Sacco brochure and follow the requirements to become part of Mufate Sacco.
            </Typography>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Box
                component="a"
                href="http://localhost:3000/membership"
                sx={{
                  display: 'inline-block',
                  px: 3,
                  py: 1.2,
                  backgroundColor: '#fff',
                  color: '#04374f',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  },
                }}
              >
                Register Now
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>


      <Footer />
    </>
  );
};

export default AboutUs;
