import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const instructions = [
  'Get the membership application form from the office or website.',
  'Fill in the form with your correct details.',
  'Attach a copy of your ID/Passport, and a passport-size photo.',
  'Pay account opening fees of 15000.',  
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

      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          color: '#003B49',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: { xs: '1.4rem', md: '2rem' },
          mb: 3,
        }}
      >
        Joining Instructions
      </Typography>

      {/* Instructions List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {instructions.map((item, idx) => (
          <Typography
            key={idx}
            sx={{
              color: '#003B49',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Download Button */}
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
