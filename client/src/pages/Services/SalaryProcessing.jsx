import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SalaryProcessing = () => {
    return (
        <Box
            sx={{
               
                background: 'linear-gradient(135deg, #FFD700 0%, #F5C400 100%)',
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
           
            <Box sx={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                opacity: 0.03,
                pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            
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
                       
                        boxShadow: '0 0 25px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.45)',
                        cursor: 'pointer',
                    }}
                    initial={{ opacity: 0, x: -60, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                />
            </Box>

           
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
                           
                            background: 'linear-gradient(to right, #002613, #01240F)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            textShadow: '0 0 1px rgba(0,0,0,0.1)', 
                            fontSize: { xs: '1.5rem', md: '1.8rem' }
                        }}
                    >
                        Salary Processing
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            color: '#002613', 
                            fontWeight: 700,
                            textShadow: '0 0 4px rgba(255,255,255,0.3)', 
                        }}
                    >
                        With <strong>GOLDEN GENERATION DT SACCO's</strong> salary processing service, members can have 
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