import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SalaryProcessing = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#FFD700',   // 🟡 Gold brand background
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 2, md: 10 },
                pt: { xs: 6, md: 8 },
                pb: { xs: 4, md: 6 },
                position: 'relative',
                overflow: 'visible',
                gap: 6,
            }}
        >

            {/* ================= IMAGE SIDE ================= */}
            <Box
                sx={{
                    position: 'relative',
                    mt: { xs: 0, md: '-150px' },
                    zIndex: 2,
                }}
            >
                <motion.img
                    src="https://res.cloudinary.com/djydkcx01/image/upload/v1754911013/ChatGPT_Image_Aug_11_2025_02_02_22_PM_sbscrx.png"
                    alt="Salary Processing"
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        height: 'auto',
                        borderRadius: '20px',

                        // 🌟 Glow on gold background changed to deeper shadow for contrast
                        boxShadow:
                            '0 0 25px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.45)',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                    }}
                    initial={{ opacity: 0, x: -60, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                />
            </Box>

            {/* ================= TEXT CONTENT ================= */}
            <Box sx={{ color: '#003018', maxWidth: '600px', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            mb: 3,

                            // 🟢 Deep green title for contrast on gold
                            background: 'linear-gradient(to right, #003018, #01240F)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            textShadow: '0 0 8px rgba(0,0,0,0.25)',
                        }}
                    >
                        Salary Processing
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            fontSize: '1.08rem',
                            color: '#003018',   // 🟢 Deep green readable text on gold
                            fontWeight: 500,
                            textShadow: '0 0 4px rgba(255,255,255,0.4)',
                        }}
                    >
                        With GOLDEN GENERATION DT SACCO's salary processing service, members can have 
                        their salaries channeled directly through the SACCO—ensuring timely payments 
                        and unlocking a host of benefits. By routing your income through the SACCO, 
                        you gain seamless access to loan facilities and benefit from faster approvals 
                        tailored to support your personal needs and development. It’s a secure, smart 
                        way to manage your income while enjoying the full value of SACCO membership.
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
};

export default SalaryProcessing;
