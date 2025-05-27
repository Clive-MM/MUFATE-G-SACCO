import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';

const instructions = [
  'Get the membership application form from the office or website.',
  'Fill in the form with your correct details.',
  'Attach a copy of your ID/Passport, and a passport-size photo.',
  'Pay the registration fee of Kshs 100.',
  'Deposit the minimum operating balance of Kshs 1,000.',
  'Pay Bank plate cards processing fee of Kshs 200.',
  'Open a savings account and start making deposits.',
];

const MotionTypography = motion(Typography);

const JoiningInstructions = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #ffffff, #d6d6d6)',
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
      {/* Vertical Colored Bars */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: { xs: '4px', sm: '16px', md: '80px' },
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: '4px', sm: '12px', md: '50px' },
          zIndex: 0,
        }}
      >
        {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '10px', sm: '20px', md: '90px' },
              backgroundColor: color,
            }}
          />
        ))}
      </Box>

      {/* Animated Heading */}
      <MotionTypography
        variant="h6"
        whileHover={{
          scale: 1.05,
          textShadow: '0px 0px 8px rgba(0, 91, 115, 0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300 }}
        sx={{
          color: '#003B49',
          textTransform: 'uppercase',
          fontWeight: 700,
          mb: 3,
          letterSpacing: '1px',
          cursor: 'pointer',
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
        }}
      >
        Joining Instructions
      </MotionTypography>

      {/* Styled Instruction List */}
      <Box
        component="ul"
        sx={{
          pl: 0,
          mb: 2,
          listStyle: 'none',
          ml: 0,
        }}
      >
        {instructions.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              color: '#003B49',
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: 1.6,
              marginBottom: '6px',
              cursor: 'default',
            }}
          >
            {item}
          </motion.li>
        ))}
      </Box>

      {/* Glowing Download Button */}
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
    </Box>
  );
};

export default JoiningInstructions;
