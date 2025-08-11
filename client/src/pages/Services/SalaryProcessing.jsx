import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SalaryProcessing = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#64dd17',
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
                        boxShadow: '0 0 25px rgba(192, 233, 12, 0.25), 0 10px 30px rgba(0,0,0,0.2)',
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

        
            <Box sx={{ color: '#fff', maxWidth: '600px', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            mb: 3,
                        }}
                    >
                        Salary Processing
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}
                    >
                        With Mufate G’s salary processing service, members can have their salaries channeled
                        directly through the SACCO—ensuring timely payments and unlocking a host of benefits.
                        By routing your income through Mufate G, you gain seamless access to loan facilities
                        and benefit from faster approvals tailored to support your personal needs and development.
                        It’s a smart, secure way to manage your income while enjoying the full value of SACCO membership.
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
};

export default SalaryProcessing;
