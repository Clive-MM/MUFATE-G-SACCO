import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';

const instructions = [
  'Get the membership application form from the office or website.',
  'Fill in the form with your correct details.',
  'Attach a copy of your ID/Passport, and a passport-size photo.',
  'Pay account opening fees of Kshs 1500.',  
  'Open a savings account and start making deposits.',
];

const JoiningInstructions = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to bottom, rgb(189, 225, 237), rgb(233, 241, 250))',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        px: { xs: 2, md: 8 },
        pt: { xs: 3, md: 3 },
        pb: { xs: 3, md: 4 },
        mt: 0,
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ✅ Animated Vertical Colored Bars */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '80px',
          display: 'flex',
          flexDirection: 'row',
          gap: '50px',
          zIndex: 0,
        }}
      >
        {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1 + index * 0.2 }}
            style={{
              width: '90px',
              backgroundColor: color,
              borderRadius: '8px',
            }}
          />
        ))}
      </motion.div>

      {/* ✅ Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#003B49',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: { xs: '1.4rem', md: '2rem' },
            mb: 3,
            zIndex: 1,
          }}
        >
          Joining Instructions
        </Typography>
      </motion.div>

      {/* ✅ Animated Instructions List */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.15 }}
        variants={{
          hidden: {},
          visible: {},
        }}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
      >
        {instructions.map((item, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              sx={{
                color: '#003B49',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
              }}
            >
              {item}
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* ✅ Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 4 }}>
          <Button
            component="a"
            href="https://raw.githubusercontent.com/Clive-MM/Mufate-G-SACCO-DOCUMENTS/main/MEMBER-APPLICATION-DOCUMENT.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            startIcon={<DownloadIcon />}
            sx={{
              backgroundColor: '#2E7D32',
              color: '#fff',
              fontWeight: 'bold',
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.25 },
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              textTransform: 'uppercase',
              borderRadius: '8px',
              boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.6)',
              '&:hover': {
                backgroundColor: '#1B5E20',
                boxShadow: '0 0 15px 3px rgba(255, 215, 0, 0.8)',
              },
            }}
          >
            Download
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default JoiningInstructions;
