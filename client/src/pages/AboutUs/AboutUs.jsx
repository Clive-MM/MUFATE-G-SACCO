import  { useEffect, useState } from 'react';
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
    axios.get('https://mufate-g-sacco.onrender.com/branches')
      .then(res => setBranches(res.data.branches || []))
      .catch(error => console.error("Error fetching branches:", error));
  }, []);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/corevalues')
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
      <section
  style={{
    background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
    padding: '4rem 1.5rem',
  }}
>
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
      ml: { md: '12%' }, // pushes left on larger screens
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
    width: '100%',                        // Responsive width
    minHeight: '320px',                   // Force equal height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    background: item.CoreValues
      ? 'linear-gradient(to bottom right, #003c3c, #004d40)'
      : 'linear-gradient(to bottom right, #004d40, #00695c)',
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
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </Box>
</section>



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
              Ready to join? Check out our membership brochure and take the next step today.
            </Typography>

            <motion.div
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  <Box
    component="a"
    href="https://mufate-g-sacco.onrender.com/membership"
    sx={{
      display: 'inline-block',
      px: 3,
      py: 1.2,
      backgroundColor: '#64dd17', 
      color: '#fff',
      borderRadius: '20px',
      fontWeight: 'bold',
      textDecoration: 'none',
      fontSize: '0.9rem',
      boxShadow: '0 0 6px #64dd17',
      transition: 'all 0.4s ease-in-out',
      '&:hover': {
        backgroundColor: '#76ff03',
        boxShadow: '0 0 20px #76ff03',
      },
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 15px #76ff03',
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
