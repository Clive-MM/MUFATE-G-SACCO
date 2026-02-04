import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SalaryProcessing = () => {
    return (
        <Box
            sx={{
                // 🟡 Using a subtle gradient instead of flat gold for a professional "metallic" feel
                background: 'linear-gradient(135deg, #FFD700 0%, #F5C400 100%)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 3, md: 10 },
                pt: { xs: 8, md: 12 }, // Increased padding for a more "breathable" premium feel
                pb: { xs: 6, md: 10 },
                position: 'relative',
                overflow: 'visible',
                gap: { xs: 4, md: 8 },
            }}
        >
            {/* Subtle background texture for professional depth */}
            <Box sx={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                opacity: 0.03,
                pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* ================= IMAGE SIDE ================= */}
            <Box
                sx={{
                    position: 'relative',
                    mt: { xs: 0, md: '-100px' }, // Slightly adjusted for better overlap
                    zIndex: 2,
                }}
            >
                <motion.img
                    src="https://res.cloudinary.com/djydkcx01/image/upload/v1754911013/ChatGPT_Image_Aug_11_2025_02_02_22_PM_sbscrx.png"
                    alt="Salary Processing"
                    style={{
                        width: '100%',
                        maxWidth: '520px',
                        height: 'auto',
                        borderRadius: '24px',
                        // 🌟 Multi-layered shadow for a "floating" effect
                        boxShadow: '0 20px 50px rgba(0,0,0,0.2), 0 10px 15px rgba(0,0,0,0.1)',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.3 }
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </Box>

            {/* ================= TEXT CONTENT ================= */}
            <Box sx={{ color: '#003018', maxWidth: '650px', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h3" // Increased variant for more authority
                        sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            mb: 3,
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                            // 🟢 Ultra-deep green for maximum readability
                            color: '#002613', 
                            lineHeight: 1.2
                        }}
                    >
                        Salary Processing
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.9,
                            fontSize: '1.15rem', // Slightly larger for clarity
                            color: '#003018',
                            fontWeight: 600, // Increased weight to make it "Boldly Visible"
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            opacity: 0.95
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