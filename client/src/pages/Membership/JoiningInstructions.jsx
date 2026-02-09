import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';

// --- UNIFIED BRAND TOKENS (Synced with Footer) ---
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const instructions = [
  'Get the membership application form from the office or website.',
  'Fill in the form with your correct details.',
  'Attach a copy of your ID/Passport, and a passport-size photo.',
  'Pay account opening fees of Kshs 1500.',
  'Open a savings account and start making deposits.',
];

// Unified Palette for Vertical Bars
const GOLD_BARS = [BRAND.gold, '#FFB84D', '#FFD38A', '#D1870D'];

const JoiningInstructions = () => {
  const width = window.innerWidth;
  const barCount = width < 600 ? 0 : width < 960 ? 2 : 4;

  return (
    <Box
      sx={{
        position: 'relative',
        // Updated to use BRAND.dark as the base
        background: `linear-gradient(180deg, ${BRAND.dark} 0%, #031c14 100%)`,
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        px: { xs: 2, md: 8 },
        pt: { xs: 3, md: 5 },
        pb: { xs: 4, md: 6 },
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        // Subtle top border for section separation consistency
        borderTop: `1px solid rgba(255,255,255,0.05)`
      }}
    >

      {/* GOLD VERTICAL BARS */}
      {barCount > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '60px',
            display: 'flex',
            flexDirection: 'row',
            gap: '45px',
            zIndex: 0,
          }}
        >
          {GOLD_BARS.slice(0, barCount).map((color, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              whileInView={{
                height: width < 960 ? '70%' : '100%',
              }}
              transition={{ duration: 0.9 + index * 0.25 }}
              style={{
                width: width < 960 ? '50px' : '70px',
                backgroundColor: color,
                borderRadius: '12px',
                boxShadow: `0 0 25px ${BRAND.gold}66`, 
              }}
            />
          ))}
        </motion.div>
      )}

      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: { xs: '1.5rem', md: '2.2rem' },
            mb: 3,
            // Solid Brand Gold for consistency with footer style
            color: BRAND.gold,
            letterSpacing: '1px',
            zIndex: 2,
          }}
        >
          Joining Instructions
        </Typography>
      </motion.div>

      {/* INSTRUCTIONS */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.15 }}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, zIndex: 2 }}
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
                color: BRAND.light,
                opacity: 0.9,
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.6,
                fontWeight: 400,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {item}
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* BUTTON */}
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
              // Deep Sacco Green remains for action buttons
              background: 'linear-gradient(135deg, #013D19, #0A5A2A)',
              border: `1px solid ${BRAND.gold}73`,
              color: BRAND.light,
              fontWeight: 800,
              px: { xs: 3, md: 4 },
              py: 1.5,
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              borderRadius: '12px',
              boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
              '&:hover': {
                background: 'linear-gradient(135deg, #014A21, #0C6E30)',
                transform: 'scale(1.04)',
                boxShadow: `0 0 20px ${BRAND.gold}66`,
              },
            }}
          >
            Application Form
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default JoiningInstructions;